import { Fragment } from "react";

import { useTheme } from "@material-ui/core";
import Typography from "@material-ui/core/Typography";

import axios from "../../utils/axios";
import { API } from "../../config";
import BlogCard from "../../components/blogs/BlogCard";

const Categories = ({ category = {}, blogs = [] }) => {
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
        <span style={{ color: theme.palette.primary.main }}>
          {category.name}
        </span>
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

export default Categories;

export const getStaticProps = async ({ params }) => {
  let category = {};
  try {
    const res = await axios.get(`${API}/v1/categories/${params.slug}`);
    category = res.data.data.category;
  } catch (error) {
    console.error("[FETCH CATEGORY ERROR]", error);
  }

  let blogs = [];
  try {
    const res = await axios.get(`${API}/v1/categories/${category._id}/blogs`);
    blogs = res.data.data.blogs;
  } catch (error) {
    console.error("[FETCH BLOGS BY CATEGORY ERROR]", error);
  }

  return {
    props: {
      category,
      blogs,
    },
    revalidate: 1,
  };
};

export const getStaticPaths = async () => {
  let paths = [];

  try {
    const res = await axios.get(`${API}/v1/categories`);
    paths = res.data.data.categories.map((c) => ({ params: { slug: c.slug } }));
  } catch (error) {
    console.error("[FETCH CATEGOIES ERROR]", error);
  }

  return {
    paths,
    fallback: true,
  };
};
