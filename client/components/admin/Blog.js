import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { DropzoneArea } from "material-ui-dropzone";
import axios from "../../utils/axios";
import { API } from "../../config";

// Only import reactQuill on client side
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

import TextField from "@material-ui/core/TextField";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import CircularProgress from "@material-ui/core/CircularProgress";

import useRefreshDropzone from "../../hooks/useRefreshDropzone";
import resizeFile from "../../utils/resizeFile";
import { Grid, Typography } from "@material-ui/core";
import { toast } from "react-toastify";

const INITIAL_STATE = {
  title: "",
  content: "",
  photo: null,
};

const Blog = ({ categories: preCategories, tags: preTags }) => {
  const INITIAL_CATEGOREIS = preCategories.reduce((acc, cur) => {
    acc[cur._id] = false;
    return acc;
  }, {});

  const INITIAL_TAGS = preTags.reduce((acc, cur) => {
    acc[cur._id] = false;
    return acc;
  }, {});

  const { show, refresh } = useRefreshDropzone();
  const [formData, setFormData] = useState(INITIAL_STATE);
  const [loading, setLoading] = useState(false);
  const { title, content } = formData;
  const [selectedCategories, setSelectedCategories] = useState(
    INITIAL_CATEGOREIS
  );
  const [selectedTags, setSelectedTags] = useState(INITIAL_TAGS);

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
      setSelectedCategories(INITIAL_CATEGOREIS);
      setSelectedTags(INITIAL_TAGS);
      setFormData(INITIAL_STATE);
      toast.success(`${res.data.data.blog.title} is successfully created.`);
    } catch (error) {
      console.error("[CREATE BLOG ERROR]", error.response);
      toast.error(error.response.data.errors.map((e) => e.msg).join(" "));
    }
    setLoading(false);
  };

  return (
    <Box component="form" onSubmit={handleSubmit}>
      <Grid container spacing={4}>
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
              dropzoneText="Drop or click to add your image."
              onChange={handleFile}
              acceptedFiles={["image/*"]}
            />
          )}
          <ReactQuill
            modules={Blog.modules}
            formats={Blog.formats}
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
          <Box style={{ maxHeight: "15rem", overflowY: "scroll" }}>
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
        {loading ? <CircularProgress size={24} /> : "Submit"}
      </Button>
    </Box>
  );
};

export default Blog;

Blog.modules = {
  toolbar: [
    [{ header: "1" }, { header: "2" }, { header: [3, 4, 5, 6] }, { font: [] }],
    [{ size: [] }],
    ["bold", "italic", "underline", "strike", "blockquote"],
    [{ list: "ordered" }, { list: "bullet" }],
    ["link", "image", "video"],
    ["clean"],
    ["code-block"],
  ],
};

Blog.formats = [
  "header",
  "font",
  "size",
  "bold",
  "italic",
  "underline",
  "strike",
  "blockquote",
  "list",
  "bullet",
  "link",
  "image",
  "video",
  "code-block",
];
