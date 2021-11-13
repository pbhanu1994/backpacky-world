import React from "react";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import { makeStyles } from "@mui/styles";
import {
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
} from "@mui/material";
import {
  Settings as SettingsIcon,
  ExitToApp as LogoutIcon,
} from "@mui/icons-material";
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
