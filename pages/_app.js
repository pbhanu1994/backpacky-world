import React, { useEffect } from "react";
import dynamic from "next/dynamic";
import App from "next/app";
import Head from "next/head";
import { Provider } from "react-redux";
import { createWrapper } from "next-redux-wrapper";
import store from "../src/store/store";
import ThemeConfig from "../src/theme";
import { AuthProvider } from "../src/handlers/auth";
import "../styles/globals.css";

// Importing the component dynamic (Chunk) with no SSR (Only Client Side)
const Toast = dynamic(
  () => import("../src/components/atoms/Toast").then((mod) => mod.Toast),
  {
    ssr: false,
  }
);

function MyApp({ Component, pageProps, ...rest }) {
  useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector("#jss-server-side");
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
  }, []);

  return (
    <React.Fragment>
      <Head>
        <title>My page</title>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width"
        />
      </Head>
      <Provider store={store}>
        <ThemeConfig>
          <AuthProvider>
            <Component {...pageProps} />
            {/* Adding the Toast, dialog box - modals, etc. */}
            <Toast />
          </AuthProvider>
        </ThemeConfig>
      </Provider>
    </React.Fragment>
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
