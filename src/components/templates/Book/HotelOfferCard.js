import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useSelector, useDispatch } from "react-redux";
import creditCardType from "credit-card-type";
import _ from "lodash";
import { ref, listAll, getDownloadURL } from "firebase/storage";
import { Grid, Card, useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { LoadingButton } from "@mui/lab";
import { useFormik, Form, FormikProvider } from "formik";
import * as Yup from "yup";
import { storage } from "../../../handlers/firebaseClient";
import Iconify from "../../atoms/Iconify";
import SearchMap from "../../atoms/SearchMap";
import { HotelInfo } from "./HotelInfo";
import { HotelGuestForm } from "./HotelGuestForm";
import { RoomAllocation } from "./RoomAllocation";
import { RoomSpecialRequests } from "./RoomsSpecialRequests";
import CardDetailsForm from "./CardDetailsForm";
import { hotelBookingConfirmationDocument } from "./hotelBookingConfirmationDocument";
import { hotelBookingConfirmationEmailbody } from "./hotelBookingConfirmationEmailBody";
import { hotelBookingConfirmationSMSBody } from "./hotelBookingConfirmationSMSBody";
import { PAGE_PATH } from "../../../constants/navigationConstants";
import { generatePdfAndStore } from "../../../helpers/generatePdfAndStore";
import { getCardIssuerCode } from "../../../utils/getCardIssuerCode";
import { convertToYYYYMM } from "../../../utils/convertToYYYYMM";
import {
  formatCardNumber,
  formatExpiryDate,
} from "../../../utils/formatPaymentDetails";
import addHotelBooking from "../../../store/actions/book/hotels/bookings/addHotelBooking";
import sendHotelBookingConfirmationEmail from "../../../store/actions/book/hotels/bookings/sendHotelBookingConfirmationEmail";
import sendHotelBookingConfirmationSMS from "../../../store/actions/book/hotels/bookings/sendHotelBookingConfirmationSMS";
import setAndShowErrorToast from "../../../store/actions/config/toast/setAndShowErrorToast";
import { performHotelBooking } from "../../../services/hotel/hotelBooking";

const HotelOfferCard = ({ selectedHotel, offer }) => {
  const [showAdditionalGuests, setShowAdditionalGuests] = useState(false);
  const [formattedCardNumber, setFormattedCardNumber] = useState("");
  const [formattedExpiryDate, setFormattedExpiryDate] = useState("");
  const [cardType, setCardType] = useState(null);
  const [hotelBookLoading, setHotelBookLoading] = useState(false);
  const [imageData, setImageData] = useState({});

  const router = useRouter();
  const dispatch = useDispatch();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const { uid } = useSelector((state) => state.auth.user);

  const { offers } = offer;
  const { checkInDate, checkOutDate, price, roomQuantity = 1 } = offers[0];

  const { hotelId, name, latitude, longitude } = selectedHotel;
  const places = [{ ...selectedHotel }];

  const isEmptySelectedHotel = _.isEmpty(selectedHotel);

  const numOfGuests = offers[0]?.guests?.adults;

  const canAssignGuestIds = numOfGuests > roomQuantity;

  // Getting all the images for booking confirmation PDF
  useEffect(() => {
    // Reference to the images in Firebase Storage
    const imagesRef = ref(
      storage,
      "backpacky/assets/images/hotel-booking-confirmation-pdf"
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
        console.log("error", error);
      });
  }, []);

  // Validation Schema
  // Guest Schema
  const baseGuestSchema = Yup.object({
    name: Yup.object({
      title: Yup.string().required("Title is required"),
      firstName: Yup.string().required("First Name is required"),
      lastName: Yup.string().required("Last Name is required"),
    }),
    contact: Yup.object({
      email: Yup.string()
        .email("Email must be a valid email address")
        .required("Email is required"),
      phone: Yup.string().required("Phone is required"),
    }),
  });
  // Payment Schema
  const basePaymentSchema = Yup.object({
    method: Yup.string().required("Payment Method is required"),
    card: Yup.object({
      vendorCode: Yup.string().required("Card Type is required"),
      cardNumber: Yup.string().required("Card Number is required"),
      expiryDate: Yup.string().required("Expiration Date is required"),
    }),
  });

  // Base schema for room without guestIds
  const specialRequestsSchema = Yup.object({
    specialRequest: Yup.string(),
  });

  const generateGuestRoomsValidationSchema = (originalValue) => {
    const guests = originalValue?.guests;
    const guestRooms = originalValue?.guestRooms;

    if (
      roomQuantity > 1 &&
      canAssignGuestIds &&
      guests?.length > roomQuantity
    ) {
      const selectedRooms = Object.values(guestRooms || {});
      const errors = Array.from({ length: roomQuantity })
        .map((_, index) =>
          !selectedRooms.includes(index + 1) ? index + 1 : undefined
        )
        .filter((value) => value !== undefined);

      const validationSchema = errors.reduce((schema, roomNumber) => {
        return {
          ...schema,
          [`room${roomNumber}`]: Yup.string().required(
            `Room ${roomNumber} must be selected`
          ),
        };
      }, {});

      return Yup.object().shape(validationSchema);
    }

    return Yup.object();
  };

  const hotelBookingSchema = Yup.object({
    offerId: Yup.string().required("Offer ID is required"),
    guests: Yup.array().of(baseGuestSchema),
    payments: Yup.array().of(basePaymentSchema),
    specialRequests: Yup.array().of(specialRequestsSchema),
    guestRooms: Yup.lazy((value, { originalValue }) =>
      generateGuestRoomsValidationSchema(originalValue)
    ),
  });

  const formik = useFormik({
    initialValues: {
      offerId: offer?.offers[0]?.id,
      guests: [
        {
          name: {
            title: "Mr",
            firstName: "",
            lastName: "",
          },
          contact: {
            phone: "",
            email: "",
          },
        },
      ],
      payments: [
        {
          method: "creditCard",
          card: {
            vendorCode: "",
            cardNumber: "",
            expiryDate: "",
          },
        },
      ],
      specialRequests: [],
      guestRooms: {},
    },
    validationSchema: hotelBookingSchema,
    onSubmit: async (values) => {
      const {
        guests: hotelGuests,
        payments,
        specialRequests,
        guestRooms,
      } = values;

      if (_.isEmpty(errors)) {
        setHotelBookLoading(true);

        // Generating Ids for each object
        const updatedHotelGuests = hotelGuests.map((item, guestIndex) => ({
          ...item,
          id: guestIndex + 1,
        }));

        const groupedGuestRooms = Object.entries(guestRooms).reduce(
          (acc, [key, value]) => {
            acc[value] = acc[value] || [];
            acc[value].push(parseInt(key));
            return acc;
          },
          {}
        );

        // Assigning special requests,
        // guestIds if canAssignGuestIds is true && hotelGuests > roomQuantity
        const updatedRooms = Array.from({ length: roomQuantity }).map(
          (room, roomIndex) => ({
            specialRequest: specialRequests[roomIndex]?.specialRequest
              ? specialRequests[roomIndex].specialRequest
              : undefined,
            guestIds:
              canAssignGuestIds && hotelGuests.length > roomQuantity
                ? roomQuantity === 1
                  ? Array.from(
                      { length: hotelGuests.length },
                      (_, index) => index + 1
                    )
                  : groupedGuestRooms[roomIndex + 1]
                : undefined,
          })
        );

        const hotelDetails = {
          hotelId,
          name,
          checkInDate,
          checkOutDate,
          price: {
            currency: price.currency,
            total: price.total,
          },
        };

        const hotelBookingData = {
          data: {
            offerId: offer?.offers[0]?.id,
            guests: updatedHotelGuests,
            payments,
            rooms: updatedRooms,
          },
        };

        try {
          const { data: successHotelBookingResult } = await performHotelBooking(
            dispatch,
            hotelBookingData
          );

          /* Remove later - uncomment below for testing purposes */
          // const successHotelBookingResult = [
          //   {
          //     type: "hotel-booking",
          //     providerConfirmationId: "92416788",
          //     associatedRecords: [
          //       {
          //         reference: "UF36REC",
          //         originSystemCode: "GDS",
          //       },
          //     ],
          //     id: "SC_92416788",
          //   },
          //   {
          //     type: "hotel-booking",
          //     providerConfirmationId: "92416789",
          //     associatedRecords: [
          //       {
          //         reference: "UF36REC",
          //         originSystemCode: "GDS",
          //       },
          //     ],
          //     id: "SC_92416789",
          //   },
          // ];

          // AMADEUS REFERENCE (ID) FOR BOOKING
          const reference =
            successHotelBookingResult[0].associatedRecords[0].reference;

          if (reference) {
            const storagePath = `documents/${uid}/hotelBookings`;
            const fileName = `hotel-booking-${reference}.pdf`;

            const pdfContent = hotelBookingConfirmationDocument(
              successHotelBookingResult,
              hotelDetails,
              updatedHotelGuests,
              payments,
              updatedRooms,
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
              bookingConfirmation: successHotelBookingResult,
              hotelDetails,
              download: {
                fileName,
                downloadURL,
              },
              ...hotelBookingData.data,
            };

            dispatch(addHotelBooking(bookingInfo, downloadURL));

            // Sending Booking Confirmation Emails for each guest
            updatedHotelGuests.forEach((guest) => {
              const emailBodyContent = hotelBookingConfirmationEmailbody(
                guest,
                successHotelBookingResult,
                hotelDetails,
                updatedHotelGuests,
                payments,
                updatedRooms,
                theme
              );
              const SMSBodyContent = hotelBookingConfirmationSMSBody(
                guest.name.firstName,
                reference,
                hotelDetails,
                downloadURL
              );
              // Sending EMAIL
              dispatch(
                sendHotelBookingConfirmationEmail(
                  reference,
                  emailBodyContent,
                  guest,
                  downloadURL
                )
              );
              // Sending SMS
              dispatch(
                sendHotelBookingConfirmationSMS(
                  guest.contact.phone,
                  SMSBodyContent,
                  downloadURL
                )
              );
            });

            router.push(`${PAGE_PATH.BOOK_HOTELS_CONFIRMATION}${reference}`);
          }
        } catch (err) {
          console.log("error", err);
          setHotelBookLoading(false);
          dispatch(setAndShowErrorToast(err.message));
        }
      }
    },
  });

  const {
    setFieldValue,
    handleChange,
    values,
    errors,
    touched,
    handleBlur,
    handleSubmit,
  } = formik;

  const hotelGuests = values.guests;
  const specialRequests = values.specialRequests;
  const payments = values.payments;
  const guestRooms = values.guestRooms;

  const handleTitleChange = (e, guestNumber) => {
    const name = `guests[${guestNumber}].name.title`;
    setFieldValue(name, e.target.value);
  };

  const handleFirstNameChange = (e, guestNumber) => {
    const name = `guests[${guestNumber}].name.firstName`;
    setFieldValue(name, e.target.value);
  };

  const handleLastNameChange = (e, guestNumber) => {
    const name = `guests[${guestNumber}].name.lastName`;
    setFieldValue(name, e.target.value);
  };

  const handleEmailChange = (e, guestNumber) => {
    const name = `guests[${guestNumber}].contact.email`;
    setFieldValue(name, e.target.value);
  };

  const handlePhoneChange = (e, guestNumber) => {
    const name = `guests[${guestNumber}].contact.phone`;
    setFieldValue(name, e.target.value);
  };

  const handleAddAdditionalGuests = (addOne = false) => {
    setShowAdditionalGuests(true);
    const additionalGuestName = {
      name: {
        title: "Mr", // Default title
        firstName: "",
        lastName: "",
      },
      contact: {
        phone: "",
        email: "",
      },
    };

    // Create an array with numOfGuests copies of the initialGuest
    const additionalGuests = Array.from({ length: numOfGuests - 1 }, () => ({
      ...additionalGuestName,
    }));

    if (addOne) {
      setFieldValue("guests", [...hotelGuests, additionalGuestName]);
    } else {
      setFieldValue("guests", [...hotelGuests, ...additionalGuests]);
    }
  };

  const handleRemoveHotelGuest = (guestNumber) => {
    if (hotelGuests.length > 1) {
      setFieldValue(
        "guests",
        hotelGuests.filter((_, i) => i !== guestNumber)
      );
    }
  };

  const handleRoomChange = (guestId, newRoom) => {
    // Assigning {guestId: roomId}
    setFieldValue("guestRooms", {
      ...guestRooms,
      [guestId]: newRoom,
    });
  };

  const handleAddSpecialRequests = (addOne = false) => {
    const addSpecialRequest = {
      specialRequest: "",
    };

    const addSpecialRequests = Array.from({ length: roomQuantity }, () => ({
      ...addSpecialRequest,
    }));

    if (addOne) {
      setFieldValue("specialRequests", [...specialRequests, addSpecialRequest]);
    } else {
      setFieldValue("specialRequests", [
        ...specialRequests,
        ...addSpecialRequests,
      ]);
    }
  };

  const handleSpecialRequestChange = (e, roomIndex) => {
    const name = `specialRequests[${roomIndex}].specialRequest`;
    setFieldValue(name, e.target.value);
  };

  const handleRemoveSpecialRequest = (specialRequestIndex) => {
    setFieldValue(
      "specialRequests",
      specialRequests.filter((_, i) => i !== specialRequestIndex)
    );
  };

  const handleCardNumberChange = (e) => {
    const { name, value } = e.target;

    // Allow only numbers by removing non-numeric characters
    const valueWithNonNumericChars = value.replace(/\D/g, "");

    if (name === "cardNumber") {
      const cardType = creditCardType(valueWithNonNumericChars);
      valueWithNonNumericChars === ""
        ? setCardType(null)
        : setCardType(cardType[0]?.type);

      const cardIssuerCode =
        cardType.length > 0 ? getCardIssuerCode(cardType[0].niceType) : "";

      // Remove spaces from the card number and store it in payments state
      const cardNumberWithoutSpaces = valueWithNonNumericChars.replace(
        /\s/g,
        ""
      );

      setFieldValue("payments", [
        {
          ...payments[0],
          method: "creditCard",
          card: {
            ...payments[0].card,
            vendorCode: cardIssuerCode,
            cardNumber: cardNumberWithoutSpaces,
            expiryDate: payments[0].card.expiryDate,
          },
        },
      ]);

      // Format the card number with spaces and update the state
      setFormattedCardNumber(formatCardNumber(cardNumberWithoutSpaces));
    } else if (name === "expiryDate") {
      // Ensuring the input is exactly 4 digits
      const formattedValue = valueWithNonNumericChars.substring(0, 4);

      const formattedExpiryDate = formatExpiryDate(formattedValue);

      setFieldValue("payments", [
        {
          ...payments[0],
          card: {
            ...payments[0].card,
            [name]: formattedValue ? convertToYYYYMM(formattedExpiryDate) : "",
          },
        },
      ]);

      // Update the state with the formatted expiry date
      setFormattedExpiryDate(formattedExpiryDate);
    }
  };

  return (
    <FormikProvider value={formik}>
      <Form
        style={{ width: "100%", marginTop: 8 }}
        autoComplete="off"
        noValidate
        onSubmit={handleSubmit}
      >
        <Grid container spacing={2}>
          {/* Hotel Description */}
          <HotelInfo offer={offer} />

          {/* Search Map */}
          {!isEmptySelectedHotel && (
            <Grid item xs={12} md={4}>
              <Card
                variant="outlined"
                sx={{ height: !isMobile ? "40%" : "100%" }}
              >
                <SearchMap
                  defaultLatAndLong={{ lat: latitude, lng: longitude }}
                  places={places}
                />
              </Card>
            </Grid>
          )}

          {/* Hotel Guests */}
          <HotelGuestForm
            hotelGuests={hotelGuests}
            numOfGuests={numOfGuests}
            guestRooms={guestRooms}
            roomQuantity={roomQuantity}
            canAssignGuestIds={canAssignGuestIds}
            showAdditionalGuests={showAdditionalGuests}
            errors={errors?.guests}
            touched={touched?.guests}
            handleChange={handleChange}
            handleTitleChange={handleTitleChange}
            handleFirstNameChange={handleFirstNameChange}
            handleLastNameChange={handleLastNameChange}
            handleEmailChange={handleEmailChange}
            handlePhoneChange={handlePhoneChange}
            handleRoomChange={handleRoomChange}
            handleAddAdditionalGuests={handleAddAdditionalGuests}
            handleRemoveHotelGuest={handleRemoveHotelGuest}
          />

          {/* Rooms - Room Allocation */}
          {roomQuantity > 1 &&
            canAssignGuestIds &&
            hotelGuests.length > roomQuantity && (
              <RoomAllocation
                guests={hotelGuests}
                guestRooms={guestRooms}
                roomQuantity={roomQuantity}
                errors={errors?.guestRooms}
                touched={touched?.guestRooms}
                handleRoomChange={handleRoomChange}
                handleBlur={handleBlur}
              />
            )}

          {/* Rooms - Special Requests */}
          <RoomSpecialRequests
            roomQuantity={roomQuantity}
            specialRequests={specialRequests}
            handleAddSpecialRequests={handleAddSpecialRequests}
            handleRemoveSpecialRequest={handleRemoveSpecialRequest}
            handleSpecialRequestChange={handleSpecialRequestChange}
          />

          <Grid item xs={12} md={8}>
            {/* Payment - Card Details */}
            <CardDetailsForm
              cardType={cardType}
              formatCardNumber={formattedCardNumber}
              formattedExpiryDate={formattedExpiryDate}
              errors={errors?.payments}
              touched={touched?.payments}
              handleCardNumberChange={handleCardNumberChange}
            />
            <LoadingButton
              type="submit"
              fullWidth
              loading={hotelBookLoading}
              loadingPosition="start"
              startIcon={
                <Iconify icon={"mdi:hotel-outline"} width={20} height={20} />
              }
              size="large"
              variant="contained"
              color="primary"
              sx={{ mt: 1.5 }}
            >
              {hotelBookLoading ? "Booking..." : "Book"}
            </LoadingButton>
          </Grid>
        </Grid>
      </Form>
    </FormikProvider>
  );
};

export default HotelOfferCard;
