import NextLink from "next/link";
import ImageFadeIn from "react-image-fade-in";
import { formatDistance } from "date-fns";

import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import Chip from "@material-ui/core/Chip";
import Box from "@material-ui/core/Box";

const BlogCard = ({ blog }) => {
  return (
    <Paper
      elevation={3}
      component="article"
      style={{ padding: "1.5rem 2rem", marginBottom: "2rem" }}
    >
      {/* Blog Title */}
      <header>
        <NextLink href={`/blogs/${blog.slug}`}>
          <Typography
            component="a"
            variant="h4"
            component="h2"
            style={{ cursor: "pointer" }}
            gutterBottom
          >
            {blog.title}
          </Typography>
        </NextLink>
      </header>
      <section>
        {/* Created by and date */}
        <Typography variant="subtitle1" color="textSecondary" gutterBottom>
          Published by{" "}
          <NextLink href={`/profile/${blog.postedBy.username}`}>
            <a>@{blog.postedBy.username}</a>
          </NextLink>{" "}
          |{" "}
          {formatDistance(new Date(blog.updatedAt), new Date(), {
            addSuffix: true,
          })}
        </Typography>
      </section>
      <section>
        {/* Categories */}
        <Box>
          {blog.categories.map((c) => (
            <NextLink key={c.slug} href={`/categories/${c.slug}`}>
              <Chip
                label={c.name}
                component="a"
                color="primary"
                style={{ marginRight: "0.5rem" }}
                size="small"
              />
            </NextLink>
          ))}
        </Box>
        {/* Tags */}
        <Box style={{ margin: "0.5rem 0 1rem" }}>
          {blog.tags.map((t) => (
            <NextLink key={t.slug} href={`/tags/${t.slug}`}>
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
      </section>
      <Grid container spacing={3}>
        <Grid item xs={4}>
          {/* Photo */}
          <ImageFadeIn
            transition={1000}
            src={blog.photo?.url}
            alt={blog.title}
            height={150}
            style={{
              height: 150,
              width: "100%",
              objectFit: "cover",
              borderRadius: 5,
            }}
          />
        </Grid>
        <Grid item xs={8}>
          <section>
            {/* Excerpt */}
            <Typography variant="body1" gutterBottom>
              {blog.excerpt}
            </Typography>
            <NextLink href={`/blogs/${blog.slug}`}>
              {/* Read More Action */}
              <Button component="a" color="primary" variant="contained">
                Read More
              </Button>
            </NextLink>
          </section>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default BlogCard;
