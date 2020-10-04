import React, { Fragment } from "react";
import { useRouter } from "next/router";

import Typography from "@material-ui/core/Typography";

import BlogCard from "../../components/blogs/BlogCard";
import axios from "../../utils/axios";
import { API } from "../../config";

const Search = ({ blogs }) => {
  const router = useRouter();

  if (!blogs.length) {
    return (
      <Typography variant="h3" component="h1">
        No search results for "{router.query.search}".
      </Typography>
    );
  }

  return (
    <Fragment>
      <Typography variant="h3" component="h1" paragraph>
        {blogs.length} search results for "{router.query.search}":
      </Typography>
      {blogs.map((b) => (
        <BlogCard key={b._id} blog={b} />
      ))}
    </Fragment>
  );
};

export default Search;

export const getServerSideProps = async ({ params }) => {
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
    props: {
      blogs,
    },
  };
};
