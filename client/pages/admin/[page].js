import { Fragment, useContext, useEffect } from "react";
import { useRouter } from "next/router";

import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";

import useProtectedRoute from "../../hooks/useProtectedRoute";
import { AuthContext } from "../../context/authContext";
import axios from "../../utils/axios";
import { API } from "../../config";
import restrictToAdmin from "../../utils/restrictToAdmin";
import SideTabs from "../../components/dashboard/SideTabs";
import Tags from "../../components/admin/Tags";
import Categories from "../../components/admin/Categories";
import Blog from "../../components/dashboard/CreateBlog";
import ManageBlog from "../../components/dashboard/ManageBlogs";
import Profile from "../../components/dashboard/profile";

const Layout = ({ categories, tags, blogs }) => {
  useProtectedRoute("/", "ADMIN");

  const PATH_COMPONENT_MAP = {
    ["/admin/profile"]: <Profile />,
    ["/admin/categories"]: <Categories categories={categories} />,
    ["/admin/tags"]: <Tags tags={tags} />,
    ["/admin/blogs-create"]: <Blog categories={categories} tags={tags} />,
    ["/admin/blogs-manage"]: (
      <ManageBlog blogs={blogs} categories={categories} tags={tags} />
    ),
  };

  const router = useRouter();

  return (
    <Fragment>
      <Typography variant="h4" component="h1" paragraph>
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
    console.error("[FETCH CATEGORIES]", error);
  }

  let tags = [];
  try {
    const res = await axios.get(`${API}/v1/tags`);
    tags = res.data.data.tags;
  } catch (error) {
    console.error("[FETCH TAGS]", error);
  }

  let blogs = [];
  try {
    const res = await axios.get(`${API}/v1/blogs`);
    blogs = res.data.data.blogs;
  } catch (error) {
    console.error("[FETCH USER BLOGS]", error);
  }

  return {
    props: {
      access,
      categories,
      tags,
      blogs,
    },
  };
};
