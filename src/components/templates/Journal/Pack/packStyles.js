import { makeStyles } from "@material-ui/core/styles";

export const packStyles = makeStyles((theme) => ({
  packHeadingText: {
    color: theme.palette.primary.main,
  },
  listPaper: {
    maxWidth: 1000,
  },
  listItem: {
    background: "none !important",
  },
  checkbox: {
    color: theme.palette.secondary.main,
  },
  // checkboxChecked: {
  //   color: `${theme.palette.grey[500]} !important`,
  // },
  listItemText: {
    color: ({ checkboxChecked }) => {
      return checkboxChecked ? theme.palette.grey[500] : "";
    },
    textDecorationLine: ({ checkboxChecked }) => {
      return checkboxChecked ? "line-through" : "";
    },
  },
  listItemTextPrimary: {
    fontWeight: "bold",
  },
  inputText: {
    width: "80%",
    margin: "0.4rem 4.5rem",
  },
}));
