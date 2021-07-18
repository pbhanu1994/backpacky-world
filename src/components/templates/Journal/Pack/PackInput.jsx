import React, { useState } from "react";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import { InputBase } from "@material-ui/core";
import { packStyles } from "./packStyles";

export const PackInput = ({ sectionId, placeholderText, onAddItem }) => {
  const [text, setText] = useState("");
  const classes = packStyles();

  const handleSubmit = (e) => {
    e.preventDefault();
    onAddItem(sectionId, text);
    setText("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <InputBase
        classes={{ root: classes.inputText }}
        placeholder={placeholderText}
        inputProps={{ "aria-label": "naked" }}
        onChange={(e) => setText(e.target.value)}
        value={text}
      />
    </form>
  );
};
