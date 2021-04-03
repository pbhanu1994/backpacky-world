import withRedux from 'next-redux-wrapper';
import initStore from '../redux/store';
import App from 'next/app';
import '../styles/globals.css'

function MyApp({ Component, pageProps, store, ...rest }) {
  return (
    // <Provider store={initStore}>
      <Component {...pageProps} />
    // </Provider>
  )
}

MyApp.getInitialProps = async (appContext) => {
  // calls page's `getInitialProps` and fills `appProps.pageProps`
  const appProps = await App.getInitialProps(appContext);

  return { ...appProps }
}

export default withRedux(initStore)(MyApp);
