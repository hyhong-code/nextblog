import Head from "next/head";
import Link from "next/link";
import { formatDistance } from "date-fns";

import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";

import axios from "../../utils/axios";
import { API, APP_NAME, DOMAIN, FB_APP_ID } from "../../config";
import { Avatar, Button, Card, CardContent } from "@material-ui/core";
import { Fragment } from "react";

const Username = ({ profile = {}, blogsByUser = [] }) => {
  const head = () => (
    <Head>
      <title>
        {profile.username} | {APP_NAME}
      </title>
      <meta
        name="description"
        content={`Blogs by ${profile.username} on ${APP_NAME}`}
      />
      <link rel="canonical" href={`${DOMAIN}/profile/${profile.username}`} />

      {/* Open Graph Meta */}
      <meta property="og:title" content={`${profile.username} | ${APP_NAME}`} />
      <meta
        property="og:description"
        content={`Blogs by ${profile.username} on ${APP_NAME}`}
      />
      <meta property="og:type" content="website" />
      <meta
        property="og:url"
        content={`${DOMAIN}/profile/${profile.username}`}
      />
      <meta property="og:site_name" content={APP_NAME} />

      {/* Open Graph Image */}
      <meta property="og:image" content={blogsByUser[0]?.photo?.url} />
      <meta
        property="og:image:secure_url"
        content={blogsByUser[0]?.photo?.url}
      />
      <meta property="og:image:type" content="image/jpg" />
      <meta property="fb:app_id" content={FB_APP_ID} />
    </Head>
  );

  return (
    <Fragment>
      {head()}
      <Box>
        <Card elevation={3} style={{ marginBottom: "2rem" }}>
          <CardContent style={{ display: "flex" }}>
            <Avatar style={{ height: 150, width: 150, marginRight: "2rem" }} />
            <Box>
              <Typography variant="h5">@{profile.username}</Typography>
              <Typography>{profile.name}</Typography>
              <Typography>
                Joined{" "}
                {formatDistance(
                  new Date(profile.createdAt || Date.now()),
                  new Date(),
                  {
                    addSuffix: true,
                  }
                )}
              </Typography>
              <Button>Show Profile</Button>
            </Box>
          </CardContent>
        </Card>

        <Grid container spacing={4}>
          {/* Blog Links */}
          <Grid item xs>
            <Card elevation={3}>
              <CardContent>
                {blogsByUser.map((b) => (
                  <Link key={b._id} href={`/blogs/${b.slug}`}>
                    <a style={{ display: "block", marginBottom: "0.5rem" }}>
                      {b.title}
                    </a>
                  </Link>
                ))}
              </CardContent>
            </Card>
          </Grid>

          {/* Contact Form */}
          <Grid item xs>
            <Card elevation={3}>
              <CardContent>Contact Form</CardContent>
            </Card>
          </Grid>
        </Grid>
      </Box>
    </Fragment>
  );
};

export default Username;

export const getStaticProps = async ({ params }) => {
  let profile = {};
  try {
    const res = await axios.get(`${API}/v1/users/${params.username}`);
    profile = res.data.data.user;
  } catch (error) {
    console.error("[GET USER PROFILE ERROR]", error);
  }

  let blogsByUser = [];
  try {
    const res = await axios.get(`${API}/v1/users/${profile._id}/blogs`);
    blogsByUser = res.data.data.blogs;
  } catch (error) {
    console.error("[GET BLOGS BY USER ERROR]", error);
  }

  return {
    props: { profile, blogsByUser },
    revalidate: 1,
  };
};

export const getStaticPaths = async () => {
  let paths = [];
  try {
    const res = await axios.get(`${API}/v1/users`);
    paths = res.data.data.users.slice(0, 4).map((u) => ({
      params: { username: u.username },
    }));
  } catch (error) {
    console.error("[LIST USERS ERROR]", error);
  }

  return {
    paths,
    fallback: true,
  };
};
