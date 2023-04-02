import { ListItemText } from "@mui/material";
import { styled } from "@mui/system";

export const CustomListItemText = styled(ListItemText)(
  ({ theme, checked }) => `
  &.MuiListItemText-root {
    color: ${checked && theme.palette.grey[500]};
    text-decoration-line: ${checked && "line-through"};
  }
  & .MuiListItemText-primary {
    font-weight: bold;
  }
`
);
export const packStyles = () => ({
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
    boxShadow: (theme) => theme.customShadows.z16,
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
  deleteSectionButton: {
    color: (theme) => theme.palette.error.main,
  },
});
