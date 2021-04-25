import React from "react";
import { ListItem, ListItemIcon, ListItemText } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  item: {
    marginBottom: "1rem",
    marginTop: ({ item }) => {
      return item === "/logout" && "1rem";
    },
    "&:hover": {
      backgroundColor: theme.palette.primary.extraLight,
      borderRadius: 20,
      color: theme.palette.primary.main,
    },
    "&:hover $icon": {
      color: theme.palette.primary.main,
    },
  },
  selected: {
    borderRadius: 20,
    color: theme.palette.primary.main,
    backgroundColor: `${theme.palette.primary.extraLight} !important`,
  },
  icon: {
    color: ({ selectedItem, item }) => {
      return selectedItem === item ? theme.palette.primary.main : "";
    },
  },
  text: {
    fontWeight: 900,
    [theme.breakpoints.down("sm")]: {
      display: "none",
    },
  },
}));

export default function SidebarOption({
  Icon,
  text,
  selectedItem,
  item,
  onHandleListItemClick,
}) {
  const classes = useStyles({ selectedItem, item });
  const active = selectedItem === item;

  return (
    <ListItem
      button
      selected={active}
      classes={{
        root: classes.item,
        selected: active && classes.selected,
      }}
      onClick={(event) => onHandleListItemClick(event, item)}
    >
      <ListItemIcon>
        <Icon className={classes.icon} />
      </ListItemIcon>
      <ListItemText classes={{ root: classes.text }} primary={text} />
    </ListItem>
  );
}
