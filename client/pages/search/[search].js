import React, { Fragment } from "react";
import { useRouter } from "next/router";
import NextLink from "next/link";
import { useTheme } from "@material-ui/core";

import Typography from "@material-ui/core/Typography";

import axios from "../../utils/axios";
import { API } from "../../config";

const Search = ({ blogs = [] }) => {
  const router = useRouter();
  const theme = useTheme();

  if (!blogs.length) {
    return (
      <Typography variant="h5" component="h1">
        No search results for "{router.query.search}".
      </Typography>
    );
  }

  return (
    <Fragment>
      <Typography variant="h5" component="h1" paragraph>
        {blogs.length} search results for "{router.query.search}":
      </Typography>
      {blogs.map((b) => (
        <NextLink href={`/blogs/${b.slug}`} key={b._id}>
          <Typography
            component="a"
            gutterBottom
            style={{
              cursor: "pointer",
              color: theme.palette.primary.main,
              display: "block",
              textDecoration: "underline",
            }}
          >
            {b.title}
          </Typography>
        </NextLink>
      ))}
    </Fragment>
  );
};

export default Search;

export const getStaticProps = async ({ params }) => {
  let blogs = [];
  try {
    const res = await axios.get(
      `${API}/v1/blogs/search?search=${params.search}`
    );
    blogs = res.data.data.blogs;
  } catch (error) {
    console.error("[SEARCH BLOG ERROR]", error);
  }

  return {
    props: { blogs },
    revalidate: 1,
  };
};

export const getStaticPaths = async () => {
  return {
    paths: [],
    fallback: true,
  };
};
