import React, { useState } from "react";
import { useDispatch } from "react-redux";
import {
  Avatar,
  Button,
  CssBaseline,
  TextField,
  InputAdornment,
  IconButton,
  FormControlLabel,
  Checkbox,
  Link,
  Grid,
  Box,
  Typography,
  Divider,
  Container,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";
import {
  LockOutlined as LockOutlinedIcon,
  Visibility,
  VisibilityOff,
  Login as LoginIcon,
} from "@mui/icons-material";
import { useFormik, Form, FormikProvider } from "formik";
import * as Yup from "yup";
import _ from "lodash";
import { AuthSocial } from "../../molecules/AuthSocial";
import { Copyright } from "../../atoms/Copyright";
import signInUser from "../../../store/actions/auth/signInUser";
import { signInStyles } from "./signInStyles";

export default function SignIn() {
  const [showPassword, setShowPassword] = useState(false);
  const [showLoadingButton, setShowLoadingButton] = useState(false);
  const dispatch = useDispatch();
  const classes = signInStyles();

  // Validation Schema
  const signInSchema = Yup.object().shape({
    email: Yup.string()
      .email("Email must be a valid email address")
      .required("Email is required"),
    password: Yup.string().required("Password is required"),
  });

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      remember: true,
    },
    validationSchema: signInSchema,
    onSubmit: async (values) => {
      const { email, password } = values;

      if (_.isEmpty(errors)) {
        setShowLoadingButton(true);

        const result = await dispatch(signInUser(email, password));
        result === "error" && setShowLoadingButton(false);
      }
    },
  });

  const { errors, touched, values, isSubmitting, handleSubmit, getFieldProps } =
    formik;

  return (
    <Container component="main" className={classes.root}>
      <CssBaseline />
      <div className={classes.paper}>
        <Grid container direction="column" alignItems="center">
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Welcome Back
          </Typography>
        </Grid>
        <AuthSocial />
        <FormikProvider value={formik}>
          <Form
            className={classes.form}
            autoComplete="off"
            noValidate
            onSubmit={handleSubmit}
          >
            {/* TODO: Add Icons for Email & Password */}
            <TextField
              margin="normal"
              required
              fullWidth
              variant="outlined"
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              {...getFieldProps("email")}
              error={Boolean(touched.email && errors.email)}
              helperText={touched.email && errors.email}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              variant="outlined"
              name="password"
              label="Password"
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
              {...getFieldProps("password")}
              error={Boolean(touched.password && errors.password)}
              helperText={touched.password && errors.password}
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            {!showLoadingButton && (
              <Button
                type="submit"
                fullWidth
                size="large"
                variant="contained"
                color="primary"
                className={classes.submit}
              >
                Sign In
              </Button>
            )}
            {showLoadingButton && (
              <LoadingButton
                fullWidth
                loading
                size="large"
                loadingPosition="start"
                variant="contained"
                className={classes.submit}
                style={{ borderRadius: "8px" }}
                startIcon={<LoginIcon />}
              >
                Signing in...
              </LoadingButton>
            )}
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                Don't have an account?{" "}
                <Link href="/signup" variant="body2">
                  Sign Up
                </Link>
              </Grid>
            </Grid>
          </Form>
        </FormikProvider>
      </div>
      <Box mt={5}>
        <Copyright />
      </Box>
    </Container>
  );
}
