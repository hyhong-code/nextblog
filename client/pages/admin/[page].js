import { Typography } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import { Fragment } from "react";
import { useRouter } from "next/router";
import React from "react";
import axios from "../../utils/axios";
import { API } from "../../config";

import SideTabs from "../../components/admin/SideTabs";
import restrictToAdmin from "../../utils/restrictToAdmin";

import Tags from "../../components/admin/Tags";
import Categories from "../../components/admin/Categories";

const Layout = ({ categories }) => {
  const PATH_COMPONENT_MAP = {
    ["/admin/categories"]: <Categories categories={categories} />,
    ["/admin/tags"]: <Tags />,
  };

  const router = useRouter();

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
          {PATH_COMPONENT_MAP[router.asPath]}
        </Grid>
      </Grid>
    </Fragment>
  );
};

export default Layout;

export const getServerSideProps = async ({ req, res }) => {
  const access = await restrictToAdmin({ req, res });

  let categories = [];
  try {
    const res = await axios.get(`${API}/v1/categories`);
    categories = res.data.data.categories;
  } catch (error) {
    console.error("[ADMIN CATEGORY CREATE]", error);
  }

  return {
    props: {
      access,
      categories,
    },
  };
};
