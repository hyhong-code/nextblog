import { Fragment } from "react";
import Head from "next/head";
import { CssBaseline } from "@material-ui/core";

import Layout from "../components/Layout/Layout";

const MyApp = ({ Component, pageProps }) => {
  return (
    <Fragment>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      <CssBaseline />
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </Fragment>
  );
};

export default MyApp;
