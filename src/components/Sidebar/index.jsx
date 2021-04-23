import React from "react";
import { useRouter } from 'next/router'
import cookie from "js-cookie";
import { List, Divider, Grid } from "@material-ui/core";
import InboxIcon from "@material-ui/icons/Inbox";
import DraftsIcon from "@material-ui/icons/Drafts";
import { makeStyles } from "@material-ui/core/styles";
import { auth } from "../../firebaseClient";
import SidebarOption from "./SidebarOption";
import ViewProfile from "./ViewProfile";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    height: "90vh",
    maxWidth: 260,
    [theme.breakpoints.down('sm')]: {
      maxWidth: 90,
    },
    padding: "1rem",
    backgroundColor: theme.palette.background.paper,
    borderRadius: 20,
    marginLeft: "1rem",
  },
  logOut: {
    marginTop: "auto"
  }
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
    <Grid className={classes.root} container
    direction="column">
      <ViewProfile />
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
      <Grid item className={classes.logOut}>
        <Divider />
        <SidebarOption
            Icon={DraftsIcon}
            text="Logout"
            selectedItem={selectedItem}
            item="/logout"
            onHandleListItemClick={async () => {
              await auth.signOut();
              cookie.remove("__session");
              router.push("/");
            }}
          />
      </Grid>
    </Grid>
  );
}
