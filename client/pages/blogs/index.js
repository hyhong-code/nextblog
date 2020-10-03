import { Fragment } from "react";
import NextLink from "next/link";
import { useRouter } from "next/router";
import Head from "next/head";

import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import Chip from "@material-ui/core/Chip";

import axios from "../../utils/axios";
import { API, DOMAIN, APP_NAME, FB_APP_ID } from "../../config";
import BlogCard from "../../components/blogs/BlogCard";

const index = ({
  blogs: preBlogs,
  tags: preTags,
  categories: preCategories,
}) => {
  const router = useRouter();

  const head = () => (
    <Head>
      <title>Developers Blogs | {APP_NAME}</title>
      <meta
        name="description"
        content="Latest software and web development blogs"
      />
      <link rel="canonical" href={`${DOMAIN}${router.pathname}`} />
      <meta property="og:title" content={`Developers Blogs | ${APP_NAME}`} />
      <meta
        property="og:description"
        content="Latest software and web development blogs"
      />
      <meta property="og:type" content="website" />
      <meta property="og:url" content={`${DOMAIN}${router.pathname}`} />
      <meta property="og:site_name" content={`${APP_NAME}`} />

      <meta property="og:image" content="/blog-og-img-1.jpg" />
      <meta property="og:image:secure_url" content="/blog-og-img-1.jpg" />
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
        align="center"
        style={{ fontWeight: 500 }}
        paragraph
      >
        Developers Blogs
      </Typography>

      {/* Categories */}
      <Box
        style={{
          display: "flex",
          justifyContent: "center",
        }}
      >
        {preCategories.map((c) => (
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

      {/* Tags */}
      <Box
        style={{
          margin: "0.5rem 0 1rem",
          display: "flex",
          justifyContent: "center",
        }}
      >
        {preTags.map((t) => (
          <NextLink key={t.slug} href={`/tags/${t.name}`}>
            <Chip
              label={`#${t.name}`}
              component="a"
              variant="outlined"
              color="secondary"
              style={{ marginRight: "0.5rem" }}
            />
          </NextLink>
        ))}
      </Box>

      {/* Blog Card */}
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
