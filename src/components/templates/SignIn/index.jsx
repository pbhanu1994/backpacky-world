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
} from "@material-ui/core";
import { useRouter } from "next/router";
import {
  LockOutlined as LockOutlinedIcon,
  Visibility,
  VisibilityOff,
} from "@material-ui/icons";
import { useFormik, Form, FormikProvider } from "formik";
import * as Yup from "yup";
import _ from "lodash";
import { signInWithEmailAndPassword } from "../../../handlers/auth";
import { AuthSocial } from "../../molecules/AuthSocial";
import { Toast } from "../../atoms/Toast";
import { Copyright } from "../../atoms/Copyright";
import setAndShowToastMessage from "../../../store/actions/config/setAndShowToastMessage";
import { signInStyles } from "./signInStyles";

export default function SignIn() {
  const [showPassword, setShowPassword] = useState(false);
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
        try {
          await signInWithEmailAndPassword(email, password);
        } catch (err) {
          console.log("Error Signing in", err);
          dispatch(setAndShowToastMessage(true, "error", err.message));
        }
      }
    },
  });

  const { errors, touched, values, isSubmitting, handleSubmit, getFieldProps } =
    formik;

  // TODO: Set Loading 3 dots... while submitting
  return (
    <Container component="main" className={classes.root}>
      <CssBaseline />
      <Toast />
      <div className={classes.paper}>
        <Grid container direction="column" alignItems="center">
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Welcome
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
