import React, { useState } from "react";
import { InputBase, IconButton } from "@mui/material";
import { Check as ConfirmIcon, Close as CloseIcon } from "@mui/icons-material";
import { editSectionTextStyles } from "./editSectionTextStyles";

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
  const classes = editSectionTextStyles({
    edit,
    width: styles.width,
    margin: styles.margin,
  });

  const handleSubmitTitle = (e) => {
    e.preventDefault();
    onAddItem(sectionId, text);
    edit && onHandleEdit(false);
    setText("");
  };

  return (
    <form style={{ display: "flex" }} onSubmit={handleSubmitTitle}>
      <InputBase
        autoFocus={edit}
        classes={{
          root: classes.inputText,
          input: edit && classes.inputElement,
        }}
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
            className={classes.confirmButton}
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
            className={classes.cancelButton}
            onClick={() => onHandleEdit(false)}
          >
            <CloseIcon color="error" />
          </IconButton>
        </>
      )}
    </form>
  );
};
