import PropTypes from "prop-types";
import { useMemo } from "react";
// material
import { CssBaseline } from "@material-ui/core";
import {
  ThemeProvider,
  createTheme,
  //   StyledEngineProvider,
} from "@material-ui/core/styles";
import palette from "./palette";
import typography from "./typography";
import shape from "./shape";
import shadows, { customShadows } from "./shadows";

export default function ThemeConfig({ children }) {
  const themeOptions = useMemo(
    () => ({
      palette,
      shape,
      typography,
      shadows,
      customShadows,
    }),
    []
  );

  const theme = createTheme(themeOptions);

  return (
    <ThemeProvider theme={theme}>
      {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
}
