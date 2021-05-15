import React from "react";
import { ListItem, ListItemIcon, ListItemText } from "@material-ui/core";
import { sidebarStyles } from "./sidebarStyles";

export default function SidebarOption({
  Icon,
  text,
  selectedItem,
  item,
  onHandleListItemClick,
}) {
  const classes = sidebarStyles({ selectedItem, item });
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
