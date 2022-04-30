import { makeStyles } from "@mui/styles";

export const editSectionTextStyles = makeStyles((theme) => ({
  inputText: {
    width: ({ width }) => width,
    margin: ({ margin }) => margin,
    fontSize: "unset",
    fontWeight: ({ edit }) => edit && "bold",
  },
  inputElement: {
    padding: 0,
    margin: 0,
  },
  confirmButton: {
    color: theme.palette.success.main,
  },
  cancelButton: {
    color: theme.palette.error.main,
  },
}));
