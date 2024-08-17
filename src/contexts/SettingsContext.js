import { useState, useEffect, createContext } from "react";
import { useSelector } from "react-redux";
import { db } from "../handlers/firebaseClient";
import { doc, getDoc, setDoc } from "firebase/firestore";
import PropTypes from "prop-types";
import useLocalStorage from "../hooks/useLocalStorage";
import palette from "../theme/palette";

const PRIMARY_COLOR = [
  // DEFAULT
  {
    name: "default",
    ...palette.light.primary,
  },
  // PURPLE
  {
    name: "purple",
    lighter: "#EBD6FD",
    light: "#B985F4",
    main: "#7635dc",
    dark: "#431A9E",
    darker: "#200A69",
    contrastText: "#fff",
  },
  // CYAN
  {
    name: "cyan",
    lighter: "#D1FFFC",
    light: "#76F2FF",
    main: "#1CCAFF",
    dark: "#0E77B7",
    darker: "#053D7A",
    contrastText: palette.light.grey[800],
  },
  // BLUE
  {
    name: "blue",
    lighter: "#CCDFFF",
    light: "#6697FF",
    main: "#0045FF",
    dark: "#0027B7",
    darker: "#00137A",
    contrastText: "#fff",
  },
  // ORANGE
  {
    name: "orange",
    lighter: "#FEF4D4",
    light: "#FED680",
    main: "#fda92d",
    dark: "#B66816",
    darker: "#793908",
    contrastText: palette.light.grey[800],
  },
  // RED
  {
    name: "red",
    lighter: "#FFE3D5",
    light: "#FFC1AC",
    main: "#FF3030",
    dark: "#B71833",
    darker: "#7A0930",
    contrastText: "#fff",
  },
];

SetColor.propTypes = {
  themeColor: PropTypes.oneOf([
    "default",
    "purple",
    "cyan",
    "blue",
    "orange",
    "red",
  ]),
};

function SetColor(themeColor) {
  let color;
  const DEFAULT = PRIMARY_COLOR[0];
  const PURPLE = PRIMARY_COLOR[1];
  const CYAN = PRIMARY_COLOR[2];
  const BLUE = PRIMARY_COLOR[3];
  const ORANGE = PRIMARY_COLOR[4];
  const RED = PRIMARY_COLOR[5];

  switch (themeColor) {
    case "purple":
      color = PURPLE;
      break;
    case "cyan":
      color = CYAN;
      break;
    case "blue":
      color = BLUE;
      break;
    case "orange":
      color = ORANGE;
      break;
    case "red":
      color = RED;
      break;
    default:
      color = DEFAULT;
  }
  return color;
}

const initialState = {
  themeMode: "light",
  themeDirection: "ltr",
  themeColor: "default",
  themeStretch: false,
  onChangeMode: () => {},
  onChangeDirection: () => {},
  onChangeColor: () => {},
  onToggleStretch: () => {},
  setColor: PRIMARY_COLOR[0],
  colorOption: [],
};

const SettingsContext = createContext(initialState);

SettingsProvider.propTypes = {
  children: PropTypes.node,
};

function SettingsProvider({ children }) {
  const [settings, setSettings] = useLocalStorage("settings", {
    themeMode: initialState.themeMode,
    themeDirection: initialState.themeDirection,
    themeColor: initialState.themeColor,
    themeStretch: initialState.themeStretch,
  });

  const [themeSidebarOpen, setThemeSidebarOpen] = useState(false);

  const uid = useSelector((state) => state.auth.user?.uid);

  useEffect(() => {
    if (!uid) return;

    const getThemeSettings = async () => {
      try {
        const themeSettingsDocRef = doc(db, "settings", uid, "theme", uid);
        const themeSettingsDocSnap = await getDoc(themeSettingsDocRef);

        if (themeSettingsDocSnap.exists()) {
          const data = themeSettingsDocSnap.data();
          setSettings({
            themeMode: data.themeMode || initialState.themeMode,
            themeDirection: data.themeDirection || initialState.themeDirection,
            themeColor: data.themeColor || initialState.themeColor,
            themeStretch: data.themeStretch || initialState.themeStretch,
          });
        }
      } catch (error) {
        console.error("Failed to fetch theme settings:", error);
      }
    };

    getThemeSettings();
  }, [uid]);

  const updateThemeSettings = (updatedSettings) => {
    try {
      const themeSettingsDocRef = doc(db, "settings", uid, "theme", uid);

      setDoc(themeSettingsDocRef, updatedSettings, { merge: true });
    } catch (error) {
      console.error("Failed to save theme settings:", error);
    }
  };

  const onChangeMode = (event) => {
    const updatedSettings = {
      ...settings,
      themeMode: event.target.value,
    };
    setSettings(updatedSettings);
    updateThemeSettings(updatedSettings);
  };

  const onChangeDirection = (event) => {
    const updatedSettings = {
      ...settings,
      themeDirection: event.target.value,
    };
    setSettings(updatedSettings);
    updateThemeSettings(updatedSettings);
  };

  const onChangeColor = (event) => {
    const updatedSettings = {
      ...settings,
      themeColor: event.target.value,
    };
    setSettings(updatedSettings);
    updateThemeSettings(updatedSettings);
  };

  const onToggleStretch = () => {
    const updatedSettings = {
      ...settings,
      themeStretch: !settings.themeStretch,
    };
    setSettings(updatedSettings);
    updateThemeSettings(updatedSettings);
  };

  // Theme Sidebar
  const onToggleThemeSidebar = () => {
    setThemeSidebarOpen((prev) => !prev);
  };

  const onCloseThemeSidebar = () => {
    setThemeSidebarOpen(false);
  };

  return (
    <SettingsContext.Provider
      value={{
        ...settings,
        // Mode
        onChangeMode,
        // Direction
        onChangeDirection,
        // Color
        onChangeColor,
        setColor: SetColor(settings.themeColor),
        colorOption: PRIMARY_COLOR.map((color) => ({
          name: color.name,
          value: color.main,
        })),
        // Stretch
        onToggleStretch,
        // ThemeSidebar
        themeSidebarOpen,
        onToggleThemeSidebar,
        onCloseThemeSidebar,
      }}
    >
      {children}
    </SettingsContext.Provider>
  );
}

export { SettingsProvider, SettingsContext };
