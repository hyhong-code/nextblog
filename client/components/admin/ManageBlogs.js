import React, { Fragment, useState } from "react";
import { formatDistance } from "date-fns";

import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardHeader from "@material-ui/core/CardHeader";
import IconButton from "@material-ui/core/IconButton";
import Paper from "@material-ui/core/Paper";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";

import MoreVertIcon from "@material-ui/icons/MoreVert";

const ManageBlogs = ({ blogs }) => {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (evt) => {
    setAnchorEl(evt.currentTarget);
  };

  const handleClose = (evt) => {
    setAnchorEl(null);
  };

  return (
    <Fragment>
      <Typography variant="h5" component="h2" paragraph>
        Mangage Blogs
      </Typography>
      <Grid container spacing={2}>
        {blogs.map((b) => (
          <Grid item xs={6} key={b._id}>
            <Card elevation={3}>
              <CardHeader
                title={b.title}
                action={
                  <IconButton onClick={handleClick}>
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
        ))}
      </Grid>
      <Menu
        id={`blog-show-more`}
        anchorEl={anchorEl}
        keepMounted
        open={!!anchorEl}
        onClose={handleClose}
      >
        <MenuItem>sfdsf</MenuItem>
        <MenuItem>sfsdf</MenuItem>
      </Menu>
    </Fragment>
  );
};

export default ManageBlogs;
