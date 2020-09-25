import Head from "next/head";
import { Fragment, useEffect } from "react";
import { CssBaseline, ThemeProvider } from "@material-ui/core";

import Container from "@material-ui/core/Container";

import Layout from "../components/Layout";
import theme from "../mui/theme";

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
      </ThemeProvider>
    </Fragment>
  );
};

export default MyApp;
