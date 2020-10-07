import { Fragment } from "react";
import { useRouter } from "next/router";
import Head from "next/head";

import { useTheme } from "@material-ui/core";
import Typography from "@material-ui/core/Typography";

import axios from "../../utils/axios";
import { API, APP_NAME, DOMAIN, FB_APP_ID } from "../../config";
import BlogCard from "../../components/blogs/BlogCard";

const Tags = ({ tag = {}, blogs = [] }) => {
  const router = useRouter();
  const head = () => (
    <Head>
      <title>
        {tag.name} | {APP_NAME}
      </title>
      <meta name="description" content={`All blogs with tag ${tag.name}`} />
      <link rel="canonical" ref={`${DOMAIN}${router.asPath}`} />

      <meta property="og:title" content={`${tag.name} | ${APP_NAME}`} />
      <meta
        property="og:description"
        content={`All blogs with tag ${tag.name}`}
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

  const theme = useTheme();
  return (
    <Fragment>
      {head()}
      <Typography
        variant="h3"
        component="h1"
        gutterBottom
        style={{ fontWeight: 500 }}
      >
        Tag:{" "}
        <span style={{ color: theme.palette.secondary.main }}>#{tag.name}</span>
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
    paths = res.data.data.tags
      .slice(0, 4)
      .map((t) => ({ params: { slug: t.slug } }));
  } catch (error) {
    console.error("[FETCH CATEGOIES ERROR]", error);
  }

  return {
    paths,
    fallback: true,
  };
};
