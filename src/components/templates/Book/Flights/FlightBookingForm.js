import React, { useState, useEffect, memo } from "react";
import { useRouter } from "next/router";
import { useSelector, useDispatch } from "react-redux";
import {
  TextField,
  Grid,
  Typography,
  MenuItem,
  Card,
  CardContent,
  Button,
  Divider,
  IconButton,
  Tooltip,
  Popover,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";
import { Formik, Form, FieldArray, FastField, ErrorMessage } from "formik";
import { LoadingButton } from "@mui/lab";
import * as Yup from "yup";
import _ from "lodash";
import { ref, listAll, getDownloadURL } from "firebase/storage";
import { storage } from "../../../../handlers/firebaseClient";
import Iconify from "../../../atoms/Iconify";
import { flightBookingConfirmationDocument } from "./flightBookingConfirmationDocument";
import { flightBookingConfirmationEmailbody } from "./flightBookingConfirmationEmailbody";
import { flightBookingConfirmationSMSBody } from "./flightBookingConfirmationSMSBody";
import { generatePdfAndStore } from "../../../../helpers/generatePdfAndStore";
import { PAGE_PATH } from "../../../../constants/navigationConstants";
import {
  DOCUMENT_TYPE,
  GENDER_TYPE,
  DISCOUNT_SUB_TYPE,
  TRAVELER_TYPE,
  CONTACT_PURPOSE_TYPE,
} from "../../../../constants/flightBooking";
import { fDateWithYMD } from "../../../../utils/formatTime";
import addFlightBooking from "../../../../store/actions/book/flights/bookings/addFlightBooking";
import sendFlightBookingConfirmationEmail from "../../../../store/actions/book/flights/bookings/sendFlightBookingConfirmationEmail";
import sendFlightBookingConfirmationSMS from "../../../../store/actions/book/flights/bookings/sendFlightBookingConfirmationSMS";
import { performFlightBooking } from "../../../../services/flight/flightBooking";

const FlightBookingForm = ({
  flightOffers,
  bookingRequirements,
  travelerPricings,
}) => {
  const [imageData, setImageData] = useState({});
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  const {
    invoiceAddressRequired,
    mailingAddressRequired,
    postalCodeRequired,
    emailAddressRequired,
    phoneCountryCodeRequired,
    phoneNumberRequired,
    mobilePhoneNumberRequired,
    travelerRequirements,
  } = bookingRequirements ?? {};

  const router = useRouter();
  const dispatch = useDispatch();
  const theme = useTheme();
  const { uid } = useSelector((state) => state.auth.user);

  // Getting all the images for booking confirmation PDF
  useEffect(() => {
    // Reference to the images in Firebase Storage
    const imagesRef = ref(
      storage,
      "backpacky/assets/images/flight-booking-confirmation-pdf"
    );

    // Fetch the list of items in the folder
    listAll(imagesRef)
      .then((res) => {
        const imageDetails = {};

        // Iterate through each item and get the download URL and file name
        res.items.forEach((itemRef) => {
          // Extracting the file name with extension
          const fileNameWithExtension = itemRef.name.split("/").pop();
          // Removing the file extension
          const fileName = fileNameWithExtension
            .split(".")
            .slice(0, -1)
            .join("");
          getDownloadURL(itemRef).then((url) => {
            imageDetails[fileName] = url;
            // Updating state with the image details
            setImageData(imageDetails);
          });
        });
      })
      .catch((error) => {
        // Uh-oh, an error occurred!
        console.error("error", error);
      });
  }, []);

  // Function to generate traveler schema based on index
  const generateTravelerSchema = (index) => {
    const requirements = travelerRequirements[index] || {};
    return Yup.object().shape({
      name: Yup.object().shape({
        firstName: Yup.string().required("First Name is required"),
        middleName: Yup.string(),
        lastName: Yup.string().required("Last Name is required"),
      }),
      gender: requirements.genderRequired
        ? Yup.string().required("Gender is required")
        : Yup.string(),
      dateOfBirth: requirements.dateOfBirthRequired
        ? Yup.date().required("Date of Birth is required")
        : Yup.date(),
      contact: Yup.object().shape({
        emailAddress:
          emailAddressRequired || index === 0
            ? Yup.string().email("Invalid email").required("Email is required")
            : Yup.string().email("Invalid email"),
        phones: Yup.array().of(
          Yup.object().shape({
            deviceType:
              mobilePhoneNumberRequired || phoneNumberRequired || index === 0
                ? Yup.string().required("Device type is required")
                : Yup.string(),
            countryCallingCode:
              mobilePhoneNumberRequired ||
              phoneCountryCodeRequired ||
              phoneNumberRequired ||
              index === 0
                ? Yup.string().required("Country calling code is required")
                : Yup.string(),
            number: Yup.string().when("deviceType", {
              is: "MOBILE",
              then: (schema) =>
                mobilePhoneNumberRequired || index === 0
                  ? schema.required("Mobile Phone number is required")
                  : schema,
              otherwise: (schema) =>
                phoneNumberRequired || index === 0
                  ? schema.required("Phone Number is required")
                  : schema,
            }),
          })
        ),
      }),
      documents: Yup.array().of(
        Yup.object().shape({
          documentType: requirements.documentRequired
            ? Yup.string().required("Document type is required")
            : Yup.string(),
          number: requirements.documentRequired
            ? Yup.string().required("Document number is required")
            : Yup.string(),
          issuanceCountry: requirements.documentRequired
            ? Yup.string()
                .required("Issuance country is required")
                .matches(/^[a-zA-Z]{2}$/, "Issuance country must be 2 letters")
            : Yup.string().matches(
                /^[a-zA-Z]{2}$/,
                "Issuance country must be 2 letters"
              ),
          issuanceLocation: requirements.documentRequired
            ? Yup.string().required("Issuance location is required")
            : Yup.string(),
          expiryDate: requirements.documentRequired
            ? Yup.date().required("Expiry date is required")
            : Yup.date(),
          nationality: requirements.documentRequired
            ? Yup.string()
                .required("Nationality is required")
                .matches(/^[a-zA-Z]{2}$/, "Nationality must be 2 letters")
            : Yup.string().matches(
                /^[a-zA-Z]{2}$/,
                "Nationality must be 2 letters"
              ),
        })
      ),
      airFranceDiscount:
        requirements.airFranceDiscountRequired &&
        Yup.object().shape({
          subType: requirements.airFranceDiscountRequired
            ? Yup.string()
                .oneOf(Object.keys(DISCOUNT_SUB_TYPE))
                .required("Discount Sub-type is required")
            : Yup.string(),
          cityName: requirements.airFranceDiscountRequired
            ? Yup.string().required("City name is required")
            : Yup.string(),
          travelerType: requirements.airFranceDiscountRequired
            ? Yup.string()
                .oneOf(Object.keys(TRAVELER_TYPE))
                .required("Traveler Type is required")
            : Yup.string(),
          cardNumber: requirements.airFranceDiscountRequired
            ? Yup.string()
                .matches(
                  /^[0-9A-Z][0-9]{0,12}[A-Z]$/,
                  "Card Number must follow the format, for example: 12568215Z."
                )
                .required("Card Number is required")
            : Yup.string().matches(
                /^[0-9A-Z][0-9]{0,12}[A-Z]$/,
                "Card Number must follow the format, for example: 12568215Z."
              ),
          certificateNumber: requirements.airFranceDiscountRequired
            ? Yup.string()
                .matches(
                  /^[0-9A-Z][0-9]{0,12}[A-Z]$/,
                  "Certificate Number must follow the format, for example: 12568215Z."
                )
                .required("Certificate Number is required")
            : Yup.string().matches(
                /^[0-9A-Z][0-9]{0,12}[A-Z]$/,
                "Certificate Number must follow the format, for example: 12568215Z."
              ),
        }),
      spanishResidentDiscount:
        requirements.spanishResidentDiscountRequired &&
        Yup.object().shape({
          subType: requirements.spanishResidentDiscountRequired
            ? Yup.string()
                .oneOf(Object.keys(DISCOUNT_SUB_TYPE))
                .required("Discount Sub-type is required")
            : Yup.string(),
          cityName: requirements.spanishResidentDiscountRequired
            ? Yup.string().required("City name is required")
            : Yup.string(),
          travelerType: requirements.spanishResidentDiscountRequired
            ? Yup.string()
                .oneOf(Object.keys(TRAVELER_TYPE))
                .required("Traveler Type is required")
            : Yup.string(),
          cardNumber: requirements.spanishResidentDiscountRequired
            ? Yup.string()
                .matches(
                  /^[0-9A-Z][0-9]{0,12}[A-Z]$/,
                  "Card Number must follow the format, for example: 12568215Z."
                )
                .required("Card Number is required")
            : Yup.string().matches(
                /^[0-9A-Z][0-9]{0,12}[A-Z]$/,
                "Card Number must follow the format, for example: 12568215Z."
              ),
          certificateNumber: requirements.spanishResidentDiscountRequired
            ? Yup.string()
                .matches(
                  /^[0-9A-Z][0-9]{0,12}[A-Z]$/,
                  "Certificate Number must follow the format, for example: 12568215Z."
                )
                .required("Certificate Number is required")
            : Yup.string().matches(
                /^[0-9A-Z][0-9]{0,12}[A-Z]$/,
                "Certificate Number must follow the format, for example: 12568215Z."
              ),
        }),
    });
  };

  const validationSchema = Yup.object().shape({
    travelers: Yup.array().of(
      Yup.lazy((value, context) => {
        const path = context.path; // e.g., "travelers[0]"
        const match = path.match(/travelers\[(\d+)\]/);
        const index = match ? parseInt(match[1], 10) : 0;

        return generateTravelerSchema(index);
      })
    ),
    purpose:
      mailingAddressRequired || invoiceAddressRequired
        ? Yup.string()
            .oneOf(Object.keys(CONTACT_PURPOSE_TYPE))
            .required("Contact purpose is required")
        : Yup.string(),
    addressLineOne:
      mailingAddressRequired || invoiceAddressRequired
        ? Yup.string().required("Address Line 1 required")
        : Yup.string(),
    addressLineTwo:
      mailingAddressRequired || invoiceAddressRequired
        ? Yup.string().required("Address Line 2 required")
        : Yup.string(),
    cityName:
      mailingAddressRequired || invoiceAddressRequired
        ? Yup.string().required("City Name is required")
        : Yup.string(),
    stateName:
      mailingAddressRequired || invoiceAddressRequired
        ? Yup.string().required("State Name is required")
        : Yup.string(),
    countryCode:
      mailingAddressRequired || invoiceAddressRequired
        ? Yup.string()
            .required("Country Code is required")
            .matches(/^[a-zA-Z]{2}$/, "Country Code must be 2 letters")
        : Yup.string().matches(
            /^[a-zA-Z]{2}$/,
            "Country Code must be 2 letters"
          ),
    postalCode:
      mailingAddressRequired || invoiceAddressRequired || postalCodeRequired
        ? Yup.string().required("Postal code is required")
        : Yup.string(),
  });

  const DOCUMENT_TYPES = Object.values(DOCUMENT_TYPE);
  const GENDER_TYPES = Object.values(GENDER_TYPE);
  const SUB_TYPES = Object.values(DISCOUNT_SUB_TYPE);
  const TRAVELER_TYPES = Object.values(TRAVELER_TYPE);
  const CONTACT_PURPOSE_TYPES = Object.values(CONTACT_PURPOSE_TYPE);

  const FormikDatePicker = memo(({ field, form, ...props }) => {
    const currentError = form.errors[field.name];

    return (
      <DatePicker
        {...field}
        {...props}
        sx={{ width: "100%" }}
        value={dayjs(field.value)}
        onChange={(value) => form.setFieldValue(field.name, value)}
        renderInput={(params) => (
          <TextField
            {...params}
            fullWidth
            error={Boolean(currentError)}
            helperText={currentError ? String(currentError) : ""}
          />
        )}
      />
    );
  });

  const renderTravelerFields = (traveler, index, errors, touched, values) => (
    <React.Fragment key={index}>
      <Typography variant="h6" gutterBottom>
        Traveler Information ({index + 1})
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={4}>
          <FastField
            name={`travelers.${index}.name.firstName`}
            as={TextField}
            label="First Name"
            variant="outlined"
            fullWidth
            error={
              !!errors.travelers &&
              !!errors.travelers[index] &&
              !!errors.travelers[index].name &&
              !!errors.travelers[index].name.firstName &&
              touched.travelers &&
              touched.travelers[index] &&
              touched.travelers[index].name &&
              touched.travelers[index].name.firstName
            }
            helperText={
              <ErrorMessage name={`travelers.${index}.name.firstName`} />
            }
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <FastField
            name={`travelers.${index}.name.middleName`}
            as={TextField}
            label="Middle (optional)"
            variant="outlined"
            fullWidth
            error={
              !!errors.travelers &&
              !!errors.travelers[index] &&
              !!errors.travelers[index].name &&
              !!errors.travelers[index].name.middleName &&
              touched.travelers &&
              touched.travelers[index] &&
              touched.travelers[index].name &&
              touched.travelers[index].name.middleName
            }
            helperText={
              <ErrorMessage name={`travelers.${index}.name.middleName`} />
            }
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <FastField
            name={`travelers.${index}.name.lastName`}
            as={TextField}
            label="Last Name"
            variant="outlined"
            fullWidth
            error={
              !!errors.travelers &&
              !!errors.travelers[index] &&
              !!errors.travelers[index].name &&
              !!errors.travelers[index].name.lastName &&
              touched.travelers &&
              touched.travelers[index] &&
              touched.travelers[index].name &&
              touched.travelers[index].name.lastName
            }
            helperText={
              <ErrorMessage name={`travelers.${index}.name.lastName`} />
            }
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <FastField
            name={`travelers.${index}.gender`}
            as={TextField}
            label="Gender"
            variant="outlined"
            fullWidth
            select
            error={
              !!errors.travelers &&
              !!errors.travelers[index] &&
              !!errors.travelers[index].gender &&
              touched.travelers &&
              touched.travelers[index] &&
              touched.travelers[index].gender
            }
            helperText={<ErrorMessage name={`travelers.${index}.gender`} />}
          >
            {GENDER_TYPES.map((genderType, index) => (
              <MenuItem
                key={`gender-${index}`}
                value={_.findKey(GENDER_TYPE, (val) => val === genderType)}
              >
                {genderType}
              </MenuItem>
            ))}
          </FastField>
        </Grid>
        <Grid item xs={12} sm={6}>
          <FastField
            name={`travelers.${index}.dateOfBirth`}
            component={FormikDatePicker}
            label="Date of Birth"
            format="DD/MM/YYYY"
            variant="outlined"
            fullWidth
            error={
              !!errors.travelers &&
              !!errors.travelers[index] &&
              !!errors.travelers[index].dateOfBirth &&
              touched.travelers &&
              touched.travelers[index] &&
              touched.travelers[index].dateOfBirth
            }
            helperText={
              <ErrorMessage name={`travelers.${index}.dateOfBirth`} />
            }
          />
        </Grid>
        <Grid item xs={12}>
          <FastField
            name={`travelers.${index}.contact.emailAddress`}
            as={TextField}
            label="Email Address"
            variant="outlined"
            fullWidth
            error={
              touched.travelers?.[index]?.contact?.emailAddress &&
              Boolean(errors.travelers?.[index]?.contact?.emailAddress)
            }
            helperText={
              <ErrorMessage name={`travelers.${index}.contact.emailAddress`} />
            }
          />
        </Grid>
        <FieldArray name={`travelers.${index}.contact.phones`}>
          {({ push, remove }) => (
            <>
              {values.travelers?.[index]?.contact?.phones.map(
                (phone, phoneIndex) => (
                  <React.Fragment key={`phone-${index}`}>
                    <Grid item xs={12} sm={3}>
                      <FastField
                        name={`travelers.${index}.contact.phones.${phoneIndex}.deviceType`}
                        as={TextField}
                        label="Phone Type"
                        variant="outlined"
                        fullWidth
                        select
                        error={
                          !!errors.travelers?.[index]?.contact?.phones &&
                          !!errors.travelers?.[index]?.contact?.phones[
                            phoneIndex
                          ] &&
                          !!errors.travelers?.[index]?.contact?.phones[
                            phoneIndex
                          ].deviceType &&
                          touched.travelers?.[index]?.contact?.phones &&
                          touched.travelers?.[index]?.contact?.phones[
                            phoneIndex
                          ] &&
                          touched.travelers?.[index]?.contact?.phones[
                            phoneIndex
                          ].deviceType
                        }
                        helperText={
                          <ErrorMessage
                            name={`travelers.${index}.contact.phones.${phoneIndex}.deviceType`}
                          />
                        }
                      >
                        <MenuItem value="MOBILE">Mobile</MenuItem>
                        <MenuItem value="LANDLINE">Landline</MenuItem>
                      </FastField>
                    </Grid>
                    <Grid item xs={12} sm={4}>
                      <FastField
                        name={`travelers.${index}.contact.phones.${phoneIndex}.countryCallingCode`}
                        as={TextField}
                        label="Country Calling Code"
                        variant="outlined"
                        fullWidth
                        error={
                          !!errors.travelers?.[index]?.contact?.phones &&
                          !!errors.travelers?.[index]?.contact?.phones[
                            phoneIndex
                          ] &&
                          !!errors.travelers?.[index]?.contact?.phones[
                            phoneIndex
                          ].countryCallingCode &&
                          touched.travelers?.[index]?.contact?.phones &&
                          touched.travelers?.[index]?.contact?.phones[
                            phoneIndex
                          ] &&
                          touched.travelers?.[index]?.contact?.phones[
                            phoneIndex
                          ].countryCallingCode
                        }
                        helperText={
                          <ErrorMessage
                            name={`travelers.${index}.contact.phones.${phoneIndex}.countryCallingCode`}
                          />
                        }
                      />
                    </Grid>
                    <Grid item xs={12} sm={4}>
                      <FastField
                        name={`travelers.${index}.contact.phones.${phoneIndex}.number`}
                        as={TextField}
                        label="Phone Number"
                        variant="outlined"
                        fullWidth
                        error={
                          !!errors.travelers?.[index]?.contact?.phones &&
                          !!errors.travelers?.[index]?.contact?.phones[
                            phoneIndex
                          ] &&
                          !!errors.travelers?.[index]?.contact?.phones[
                            phoneIndex
                          ].number &&
                          touched.travelers?.[index]?.contact?.phones &&
                          touched.travelers?.[index]?.contact?.phones[
                            phoneIndex
                          ] &&
                          touched.travelers?.[index]?.contact?.phones[
                            phoneIndex
                          ].number
                        }
                        helperText={
                          <ErrorMessage
                            name={`travelers.${index}.contact.phones.${phoneIndex}.number`}
                          />
                        }
                      />
                    </Grid>
                    <Grid item xs={12} sm={1} alignContent="center">
                      <IconButton
                        size="small"
                        type="button"
                        variant="outlined"
                        color="error"
                        onClick={() => remove(phoneIndex)}
                        disabled={
                          values.travelers?.[index]?.contact?.phones.length ===
                          1
                        }
                      >
                        <Iconify icon={"eva:trash-2-outline"} />
                      </IconButton>
                    </Grid>
                  </React.Fragment>
                )
              )}
              {values.travelers?.[index]?.contact?.phones.length < 2 && (
                <Grid item xs={12}>
                  <Button
                    type="button"
                    variant="text"
                    startIcon={<Iconify icon={"eva:plus-outline"} />}
                    onClick={() =>
                      push({
                        deviceType: "",
                        countryCallingCode: "",
                        number: "",
                      })
                    }
                  >
                    Add Another Phone
                  </Button>
                </Grid>
              )}
            </>
          )}
        </FieldArray>
      </Grid>

      <Typography variant="h6" sx={{ mt: 2 }}>
        Document Information
      </Typography>
      <Typography variant="body2" gutterBottom>
        Please provide the traveler's documentation details below:
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <FastField
            name={`travelers.${index}.documents[0].documentType`}
            as={TextField}
            label="Document Type"
            variant="outlined"
            fullWidth
            select
            error={
              !!errors.travelers &&
              !!errors.travelers[index] &&
              !!errors.travelers[index].documents?.[0] &&
              !!errors.travelers[index].documents?.[0]?.documentType &&
              touched.travelers &&
              touched.travelers[index] &&
              touched.travelers[index].documents?.[0] &&
              touched.travelers[index].documents?.[0]?.documentType
            }
            helperText={
              <ErrorMessage
                name={`travelers.${index}.documents[0].documentType`}
              />
            }
          >
            {DOCUMENT_TYPES.map((documentType, index) => (
              <MenuItem
                key={`document-${index}`}
                value={_.findKey(DOCUMENT_TYPE, (val) => val === documentType)}
              >
                {documentType}
              </MenuItem>
            ))}
          </FastField>
        </Grid>
        <Grid item xs={12} sm={6}>
          <FastField
            name={`travelers.${index}.documents[0].number`}
            as={TextField}
            label="Document Number"
            variant="outlined"
            fullWidth
            error={
              !!errors.travelers &&
              !!errors.travelers[index] &&
              !!errors.travelers[index].documents?.[0] &&
              !!errors.travelers[index].documents?.[0].number &&
              touched.travelers &&
              touched.travelers[index] &&
              touched.travelers[index].documents?.[0] &&
              touched.travelers[index].documents?.[0]?.number
            }
            helperText={
              <ErrorMessage name={`travelers.${index}.documents[0].number`} />
            }
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <FastField
            name={`travelers.${index}.documents[0].issuanceCountry`}
            as={TextField}
            label="Issuance Country e.g: AU"
            variant="outlined"
            fullWidth
            error={
              !!errors.travelers &&
              !!errors.travelers[index] &&
              !!errors.travelers[index].documents?.[0] &&
              !!errors.travelers[index].documents?.[0]?.issuanceCountry &&
              touched.travelers &&
              touched.travelers[index] &&
              touched.travelers[index].documents?.[0] &&
              touched.travelers[index].documents?.[0]?.issuanceCountry
            }
            helperText={
              <ErrorMessage
                name={`travelers.${index}.documents[0].issuanceCountry`}
              />
            }
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <FastField
            name={`travelers.${index}.documents[0].issuanceLocation`}
            as={TextField}
            label="Issuance Location (state/city)"
            variant="outlined"
            fullWidth
            error={
              !!errors.travelers &&
              !!errors.travelers[index] &&
              !!errors.travelers[index].documents?.[0] &&
              !!errors.travelers[index].documents?.[0]?.issuanceLocation &&
              touched.travelers &&
              touched.travelers[index] &&
              touched.travelers[index].documents?.[0] &&
              touched.travelers[index].documents?.[0]?.issuanceLocation
            }
            helperText={
              <ErrorMessage
                name={`travelers.${index}.documents[0].issuanceLocation`}
              />
            }
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <FastField
            name={`travelers.${index}.documents[0].expiryDate`}
            component={FormikDatePicker}
            label="Document Expiry Date"
            format="DD/MM/YYYY"
            variant="outlined"
            fullWidth
            disablePast
            error={
              !!errors.travelers &&
              !!errors.travelers[index] &&
              !!errors.travelers[index].documents?.[0] &&
              !!errors.travelers[index].documents?.[0]?.expiryDate &&
              touched.travelers &&
              touched.travelers[index] &&
              touched.travelers[index].documents?.[0] &&
              touched.travelers[index].documents?.[0]?.expiryDate
            }
            helperText={
              <ErrorMessage
                name={`travelers.${index}.documents[0].expiryDate`}
              />
            }
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <FastField
            name={`travelers.${index}.documents[0].nationality`}
            as={TextField}
            label="Nationality e.g: AU"
            variant="outlined"
            fullWidth
            error={
              !!errors.travelers &&
              !!errors.travelers[index] &&
              !!errors.travelers[index].documents?.[0] &&
              !!errors.travelers[index].documents?.[0]?.nationality &&
              touched.travelers &&
              touched.travelers[index] &&
              touched.travelers[index].documents?.[0] &&
              touched.travelers[index].documents?.[0]?.nationality
            }
            helperText={
              <ErrorMessage
                name={`travelers.${index}.documents[0].nationality`}
              />
            }
          />
        </Grid>
        {travelerRequirements[index].airFranceDiscountRequired && (
          <Grid item xs={12} sm={12}>
            <Typography variant="h6" gutterBottom>
              Air France Discount
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={4}>
                <FastField
                  name={`travelers.${index}.airFranceDiscount.subType`}
                  as={TextField}
                  label="Sub Type"
                  select
                  variant="outlined"
                  fullWidth
                  error={
                    !!errors.travelers &&
                    !!errors.travelers[index] &&
                    !!errors.travelers[index].airFranceDiscount &&
                    !!errors.travelers[index].airFranceDiscount.subType &&
                    touched.travelers &&
                    touched.travelers[index] &&
                    touched.travelers[index].airFranceDiscount &&
                    touched.travelers[index].airFranceDiscount.subType
                  }
                  helperText={
                    <ErrorMessage
                      name={`travelers.${index}.airFranceDiscount.subType`}
                    />
                  }
                >
                  {SUB_TYPES.map((type) => (
                    <MenuItem
                      key={type}
                      value={_.findKey(
                        DISCOUNT_SUB_TYPE,
                        (val) => val === type
                      )}
                    >
                      {type}
                    </MenuItem>
                  ))}
                </FastField>
              </Grid>
              <Grid item xs={12} sm={4}>
                <FastField
                  name={`travelers.${index}.airFranceDiscount.cityName`}
                  as={TextField}
                  label="City Name"
                  variant="outlined"
                  fullWidth
                  error={
                    !!errors.travelers &&
                    !!errors.travelers[index] &&
                    !!errors.travelers[index].airFranceDiscount &&
                    !!errors.travelers[index].airFranceDiscount.cityName &&
                    touched.travelers &&
                    touched.travelers[index] &&
                    touched.travelers[index].airFranceDiscount &&
                    touched.travelers[index].airFranceDiscount.cityName
                  }
                  helperText={
                    <ErrorMessage
                      name={`travelers.${index}.airFranceDiscount.cityName`}
                    />
                  }
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <FastField
                  name={`travelers.${index}.airFranceDiscount.travelerType`}
                  as={TextField}
                  label="Traveler Type"
                  select
                  variant="outlined"
                  fullWidth
                  error={
                    !!errors.travelers &&
                    !!errors.travelers[index] &&
                    !!errors.travelers[index].airFranceDiscount &&
                    !!errors.travelers[index].airFranceDiscount.travelerType &&
                    touched.travelers &&
                    touched.travelers[index] &&
                    touched.travelers[index].airFranceDiscount &&
                    touched.travelers[index].airFranceDiscount.travelerType
                  }
                  helperText={
                    <ErrorMessage
                      name={`travelers.${index}.airFranceDiscount.travelerType`}
                    />
                  }
                >
                  {TRAVELER_TYPES.map((type) => (
                    <MenuItem
                      key={type}
                      value={_.findKey(TRAVELER_TYPE, (val) => val === type)}
                    >
                      {type}
                    </MenuItem>
                  ))}
                </FastField>
              </Grid>
              <Grid item xs={12} sm={4}>
                <FastField
                  name={`travelers.${index}.airFranceDiscount.cardNumber`}
                  as={TextField}
                  label="Card Number e.g: 12568215Z"
                  variant="outlined"
                  fullWidth
                  error={
                    !!errors.travelers &&
                    !!errors.travelers[index] &&
                    !!errors.travelers[index].airFranceDiscount &&
                    !!errors.travelers[index].airFranceDiscount.cardNumber &&
                    touched.travelers &&
                    touched.travelers[index] &&
                    touched.travelers[index].airFranceDiscount &&
                    touched.travelers[index].airFranceDiscount.cardNumber
                  }
                  helperText={
                    <ErrorMessage
                      name={`travelers.${index}.airFranceDiscount.cardNumber`}
                    />
                  }
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <FastField
                  name={`travelers.${index}.airFranceDiscount.certificateNumber`}
                  as={TextField}
                  label="Certificate Number e.g: 12568215Z"
                  variant="outlined"
                  fullWidth
                  error={
                    !!errors.travelers &&
                    !!errors.travelers[index] &&
                    !!errors.travelers[index].airFranceDiscount &&
                    !!errors.travelers[index].airFranceDiscount
                      .certificateNumber &&
                    touched.travelers &&
                    touched.travelers[index] &&
                    touched.travelers[index].airFranceDiscount &&
                    touched.travelers[index].airFranceDiscount.certificateNumber
                  }
                  helperText={
                    <ErrorMessage
                      name={`travelers.${index}.airFranceDiscount.certificateNumber`}
                    />
                  }
                />
              </Grid>
            </Grid>
          </Grid>
        )}
        {travelerRequirements[index].spanishResidentDiscountRequired && (
          <Grid item xs={12} sm={12}>
            <Typography variant="h6" gutterBottom>
              Spanish Resident Discount
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={4}>
                <FastField
                  name={`travelers.${index}.spanishResidentDiscount.subType`}
                  as={TextField}
                  label="Sub Type"
                  select
                  variant="outlined"
                  fullWidth
                  error={
                    !!errors.travelers &&
                    !!errors.travelers[index] &&
                    !!errors.travelers[index].spanishResidentDiscount &&
                    !!errors.travelers[index].spanishResidentDiscount.subType &&
                    touched.travelers &&
                    touched.travelers[index] &&
                    touched.travelers[index].spanishResidentDiscount &&
                    touched.travelers[index].spanishResidentDiscount.subType
                  }
                  helperText={
                    <ErrorMessage
                      name={`travelers.${index}.spanishResidentDiscount.subType`}
                    />
                  }
                >
                  {SUB_TYPES.map((type) => (
                    <MenuItem
                      key={type}
                      value={_.findKey(
                        DISCOUNT_SUB_TYPE,
                        (val) => val === type
                      )}
                    >
                      {type}
                    </MenuItem>
                  ))}
                </FastField>
              </Grid>
              <Grid item xs={12} sm={4}>
                <FastField
                  name={`travelers.${index}.spanishResidentDiscount.cityName`}
                  as={TextField}
                  label="City Name"
                  variant="outlined"
                  fullWidth
                  error={
                    !!errors.travelers &&
                    !!errors.travelers[index] &&
                    !!errors.travelers[index].spanishResidentDiscount &&
                    !!errors.travelers[index].spanishResidentDiscount
                      .cityName &&
                    touched.travelers &&
                    touched.travelers[index] &&
                    touched.travelers[index].spanishResidentDiscount &&
                    touched.travelers[index].spanishResidentDiscount.cityName
                  }
                  helperText={
                    <ErrorMessage
                      name={`travelers.${index}.spanishResidentDiscount.cityName`}
                    />
                  }
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <FastField
                  name={`travelers.${index}.spanishResidentDiscount.travelerType`}
                  as={TextField}
                  label="Traveler Type"
                  select
                  variant="outlined"
                  fullWidth
                  error={
                    !!errors.travelers &&
                    !!errors.travelers[index] &&
                    !!errors.travelers[index].spanishResidentDiscount &&
                    !!errors.travelers[index].spanishResidentDiscount
                      .travelerType &&
                    touched.travelers &&
                    touched.travelers[index] &&
                    touched.travelers[index].spanishResidentDiscount &&
                    touched.travelers[index].spanishResidentDiscount
                      .travelerType
                  }
                  helperText={
                    <ErrorMessage
                      name={`travelers.${index}.spanishResidentDiscount.travelerType`}
                    />
                  }
                >
                  {TRAVELER_TYPES.map((type) => (
                    <MenuItem
                      key={type}
                      value={_.findKey(TRAVELER_TYPE, (val) => val === type)}
                    >
                      {type}
                    </MenuItem>
                  ))}
                </FastField>
              </Grid>
              <Grid item xs={12} sm={4}>
                <FastField
                  name={`travelers.${index}.spanishResidentDiscount.cardNumber`}
                  as={TextField}
                  label="Card Number e.g: 12568215Z"
                  variant="outlined"
                  fullWidth
                  error={
                    !!errors.travelers &&
                    !!errors.travelers[index] &&
                    !!errors.travelers[index].spanishResidentDiscount &&
                    !!errors.travelers[index].spanishResidentDiscount
                      .cardNumber &&
                    touched.travelers &&
                    touched.travelers[index] &&
                    touched.travelers[index].spanishResidentDiscount &&
                    touched.travelers[index].spanishResidentDiscount.cardNumber
                  }
                  helperText={
                    <ErrorMessage
                      name={`travelers.${index}.spanishResidentDiscount.cardNumber`}
                    />
                  }
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <FastField
                  name={`travelers.${index}.spanishResidentDiscount.certificateNumber`}
                  as={TextField}
                  label="Certificate Number e.g: 12568215Z"
                  variant="outlined"
                  fullWidth
                  error={
                    !!errors.travelers &&
                    !!errors.travelers[index] &&
                    !!errors.travelers[index].spanishResidentDiscount &&
                    !!errors.travelers[index].spanishResidentDiscount
                      .certificateNumber &&
                    touched.travelers &&
                    touched.travelers[index] &&
                    touched.travelers[index].spanishResidentDiscount &&
                    touched.travelers[index].spanishResidentDiscount
                      .certificateNumber
                  }
                  helperText={
                    <ErrorMessage
                      name={`travelers.${index}.spanishResidentDiscount.certificateNumber`}
                    />
                  }
                />
              </Grid>
            </Grid>
          </Grid>
        )}
      </Grid>
      <Divider sx={{ my: 2 }} />
    </React.Fragment>
  );

  return (
    <Formik
      initialValues={{
        travelers: Array.from({ length: travelerPricings.length }, () => ({
          name: {
            firstName: "",
            middleName: "",
            lastName: "",
          },
          gender: "",
          dateOfBirth: dayjs(),
          contact: {
            emailAddress: "",
            phones: [
              {
                deviceType: "",
                countryCallingCode: "",
                number: "",
              },
            ],
          },
          documents: [
            {
              documentType: "",
              number: "",
              issuanceCountry: "", // pattern: [a-zA-Z]{2}
              issuanceLocation: "", // It may be a country, a state, a city or any other type of location. e.g. New-York
              expiryDate: dayjs(),
              nationality: "", // pattern: [a-zA-Z]{2}
              holder: true,
            },
          ],
          // redressNumber: "",
          // residenceCountry: "",
          airFranceDiscount: {
            subType: "",
            cityName: "",
            travelerType: "",
            cardNumber: "",
            certificateNumber: "",
          },
          spanishResidentDiscount: {
            subType: "",
            cityName: "",
            travelerType: "",
            cardNumber: "",
            certificateNumber: "",
          },
        })),
        purpose: "",
        addressLineOne: "",
        addressLineTwo: "",
        cityName: "",
        stateName: "",
        countryCode: "",
        postalCode: "",
      }}
      validationSchema={validationSchema}
      onSubmit={async (values, { setSubmitting }) => {
        setSubmitting(true);

        const {
          travelers,
          purpose,
          addressLineOne,
          addressLineTwo,
          cityName,
          stateName,
          countryCode,
          postalCode,
        } = values;

        const flightBookingData = {
          data: {
            type: "flight-order",
            flightOffers,
            travelers: travelers.map((traveler, index) => {
              const travelerData = {
                id: index + 1,
                name: traveler.name,
                gender: traveler.gender,
                dateOfBirth: fDateWithYMD(traveler?.dateOfBirth),
                contact: traveler.contact,
                documents: [
                  {
                    ...traveler.documents[0],
                    expiryDate: fDateWithYMD(
                      traveler.documents?.[0]?.expiryDate
                    ),
                  },
                ],
              };

              // Adding discountEligibility only if needed
              if (
                travelerRequirements[index]?.airFranceDiscountRequired ||
                travelerRequirements[index]?.spanishResidentDiscountRequired
              ) {
                travelerData.discountEligibility = [
                  travelerRequirements[index]?.airFranceDiscountRequired && {
                    ...traveler.airFranceDiscount,
                  },
                  travelerRequirements[index]
                    ?.spanishResidentDiscountRequired && {
                    ...traveler.spanishResidentDiscount,
                  },
                ].filter(Boolean);
              }

              return travelerData;
            }),
            ...(invoiceAddressRequired || mailingAddressRequired
              ? {
                  contacts: [
                    {
                      emailAddress: travelers[0].contact.emailAddress,
                      phones: travelers[0].contact.phones,
                      purpose,
                      addresseeName: {
                        firstName: travelers[0].name.firstName,
                        middleName: travelers[0].name.middleName,
                        lastName: travelers[0].name.lastName,
                      },
                      address: {
                        lines: [addressLineOne, addressLineTwo],
                        cityName,
                        stateName,
                        countryCode,
                        postalCode,
                      },
                    },
                  ],
                }
              : {}),
          },
        };

        try {
          const { data: successFlightBookingResult } =
            await performFlightBooking(dispatch, flightBookingData);

          // AMADEUS REFERENCE (ID) FOR BOOKING
          const reference =
            successFlightBookingResult.associatedRecords[0].reference;

          if (reference) {
            const storagePath = `documents/${uid}/flightBookings`;
            const fileName = `flight-booking-${reference}.pdf`;

            const pdfContent = flightBookingConfirmationDocument(
              successFlightBookingResult,
              imageData,
              theme
            );

            const { pdfBlob, downloadURL } = await generatePdfAndStore(
              pdfContent,
              storagePath,
              fileName
            );

            const bookingInfo = {
              id: reference,
              bookingConfirmation: successFlightBookingResult,
              download: {
                fileName,
                downloadURL,
              },
              ...flightBookingData.data,
            };

            dispatch(addFlightBooking(bookingInfo));

            // Sending Booking Confirmation Emails for each guest
            travelers.forEach((traveler) => {
              const emailBodyContent = flightBookingConfirmationEmailbody(
                traveler,
                successFlightBookingResult,
                travelers,
                theme
              );
              const SMSBodyContent = flightBookingConfirmationSMSBody(
                traveler.name.firstName,
                reference,
                successFlightBookingResult
              );
              // Sending EMAIL
              dispatch(
                sendFlightBookingConfirmationEmail(
                  reference,
                  emailBodyContent,
                  traveler,
                  downloadURL
                )
              );
              // Sending SMS
              dispatch(
                sendFlightBookingConfirmationSMS(
                  `+${traveler.contact.phones[0].countryCallingCode}${traveler.contact.phones[0].number}`,
                  SMSBodyContent,
                  downloadURL
                )
              );
            });

            router.push(`${PAGE_PATH.BOOK_FLIGHTS_CONFIRMATION}${reference}`);
          }
        } catch (err) {
          console.error("error", err);
          setSubmitting(false);
          dispatch(setAndShowErrorToast(err.message));
        }
      }}
    >
      {({ values, errors, touched, isSubmitting }) => (
        <Form>
          <Card sx={{ my: 2 }}>
            <CardContent>
              <FieldArray name="travelers">
                {() =>
                  values.travelers.map((traveler, index) =>
                    renderTravelerFields(
                      traveler,
                      index,
                      errors,
                      touched,
                      values
                    )
                  )
                }
              </FieldArray>
              {invoiceAddressRequired ||
                (mailingAddressRequired && (
                  <>
                    <Grid container spacing={2} sx={{ mb: 2 }}>
                      <Grid item xs={12}>
                        <Typography variant="h6">
                          Contact Purpose
                          <Tooltip title="Contact Purpose Information">
                            <IconButton
                              aria-describedby={id}
                              variant="contained"
                              onClick={handleClick}
                            >
                              <Iconify icon={"eva:info-outline"} />
                            </IconButton>
                          </Tooltip>
                        </Typography>
                        <FastField
                          name="purpose"
                          as={TextField}
                          label="Contact Purpose"
                          variant="outlined"
                          fullWidth
                          select
                          error={!!errors.purpose && touched.purpose}
                          helperText={<ErrorMessage name="purpose" />}
                        >
                          {CONTACT_PURPOSE_TYPES.map(
                            (contactPurposeType, contactPurposeIndex) => (
                              <MenuItem
                                key={`contactPurpose-${contactPurposeIndex}`}
                                value={_.findKey(
                                  CONTACT_PURPOSE_TYPE,
                                  (val) => val === contactPurposeType
                                )}
                              >
                                {contactPurposeType}
                              </MenuItem>
                            )
                          )}
                        </FastField>
                      </Grid>
                    </Grid>
                    <Popover
                      id={id}
                      open={open}
                      anchorEl={anchorEl}
                      onClose={handleClose}
                      anchorOrigin={{
                        vertical: "bottom",
                        horizontal: "left",
                      }}
                    >
                      <List>
                        <ListItem>
                          <ListItemText
                            primary="STANDARD"
                            secondary="for standard use, communication, advertisement, etc."
                          />
                        </ListItem>
                        <ListItem>
                          <ListItemText
                            primary="INVOICE"
                            secondary="for your invoice contact, usually your billing address. Mandatory in France when you buy online."
                          />
                        </ListItem>
                        <ListItem>
                          <ListItemText
                            primary="STANDARD WITHOUT TRANSMISSION"
                            secondary="is standard contact not shared with third parties outside of Amadeus."
                          />
                        </ListItem>
                      </List>
                    </Popover>
                    <Typography variant="h6" gutterBottom>
                      Address Information
                    </Typography>
                    <Grid container spacing={2}>
                      <Grid item xs={12}>
                        <FastField
                          name="addressLineOne"
                          as={TextField}
                          label="Address Line 1"
                          variant="outlined"
                          fullWidth
                          error={
                            touched.addressLineOne &&
                            Boolean(errors.addressLineOne)
                          }
                          helperText={<ErrorMessage name="addressLineOne" />}
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <FastField
                          name="addressLineTwo"
                          as={TextField}
                          label="Address Line 2"
                          variant="outlined"
                          fullWidth
                          error={
                            touched.addressLineTwo &&
                            Boolean(errors.addressLineTwo)
                          }
                          helperText={<ErrorMessage name="addressLineTwo" />}
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <FastField
                          name="cityName"
                          as={TextField}
                          label="City"
                          variant="outlined"
                          fullWidth
                          error={touched.cityName && Boolean(errors.cityName)}
                          helperText={<ErrorMessage name="cityName" />}
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <FastField
                          name="stateName"
                          as={TextField}
                          label="State"
                          variant="outlined"
                          fullWidth
                          error={touched.stateName && Boolean(errors.stateName)}
                          helperText={<ErrorMessage name="stateName" />}
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <FastField
                          name="countryCode"
                          as={TextField}
                          label="Country e.g: AU"
                          variant="outlined"
                          fullWidth
                          error={
                            touched.countryCode && Boolean(errors.countryCode)
                          }
                          helperText={<ErrorMessage name="countryCode" />}
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <FastField
                          name="postalCode"
                          as={TextField}
                          label="Postal Code"
                          variant="outlined"
                          fullWidth
                          error={
                            touched.postalCode && Boolean(errors.postalCode)
                          }
                          helperText={<ErrorMessage name="postalCode" />}
                        />
                      </Grid>
                    </Grid>
                  </>
                ))}
            </CardContent>
          </Card>
          <LoadingButton
            type="submit"
            fullWidth
            loading={isSubmitting}
            loadingPosition="start"
            startIcon={<Iconify icon={"mdi:flight"} width={20} height={20} />}
            size="large"
            variant="contained"
            color="primary"
          >
            {isSubmitting ? "Booking..." : "Book"}
          </LoadingButton>
        </Form>
      )}
    </Formik>
  );
};

export default FlightBookingForm;
