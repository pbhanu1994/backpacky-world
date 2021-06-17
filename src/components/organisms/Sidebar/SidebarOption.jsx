import React from "react";
import { ListItem, ListItemIcon, ListItemText } from "@material-ui/core";
import { sidebarStyles } from "./sidebarStyles";

export const SidebarOption = ({
  Icon,
  text,
  selectedItem,
  item,
  onHandleListItemClick,
}) => {
  const active = selectedItem.includes(item);
  const classes = sidebarStyles({ active });

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
};
