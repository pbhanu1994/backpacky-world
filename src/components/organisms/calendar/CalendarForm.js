import React from "react";
import PropTypes from "prop-types";
import * as Yup from "yup";
import dayjs from "dayjs";
import { merge } from "lodash";
import { Icon } from "@iconify/react";
import trash2Fill from "@iconify/icons-eva/trash-2-fill";
import { useFormik, Form, FormikProvider } from "formik";
import {
  Box,
  Stack,
  Button,
  Switch,
  Tooltip,
  TextField,
  IconButton,
  DialogActions,
  FormControlLabel,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { MobileDateTimePicker } from "@mui/x-date-pickers/MobileDateTimePicker";
import { useDispatch } from "react-redux";
import ColorSinglePicker from "/src/components/atoms/ColorSinglePicker";
import createEvent from "/src/store/actions/calendar/createEvent";
import updateEvent from "/src/store/actions/calendar/updateEvent";
import deleteEvent from "/src/store/actions/calendar/deleteEvent";
import setAndShowSuccessToast from "/src/store/actions/config/toast/setAndShowSuccessToast";

const COLOR_OPTIONS = [
  "#00AB55", // theme.palette.primary.main,
  "#1890FF", // theme.palette.info.main,
  "#94D82D", // theme.palette.success.main,
  "#FFC107", // theme.palette.warning.main,
  "#FF4842", // theme.palette.error.main
  "#04297A", // theme.palette.info.darker
  "#7A0C2E", // theme.palette.error.darker
];

const getInitialValues = (event, range) => {
  const _event = {
    title: "",
    description: "",
    textColor: "#1890FF",
    allDay: false,
    start: range ? new Date(range.start) : new Date(),
    end: range ? new Date(range.end) : new Date(),
  };

  if (event || range) {
    return merge({}, _event, event);
  }

  return _event;
};

CalendarForm.propTypes = {
  event: PropTypes.object,
  range: PropTypes.object,
  onCancel: PropTypes.func,
};

export default function CalendarForm({ event, range, onCancel }) {
  const dispatch = useDispatch();
  const isCreating = !event;

  const EventSchema = Yup.object().shape({
    title: Yup.string().max(255).required("Title is required"),
    description: Yup.string().max(5000),
    end: Yup.date().when(
      "start",
      (start, schema) =>
        start && schema.min(start, "End date must be later than start date")
    ),
    start: Yup.date(),
  });

  const formik = useFormik({
    initialValues: getInitialValues(event, range),
    validationSchema: EventSchema,
    onSubmit: async (values, { resetForm, setSubmitting }) => {
      try {
        const newEvent = {
          title: values.title,
          description: values.description,
          textColor: values.textColor,
          allDay: values.allDay,
          start: values.start,
          end: values.end,
        };
        if (event) {
          dispatch(updateEvent(event.id, newEvent));
          dispatch(setAndShowSuccessToast("Event updated successfully!"));
        } else {
          dispatch(createEvent(newEvent));
          dispatch(setAndShowSuccessToast("Event created successfully!"));
        }
        resetForm();
        onCancel();
        setSubmitting(false);
      } catch (error) {
        console.error(error);
      }
    },
  });

  const {
    values,
    errors,
    touched,
    handleSubmit,
    isSubmitting,
    getFieldProps,
    setFieldValue,
  } = formik;

  const handleDelete = async () => {
    try {
      onCancel();
      dispatch(deleteEvent(event.id));
      dispatch(setAndShowSuccessToast("Event deleted successfully!"));
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <FormikProvider value={formik}>
      <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
        <Stack spacing={3} sx={{ p: 3 }}>
          <TextField
            fullWidth
            label="Title"
            {...getFieldProps("title")}
            error={Boolean(touched.title && errors.title)}
            helperText={touched.title && errors.title}
          />

          <TextField
            fullWidth
            multiline
            maxRows={4}
            label="Description"
            {...getFieldProps("description")}
            error={Boolean(touched.description && errors.description)}
            helperText={touched.description && errors.description}
          />

          <FormControlLabel
            control={
              <Switch checked={values.allDay} {...getFieldProps("allDay")} />
            }
            label="All day"
          />

          <MobileDateTimePicker
            label="Start date"
            value={dayjs(values.start)}
            format="DD/MM/YYYY hh:mm a"
            onChange={(date) => setFieldValue("start", new Date(date))}
          />

          <MobileDateTimePicker
            label="End date"
            value={dayjs(values.end)}
            format="DD/MM/YYYY hh:mm a"
            onChange={(date) => setFieldValue("end", new Date(date))}
            sx={{ mb: 3 }}
          />

          <ColorSinglePicker
            {...getFieldProps("textColor")}
            colors={COLOR_OPTIONS}
          />
        </Stack>

        <DialogActions>
          {!isCreating && (
            <Tooltip title="Delete Event">
              <IconButton onClick={handleDelete}>
                <Icon icon={trash2Fill} width={20} height={20} />
              </IconButton>
            </Tooltip>
          )}
          <Box sx={{ flexGrow: 1 }} />
          <Button
            type="button"
            variant="outlined"
            color="inherit"
            onClick={onCancel}
          >
            Cancel
          </Button>
          <LoadingButton
            type="submit"
            variant="contained"
            loading={isSubmitting}
            loadingIndicator="Loading..."
          >
            Add
          </LoadingButton>
        </DialogActions>
      </Form>
    </FormikProvider>
  );
}
