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
  Link,
  Grid,
  Box,
  Typography,
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
import { PAGE_PATH } from "/src/constants/navigationConstants";
import signInUser from "../../../store/actions/auth/signInUser";
import { signInStyles, Paper } from "./signInStyles";

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
    <Container component="main" style={classes.root}>
      <CssBaseline />
      <Paper>
        <Grid container direction="column" alignItems="center">
          <Avatar sx={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Welcome Back
          </Typography>
        </Grid>
        <AuthSocial />
        <FormikProvider value={formik}>
          <Form
            style={{ width: "100%", marginTop: 8 }}
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
                sx={classes.submit}
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
                sx={classes.submit}
                startIcon={<LoginIcon />}
              >
                Signing in...
              </LoadingButton>
            )}
            <Grid container>
              <Grid item xs>
                <NextLink href={PAGE_PATH.RESET_PASSWORD} shallow>
                  <Typography variant="body2" component={Link}>
                    Forgot password?
                  </Typography>
                </NextLink>
              </Grid>
              <Grid item>
                Don't have an account?{" "}
                <NextLink href="/signup" shallow>
                  <Typography variant="body2" component={Link}>
                    Sign Up
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
