import { Fragment, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import NextLink from "next/link";

import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import SwipeableDrawer from "@material-ui/core/SwipeableDrawer";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";

import MenuIcon from "@material-ui/icons/Menu";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

export default function ButtonAppBar() {
  const classes = useStyles();
  const [drawerOpen, setDrawerOpen] = useState(false);

  const toggleDrawer = () => {
    setDrawerOpen((prev) => !prev);
  };

  return (
    <Fragment>
      <AppBar position="fixed">
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="menu"
            onClick={toggleDrawer}
          >
            <MenuIcon />
          </IconButton>
          <NextLink href="/">
            <Typography
              component="a"
              variant="h6"
              className={classes.title}
              style={{ cursor: "pointer" }}
            >
              MyBlog
            </Typography>
          </NextLink>
          <NextLink href="/login">
            <Button component="a" color="inherit">
              Sign in
            </Button>
          </NextLink>
          <NextLink href="/register">
            <Button component="a" color="inherit">
              Sign up
            </Button>
          </NextLink>
        </Toolbar>
      </AppBar>
      <Toolbar />
      <SwipeableDrawer
        anchor="left"
        open={drawerOpen}
        onClose={toggleDrawer}
        onOpen={toggleDrawer}
      >
        [TODO]
      </SwipeableDrawer>
    </Fragment>
  );
}
