import { useDispatch } from "react-redux";
import * as Yup from "yup";
import PropTypes from "prop-types";
import { Form, FormikProvider, useFormik } from "formik";
import { TextField, Alert, Stack } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import useIsMountedRef from "/src/hooks/useIsMountedRef";
import resetPassword from "../../../store/actions/auth/resetPassword";

export const ResetPasswordForm = ({
  onSent,
  onGetEmail,
  showLoadingButton,
  onHandleLoadingButton,
}) => {
  const dispatch = useDispatch();
  const isMountedRef = useIsMountedRef();

  const ResetPasswordSchema = Yup.object().shape({
    email: Yup.string()
      .email("Email must be a valid email address")
      .required("Email is required"),
  });

  const formik = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema: ResetPasswordSchema,
    onSubmit: async (values, { setErrors, setSubmitting }) => {
      const { email } = values;

      try {
        if (_.isEmpty(errors)) {
          onHandleLoadingButton(true);

          const result = await dispatch(resetPassword(email));
          if (isMountedRef.current && result === "success") {
            onSent();
            onGetEmail(formik.values.email);
            setSubmitting(false);
          }

          result === "error" && onHandleLoadingButton(false);
        }
      } catch (error) {
        console.error(error);
        if (isMountedRef.current) {
          setErrors({ afterSubmit: error.message });
          setSubmitting(false);
        }
      }
    },
  });

  const { errors, touched, isSubmitting, handleSubmit, getFieldProps } = formik;

  return (
    <FormikProvider value={formik}>
      <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
        <Stack spacing={3}>
          {errors.afterSubmit && (
            <Alert severity="error">{errors.afterSubmit}</Alert>
          )}

          <TextField
            fullWidth
            {...getFieldProps("email")}
            type="email"
            label="Email address"
            autoFocus
            error={Boolean(touched.email && errors.email)}
            helperText={touched.email && errors.email}
          />

          {showLoadingButton ? (
            <LoadingButton
              fullWidth
              loading
              size="large"
              loadingPosition="start"
              variant="contained"
              style={{ borderRadius: "8px" }}
            >
              Sending email...
            </LoadingButton>
          ) : (
            <LoadingButton
              fullWidth
              size="large"
              type="submit"
              variant="contained"
              loading={isSubmitting}
            >
              Reset Password
            </LoadingButton>
          )}
        </Stack>
      </Form>
    </FormikProvider>
  );
};

ResetPasswordForm.propTypes = {
  onSent: PropTypes.func,
  onGetEmail: PropTypes.func,
};
