import React, { useState } from "react";
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
} from "@material-ui/core";
import { useRouter } from "next/router";
import {
  LockOutlined as LockOutlinedIcon,
  Visibility,
  VisibilityOff,
} from "@material-ui/icons";
import Joi from "joi-browser";
import firebase from "firebase/app";
import "firebase/auth";
import { validate, validateProperty } from "../../../helpers/validate";
import { Toast } from "../../atoms/Toast";
import { Copyright } from "../../atoms/Copyright";
import { signUpStyles } from "./signUpStyles";

export default function SignUp() {
  const [userDetails, setUserDetails] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [toast, setToast] = useState({
    open: false,
    color: "error",
    message: "",
  });
  const classes = signUpStyles();
  const router = useRouter();

  // Validation Schema
  const schema = {
    firstName: Joi.string().required().label("First Name"),
    lastName: Joi.string().required().label("Last Name"),
    email: Joi.string().email().required().label("Email"),
    password: Joi.string().min(5).required().label("Password"),
  };

  const handleUserDetails = ({ currentTarget }) => {
    // Validating the field
    const errorMessage = validateProperty(
      schema,
      currentTarget.name,
      currentTarget.value
    );

    setErrors({
      ...errors,
      [currentTarget.name]: errorMessage && errorMessage,
    });

    setUserDetails({
      ...userDetails,
      [currentTarget.name]: currentTarget.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { firstName, email, password } = userDetails;

    const resultError = validate(userDetails, schema);
    resultError && setErrors(resultError);

    if (resultError === null) {
      setErrors({});

      try {
        const { user } = await firebase
          .auth()
          .createUserWithEmailAndPassword(email, password);
        await user.updateProfile({ displayName: firstName });

        window.location.href = `${user && "/home"}`;
      } catch (err) {
        console.log("Error Signing up", err);
        setToast({
          ...toast,
          open: true,
          color: "error",
          message: err.message,
        });
      }
    }
  };

  // On Toast Close
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setToast({ ...toast, open: false, message: "" });
  };

  // TODO: Set Loading 3 dots... while submitting
  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Toast
        toastOpen={toast.open}
        toastColor={toast.color}
        toastMessage={toast.message}
        onHandleClose={handleClose}
      />
      <div className={classes.paper}>
        <Grid container direction="column" alignItems="center">
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Create Account
          </Typography>
        </Grid>
        <form className={classes.form} noValidate onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="fname"
                name="firstName"
                onChange={(e) => handleUserDetails(e)}
                required
                fullWidth
                id="firstName"
                label="First Name"
                autoFocus
                error={errors["firstName"]}
                helperText={errors["firstName"]}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                onChange={(e) => handleUserDetails(e)}
                required
                fullWidth
                id="lastName"
                label="Last Name"
                name="lastName"
                autoComplete="lname"
                error={errors["lastName"]}
                helperText={errors["lastName"]}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                onChange={(e) => handleUserDetails(e)}
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                error={errors["email"]}
                helperText={errors["email"]}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                onChange={(e) => handleUserDetails(e)}
                required
                fullWidth
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
                error={errors["password"]}
                helperText={errors["password"]}
              />
            </Grid>
            <Grid item xs={12}>
              <FormControlLabel
                control={<Checkbox value="allowExtraEmails" color="primary" />}
                label="I want to receive updates via email."
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            size="large"
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Sign Up
          </Button>
          <Grid container justify="flex-end">
            <Grid item>
              Already have an account?{" "}
              <Link href="/signin" variant="body2">
                Sign in
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={5}>
        <Copyright />
      </Box>
    </Container>
  );
}
