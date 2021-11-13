import { makeStyles } from "@mui/styles";

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
    boxShadow: theme.customShadows.z16,
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
    // Uncomment below property to make the strike color secondary
    // textDecorationColor: ({ checkboxChecked }) =>
    //   checkboxChecked && theme.palette.secondary.main,
  },
  listItemTextPrimary: {
    fontWeight: "bold",
  },
  inputText: {
    width: "80%",
    margin: ({ edit }) => !edit && "0.4rem 3.7rem",
    fontSize: "unset",
    fontWeight: ({ edit }) => edit && "bold",
  },
  inputElement: {
    padding: 0,
    margin: 0,
  },
  deleteSectionButton: {
    color: theme.palette.error.main,
  },
}));
