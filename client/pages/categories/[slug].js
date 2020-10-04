import { Fragment } from "react";
import Head from "next/head";
import { useRouter } from "next/router";

import { useTheme } from "@material-ui/core";
import Typography from "@material-ui/core/Typography";

import axios from "../../utils/axios";
import { API, APP_NAME, FB_APP_ID, DOMAIN } from "../../config";
import BlogCard from "../../components/blogs/BlogCard";

const Categories = ({ category = {}, blogs = [] }) => {
  const theme = useTheme();
  const router = useRouter();

  const head = () => (
    <Head>
      <title>
        {category.name} | {APP_NAME}
      </title>
      <meta
        name="description"
        content={`All blogs related to ${category.name}`}
      />
      <link rel="canonical" ref={`${DOMAIN}${router.asPath}`} />

      <meta property="og:title" content={`${category.name} | ${APP_NAME}`} />
      <meta
        property="og:description"
        content={`All blogs related to ${category.name}`}
      />
      <meta property="og:type" content="website" />
      <meta property="og:url" content={`${DOMAIN}${router.asPath}`} />
      <meta property="og:site_name" content={APP_NAME} />

      <meta property="og:image" content={`${DOMAIN}/blog-og-img-2.jpg`} />
      <meta
        property="og:image:secure_url"
        content={`${DOMAIN}/blog-og-img-2.jpg`}
      />
      <meta property="og:image:type" content="image/jpg" />
      <meta property="fb:app_id" content={FB_APP_ID} />
    </Head>
  );

  return (
    <Fragment>
      {head()}
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
