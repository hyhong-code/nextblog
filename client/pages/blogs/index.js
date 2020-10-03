import { Fragment } from "react";

import Typography from "@material-ui/core/Typography";

import axios from "../../utils/axios";
import { API } from "../../config";
import BlogCard from "../../components/blogs/BlogCard";

const index = ({ blogs: preBlogs, tags: preTags, categories: categories }) => {
  return (
    <Fragment>
      <Typography
        variant="h3"
        component="h1"
        align="center"
        style={{ fontWeight: 500, marginBottom: "2rem" }}
      >
        Developer Blogs
      </Typography>

      {preBlogs.map((blog) => (
        <BlogCard blog={blog} key={blog._id} />
      ))}
    </Fragment>
  );
};

export default index;

export const getStaticProps = async (ctx) => {
  let blogs = [];
  let tags = [];
  let categories = [];
  let count = 0;

  try {
    const res = await axios.get(`${API}/v1/blogs/scan`);
    blogs = res.data.data.blogs;
    tags = res.data.data.tags;
    categories = res.data.data.categories;
  } catch (error) {
    console.error("[FETCH BLOGS ERROR]", error);
  }

  return {
    props: {
      blogs,
      tags,
      categories,
      count,
    },
    revalidate: 1,
  };
};
