import { useEffect } from "react";
import { Icon } from "@iconify/react";
import closeFill from "@iconify/icons-eva/close-fill";
import {
  Box,
  Backdrop,
  Paper,
  Divider,
  Typography,
  Stack,
} from "@mui/material";
import Scrollbar from "../../atoms/Scrollbar";
import { MIconButton } from "../../@material-extend";
import SettingMode from "./SettingMode";
import SettingColor from "./SettingColor";
import SettingStretch from "./SettingStretch";
import SettingDirection from "./SettingDirection";
import SettingFullscreen from "./SettingFullscreen";
import useSettings from "../../../hooks/useSettings";

const DRAWER_WIDTH = 260;

export default function Settings() {
  const { themeSidebarOpen, onCloseThemeSidebar } = useSettings();

  useEffect(() => {
    if (themeSidebarOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [themeSidebarOpen]);

  return (
    <>
      <Backdrop
        sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={themeSidebarOpen}
        onClick={onCloseThemeSidebar}
      />

      <Box
        sx={{
          top: 12,
          bottom: 12,
          right: 0,
          position: "fixed",
          zIndex: 2001,
          ...(themeSidebarOpen && { right: 12 }),
        }}
      >
        <Paper
          sx={{
            height: 1,
            width: "0px",
            overflow: "hidden",
            boxShadow: (theme) => theme.customShadows.z24,
            transition: (theme) => theme.transitions.create("width"),
            ...(themeSidebarOpen && { width: DRAWER_WIDTH }),
          }}
        >
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
            sx={{ py: 2, pr: 1, pl: 2.5 }}
          >
            <Typography variant="subtitle1">Settings</Typography>
            <MIconButton onClick={onCloseThemeSidebar}>
              <Icon icon={closeFill} width={20} height={20} />
            </MIconButton>
          </Stack>
          <Divider />

          <Scrollbar sx={{ height: 1 }}>
            <Stack spacing={4} sx={{ pt: 3, px: 3, pb: 15 }}>
              <Stack spacing={1.5}>
                <Typography variant="subtitle2">Mode</Typography>
                <SettingMode />
              </Stack>

              <Stack spacing={1.5}>
                <Typography variant="subtitle2">Direction</Typography>
                <SettingDirection />
              </Stack>

              <Stack spacing={1.5}>
                <Typography variant="subtitle2">Color</Typography>
                <SettingColor />
              </Stack>

              <Stack spacing={1.5}>
                <Typography variant="subtitle2">Stretch</Typography>
                <SettingStretch />
              </Stack>

              <SettingFullscreen />
            </Stack>
          </Scrollbar>
        </Paper>
      </Box>
    </>
  );
}
