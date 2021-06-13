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
  inputText: {
    width: "100%",
    margin: "0.4rem 4.5rem",
  },
}));
