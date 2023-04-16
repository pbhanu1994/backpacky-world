import React, { useState } from "react";
import {
  Grid,
  ListItem,
  ListItemIcon,
  Checkbox,
  Divider,
  IconButton,
} from "@mui/material";
import {
  Edit as EditIcon,
  EditOutlined as EditOutlinedIcon,
  Delete as DeleteIcon,
  DeleteOutline as DeleteOutlineIcon,
} from "@mui/icons-material";
import { EditSectionText } from "/src/components/atoms/EditSectionText";
import { listStyles, CustomListItemText } from "./listStyles";

export const Option = ({
  sectionId,
  item,
  checked,
  onUpdateitem,
  onDeleteItem,
}) => {
  const [mouseHover, setMouseHover] = useState(false);
  const [mouseHoverOnItem, setMouseHoverOnItem] = useState(false);
  const [mouseHoverOnEdit, setMouseHoverOnEdit] = useState(false);
  const [showitemInput, setShowitemInput] = useState(false);
  const [itemId, setitemId] = useState(null);

  const labelId = `checkbox-list-label-${item.name}`;
  const checkboxChecked = checked !== false;
  const classes = listStyles({ checkboxChecked });

  return (
    <>
      <ListItem
        key={item.id}
        role={undefined}
        dense
        disableRipple
        disableTouchRipple
        sx={classes.listItem}
        onMouseOver={() => setMouseHoverOnItem(true)}
        onMouseLeave={() => setMouseHoverOnItem(false)}
        button
      >
        <Grid
          container
          direction="row"
          alignItems="center"
          onClick={() =>
            !showitemInput && onUpdateitem(sectionId, item, true, null)
          }
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
          {(!showitemInput || itemId !== item.id) && (
            <CustomListItemText
              id={labelId}
              checked={checkboxChecked}
              primary={item.name}
            />
          )}
          {showitemInput && itemId === item.id && (
            <EditSectionText
              sectionId={sectionId}
              inputText={item.name}
              onAddItem={(sectionId, itemText) =>
                onUpdateitem(sectionId, item, null, itemText)
              }
              edit={showitemInput}
              onHandleEdit={(edit) => setShowitemInput(edit)}
              styles={{ width: "80%" }}
            />
          )}
        </Grid>
        <span
          style={{
            display: "flex",
            visibility: mouseHoverOnItem ? "visible" : "hidden", //TODO: Check this with experienced dev, if it's a good approach
          }}
        >
          <IconButton
            aria-label="Edit Item Name"
            onClick={() => {
              setShowitemInput(true);
              setitemId(item.id);
            }}
            onMouseOver={() => setMouseHoverOnEdit(true)}
            onMouseLeave={() => setMouseHoverOnEdit(false)}
          >
            {/* TODO: Check the colors of Edit - Secondary or black, etc. on hover with a designer */}
            {mouseHoverOnEdit ? (
              <EditIcon color="secondary" />
            ) : (
              <EditOutlinedIcon />
            )}
          </IconButton>
          <IconButton
            aria-label="Delete Item"
            onClick={() => onDeleteItem(sectionId, item)}
            onMouseOver={() => setMouseHover(true)}
            onMouseLeave={() => setMouseHover(false)}
          >
            {/* TODO: Check the colors of error or black on hover with a designer */}
            {mouseHover ? <DeleteIcon color="error" /> : <DeleteOutlineIcon />}
          </IconButton>
        </span>
      </ListItem>
      <Divider light />
    </>
  );
};
