import { InputBase } from "@mui/material";
import { styled } from "@mui/system";

export const CustomInputBase = styled(InputBase)(
  ({ width, margin, edit }) => `
  &.MuiInputBase-root {
    width: ${width};
    margin: ${margin};
    font-size: unset;
    font-weight: ${edit && "bold"};
  }
  & .MuiInputBase-input {
    padding: ${edit && 0};
    margin: ${edit && 0};
  }
`
);
export const editSectionTextStyles = () => ({
  confirmButton: {
    color: (theme) => theme.palette.success.main,
  },
  cancelButton: {
    color: (theme) => theme.palette.error.main,
  },
});
