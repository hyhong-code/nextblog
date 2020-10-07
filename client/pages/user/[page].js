import { Fragment } from "react";
import { useRouter } from "next/router";

import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";

import useProtectedRoute from "../../hooks/useProtectedRoute";
import axios from "../../utils/axios";
import { API } from "../../config";
import restrictToUser from "../../utils/restrictToUser";
import SideTabs from "../../components/dashboard/SideTabs";
import Profile from "../../components/dashboard/profile";
import Blog from "../../components/dashboard/CreateBlog";
import ManageBlog from "../../components/dashboard/ManageBlogs";
import extractCookieValue from "../../utils/extractCookieValue";

const Layout = ({ categories, tags, userBlogs }) => {
  useProtectedRoute("/", "USER");

  const PATH_COMPONENT_MAP = {
    ["/user/profile"]: <Profile />,
    ["/user/blogs-create"]: <Blog categories={categories} tags={tags} />,
    ["/user/blogs-manage"]: (
      <ManageBlog blogs={userBlogs} categories={categories} tags={tags} />
    ),
  };

  const router = useRouter();

  return (
    <Fragment>
      <Typography variant="h4" component="h1" paragraph>
        User Dashboard
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={3}>
          <SideTabs isAdmin={false} />
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
  const access = await restrictToUser({ req, res });

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

  let userBlogs = [];
  try {
    const res = await axios.get(`${API}/v1/blogs/me`, {
      headers: {
        authorization: `Bearer ${extractCookieValue(
          req.headers.cookie,
          "AUTH_TOKEN"
        )}`,
      },
    });
    userBlogs = res.data.data.blogs;
  } catch (error) {
    console.error("[FETCH USER BLOGS]", error);
  }

  return {
    props: {
      access,
      categories,
      tags,
      userBlogs,
    },
  };
};
