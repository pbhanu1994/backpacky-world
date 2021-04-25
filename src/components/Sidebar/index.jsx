import React from "react";
import { useRouter } from "next/router";

import { List, Divider, Grid } from "@material-ui/core";
import {
  Inbox as InboxIcon,
  Drafts as DraftsIcon,
  Settings as SettingsIcon,
} from "@material-ui/icons";
import { makeStyles } from "@material-ui/core/styles";

import SidebarOption from "./SidebarOption";
import ViewProfile from "../common/ViewProfile";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    height: "90vh",
    maxWidth: 260,
    [theme.breakpoints.down("sm")]: {
      maxWidth: 90,
    },
    padding: "1rem",
    backgroundColor: theme.palette.background.paper,
    borderRadius: 20,
    marginLeft: "1rem",
  },
  settings: {
    marginTop: "auto",
  },
}));

export default function Sidebar() {
  const router = useRouter();
  const classes = useStyles();
  const [selectedItem, setSelectedItem] = React.useState(router.pathname);

  const handleListItemClick = (event, item) => {
    setSelectedItem(item);
    router.push(item);
  };

  return (
    <Grid className={classes.root} container direction="column">
      <ViewProfile
        variant="outlined"
        profileAvatar="https://material-ui.com/static/images/avatar/1.jpg"
        profileName="Bhanu Prakash"
        textSecondary="pbhanu.1994@gmail.com"
      />
      <Divider />
      <List component="nav" aria-label="main mailbox folders">
        <SidebarOption
          Icon={InboxIcon}
          text="Home"
          selectedItem={selectedItem}
          item="/home"
          onHandleListItemClick={handleListItemClick}
        />
        <SidebarOption
          Icon={DraftsIcon}
          text="Journal"
          selectedItem={selectedItem}
          item="/journal"
          onHandleListItemClick={handleListItemClick}
        />
        <SidebarOption
          Icon={DraftsIcon}
          text="Messages"
          selectedItem={selectedItem}
          item="/messages"
          onHandleListItemClick={handleListItemClick}
        />
        <SidebarOption
          Icon={DraftsIcon}
          text="Explore"
          selectedItem={selectedItem}
          item="/explore"
          onHandleListItemClick={handleListItemClick}
        />
        <SidebarOption
          Icon={DraftsIcon}
          text="Settings"
          selectedItem={selectedItem}
          item="/settings"
          onHandleListItemClick={handleListItemClick}
        />
      </List>
      <Grid item className={classes.settings}>
        <Divider />
        <SidebarOption
          Icon={SettingsIcon}
          text="Settings"
          selectedItem={selectedItem}
          item="/settings"
          onHandleListItemClick={handleListItemClick}
        />
      </Grid>
    </Grid>
  );
}
