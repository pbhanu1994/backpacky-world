import React, { useState } from "react";
import { Paper, Grid, IconButton, Avatar, InputBase } from "@material-ui/core";
import {
  NotificationsOutlined as NotificationsIcon,
  Search as SearchIcon,
  ArrowDropDown as ArrowDownwardIcon,
} from "@material-ui/icons";
import ProfileList from "../../molecules/ProfileList";
import NotificationList from "../../molecules/NotificationList";
import { navbarStyles } from "./navbarStyles";

export default function Navbar() {
  const [showProfileList, setShowProfileList] = useState(false);
  const [showNotificationList, setShowNotificationList] = useState(false);

  const classes = navbarStyles();

  return (
    <>
      <Paper variant="outlined" classes={{ root: classes.root }}>
        <Grid
          container
          direction="row"
          justify="space-between"
          alignItems="center"
        >
          <Grid item classes={{ item: classes.logo }}>
            <img
              style={{ width: "12rem" }}
              src="https://travelbook.com/assets/travelbook_frontend/shared/logo-a99994a55cb026557285c2fb1a673f02fc3cccb45a8333d8f64dae8900d38bcd.png"
              alt="Logo"
            />
          </Grid>
          <Grid item classes={{ item: classes.searchField }}>
            <SearchIcon />
            <InputBase
              className={classes.searchFieldInput}
              placeholder="Search..."
              inputProps={{ "aria-label": "naked" }}
            />
          </Grid>
          <Grid item classes={{ item: classes.notificationAndAccount }}>
            <IconButton
              aria-label="search"
              color="inherit"
              onClick={() => setShowNotificationList(!showNotificationList)}
            >
              <NotificationsIcon />
            </IconButton>
            <button
              className={classes.profileListButton}
              onClick={() => setShowProfileList(!showProfileList)}
            >
              <Avatar
                alt="Remy Sharp"
                src="https://material-ui.com/static/images/avatar/1.jpg"
              />
              <ArrowDownwardIcon />
            </button>
          </Grid>
        </Grid>
      </Paper>

      {showProfileList && (
        <div className={classes.profileAndNotificationList}>
          <ProfileList />
        </div>
      )}
      {showNotificationList && (
        <div
          className={classes.profileAndNotificationList}
          style={{ marginRight: "6.5rem" }}
        >
          <NotificationList />
        </div>
      )}
    </>
  );
}
