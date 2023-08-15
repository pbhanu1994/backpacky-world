import React, { useState } from "react";
import { useDispatch } from "react-redux";
import NextLink from "next/link";
import {
  Avatar,
  Button,
  CssBaseline,
  TextField,
  InputAdornment,
  IconButton,
  FormControlLabel,
  Checkbox,
  Grid,
  Link,
  Box,
  Typography,
  Container,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";
import {
  LockOutlined as LockOutlinedIcon,
  Visibility,
  VisibilityOff,
  Create as SignUpIcon,
} from "@mui/icons-material";
import { useFormik, Form, FormikProvider } from "formik";
import * as Yup from "yup";
import _ from "lodash";
import { AuthSocial } from "../../molecules/AuthSocial";
import { Copyright } from "../../atoms/Copyright";
import signUpUser from "../../../store/actions/auth/signUpUser";
import { signUpStyles, Paper } from "./signUpStyles";

export default function SignUp() {
  const [showPassword, setShowPassword] = useState(false);
  const [showLoadingButton, setShowLoadingButton] = useState(false);
  const dispatch = useDispatch();
  const classes = signUpStyles();

  // Validation Schema
  const signUpSchema = Yup.object().shape({
    firstName: Yup.string()
      .min(2, "Too Short!")
      .max(50, "Too Long!")
      .required("First name required"),
    lastName: Yup.string()
      .min(2, "Too Short!")
      .max(50, "Too Long!")
      .required("Last name required"),
    email: Yup.string()
      .email("Email must be a valid email address")
      .required("Email is required"),
    password: Yup.string().required("Password is required"),
  });

  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
    },
    validationSchema: signUpSchema,
    onSubmit: async (values) => {
      const { firstName, lastName, email, password } = values;

      if (_.isEmpty(errors)) {
        setShowLoadingButton(true);

        const result = await dispatch(
          signUpUser(email, password, firstName, lastName)
        );
        result === "error" && setShowLoadingButton(false);
      }
    },
  });

  const { errors, touched, handleSubmit, isSubmitting, getFieldProps } = formik;

  // TODO: Set Loading 3 dots... while submitting
  return (
    <Container component="main" style={classes.root}>
      <CssBaseline />
      <Paper>
        <Grid container direction="column" alignItems="center">
          <Avatar sx={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Create Account
          </Typography>
        </Grid>
        <AuthSocial />
        <FormikProvider value={formik}>
          <Form
            style={{ width: "100%", marginTop: 24 }}
            autoComplete="off"
            noValidate
            onSubmit={handleSubmit}
          >
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="fname"
                  name="firstName"
                  required
                  fullWidth
                  variant="outlined"
                  id="firstName"
                  label="First Name"
                  {...getFieldProps("firstName")}
                  autoFocus
                  error={Boolean(touched.firstName && errors.firstName)}
                  helperText={touched.firstName && errors.firstName}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  variant="outlined"
                  id="lastName"
                  label="Last Name"
                  {...getFieldProps("lastName")}
                  name="lastName"
                  autoComplete="lname"
                  error={Boolean(touched.lastName && errors.lastName)}
                  helperText={touched.lastName && errors.lastName}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  variant="outlined"
                  id="email"
                  label="Email Address"
                  {...getFieldProps("email")}
                  name="email"
                  autoComplete="email"
                  error={Boolean(touched.email && errors.email)}
                  helperText={touched.email && errors.email}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  variant="outlined"
                  name="password"
                  label="Password"
                  {...getFieldProps("password")}
                  type={showPassword ? "text" : "password"}
                  id="password"
                  autoComplete="current-password"
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={() => setShowPassword(!showPassword)}
                          onMouseDown={(e) => e.preventDefault()}
                        >
                          {showPassword ? <Visibility /> : <VisibilityOff />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                  error={Boolean(touched.password && errors.password)}
                  helperText={touched.password && errors.password}
                />
              </Grid>
              <Grid item xs={12}>
                <FormControlLabel
                  control={
                    <Checkbox value="allowExtraEmails" color="primary" />
                  }
                  label="I want to receive updates via email."
                />
              </Grid>
            </Grid>
            {showLoadingButton ? (
              <LoadingButton
                fullWidth
                loading
                size="large"
                loadingPosition="start"
                variant="contained"
                sx={classes.submit}
                startIcon={<SignUpIcon />}
              >
                Signing up...
              </LoadingButton>
            ) : (
              <Button
                type="submit"
                fullWidth
                size="large"
                variant="contained"
                color="primary"
                sx={classes.submit}
              >
                Sign Up
              </Button>
            )}
            <Grid container justifyContent="flex-end">
              <Grid item>
                Already have an account?{" "}
                <NextLink href="/signin" shallow>
                  <Typography variant="body2" component={Link}>
                    Sign in
                  </Typography>
                </NextLink>
              </Grid>
            </Grid>
          </Form>
        </FormikProvider>
      </Paper>
      <Box mt={5}>
        <Copyright />
      </Box>
    </Container>
  );
}
