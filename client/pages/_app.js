import { Fragment, useEffect } from "react";
import Head from "next/head";
import Router from "next/router";
import { CssBaseline, ThemeProvider } from "@material-ui/core";
import { ToastContainer } from "react-toastify";
import NProgress from "nprogress";
import "react-toastify/dist/ReactToastify.css";
import "nprogress/nprogress.css";

import Container from "@material-ui/core/Container";

import Layout from "../components/Layout";
import theme from "../mui/theme";
import "../styles/app.css";

// Binding events for NProgress
Router.events.on("routeChangeStart", () => NProgress.start());
Router.events.on("routeChangeComplete", () => NProgress.done());
Router.events.on("routeChangeError", () => NProgress.done());

const MyApp = ({ Component, pageProps }) => {
  useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector("#jss-server-side");
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
  }, []);

  return (
    <Fragment>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Layout>
          <Container style={{ paddingTop: "2rem" }}>
            <Component {...pageProps} />
          </Container>
        </Layout>
        <ToastContainer bodyStyle={{ fontFamily: "'Rubik', sans-serif" }} />
      </ThemeProvider>
    </Fragment>
  );
};

export default MyApp;
