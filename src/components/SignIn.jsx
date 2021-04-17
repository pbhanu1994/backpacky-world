import React, { useState } from 'react';
import {
  Avatar,
  Button,
  CssBaseline,
  TextField,
  FormControlLabel,
  Checkbox,
  Link,
  Grid,
  Box,
  Typography,
  Container
} from '@material-ui/core';
import { useRouter } from 'next/router';
import { makeStyles } from '@material-ui/core/styles';
import {LockOutlined as LockOutlinedIcon} from '@material-ui/icons';
import Joi from 'joi-browser';
import firebase from 'firebase/app';
import 'firebase/auth';
import { validate, validateProperty } from '../utils/validate';
import Toast from './common/Toast';
import Copyright from './Copyright';

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function SignIn() {
    const [signInDetails, setSignInDetails] = useState({});
    const [validateUser, setValidateUser] = useState("");
    const [errors, setErrors] = useState({});
    const [toast, setToast] = useState({open: false, color: "error", message: ""});
    const classes = useStyles();
    const router = useRouter();

    // Validation Schema
    const schema = {
      email: Joi.string().email().required().label('Email'),
      password: Joi.string().required().label("Password")
    };

    const handleSignInDetails = ({currentTarget}) => {
      // Validating the field
      const errorMessage = validateProperty(
        schema,
        currentTarget.name,
        currentTarget.value
      );

      setErrors({
        ...errors,
        [currentTarget.name]: errorMessage && errorMessage
      });

      setSignInDetails({ ...signInDetails, [currentTarget.name]: currentTarget.value });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const { email, password } = signInDetails;

        const resultError = validate(signInDetails, schema);
        resultError && setErrors(resultError);

        if (resultError === null) {
          setErrors({});

          try {
            const { user } = await firebase.auth().signInWithEmailAndPassword(email, password);
            user && router.push('/home');
          } catch (err) {
              console.log('Error Signing up', err);
              setToast({...toast, open: true, color: "error", message: err.message});
          }
        }

    }

    // On Toast Close
    const handleClose = (event, reason) => {
      if (reason === 'clickaway') {
          return;
      }
  
      setToast({ ...toast, open: false, message: "" });
    };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Toast toastOpen={toast.open} toastColor={toast.color} toastMessage={toast.message} onHandleClose={handleClose} />
      <div className={classes.paper}>
        <Grid container direction="column" alignItems="center">
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        </Grid>
        <form className={classes.form} noValidate onSubmit={handleSubmit}>
          {/* T0-DO Add Icons for Email & Password */}
          <TextField
            onChange={e => handleSignInDetails(e)}
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            error={errors["email"]}
            helperText={errors["email"]}
          />
          <TextField
            onChange={e => handleSignInDetails(e)}
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            error={errors["password"]}
            helperText={errors["password"]}
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
              <Link href="#" variant="body2">
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
  );
}