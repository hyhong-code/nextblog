import { Typography } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import { Fragment } from "react";

import SideTabs from "./SideTabs";
import restrictToAdmin from "../../utils/restrictToAdmin";

const Layout = ({ children }) => {
  return (
    <Fragment>
      <Typography variant="h4" component="h1">
        Admin Dashboard
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={3}>
          <SideTabs />
        </Grid>
        <Grid item xs={9}>
          {children}
        </Grid>
      </Grid>
    </Fragment>
  );
};

export default Layout;

export const getServerSideProps = async ({ req, res }) => {
  const access = await restrictToAdmin({ req, res });

  return {
    props: {
      access,
    },
  };
};
