import React, { useState } from "react";
import { InputBase, IconButton } from "@mui/material";
import { Check as ConfirmIcon, Close as CloseIcon } from "@mui/icons-material";
import { packStyles } from "./packStyles";

export const PackInput = ({
  inputText,
  sectionId,
  placeholderText,
  onAddItem,
  edit,
  onHandleEdit,
}) => {
  const [text, setText] = useState(inputText || "");
  const classes = packStyles({ edit });

  const handleSubmit = (e) => {
    e.preventDefault();
    onAddItem(sectionId, text);
    edit && onHandleEdit(false);
    setText("");
  };

  return (
    <form style={{ display: "flex" }} onSubmit={handleSubmit}>
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
            size="small"
            aria-label="Confirm Section"
            className={classes.confirmButton}
            onClick={(e) => {
              handleSubmit(e), onHandleEdit(false);
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
