import { styled } from "@mui/system";

export const Paper = styled("div")(
  ({ theme }) => `
    margin-top: ${theme.spacing(8)};
    display: flex;
    flex-direction: column;
    align-items: center;
`
);
export const signUpStyles = () => ({
  root: {
    maxWidth: 480,
  },
  avatar: {
    margin: (theme) => theme.spacing(1),
    backgroundColor: (theme) => theme.palette.secondary.main,
  },
  submit: {
    margin: (theme) => theme.spacing(3, 0, 2),
    borderRadius: "8px",
  },
});
