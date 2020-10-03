import { useState, useEffect, Fragment } from "react";
import dynamic from "next/dynamic";
import { DropzoneArea } from "material-ui-dropzone";
import { toast } from "react-toastify";

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
import useRefreshDropzone from "../../hooks/useRefreshDropzone";
import resizeFile from "../../utils/resizeFile";
import { quillModules, quillFormats } from "../../utils/quillOptions";

const INITIAL_FORMDATA = {
  title: "",
  content: "",
  photo: null,
};

const Blog = ({ categories: preCategories, tags: preTags }) => {
  const setInitialCategories = preCategories.reduce((acc, cur) => {
    acc[cur._id] = false;
    return acc;
  }, {});

  const setInitialTags = preTags.reduce((acc, cur) => {
    acc[cur._id] = false;
    return acc;
  }, {});

  const { show, refresh } = useRefreshDropzone();
  const [formData, setFormData] = useState(INITIAL_FORMDATA);
  const [loading, setLoading] = useState(false);
  const { title, content } = formData;
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

  useEffect(() => {
    // Save title and content to local storage
    const savedBlog = localStorage.getItem("BLOG");
    if (savedBlog) {
      setFormData((prev) => ({ ...prev, ...JSON.parse(savedBlog) }));
    }
  }, []);

  useEffect(() => {
    // Prefill title and content from local storage
    localStorage.setItem("BLOG", JSON.stringify({ title, content }));
  }, [content, title]);

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
      const res = await axios.post(`${API}/v1/blogs`, {
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
      refresh();
      setSelectedCategories(setInitialCategories);
      setSelectedTags(setInitialTags);
      setFormData(INITIAL_FORMDATA);
      toast.success(`${res.data.data.blog.title} is successfully published.`);
    } catch (error) {
      console.error("[CREATE BLOG ERROR]", error.response);
      toast.error(error.response.data.errors.map((e) => e.msg).join(" "));
    }
    setLoading(false);
  };

  return (
    <Fragment>
      <Typography variant="h5" component="h2" paragraph>
        Create A New Blog
      </Typography>
      <Box component="form" onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={8}>
            <TextField
              id="blog-input-title"
              label="Title"
              fullWidth
              name="title"
              value={title}
              onChange={handleChange}
              style={{ marginBottom: "1rem" }}
            />
            {show && (
              <DropzoneArea
                filesLimit={1}
                dropzoneText="Drop or click to add featured image."
                onChange={handleFile}
                acceptedFiles={["image/*"]}
              />
            )}
            <ReactQuill
              modules={quillModules}
              formats={quillFormats}
              value={content}
              onChange={(v) => setFormData((prev) => ({ ...prev, content: v }))}
            />
          </Grid>

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
        <Button
          variant="contained"
          color="primary"
          type="submit"
          style={{ marginTop: "1rem" }}
          disabled={!(title && content) || loading}
        >
          {loading ? <CircularProgress size={24} /> : "Publish"}
        </Button>
      </Box>
    </Fragment>
  );
};

export default Blog;
