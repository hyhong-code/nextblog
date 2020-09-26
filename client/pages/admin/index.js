import { Typography } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import { Fragment } from "react";

import AdminSideTabs from "../../components/AdminSideTabs";
import restrictToAdmin from "../../utils/restrictToAdmin";

const admin = () => {
  return (
    <Fragment>
      <Typography variant="h4" component="h1">
        Admin Dashboard
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={3}>
          <AdminSideTabs />
        </Grid>
        <Grid item xs={9}>
          8
        </Grid>
      </Grid>
    </Fragment>
  );
};

export default admin;

export const getServerSideProps = async ({ req, res }) => {
  const access = await restrictToAdmin({ req, res });

  return {
    props: {
      access,
    },
  };
};
