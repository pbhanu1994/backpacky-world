import Head from "next/head";
import PropTypes from "prop-types";
import { forwardRef } from "react";
import { Box } from "@mui/material";

const Page = forwardRef(({ children, title = "", ...other }, ref) => (
  <Box ref={ref} {...other}>
    <Head>
      <title>{title}</title>
    </Head>
    {children}
  </Box>
));

Page.propTypes = {
  children: PropTypes.node.isRequired,
  title: PropTypes.string,
};

export default Page;
