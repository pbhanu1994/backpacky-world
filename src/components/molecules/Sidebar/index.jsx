import React from "react";
import { useRouter } from "next/router";

import { List, Divider, Grid } from "@material-ui/core";
import {
  Inbox as InboxIcon,
  Drafts as DraftsIcon,
  Settings as SettingsIcon,
} from "@material-ui/icons";
import SidebarOption from "./SidebarOption";
import ViewProfile from "../../atoms/ViewProfile";
import { sidebarStyles } from "./sidebarStyles";

export default function Sidebar() {
  const router = useRouter();
  const classes = sidebarStyles();
  const [selectedItem, setSelectedItem] = React.useState(router.pathname);

  const handleListItemClick = (event, item) => {
    setSelectedItem(item);
    router.push(item);
  };

  return (
    <Grid className={classes.root} container direction="column">
      <div style={{ marginBottom: "1rem" }}>
        <ViewProfile
          variant="outlined"
          profileAvatar="https://material-ui.com/static/images/avatar/1.jpg"
          profileName="Bhanu Prakash"
          textSecondary="pbhanu.1994@gmail.com"
        />
      </div>
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
