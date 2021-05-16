import React from "react";
import { useRouter } from "next/router";
import { List, Divider, Grid } from "@material-ui/core";
import {
  HomeOutlined as HomeIcon,
  BookOutlined as JournalIcon,
  MessageOutlined as MessagesIcon,
  SettingsOutlined as SettingsIcon,
} from "@material-ui/icons";
import SidebarOption from "./SidebarOption";
import ViewProfile from "../../atoms/ViewProfile";
import { SIDEBAR_NAVIGATIONS } from "../../../constants/navigationConstants";
import { sidebarStyles } from "./sidebarStyles";

export default function Sidebar() {
  const router = useRouter();
  const classes = sidebarStyles();
  const [selectedItem, setSelectedItem] = React.useState(router.pathname);

  const handleListItemClick = (event, item) => {
    setSelectedItem(item);
    router.push(item);
  };

  const sidebarIcons = {
    Home: HomeIcon,
    Journal: JournalIcon,
    Messages: MessagesIcon,
    Settings: SettingsIcon,
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
}
