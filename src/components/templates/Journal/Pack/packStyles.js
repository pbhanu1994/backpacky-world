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
  deleteSectionButton: {
    color: theme.palette.error.main,
  },
}));
