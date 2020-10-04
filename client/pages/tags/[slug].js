import { Fragment } from "react";

import { useTheme } from "@material-ui/core";
import Typography from "@material-ui/core/Typography";

import axios from "../../utils/axios";
import { API } from "../../config";
import BlogCard from "../../components/blogs/BlogCard";

const Tags = ({ tag = {}, blogs = [] }) => {
  const theme = useTheme();
  return (
    <Fragment>
      <Typography
        variant="h3"
        component="h1"
        gutterBottom
        style={{ fontWeight: 500 }}
      >
        Categorie:{" "}
        <span style={{ color: theme.palette.secondary.main }}>{tag.name}</span>
      </Typography>
      <Typography variant="h5" component="h2" paragraph>
        Related Blogs:
      </Typography>

      {/* Related Blogs */}
      {blogs.map((b) => (
        <BlogCard key={b._id} blog={b} />
      ))}
    </Fragment>
  );
};

export default Tags;

export const getStaticProps = async ({ params }) => {
  let tag = {};
  try {
    const res = await axios.get(`${API}/v1/tags/${params.slug}`);
    tag = res.data.data.tag;
  } catch (error) {
    console.error("[FETCH TAG ERROR]", error);
  }

  let blogs = [];
  try {
    const res = await axios.get(`${API}/v1/tags/${tag._id}/blogs`);
    blogs = res.data.data.blogs;
  } catch (error) {
    console.error("[FETCH BLOGS BY TAGS ERROR]", error);
  }

  return {
    props: {
      tag,
      blogs,
    },
    revalidate: 1,
  };
};

export const getStaticPaths = async () => {
  let paths = [];

  try {
    const res = await axios.get(`${API}/v1/tags`);
    paths = res.data.data.tags.map((t) => ({ params: { slug: t.slug } }));
  } catch (error) {
    console.error("[FETCH CATEGOIES ERROR]", error);
  }

  return {
    paths,
    fallback: true,
  };
};
