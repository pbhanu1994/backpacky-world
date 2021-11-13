import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  useTheme,
} from "@mui/material";
import withPortal from "../../hoc/withPortal";
import closeDialog from "../../store/actions/config/dialog/closeDialog";

// TODO: Try to put the DialogBox in App.js (ask the experienced dev about that if that's a good approach)
const DialogBox = () => {
  const { dialog } = useSelector((state) => state.config);
  const dispatch = useDispatch();
  const theme = useTheme();

  const handleConfirm = () => {
    dialog.onConfirm();
    dispatch(closeDialog());
  };

  const handleClose = () => {
    dispatch(closeDialog());
  };

  return (
    <Dialog
      open={dialog.open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">{dialog.title}</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          {dialog.body}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>{dialog.buttonText.close}</Button>
        {dialog.type !== "plain" && (
          <Button
            onClick={handleConfirm}
            // color={theme.palette[dialog.color].main}
            style={{
              background: theme.palette[dialog.color].main,
              color: "#fff",
              boxShadow: dialog.type === "delete" && theme.customShadows.error,
            }}
            variant="contained"
            autoFocus
          >
            {dialog.buttonText.confirm}
          </Button>
        )}
      </DialogActions>
    </Dialog>
  );
};

export default withPortal(DialogBox);
