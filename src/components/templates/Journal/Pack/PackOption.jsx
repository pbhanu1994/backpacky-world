import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Checkbox from "@material-ui/core/Checkbox";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import CommentIcon from "@material-ui/icons/Comment";
import {
  Delete as DeleteIcon,
  DeleteOutline as DeleteOutlineIcon,
} from "@material-ui/icons";
import { packStyles } from "./packStyles";

export const PackOption = ({
  packItem,
  checked,
  onHandleToggle,
  onDeleteItem,
}) => {
  const [mouseHover, setMouseHover] = useState(false);
  const labelId = `checkbox-list-label-${packItem.name}`;
  const checkboxChecked = checked !== false;
  const classes = packStyles({ checkboxChecked });

  return (
    <>
      <ListItem
        key={packItem.id}
        role={undefined}
        dense
        disableRipple
        disableTouchRipple
        classes={{ root: classes.listItem }}
        button
      >
        <Grid
          container
          direction="row"
          justify="space-between"
          alignItems="center"
          onClick={() => onHandleToggle(packItem)}
        >
          <ListItemIcon>
            <Checkbox
              edge="start"
              checked={checkboxChecked}
              tabIndex={-1}
              // classes={{
              // root: classes.checkbox,
              // checked: classes.checkboxChecked,
              // }}
              inputProps={{ "aria-labelledby": labelId }}
            />
          </ListItemIcon>
          <ListItemText
            id={labelId}
            classes={{
              root: classes.listItemText,
              primary: classes.listItemTextPrimary,
            }}
            primary={packItem.name}
          />
        </Grid>
        <IconButton
          aria-label="search"
          onClick={() => onDeleteItem(packItem)}
          onMouseOver={() => setMouseHover(true)}
          onMouseLeave={() => setMouseHover(false)}
        >
          {/* TODO: Check the colors of error or black on hover with a designer */}
          {mouseHover ? <DeleteIcon color="error" /> : <DeleteOutlineIcon />}
        </IconButton>
      </ListItem>
      <Divider />
    </>
  );
};
