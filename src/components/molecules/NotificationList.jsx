import React from "react";
import { useRouter } from "next/router";
import {
  List,
  ListItem,
  ListItemIcon,
  Avatar,
  ListItemText,
  Divider,
} from "@mui/material";

export const NotificationList = () => {
  return (
    <List
      component="nav"
      aria-label="main mailbox folders"
      style={{ maxWidth: 280 }}
    >
      <ListItem button>
        <ListItemIcon>
          <Avatar
            alt="Bhanu Prakash"
            src="https://material-ui.com/static/images/avatar/2.jpg"
          />
        </ListItemIcon>
        <ListItemText secondary="First Notificaton is commented on your profile blah blah blah..." />
      </ListItem>
      <Divider />
      <ListItem button>
        <ListItemIcon>
          <Avatar
            alt="Bhanu Prakash"
            src="https://material-ui.com/static/images/avatar/3.jpg"
          />
        </ListItemIcon>
        <ListItemText secondary="Second Notificaton liked your post on blah blah blah..." />
      </ListItem>
    </List>
  );
};
