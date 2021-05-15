import React from "react";
import { useRouter } from "next/router";
import { makeStyles } from "@material-ui/core/styles";
import {
  Paper,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
} from "@material-ui/core";
import {
  Settings as SettingsIcon,
  ExitToApp as LogoutIcon,
} from "@material-ui/icons";
import { signOut } from "../../handlers/auth";
import ViewProfile from "../common/ViewProfile";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    maxWidth: 260,
    borderRadius: 20,
    backgroundColor: theme.palette.background.paper,
  },
}));

export default function ProfileList() {
  const router = useRouter();
  const classes = useStyles();

  return (
    <Paper elevation={3} className={classes.root}>
      <List component="nav" aria-label="main mailbox folders">
        <ListItem>
          <ViewProfile
            profileAvatar="https://material-ui.com/static/images/avatar/1.jpg"
            profileName="Bhanu Prakash"
            textSecondary="View Profile"
          />
        </ListItem>
        <Divider />
        <ListItem button onClick={() => router.push("/settings")}>
          <ListItemIcon>
            <SettingsIcon />
          </ListItemIcon>
          <ListItemText primary="Settings" />
        </ListItem>
        <Divider />
        <ListItem button onClick={signOut}>
          <ListItemIcon>
            <LogoutIcon />
          </ListItemIcon>
          <ListItemText primary="Logout" />
        </ListItem>
      </List>
    </Paper>
  );
}
