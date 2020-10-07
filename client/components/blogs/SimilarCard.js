import NextLink from "next/link";
import Image from "react-image-fade-in";
import { formatDistance } from "date-fns";

import Typography from "@material-ui/core/Typography";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardActionArea from "@material-ui/core/CardActionArea";

const SimilarCard = ({ blog }) => {
  return (
    <Card elevation={3} component="article">
      <NextLink href={`/blogs/${blog.slug}`}>
        <CardActionArea component="a">
          <CardContent style={{ minHeight: "22.5rem" }}>
            {/* Blog Title */}
            <header>
              <NextLink href={`/blogs/${blog.slug}`}>
                <Typography
                  component="a"
                  variant="h5"
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
              <Typography
                color="textSecondary"
                gutterBottom
                style={{ fontSize: "0.9rem" }}
              >
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

            {blog.photo && (
              <Image
                transition={1000}
                src={blog.photo?.url}
                alt={blog.title}
                style={{
                  height: 150,
                  width: "100%",
                  objectFit: "cover",
                  borderRadius: 5,
                }}
              />
            )}

            <section>
              {/* Excerpt */}
              <Typography variant="body1" gutterBottom>
                {blog.excerpt}
              </Typography>
            </section>
          </CardContent>
        </CardActionArea>
      </NextLink>
    </Card>
  );
};

export default SimilarCard;
