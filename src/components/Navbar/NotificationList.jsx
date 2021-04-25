import React from "react";
import { useRouter } from "next/router";
import { makeStyles } from "@material-ui/core/styles";
import {
  List,
  ListItem,
  ListItemIcon,
  Avatar,
  ListItemText,
  Divider,
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    maxWidth: 280,
    borderRadius: 20,
    backgroundColor: theme.palette.background.paper,
  },
}));

export default function NotificationList() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <List component="nav" aria-label="main mailbox folders">
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
    </div>
  );
}
