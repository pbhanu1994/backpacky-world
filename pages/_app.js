import React, { useEffect } from "react";
import dynamic from "next/dynamic";
import App from "next/app";
import Head from "next/head";
import cookie from "js-cookie";
import { auth } from "../src/handlers/firebaseClient";
import { CacheProvider } from "@emotion/react";
import { Provider } from "react-redux";
import { createWrapper } from "next-redux-wrapper";
import { PersistGate } from "redux-persist/integration/react";
import store, { persistor } from "../src/store/store";
import ThemeConfig from "../src/theme";
import GlobalStyles from "../src/theme/globalStyles";
import createEmotionCache from "../src/handlers/createEmotionCache";
import ThemePrimaryColor from "../src/components/ThemePrimaryColor";
import Settings from "../src/components/templates/Settings";
import RtlLayout from "../src/components/atoms/RtlLayout";
// material
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";

// contexts
import { SettingsProvider } from "../src/contexts/SettingsContext";
import { CollapseDrawerProvider } from "../src/contexts/CollapseDrawerContext";
import "../styles/globals.css";
// Scrollbar
import "simplebar-react/dist/simplebar.min.css";

// Importing the component dynamic (Chunk) with no SSR (Only Client Side)
const Toast = dynamic(() => import("../src/components/atoms/Toast"), {
  ssr: false,
});

const Dialog = dynamic(() => import("../src/components/atoms/DialogBox"), {
  ssr: false,
});

const clientSideEmotionCache = createEmotionCache();

function MyApp(props) {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;

  // Listening to Firebase Authentication - onIdTokenChanged
  useEffect(() => {
    return auth.onIdTokenChanged(async (user) => {
      if (!user) {
        cookie.remove("__session");
        return;
      }
      const token = await user.getIdToken();
      cookie.set("__session", token);
    });
  }, []);

  useEffect(() => {
    const handle = setInterval(async () => {
      const user = auth.currentUser;
      if (user) await user.getIdToken(true);
    }, 10 * 60 * 1000);

    return () => clearInterval(handle);
  }, []);

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <SettingsProvider>
            <CollapseDrawerProvider>
              <CacheProvider value={emotionCache}>
                <Head>
                  <meta
                    name="viewport"
                    content="minimum-scale=1, initial-scale=1, width=device-width"
                  />
                </Head>
                <ThemeConfig>
                  <ThemePrimaryColor>
                    <RtlLayout>
                      <GlobalStyles />
                      <Settings />
                      <Component {...pageProps} />
                      {/* Adding the Toast, dialog box - modals, etc. */}
                      <Toast selector="#toast" />
                      <Dialog selector="#dialog" />
                    </RtlLayout>
                  </ThemePrimaryColor>
                </ThemeConfig>
              </CacheProvider>
            </CollapseDrawerProvider>
          </SettingsProvider>
        </PersistGate>
      </Provider>
    </LocalizationProvider>
  );
}

MyApp.getInitialProps = async (appContext) => {
  // calls page's `getInitialProps` and fills `appProps.pageProps`
  const appProps = await App.getInitialProps(appContext);

  return { ...appProps };
};

const makeStore = () => store;
const wrapper = createWrapper(makeStore);
export default wrapper.withRedux(MyApp);
