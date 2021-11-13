import React from "react";
import { useRouter } from "next/router";
import { Avatar, Paper, Grid, Typography } from "@mui/material";
import { PAGE_PATH } from "../../constants/navigationConstants";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    borderRadius: 20,
    padding: "0.6rem",
    cursor: "pointer",
  },
  profileName: {
    lineHeight: 1,
  },
}));

export const ViewProfile = ({
  variant,
  profileAvatar,
  profileName,
  textSecondary,
}) => {
  const router = useRouter();
  const classes = useStyles();

  return (
    <Paper
      elevation={0}
      variant={variant}
      onClick={() => router.push(PAGE_PATH.PROFILE)}
      classes={{ root: classes.root }}
    >
      <Grid container alignItems="center" spacing={2}>
        <Grid item>
          <Avatar alt={profileName} src={profileAvatar} />
        </Grid>
        <Grid item>
          <Typography variant="h6" className={classes.profileName}>
            {profileName}
          </Typography>
          <Typography variant="caption" color="textSecondary">
            {textSecondary}
          </Typography>
        </Grid>
      </Grid>
    </Paper>
  );
};
