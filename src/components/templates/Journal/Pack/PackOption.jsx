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
import { packStyles, CustomListItemText } from "./packStyles";

export const PackOption = ({
  sectionId,
  packItem,
  checked,
  onUpdatePackItem,
  onDeleteItem,
}) => {
  const [mouseHover, setMouseHover] = useState(false);
  const [mouseHoverOnItem, setMouseHoverOnItem] = useState(false);
  const [mouseHoverOnEdit, setMouseHoverOnEdit] = useState(false);
  const [showPackItemInput, setShowPackItemInput] = useState(false);
  const [packItemId, setPackItemId] = useState(null);

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
            !showPackItemInput &&
            onUpdatePackItem(sectionId, packItem, true, null)
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
          {(!showPackItemInput || packItemId !== packItem.id) && (
            <CustomListItemText
              id={labelId}
              checked={checkboxChecked}
              primary={packItem.name}
            />
          )}
          {showPackItemInput && packItemId === packItem.id && (
            <EditSectionText
              sectionId={sectionId}
              inputText={packItem.name}
              onAddItem={(sectionId, packItemText) =>
                onUpdatePackItem(sectionId, packItem, null, packItemText)
              }
              edit={showPackItemInput}
              onHandleEdit={(edit) => setShowPackItemInput(edit)}
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
              setShowPackItemInput(true);
              setPackItemId(packItem.id);
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
            onClick={() => onDeleteItem(sectionId, packItem)}
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
