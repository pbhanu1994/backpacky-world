import { useRef, useState } from "react";
import { alpha } from "@mui/material/styles";
import { Box, MenuItem, ListItemIcon, ListItemText } from "@mui/material";
import { MenuPopover } from "../../atoms/MenuPopover";
import { MIconButton } from "../../@material-extend";
import EnglishIcon from "/src/assets/illustrations/flags/ic_flag_en.svg";
import GermanIcon from "/src/assets/illustrations/flags/ic_flag_de.svg";
import FrenchIcon from "/src/assets/illustrations/flags/ic_flag_fr.svg";

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
  const anchorRef = useRef(null);
  const [open, setOpen] = useState(false);

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
      >
        <Box sx={{ py: 1 }}>
          {LANGS.map((option) => (
            <MenuItem
              key={option.value}
              selected={option.value === LANGS[0].value}
              onClick={handleClose}
              sx={{ py: 1, px: 2.5 }}
            >
              <ListItemIcon>{option.icon}</ListItemIcon>
              <ListItemText primaryTypographyProps={{ variant: "body2" }}>
                {option.label}
              </ListItemText>
            </MenuItem>
          ))}
        </Box>
      </MenuPopover>
    </>
  );
}
