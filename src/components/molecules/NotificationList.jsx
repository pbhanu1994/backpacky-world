import React from "react";
import { useRouter } from "next/router";
import { makeStyles } from "@material-ui/core/styles";
import {
  Paper,
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

export const NotificationList = () => {
  const classes = useStyles();

  // TODO: Make List disappear after mouse click outside - refer Ref?
  return (
    <Paper elevation={3} className={classes.root}>
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
    </Paper>
  );
};
