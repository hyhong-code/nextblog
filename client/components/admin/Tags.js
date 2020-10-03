import React, { useState, Fragment } from "react";

import { toast } from "react-toastify";

import Chip from "@material-ui/core/Chip";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Box from "@material-ui/core/Box";
import CircularProgress from "@material-ui/core/CircularProgress";

import axios from "../../utils/axios";
import { API } from "../../config";
import { Typography } from "@material-ui/core";

const Tags = ({ tags: preTags }) => {
  const [tags, setTags] = useState(preTags);
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);

  const handleCreate = async (evt) => {
    evt.preventDefault();
    setLoading(true);
    try {
      const res = await axios.post(`${API}/v1/tags`, { name });
      setTags((prev) => [...prev, res.data.data.tag]);
      toast.success(`Tag ${name} is successfully created.`);
      setName("");
    } catch (error) {
      console.error("[TAGS CREATE ERROR]", error);
      toast.error(error.response.data.errors.map((e) => e.msg).join(" "));
    }
    setLoading(false);
  };

  const handleDelete = async (slug) => {
    setLoading(true);
    try {
      const res = await axios.delete(`${API}/v1/tags/${slug}`);
      setTags((prev) => prev.filter((t) => t.slug !== slug));
      toast.success(res.data.data.msg);
    } catch (error) {
      console.error("[TAGS DELETE ERROR]", error);
      toast.error(error.response.data.errors.map((e) => e.msg).join(" "));
    }
    setLoading(false);
  };

  return (
    <Fragment>
      <Typography variant="h5" component="h2" paragraph>
        Mangage Tags
      </Typography>
      <Box style={{ marginBottom: "1rem" }}>
        {tags.map((t) => (
          <Chip
            variant="outlined"
            size="medium"
            color="secondary"
            key={t._id}
            label={`#${t.name}`}
            style={{ marginRight: 5 }}
            onDelete={() => handleDelete(t.slug)}
          />
        ))}
      </Box>

      <Box
        component="form"
        onSubmit={handleCreate}
        style={{ marginBottom: "1rem" }}
      >
        <TextField
          id={`admin-create-tag`}
          label="Tag Name"
          name="name"
          value={name}
          onChange={(evt) => setName(evt.target.value)}
          fullWidth
          disabled={loading}
          style={{ marginBottom: "0.5rem" }}
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          disabled={!name || loading}
        >
          {loading ? <CircularProgress size={24} /> : "Create Tag"}
        </Button>
      </Box>
    </Fragment>
  );
};

export default Tags;
