import { styled } from "@mui/system";

export const Paper = styled("div")(
  ({ theme }) => `
    margin-top: ${theme.spacing(8)};
    display: flex;
    flex-direction: column;
    align-items: flex-end;
`
);
export const signInStyles = () => ({
  root: {
    maxWidth: 480,
  },
  avatar: {
    margin: (theme) => theme.spacing(1),
    backgroundColor: (theme) => theme.palette.secondary.main,
  },
  submit: {
    margin: (theme) => `${theme.spacing(3, 0, 2)} !important`,
    textTransform: "capitalize !important",
    borderRadius: "8px",
  },
});
