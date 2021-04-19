import React from "react";
import { List, Divider } from "@material-ui/core";
import InboxIcon from "@material-ui/icons/Inbox";
import DraftsIcon from "@material-ui/icons/Drafts";
import { makeStyles } from "@material-ui/core/styles";
import SidebarOption from "./SidebarOption";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    maxWidth: 260,
    padding: "1rem",
    backgroundColor: theme.palette.background.paper,
    borderRadius: 20,
    marginLeft: "1rem",
  },
}));

export default function Sidebar() {
  const classes = useStyles();
  const [selectedItem, setSelectedItem] = React.useState("home");

  const handleListItemClick = (event, item) => {
    setSelectedItem(item);
  };

  return (
    <div className={classes.root}>
      <List component="nav" aria-label="main mailbox folders">
        <SidebarOption
          Icon={InboxIcon}
          text="Home"
          selectedItem={selectedItem}
          item="home"
          onHandleListItemClick={handleListItemClick}
        />
        <SidebarOption
          Icon={DraftsIcon}
          text="Drafts"
          selectedItem={selectedItem}
          item="drafts"
          onHandleListItemClick={handleListItemClick}
        />
        <SidebarOption
          Icon={DraftsIcon}
          text="Messages"
          selectedItem={selectedItem}
          item="messages"
          onHandleListItemClick={handleListItemClick}
        />
        <SidebarOption
          Icon={DraftsIcon}
          text="Settings"
          selectedItem={selectedItem}
          item="settings"
          onHandleListItemClick={handleListItemClick}
        />
      </List>
      <Divider />
    </div>
  );
}
