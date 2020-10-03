import React, { Fragment } from "react";

import { useRouter } from "next/router";
import Head from "next/head";
import NextLink from "next/link";
import { API, DOMAIN, APP_NAME, FB_APP_ID } from "../../config";
import { formatDistance } from "date-fns";
import parse from "html-react-parser";
import ImageFadeIn from "react-image-fade-in";

import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import Chip from "@material-ui/core/Chip";

import axios from "../../utils/axios";

const Blog = ({ blog }) => {
  const head = () => (
    <Head>
      <title>
        {blog.title} | {APP_NAME}
      </title>
      <meta name="description" content={blog.metaDesc} />
      <link rel="canonical" href={`${DOMAIN}/blogs/${blog.slug}`} />
      <meta property="og:title" content={`${blog.title} | ${APP_NAME}`} />
      <meta property="og:description" content={blog.metaDesc} />
      <meta property="og:type" content="website" />
      <meta property="og:url" content={`${DOMAIN}/blogs/${blog.slug}`} />
      <meta property="og:site_name" content={`${APP_NAME}`} />

      <meta property="og:image" content={blog.photo?.url} />
      <meta property="og:image:secure_url" content={blog.photo?.url} />
      <meta property="og:image:type" content="image/jpg" />
      <meta property="fb:app_id" content={FB_APP_ID} />
    </Head>
  );

  return (
    <Fragment>
      {head()}
      <ImageFadeIn
        src={blog.photo?.url}
        alt={blog.title}
        style={{
          width: "100%",
          height: 250,
          objectFit: "cover",
          borderRadius: 5,
          marginBottom: "1rem",
        }}
      />

      <Typography
        variant="h3"
        component="h4"
        gutterBottom
        style={{ fontWeight: 500 }}
      >
        {blog.title}
      </Typography>

      <Typography variant="subtitle1" component="h2" gutterBottom>
        {blog.postedBy.name} |{" "}
        {formatDistance(new Date(blog.createdAt), new Date(), {
          addSuffix: true,
        })}
      </Typography>

      <Box>
        {blog.categories.map((c) => (
          <NextLink key={c.slug} href={`/categories/${c.name}`}>
            <Chip
              label={c.name}
              component="a"
              color="primary"
              style={{ marginRight: "0.5rem" }}
            />
          </NextLink>
        ))}
      </Box>

      <Box style={{ margin: "0.5rem 0 1rem" }}>
        {blog.tags.map((t) => (
          <NextLink key={t.slug} href={`/tags/${t.name}`}>
            <Chip
              label={`#${t.name}`}
              component="a"
              variant="outlined"
              color="secondary"
              style={{ marginRight: "0.5rem" }}
              size="small"
            />
          </NextLink>
        ))}
      </Box>

      <Box>{parse(blog.content)}</Box>
    </Fragment>
  );
};

export default Blog;

export const getStaticProps = async ({ params }) => {
  let blog;
  try {
    const res = await axios.get(`${API}/v1/blogs/${params.slug}`);
    blog = res.data.data.blog;
  } catch (error) {
    console.error("[FETCH BLOG ERROR]", error);
  }

  return {
    props: { blog },
    revalidate: 1,
  };
};

export const getStaticPaths = async () => {
  let paths;
  try {
    const res = await axios.get(`${API}/v1/blogs`);
    paths = res.data.data.blogs.map((b) => ({ params: { slug: b.slug } }));
  } catch (error) {
    console.error("[FETCH BLOG ERROR]", error);
  }
  return {
    paths,
    fallback: true,
  };
};
