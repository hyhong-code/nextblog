import { Fragment, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import NextLink from "next/link";

import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import SwipeableDrawer from "@material-ui/core/SwipeableDrawer";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import Container from "@material-ui/core/Container";

import MenuIcon from "@material-ui/icons/Menu";
import ClearRoundedIcon from "@material-ui/icons/ClearRounded";

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
      {/* Navbar */}
      <AppBar position="fixed">
        <Container>
          <Toolbar style={{ padding: 0 }}>
            {/* Open Drawer Button */}
            <IconButton
              edge="start"
              className={classes.menuButton}
              color="inherit"
              aria-label="menu"
              onClick={toggleDrawer}
            >
              <MenuIcon />
            </IconButton>

            {/* Brand */}
            <NextLink href="/">
              <Typography
                component="a"
                variant="h6"
                className={classes.title}
                style={{ cursor: "pointer" }}
              >
                Nextjs Blog
              </Typography>
            </NextLink>

            {/* Links */}
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
        </Container>
      </AppBar>
      <Toolbar />

      {/* Drawer */}
      <SwipeableDrawer
        anchor="left"
        open={drawerOpen}
        onClose={toggleDrawer}
        onOpen={toggleDrawer}
        PaperProps={{ style: { width: "15rem" } }}
      >
        {/* Close Button */}
        <IconButton style={{ alignSelf: "flex-end" }} onClick={toggleDrawer}>
          <ClearRoundedIcon />
        </IconButton>

        {/* Links */}
        <NextLink href="/login">
          <Button component="a" color="inherit" onClick={toggleDrawer}>
            Sign in
          </Button>
        </NextLink>
        <NextLink href="/register">
          <Button component="a" color="inherit" onClick={toggleDrawer}>
            Sign up
          </Button>
        </NextLink>
      </SwipeableDrawer>
    </Fragment>
  );
}
