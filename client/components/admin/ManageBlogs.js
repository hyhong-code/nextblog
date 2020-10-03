import React, { Fragment, useState } from "react";
import { formatDistance } from "date-fns";
import NextLink from "next/link";
import { toast } from "react-toastify";

import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import Button from "@material-ui/core/Button";
import CardContent from "@material-ui/core/CardContent";
import CardHeader from "@material-ui/core/CardHeader";
import IconButton from "@material-ui/core/IconButton";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import CircularProgress from "@material-ui/core/CircularProgress";
import MoreVertIcon from "@material-ui/icons/MoreVert";

import axios from "../../utils/axios";
import { API } from "../../config";

const ManageBlogs = ({ blogs: preBlogs }) => {
  const [blogs, setBlogs] = useState(preBlogs);
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedBlog, setSelectedBlog] = useState(null);
  const [deleteShow, setDeleteShow] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleMenuClick = (evt, blog) => {
    setAnchorEl(evt.currentTarget);
    setSelectedBlog(blog);
  };

  const handleMenuClose = (evt) => {
    setAnchorEl(null);
    setSelectedBlog(null);
  };

  const handleDelete = async () => {
    setLoading(true);
    try {
      const res = await axios.delete(`${API}/v1/blogs/${selectedBlog.slug}`);
      console.log(res.data);
      toast.success(res.data.data.msg);
      setBlogs((prev) => prev.filter((b) => b._id !== selectedBlog._id));
      handleDeleteDialogClose();
    } catch (error) {
      console.error("[DELETE BLOG ERROR]", error);
      toast.error(error.response.data.errors.map((e) => e.msg).join(" "));
    }
    setLoading(false);
  };

  const handleDeleteDialogClose = () => {
    setDeleteShow(false);
    setTimeout(() => {
      setSelectedBlog(false);
      setAnchorEl(null);
    }, 250);
  };

  return (
    <Fragment>
      <Typography variant="h5" component="h2" paragraph>
        Mangage Blogs
      </Typography>

      {/* Blog Cards */}
      <Grid container spacing={2}>
        {blogs.map((b) => (
          <Fragment key={b._id}>
            <Grid item xs={6}>
              <Card elevation={3}>
                <CardHeader
                  title={
                    <NextLink href={`/blogs/${b.slug}`}>
                      <Typography
                        variant="h5"
                        component="h2"
                        style={{ cursor: "pointer" }}
                      >
                        {b.title}
                      </Typography>
                    </NextLink>
                  }
                  action={
                    <IconButton onClick={(evt) => handleMenuClick(evt, b)}>
                      <MoreVertIcon />
                    </IconButton>
                  }
                />
                <CardContent>
                  <Typography variant="body1" color="textSecondary">
                    Published by {b.postedBy.name} |{" "}
                    {formatDistance(new Date(b.createdAt), new Date(), {
                      addSuffix: true,
                    })}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>

            {/* Card Action Menu */}
            <Menu
              id={`blog-show-more-${b._id}`}
              anchorEl={anchorEl}
              open={selectedBlog?._id === b._id}
              onClose={handleMenuClose}
            >
              <MenuItem>Update Blog</MenuItem>
              <MenuItem onClick={() => setDeleteShow(true)}>
                Delete Blog
              </MenuItem>
            </Menu>
          </Fragment>
        ))}
      </Grid>

      {/* Delete Popup */}
      <Dialog maxWidth="sm" open={deleteShow} onClose={handleDeleteDialogClose}>
        <DialogTitle id="simple-dialog-title">
          Delete {selectedBlog?.title}
        </DialogTitle>
        <DialogContent>
          <DialogContentText>Please confirm.</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleDeleteDialogClose}
            color="primary"
            size="small"
          >
            Cancel
          </Button>
          <Button
            onClick={handleDelete}
            color="primary"
            variant="contained"
            autoFocus
            size="small"
            disabled={loading}
          >
            {loading ? <CircularProgress size={20} /> : "Delete"}
          </Button>
        </DialogActions>
      </Dialog>
    </Fragment>
  );
};

export default ManageBlogs;
