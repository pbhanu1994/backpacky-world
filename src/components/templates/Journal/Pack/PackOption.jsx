import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListItemText from "@material-ui/core/ListItemText";
import Checkbox from "@material-ui/core/Checkbox";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import CommentIcon from "@material-ui/icons/Comment";
import { packStyles } from "./packStyles";

export default function CheckboxList() {
  const [checked, setChecked] = React.useState([0]);

  const handleToggle = (value) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };

  return (
    <List>
      {[0, 1, 2, 3].map((value) => {
        const labelId = `checkbox-list-label-${value}`;
        const checkboxChecked = checked.indexOf(value) !== -1;
        const classes = packStyles({ checkboxChecked });

        return (
          <>
            <ListItem
              key={value}
              role={undefined}
              dense
              disableRipple
              disableTouchRipple
              classes={{ root: classes.listItem }}
              button
              onClick={handleToggle(value)}
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
                primary={`Line item ${value + 1}`}
              />
            </ListItem>
            <Divider />
          </>
        );
      })}
    </List>
  );
}
