import { useState, Fragment } from "react";
import dynamic from "next/dynamic";
import { DropzoneArea } from "material-ui-dropzone";
import { toast } from "react-toastify";
import ImageFadeIn from "react-image-fade-in";
import { useRouter } from "next/router";
import NextLink from "next/link";

// Only import reactQuill on client side
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

import TextField from "@material-ui/core/TextField";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import CircularProgress from "@material-ui/core/CircularProgress";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";

import axios from "../../utils/axios";
import { API } from "../../config";
import resizeFile from "../../utils/resizeFile";
import { quillModules, quillFormats } from "../../utils/quillOptions";

const Blog = ({
  categories: preCategories = [],
  tags: preTags = [],
  blog = {},
}) => {
  const router = useRouter();

  const setInitialCategories = preCategories.reduce((acc, cur) => {
    if (blog.categories?.map((b) => b._id).includes(cur._id)) {
      acc[cur._id] = true;
    } else {
      acc[cur._id] = false;
    }
    return acc;
  }, {});

  const setInitialTags = preTags.reduce((acc, cur) => {
    if (blog.tags?.map((t) => t._id).includes(cur._id)) {
      acc[cur._id] = true;
    } else {
      acc[cur._id] = false;
    }
    acc[cur._id] = false;
    return acc;
  }, {});

  const [formData, setFormData] = useState({
    title: blog.title,
    content: blog.content,
    photo: blog.photo,
  });
  const { title, content } = formData;

  const [loading, setLoading] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState(
    setInitialCategories
  );
  const [selectedTags, setSelectedTags] = useState(setInitialTags);

  const handleCategoriesChange = (id) => {
    setSelectedCategories((prev) => ({ ...prev, [id]: !prev[id] }));
  };
  const handleTagsChange = (id) => {
    setSelectedTags((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const handleChange = (evt) => {
    const { name, value } = evt.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFile = async (files) => {
    if (files?.length) {
      const photoUri = await resizeFile(files[0]);
      setFormData((prev) => ({ ...prev, photo: photoUri }));
    } else {
      setFormData((prev) => ({ ...prev, photo: null }));
    }
  };

  const handleSubmit = async (evt) => {
    evt.preventDefault();
    setLoading(true);
    try {
      const res = await axios.put(`${API}/v1/blogs/${blog.slug}`, {
        ...formData,
        tags: Object.entries(selectedTags).reduce((acc, [key, val]) => {
          if (val) acc.push(key);
          return acc;
        }, []),
        categories: Object.entries(selectedCategories).reduce(
          (acc, [key, val]) => {
            if (val) acc.push(key);
            return acc;
          },
          []
        ),
      });
      setLoading(false);
      toast.success(`${res.data.data.blog.title} is successfully Updated.`);
      router.push("/admin/blogs-manage");
    } catch (error) {
      console.error("[UPDATE BLOG ERROR]", error.response);
      setLoading(false);
      toast.error(error.response.data.errors.map((e) => e.msg).join(" "));
    }
  };

  return (
    <Fragment>
      <Typography variant="h5" component="h2" paragraph>
        Update {blog.title}
      </Typography>

      <Box component="form" onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={8}>
            <TextField
              id="blog-update-title"
              label="Title"
              fullWidth
              name="title"
              value={title}
              onChange={handleChange}
              style={{ marginBottom: "1rem" }}
            />

            {/* Image Preview */}
            <Box style={{ display: "flex", justifyContent: "center" }}>
              {blog.photo && (
                <ImageFadeIn
                  transition={1000}
                  src={blog.photo.url}
                  alt={blog.title}
                  style={{
                    width: "75%",
                    height: 250,
                    objectFit: "cover",
                    borderRadius: 5,
                    marginBottom: "1rem",
                  }}
                />
              )}
            </Box>

            {/* Image Drop */}
            <DropzoneArea
              filesLimit={1}
              dropzoneText={
                blog.photo
                  ? "Drop or click to replace current image"
                  : "Drop or click to add featured image."
              }
              onChange={handleFile}
              acceptedFiles={["image/*"]}
            />

            {/* Rich Text */}
            <ReactQuill
              modules={quillModules}
              formats={quillFormats}
              value={content}
              onChange={(v) => setFormData((prev) => ({ ...prev, content: v }))}
            />
          </Grid>

          {/* Side bar */}
          <Grid item xs={4}>
            <Typography>Select Categories:</Typography>
            <Box
              style={{
                maxHeight: "15rem",
                overflowY: "scroll",
                marginBottom: "1rem",
                paddingLeft: "1rem",
              }}
            >
              {preCategories.map((c) => (
                <FormControlLabel
                  style={{ display: "block" }}
                  key={c._id}
                  control={
                    <Checkbox
                      checked={selectedCategories[c._id]}
                      onChange={() => handleCategoriesChange(c._id)}
                      name={c.name}
                      color="primary"
                    />
                  }
                  label={c.name}
                />
              ))}
            </Box>

            <Typography>Select Tags:</Typography>
            <Box
              style={{
                maxHeight: "15rem",
                overflowY: "scroll",
                paddingLeft: "1rem",
              }}
            >
              {preTags.map((t) => (
                <FormControlLabel
                  style={{ display: "block" }}
                  key={t._id}
                  control={
                    <Checkbox
                      checked={selectedTags[t._id]}
                      onChange={() => handleTagsChange(t._id)}
                      name={t.name}
                      color="secondary"
                    />
                  }
                  label={`#${t.name}`}
                />
              ))}
            </Box>
          </Grid>
        </Grid>

        {/* Actions */}
        <Box style={{ margin: "1rem 0 2rem" }}>
          <NextLink href="/admin/blogs-manage">
            <Button
              component="a"
              color="primary"
              type="submit"
              style={{ marginRight: "0.5rem" }}
            >
              Cancel
            </Button>
          </NextLink>
          <Button
            variant="contained"
            color="primary"
            type="submit"
            disabled={!(title && content) || loading}
          >
            {loading ? <CircularProgress size={24} /> : "Update"}
          </Button>
        </Box>
      </Box>
    </Fragment>
  );
};

export default Blog;

export const getStaticProps = async (ctx) => {
  let categories = [];
  try {
    const res = await axios.get(`${API}/v1/categories`);
    categories = res.data.data.categories;
  } catch (error) {
    console.error("[FETCH CATEGORIES ERROR]", error);
  }

  let tags = [];
  try {
    const res = await axios.get(`${API}/v1/tags`);
    tags = res.data.data.tags;
  } catch (error) {
    console.error("[FETCH TAGS ERROR]", error);
  }

  let blog = {};
  try {
    const res = await axios.get(`${API}/v1/blogs/${ctx.params.slug}`);
    blog = res.data.data.blog;
  } catch (error) {
    console.error("[FETCH UPDATE BLOG ERROR]", error);
  }

  return {
    props: {
      categories,
      tags,
      blog,
    },
    revalidate: 1,
  };
};

export const getStaticPaths = async () => {
  let paths = [];
  try {
    const res = await axios.get(`${API}/v1/blogs`);
    paths = res.data.data.blogs
      .slice(0, 4)
      .map((b) => ({ params: { slug: b.slug } }));
  } catch (error) {
    console.error("[FETCH BLOG PATHS ERROR]", error);
  }

  return {
    paths: paths,
    fallback: true,
  };
};
