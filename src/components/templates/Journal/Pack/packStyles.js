import { makeStyles } from "@material-ui/core/styles";

export const packStyles = makeStyles((theme) => ({
  addSection: {
    maxWidth: 1000,
    borderRadius: "1rem",
    marginBottom: "0.5rem",
  },
  sectionTitle: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },
  confirmButton: {
    color: theme.palette.success.main,
  },
  cancelButton: {
    color: theme.palette.error.main,
  },
  listPaper: {
    maxWidth: 1000,
    borderRadius: "1rem",
    marginBottom: "1rem",
  },
  listItem: {
    background: "none !important",
  },
  // checkbox: {
  //   color: theme.palette.secondary.main,
  // },
  // checkboxChecked: {
  //   color: `${theme.palette.grey[500]} !important`,
  // },
  listItemText: {
    color: ({ checkboxChecked }) => checkboxChecked && theme.palette.grey[500],
    textDecorationLine: ({ checkboxChecked }) =>
      checkboxChecked && "line-through",
    textDecorationColor: ({ checkboxChecked }) =>
      checkboxChecked && theme.palette.secondary.main,
  },
  listItemTextPrimary: {
    fontWeight: "bold",
  },
  inputText: {
    width: "80%",
    margin: ({ edit }) => !edit && "0.4rem 4.5rem",
  },
  deleteSectionButton: {
    color: theme.palette.error.main,
  },
}));
