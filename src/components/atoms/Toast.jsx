import React, { useState } from "react";
import { Snackbar } from "@material-ui/core";
import MuiAlert from "@material-ui/lab/Alert";
import PropTypes from "prop-types";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export const Toast = ({
  toastOpen,
  toastColor,
  toastMessage,
  onHandleClose,
}) => {
  return (
    <Snackbar open={toastOpen} autoHideDuration={5000} onClose={onHandleClose}>
      <Alert onClose={onHandleClose} severity={toastColor}>
        {toastMessage}
      </Alert>
    </Snackbar>
  );
};

Toast.propTypes = {
  toastOpen: PropTypes.bool.isRequired,
  toastColor: PropTypes.string.isRequired,
  toastMessage: PropTypes.string.isRequired,
  onHandleClose: PropTypes.func.isRequired,
};
