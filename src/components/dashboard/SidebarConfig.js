import { Icon } from "@iconify/react";
import homeIcon from "@iconify/icons-eva/home-outline";
import journalIcon from "@iconify/icons-eva/book-outline";
import messageIcon from "@iconify/icons-eva/message-square-outline";
import userIcon from "@iconify/icons-eva/person-outline";

import { PAGE_PATH } from "../../constants/navigationConstants";

const sidebarConfig = [
  {
    subheader: "general",
    items: [
      {
        title: "Home",
        path: PAGE_PATH.HOME,
        icon: <Icon icon={homeIcon} width={20} height={20} />,
      },
      {
        title: "Journal",
        path: PAGE_PATH.JOURNAL,
        icon: <Icon icon={journalIcon} width={20} height={20} />,
      },
      {
        title: "Messages",
        path: PAGE_PATH.MESSAGES,
        icon: <Icon icon={messageIcon} width={20} height={20} />,
      },
    ],
  },

  {
    subheader: "Account",
    items: [
      {
        title: "user",
        path: "/",
        icon: <Icon icon={userIcon} width={20} height={20} />,
        children: [
          { title: "Four", path: "/" },
          { title: "Five", path: "/" },
          { title: "Six", path: "/" },
        ],
      },
    ],
  },
];

export default sidebarConfig;
