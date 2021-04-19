import React from "react";
import { ListItem, ListItemIcon, ListItemText } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  item: {
    marginBottom: "1rem",
    "&:hover": {
      backgroundColor: "#eff1ff",
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
    backgroundColor: "#eff1ff !important",
  },
  icon: {
    color: ({ selectedItem, item }) => {
      return selectedItem === item ? theme.palette.primary.main : "";
    },
  },
  text: {
    fontWeight: "bold",
    // display: "none",
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
  return (
    <ListItem
      button
      selected={selectedItem === item}
      classes={{
        root: classes.item,
        selected: selectedItem === item && classes.selected,
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
