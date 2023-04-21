import { useRef, useState, useCallback, useEffect } from "react";
import { Icon } from "@iconify/react";
import peopleFill from "@iconify/icons-eva/people-fill";
import { alpha } from "@mui/material/styles";
import {
  Avatar,
  Typography,
  ListItemText,
  ListItemButton,
  ListItemAvatar,
  Stack,
} from "@mui/material";
import axios from "axios";
import useIsMountedRef from "/src/hooks/useIsMountedRef";
import { fToNow } from "/src/utils/formatTime";
import { MenuPopover } from "/src/components/atoms/MenuPopover";
import Scrollbar from "/src/components/atoms/Scrollbar";
import BadgeStatus from "/src/components/atoms/BadgeStatus";
import { MIconButton } from "/src/components/@material-extend";
import { useTheme } from "@mui/system";

const ITEM_HEIGHT = 64;
const PADDING_ITEM = 2.5;

export default function ContactsPopover() {
  const anchorRef = useRef(null);
  const isMountedRef = useIsMountedRef();
  const [open, setOpen] = useState(false);
  const [contacts, setContacts] = useState([]);
  const theme = useTheme();

  const getContacts = useCallback(async () => {
    try {
      const response = await axios.get("/api/contacts");

      if (isMountedRef.current) {
        setContacts(response.data.contacts);
      }
    } catch (error) {
      console.error(error);
    }
  }, [isMountedRef]);

  useEffect(() => {
    getContacts();
  }, [getContacts]);

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
        size="large"
        color={open ? "primary" : "default"}
        onClick={handleOpen}
        sx={{
          ...(open && {
            bgcolor: (theme) =>
              alpha(
                theme.palette.primary.main,
                theme.palette.action.focusOpacity
              ),
          }),
        }}
      >
        <Icon icon={peopleFill} width={20} height={20} />
      </MIconButton>

      <MenuPopover
        open={open}
        onClose={handleClose}
        anchorEl={anchorRef.current}
        sx={{ width: 360 }}
      >
        <Typography variant="h6" sx={{ p: PADDING_ITEM }}>
          Contacts <Typography component="span">({contacts.length})</Typography>
        </Typography>

        <Scrollbar sx={{ height: ITEM_HEIGHT * 6 }}>
          <Stack sx={{ p: 1 }}>
            {contacts.map((contact) => {
              const { id, name, avatar, status, lastActivity } = contact;

              return (
                <ListItemButton
                  key={id}
                  sx={{
                    px: PADDING_ITEM,
                    height: ITEM_HEIGHT,
                    borderRadius: theme.spacing(1),
                  }}
                >
                  <ListItemAvatar sx={{ position: "relative" }}>
                    <Avatar src={avatar} />
                    <BadgeStatus
                      status={status}
                      sx={{ position: "absolute", right: 1, bottom: 1 }}
                    />
                  </ListItemAvatar>
                  <ListItemText
                    primaryTypographyProps={{
                      typography: "subtitle2",
                      mb: 0.25,
                    }}
                    secondaryTypographyProps={{ typography: "caption" }}
                    primary={name}
                    secondary={status === "offline" && fToNow(lastActivity)}
                  />
                </ListItemButton>
              );
            })}
          </Stack>
        </Scrollbar>
      </MenuPopover>
    </>
  );
}
