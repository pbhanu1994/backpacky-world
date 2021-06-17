import React from "react";
import { useRouter } from "next/router";
import { List, Divider, Grid } from "@material-ui/core";
import {
  Home as HomeActiveIcon,
  HomeOutlined as HomeIcon,
  Book as JournalActiveIcon,
  BookOutlined as JournalIcon,
  Message as MessageActiveIcon,
  MessageOutlined as MessagesIcon,
  Settings as SettingsActiveIcon,
  SettingsOutlined as SettingsIcon,
} from "@material-ui/icons";
import { SidebarOption } from "./SidebarOption";
import { ViewProfile } from "../../atoms/ViewProfile";
import { SIDEBAR_NAVIGATIONS } from "../../../constants/navigationConstants";
import { sidebarStyles } from "./sidebarStyles";

export const Sidebar = () => {
  const router = useRouter();
  const classes = sidebarStyles();
  const [selectedItem, setSelectedItem] = React.useState(router.pathname);

  const handleListItemClick = (event, item) => {
    setSelectedItem(item);
    router.push(item);
  };

  const sidebarIcons = {
    Home: selectedItem.includes("/home") ? HomeActiveIcon : HomeIcon,
    Journal: selectedItem.includes("/journal")
      ? JournalActiveIcon
      : JournalIcon,
    Messages: selectedItem.includes("/messages")
      ? MessageActiveIcon
      : MessagesIcon,
    Settings: selectedItem.includes("/settings")
      ? SettingsActiveIcon
      : SettingsIcon,
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
        {SIDEBAR_NAVIGATIONS.length > 0 &&
          SIDEBAR_NAVIGATIONS.map(
            (item) =>
              item.label !== "Settings" && (
                <SidebarOption
                  key={item.label}
                  Icon={sidebarIcons[item.label]}
                  text={item.label}
                  selectedItem={selectedItem}
                  item={item.value}
                  onHandleListItemClick={handleListItemClick}
                />
              )
          )}
      </List>
      <Grid item className={classes.settings}>
        <Divider />
        {SIDEBAR_NAVIGATIONS.length > 0 &&
          SIDEBAR_NAVIGATIONS.filter((item) => item.label === "Settings").map(
            (item) =>
              item.label === "Settings" && (
                <SidebarOption
                  key={item.label}
                  Icon={sidebarIcons[item.label]}
                  text={item.label}
                  selectedItem={selectedItem}
                  item={item.value}
                  onHandleListItemClick={handleListItemClick}
                />
              )
          )}
      </Grid>
    </Grid>
  );
};
