import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Box from "@material-ui/core/Box";
import Skeleton from "@material-ui/lab/Skeleton";

const BlogCardSkeleton = () => {
  return (
    <Paper
      elevation={3}
      component="article"
      style={{ padding: "1.5rem 2rem", marginBottom: "2rem" }}
    >
      {/* Blog Title */}
      <header>
        <Skeleton height={60} width="80%" />
      </header>
      <section style={{ marginTop: -5 }}>
        {/* Created by and date */}
        <Skeleton height={40} width="30%" />
      </section>
      <section style={{ marginTop: -5 }}>
        {/* Categories */}
        <Box>
          {Array.from({ length: 4 }).map((_, idx) => (
            <Skeleton
              key={idx}
              height={40}
              style={{
                marginRight: "1rem",
                width: "5rem",
                borderRadius: "15px",
                display: "inline-block",
              }}
            />
          ))}
        </Box>
        {/* Tags */}
        <Box style={{ marginTop: -5 }}>
          {Array.from({ length: 2 }).map((_, idx) => (
            <Skeleton
              key={idx}
              height={30}
              style={{
                marginRight: "1rem",
                width: "5rem",
                borderRadius: "15px",
                display: "inline-block",
              }}
            />
          ))}
        </Box>
      </section>
      <Grid container spacing={3}>
        <Grid item xs={4}>
          {/* Image */}
          <Skeleton height={150} style={{ borderRadius: 5 }} />
        </Grid>
        <Grid item xs={8}>
          <section>
            {/* Excerpt */}
            <Skeleton />
            <Skeleton />
            <Skeleton width="75%" />

            {/* Read More Action */}
            <Skeleton height={50} width="7.5rem" />
          </section>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default BlogCardSkeleton;
