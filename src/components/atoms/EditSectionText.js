import React, { useState } from "react";
import { IconButton } from "@mui/material";
import { Check as ConfirmIcon, Close as CloseIcon } from "@mui/icons-material";
import {
  editSectionTextStyles,
  CustomInputBase,
} from "./editSectionTextStyles";

export const EditSectionText = ({
  inputText,
  sectionId,
  placeholderText,
  onAddItem,
  edit,
  onHandleEdit,
  styles,
}) => {
  const [text, setText] = useState(inputText || "");
  const classes = editSectionTextStyles();

  const handleSubmitTitle = (e) => {
    e.preventDefault();
    onAddItem(sectionId, text);
    edit && onHandleEdit(false);
    setText("");
  };

  return (
    <form style={{ display: "flex" }} onSubmit={handleSubmitTitle}>
      <CustomInputBase
        autoFocus={edit}
        width={styles.width}
        margin={styles.margin}
        edit={edit}
        placeholder={placeholderText}
        inputProps={{ "aria-label": "naked" }}
        onChange={(e) => setText(e.target.value)}
        value={text}
      />
      {edit && (
        <>
          <IconButton
            type="submit"
            size="small"
            aria-label="Confirm Section"
            sx={classes.confirmButton}
            onClick={(e) => {
              handleSubmitTitle(e), onHandleEdit(false);
            }}
          >
            <ConfirmIcon color="success" />
          </IconButton>
          &nbsp;
          <IconButton
            size="small"
            aria-label="Cancel Section"
            sx={classes.cancelButton}
            onClick={() => onHandleEdit(false)}
          >
            <CloseIcon color="error" />
          </IconButton>
        </>
      )}
    </form>
  );
};
