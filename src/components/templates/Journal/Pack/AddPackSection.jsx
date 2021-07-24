import React, { useState } from "react";
import { Grid, TextField, Button, IconButton } from "@material-ui/core";
import { Check as ConfirmIcon, Close as CloseIcon } from "@material-ui/icons";
import { packStyles } from "./packStyles";

export const AddPackSection = ({ onAddSection }) => {
  const [addSection, setAddSection] = useState(false);
  const [addSectionText, setAddSectionText] = useState("");

  const classes = packStyles();

  return (
    <Grid>
      {!addSection && (
        <Button
          fullWidth
          size="small"
          variant="text"
          color="secondary"
          className={classes.addSection}
          // onClick={() => setAddSection(!addSection)}
          onClick={onAddSection}
        >
          + Add section
        </Button>
      )}
      {/* {addSection && (
        <Grid
          container
          direction="row"
          justify="center"
          alignItems="center"
          style={{ maxWidth: 1000 }}
        > */}
      {/* TODO: Check the Text Field UI design here with the designer */}
      {/* <TextField
            fullWidth
            classes={{ root: classes.addSectionText }}
            color="secondary"
            label="Section Name"
            placeholder="Meds/First Aid"
            size="small"
            onChange={(e) => setAddSectionText(e.target.value)}
            value={addSectionText}
          />
          <IconButton
            aria-label="Confirm Section"
            className={classes.confirmButton}
            // onClick={() => onDeleteItem(sectionId, packItem)}
            // onMouseOver={() => setMouseHover(true)}
            // onMouseLeave={() => setMouseHover(false)}
          >
            <ConfirmIcon color="success" />
          </IconButton>
          <IconButton
            aria-label="Cancel Section"
            className={classes.cancelButton}
            onClick={() => setAddSection(false)}
          >
            <CloseIcon color="error" />
          </IconButton>
        </Grid>
      )} */}
    </Grid>
  );
};
