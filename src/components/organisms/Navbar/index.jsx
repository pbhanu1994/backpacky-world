import React, { useState, useRef } from "react";
import { Paper, Grid, IconButton, Avatar, InputBase } from "@mui/material";
import {
  NotificationsOutlined as NotificationsIcon,
  Search as SearchIcon,
  ArrowDropDown as ArrowDownwardIcon,
} from "@mui/icons-material";
import { MenuPopover } from "../../atoms/MenuPopover";
import { ProfileList } from "../../molecules/ProfileList";
import { NotificationList } from "../../molecules/NotificationList";
import { navbarStyles } from "./navbarStyles";

export const Navbar = () => {
  const [showProfileList, setShowProfileList] = useState(false);
  const [showNotificationList, setShowNotificationList] = useState(false);

  const anchorProfileListRef = useRef(null);
  const anchorNotificationListRef = useRef(null);

  const classes = navbarStyles();

  return (
    <>
      <Paper variant="outlined" classes={{ root: classes.root }}>
        <Grid
          container
          direction="row"
          justifyContent="space-between"
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
              aria-label="Notifications"
              color="inherit"
              onClick={() => setShowNotificationList(!showNotificationList)}
              ref={anchorNotificationListRef}
            >
              <NotificationsIcon />
            </IconButton>
            <button
              className={classes.profileListButton}
              onClick={() => setShowProfileList(!showProfileList)}
              ref={anchorProfileListRef}
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

      <MenuPopover
        open={showProfileList}
        onClose={() => setShowProfileList(!showProfileList)}
        anchorEl={anchorProfileListRef.current}
      >
        <ProfileList />
      </MenuPopover>

      <MenuPopover
        open={showNotificationList}
        onClose={() => setShowNotificationList(!showNotificationList)}
        anchorEl={anchorNotificationListRef.current}
      >
        <NotificationList />
      </MenuPopover>
    </>
  );
};
