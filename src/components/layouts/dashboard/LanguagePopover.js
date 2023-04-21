import { useRef, useState } from "react";
import { alpha } from "@mui/material/styles";
import { Stack, MenuItem, ListItemIcon, ListItemText } from "@mui/material";
import { MenuPopover } from "../../atoms/MenuPopover";
import { MIconButton } from "../../@material-extend";
import EnglishIcon from "/src/assets/illustrations/flags/ic_flag_en.svg";
import GermanIcon from "/src/assets/illustrations/flags/ic_flag_de.svg";
import FrenchIcon from "/src/assets/illustrations/flags/ic_flag_fr.svg";
import { useTheme } from "@mui/system";

const LANGS = [
  {
    value: "en",
    label: "English",
    icon: <EnglishIcon />,
  },
  {
    value: "de",
    label: "German",
    icon: <GermanIcon />,
  },
  {
    value: "fr",
    label: "French",
    icon: <FrenchIcon />,
  },
];

export default function LanguagePopover() {
  const [open, setOpen] = useState(false);
  const anchorRef = useRef(null);
  const theme = useTheme();

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <MIconButton
        ref={anchorRef}
        onClick={handleOpen}
        sx={{
          padding: 0,
          width: 44,
          height: 44,
          ...(open && {
            bgcolor: (theme) =>
              alpha(
                theme.palette.primary.main,
                theme.palette.action.focusOpacity
              ),
          }),
        }}
      >
        {LANGS[0].icon}
      </MIconButton>

      <MenuPopover
        open={open}
        onClose={handleClose}
        anchorEl={anchorRef.current}
        sx={{
          mt: 1.5,
          ml: 0.75,
          width: 180,
          "& .MuiMenuItem-root": {
            px: 1,
            typography: "body2",
            borderRadius: 0.75,
          },
        }}
      >
        <Stack sx={{ p: 0.75 }}>
          {LANGS.map((option) => (
            <MenuItem
              key={option.value}
              selected={option.value === LANGS[0].value}
              onClick={handleClose}
              sx={{
                my: theme.spacing(0.4),
                px: 2.5,
                borderRadius: theme.spacing(1),
              }}
            >
              <ListItemIcon>{option.icon}</ListItemIcon>
              <ListItemText primaryTypographyProps={{ variant: "body2" }}>
                {option.label}
              </ListItemText>
            </MenuItem>
          ))}
        </Stack>
      </MenuPopover>
    </>
  );
}
