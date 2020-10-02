import React, { useState, Fragment } from "react";

import { toast } from "react-toastify";

import Chip from "@material-ui/core/Chip";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Box from "@material-ui/core/Box";
import CircularProgress from "@material-ui/core/CircularProgress";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";

import axios from "../../utils/axios";
import { API } from "../../config";
import { Typography } from "@material-ui/core";

const Tags = ({ tags: preTags }) => {
  const [tags, setTags] = useState(preTags);
  const [deleteTag, setDeleteTag] = useState(null);
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [updateName, setUpdateName] = useState("");

  const handleCreate = async (evt) => {
    evt.preventDefault();
    try {
      const res = await axios.post(`${API}/v1/tags`, { name });
      setTags((prev) => [...prev, res.data.data.tag]);
      toast.success(`Tag ${name} is successfully created.`);
      setName("");
    } catch (error) {
      console.error("[TAGS CREATE ERROR]", error);
      toast.error(error.response.data.errors.map((e) => e.msg).join(" "));
    }
  };

  const handleUpdate = () => {};

  const handleDelete = async (slug) => {
    try {
      const res = await axios.delete(`${API}/v1/tags/${slug}`);
      setTags((prev) => prev.filter((t) => t.slug !== slug));
      toast.success(res.data.data.msg);
    } catch (error) {
      console.error("[TAGS DELETE ERROR]", error);
      toast.error(error.response.data.errors.map((e) => e.msg).join(" "));
    }
  };

  return (
    <Fragment>
      <Typography variant="h5" component="h2" paragraph>
        Categories
      </Typography>
      <Box style={{ marginBottom: "1rem" }}>
        {tags.map((t) => (
          <Chip
            size="medium"
            color="primary"
            key={t._id}
            label={t.name}
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

      <Dialog
        size="small"
        open={!!deleteTag}
        onClose={() => setDeleteCategory(null)}
      >
        <DialogTitle>Update {deleteTag?.name}</DialogTitle>
        <DialogContent>
          <TextField
            id={`admin-update-${deleteTag?.name}`}
            label="Category Name"
            name="name"
            value={updateName}
            onChange={(evt) => setUpdateName(evt.target.value)}
            fullWidth
            disabled={loading}
            style={{ marginBottom: "0.5rem" }}
          />
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              setDeleteCategory(null);
              setUpdateName("");
            }}
            color="primary"
          >
            Cancel
          </Button>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            disabled={!updateName || loading}
            onClick={handleUpdate}
          >
            {loading ? <CircularProgress size={24} /> : "Update"}
          </Button>
        </DialogActions>
      </Dialog>
    </Fragment>
  );
};

export default Tags;
