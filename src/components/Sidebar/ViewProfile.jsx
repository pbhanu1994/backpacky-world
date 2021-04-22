import React from "react";
import { useRouter } from 'next/router';
import { Avatar, Paper, Grid, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
    root: {
      borderRadius: 20,
      padding: "0.6rem",
      cursor: "pointer"
    },
    profileName: {
        lineHeight: 1
    }
  }));

  export default function Sidebar() {
    const router = useRouter();
    const classes = useStyles();

      return (
        <Paper variant="outlined" onClick={() => router.push('/profile')} classes={{ root: classes.root }}>
            <Grid container alignItems="center" spacing={2}>
                <Grid item>
                    <Avatar alt="Remy Sharp" src="https://material-ui.com/static/images/avatar/1.jpg" className={classes.large} />
                </Grid>
                <Grid item>
                    <Typography variant="h6" className={classes.profileName}>
                        Bhanu Prakash
                    </Typography>
                    <Typography variant="caption" color="textSecondary">
                        pbhanu.1994@gmail.com
                    </Typography>
                </Grid>
            </Grid>
        </Paper>
    )
  }