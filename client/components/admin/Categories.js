import { Fragment, useState } from "react";
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

const Categories = ({ categories: preCategories = [] }) => {
  const [categories, setCategories] = useState(preCategories);
  const [name, setName] = useState("");
  const [updateName, setUpdateName] = useState("");
  const [loading, setLoading] = useState(false);
  const [deleteCategory, setDeleteCategory] = useState(null);

  const handleCreate = async (evt) => {
    evt.preventDefault();
    setLoading(true);
    try {
      const res = await axios.post(`${API}/v1/categories`, { name });
      setCategories((prev) => [...prev, res.data.data.category]);
      toast.success("Category successfully created.");
      setName("");
    } catch (error) {
      console.error("[CREATE CATEGORY ERROR]", error);
      toast.error(error.response.data.errors.map((e) => e.msg).join(" "));
    }
    setLoading(false);
  };

  const handleUpdate = async () => {
    try {
      const res = await axios.put(
        `${API}/v1/categories/${deleteCategory.slug}`,
        {
          name: updateName,
        }
      );
      setCategories((prev) =>
        prev.map((c) =>
          c.slug === deleteCategory.slug ? res.data.data.category : c
        )
      );
      toast.success("Category successfully deleted.");
      setDeleteCategory(null);
    } catch (error) {
      console.error("[CREATE DELETE ERROR]", error);
      toast.error(error.response.data.errors.map((e) => e.msg).join(" "));
    }
  };

  const handleDelete = async (slug) => {
    try {
      const res = await axios.delete(`${API}/v1/categories/${slug}`);
      setCategories((prev) => prev.filter((c) => c.slug !== slug));
      toast.success("Category successfully deleted.");
    } catch (error) {
      console.error("[CREATE DELETE ERROR]", error);
      toast.error(error.response.data.errors.map((e) => e.msg).join(" "));
    }
  };

  return (
    <Fragment>
      <Typography variant="h5" component="h2" paragraph>
        Categories
      </Typography>
      <Box style={{ marginBottom: "1rem" }}>
        {categories.map((c) => (
          <Chip
            size="medium"
            color="primary"
            key={c._id}
            label={c.name}
            onDelete={() => handleDelete(c.slug)}
            style={{ marginRight: 5 }}
            onClick={() => {
              setDeleteCategory(c);
              setUpdateName(c.name);
            }}
          />
        ))}
      </Box>

      <Box
        component="form"
        onSubmit={handleCreate}
        style={{ marginBottom: "1rem" }}
      >
        <TextField
          id={`admin-create-${name}`}
          label="Category Name"
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
          {loading ? <CircularProgress size={24} /> : "Create"}
        </Button>
      </Box>

      <Dialog
        size="small"
        open={!!deleteCategory}
        onClose={() => setDeleteCategory(null)}
      >
        <DialogTitle>Update {deleteCategory?.name}</DialogTitle>
        <DialogContent>
          <TextField
            id={`admin-update-${deleteCategory?.name}`}
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

export default Categories;
