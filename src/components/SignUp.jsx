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
    Snackbar,
    Slide,
    Container
} from '@material-ui/core';
import { useRouter } from 'next/router';
import { makeStyles } from '@material-ui/core/styles';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import firebaseClient from '../firebaseClient';
import firebase from 'firebase/app';
import 'firebase/auth';
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
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function SignUp() {
    firebaseClient();
    const [userDetails, setUserDetails] = useState({});
    const [validateUser, setValidateUser] = useState("");
    const [open, setOpen] = useState(false);
    const classes = useStyles();
    const router = useRouter();

    const handleUserDetails = ({currentTarget}) => {
        setUserDetails({ ...userDetails, [currentTarget.name]: currentTarget.value });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const { firstName, email, password } = userDetails;

        try {
            const { user } = await firebase.auth().createUserWithEmailAndPassword(email, password);
            await user.updateProfile({ displayName: firstName });
            user && router.push('/');
        } catch (err) {
            console.log('Error Signing up', err);
            setValidateUser(err.message);
        }
    }

    return (
    <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
            <Grid container direction="column" alignItems="center">
                <Avatar className={classes.avatar}>
                <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                Sign up
                </Typography>
            </Grid>
        <form className={classes.form} noValidate onSubmit={handleSubmit}>
            <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
                <TextField
                autoComplete="fname"
                name="firstName"
                onChange={e => handleUserDetails(e)}
                required
                fullWidth
                id="firstName"
                label="First Name"
                autoFocus
                />
            </Grid>
            <Grid item xs={12} sm={6}>
                <TextField
                onChange={e => handleUserDetails(e)}
                required
                fullWidth
                id="lastName"
                label="Last Name"
                name="lastName"
                autoComplete="lname"
                />
            </Grid>
            <Grid item xs={12}>
                <TextField
                onChange={e => handleUserDetails(e)}
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                />
            </Grid>
            <Grid item xs={12}>
                <TextField
                onChange={e => handleUserDetails(e)}
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
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
                <Link href="#" variant="body2">
                Already have an account? Sign in
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