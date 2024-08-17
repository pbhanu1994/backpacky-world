import { useEffect } from "react";
import PropTypes from "prop-types";
import rtlPlugin from "stylis-plugin-rtl";
import createCache from "@emotion/cache";
import { CacheProvider } from "@emotion/react";
import { useTheme } from "@mui/material/styles";

RtlLayout.propTypes = {
  children: PropTypes.node,
};

export default function RtlLayout({ children }) {
  const theme = useTheme();

  useEffect(() => {
    document.dir = theme.direction;
  }, [theme.direction]);

  const cacheRtl = createCache({
    key: theme.direction === "rtl" ? "rtl" : "css",
    stylisPlugins: theme.direction === "rtl" ? [rtlPlugin] : [],
  });

  cacheRtl.compat = true;

  return <CacheProvider value={cacheRtl}>{children}</CacheProvider>;
}
