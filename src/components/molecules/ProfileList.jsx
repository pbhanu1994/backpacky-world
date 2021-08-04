import React from "react";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import {
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
import signOutUser from "../../store/actions/auth/signOutUser";
import { ViewProfile } from "../atoms/ViewProfile";

export const ProfileList = () => {
  const router = useRouter();
  const dispatch = useDispatch();

  return (
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
      <ListItem button onClick={() => dispatch(signOutUser())}>
        <ListItemIcon>
          <LogoutIcon />
        </ListItemIcon>
        <ListItemText primary="Logout" />
      </ListItem>
    </List>
  );
};
