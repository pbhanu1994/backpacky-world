import { Icon } from "@iconify/react";
import homeIcon from "@iconify/icons-eva/home-outline";
import planIcon from "@iconify/icons-eva/file-text-outline";
import journalIcon from "@iconify/icons-eva/book-outline";
import travelBudgetIcon from "@iconify/icons-ic/outline-attach-money";
import chatIcon from "@iconify/icons-eva/message-circle-outline";
import calendarIcon from "@iconify/icons-eva/calendar-outline";
import userIcon from "@iconify/icons-eva/person-outline";

import { PAGE_PATH } from "/src/constants/navigationConstants";

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
        title: "Plan",
        path: PAGE_PATH.PLAN,
        icon: <Icon icon={planIcon} width={20} height={20} />,
      },
      {
        title: "Journal",
        path: PAGE_PATH.JOURNAL,
        icon: <Icon icon={journalIcon} width={20} height={20} />,
      },
      {
        title: "Travel Budget",
        path: PAGE_PATH.TRAVEL_BUDGET,
        icon: <Icon icon={travelBudgetIcon} width={20} height={20} />,
      },
      {
        title: "Chat",
        path: PAGE_PATH.CHAT,
        icon: <Icon icon={chatIcon} width={20} height={20} />,
      },
      {
        title: "Calendar",
        path: PAGE_PATH.CALENDAR,
        icon: <Icon icon={calendarIcon} width={20} height={20} />,
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
