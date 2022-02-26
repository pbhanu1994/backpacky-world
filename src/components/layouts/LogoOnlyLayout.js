import PropTypes from "prop-types";
import NextLink from "next/link";
import { Box } from "@mui/material";
import { styled } from "@mui/material/styles";

const HeaderStyle = styled("header")(({ theme }) => ({
  top: 0,
  left: 0,
  lineHeight: 0,
  width: "100%",
  position: "absolute",
  padding: theme.spacing(3, 3, 0),
  [theme.breakpoints.up("sm")]: {
    padding: theme.spacing(5, 5, 0),
  },
}));

LogoOnlyLayout.propTypes = {
  children: PropTypes.node,
};

export default function LogoOnlyLayout({ children }) {
  return (
    <>
      <HeaderStyle>
        <NextLink href="/">
          <Box sx={{ display: "inline-flex", cursor: "pointer" }}>
            <img
              style={{ width: "12rem" }}
              src="https://travelbook.com/assets/travelbook_frontend/shared/logo-a99994a55cb026557285c2fb1a673f02fc3cccb45a8333d8f64dae8900d38bcd.png"
              alt="Logo"
            />
          </Box>
        </NextLink>
      </HeaderStyle>
      {children}
    </>
  );
}
