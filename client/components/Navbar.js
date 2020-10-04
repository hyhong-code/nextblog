import { Fragment, useState, useContext } from "react";
import { makeStyles, fade } from "@material-ui/core/styles";
import NextLink from "next/link";
import { toast } from "react-toastify";
import { useRouter } from "next/router";

import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import SwipeableDrawer from "@material-ui/core/SwipeableDrawer";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import Container from "@material-ui/core/Container";
import Box from "@material-ui/core/Box";
import InputBase from "@material-ui/core/InputBase";
import SearchIcon from "@material-ui/icons/Search";
import MenuIcon from "@material-ui/icons/Menu";
import ClearRoundedIcon from "@material-ui/icons/ClearRounded";

import axios from "../utils/axios";
import { API } from "../config";
import { AuthContext } from "../context/authContext";

export default function ButtonAppBar() {
  const classes = useStyles();
  const router = useRouter();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [search, setSearch] = useState("");
  const {
    state: { user },
    dispatch,
  } = useContext(AuthContext);

  const toggleDrawer = () => {
    setDrawerOpen((prev) => !prev);
  };

  const handleLogout = async () => {
    try {
      await axios.get(`${API}/v1/auth/logout`);
      dispatch({ type: "LOGOUT" });
    } catch (error) {
      console.error("[LOGOUT ERROR]", error.response);
      dispatch({ type: "AUTH_ERROR" });
    }
    setDrawerOpen(false);
  };

  const handleSearch = (evt) => {
    evt.preventDefault();
    if (!search) {
      return toast.error("Please enter at least one character.");
    }
    setSearch("");
    router.push(`/search/${search}`);
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
                style={{ cursor: "pointer", marginRight: "1rem" }}
              >
                Nextjs Blog
              </Typography>
            </NextLink>

            {/* Blogs */}
            <NextLink href="/blogs">
              <Button
                component="a"
                color="inherit"
                variant="contained"
                color="secondary"
                style={{ marginRight: "auto" }}
              >
                Blogs
              </Button>
            </NextLink>

            {/* Navbar Search */}
            <Box
              component="form"
              onSubmit={handleSearch}
              style={{ display: "flex" }}
            >
              <Box className={classes.search}>
                <Box className={classes.searchIcon}>
                  <SearchIcon />
                </Box>
                <InputBase
                  placeholder="Search…"
                  classes={{
                    root: classes.inputRoot,
                    input: classes.inputInput,
                  }}
                  inputProps={{ "aria-label": "search" }}
                  value={search}
                  onChange={(evt) => setSearch(evt.target.value)}
                />
              </Box>
              <Button
                variant="outlined"
                color="inherit"
                style={{ margin: "0 1rem 0 0.5rem" }}
                type="submit"
              >
                Search
              </Button>
            </Box>

            {/* Links */}
            {!user ? (
              <Fragment>
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
              </Fragment>
            ) : (
              <Fragment>
                <NextLink
                  href={user.role === "ADMIN" ? "/admin/tags" : "/user"}
                >
                  <Button component="a" color="inherit">
                    Dashboard
                  </Button>
                </NextLink>
                <Button component="a" color="inherit" onClick={handleLogout}>
                  Log out
                </Button>
              </Fragment>
            )}
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

        {/* Drawer Search Bar */}
        <Box
          component="form"
          onSubmit={handleSearch}
          style={{ display: "flex", flexDirection: "column" }}
        >
          <Box className={classes.search} style={{ margin: `0 0 1rem` }}>
            <Box className={classes.searchIcon}>
              <SearchIcon />
            </Box>
            <InputBase
              style={{ borderBottom: "1px solid #000", width: "100%" }}
              placeholder="Search…"
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              inputProps={{ "aria-label": "search" }}
              value={search}
              onChange={(evt) => setSearch(evt.target.value)}
            />
          </Box>
          <Button type="submit">Search</Button>
        </Box>

        {/* Blogs */}
        <NextLink href="/blogs">
          <Button component="a" color="inherit">
            Blogs
          </Button>
        </NextLink>

        {/* Links */}
        {!user ? (
          <Fragment>
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
          </Fragment>
        ) : (
          <Fragment>
            <NextLink href={user.role === "ADMIN" ? "/admin/tags" : "user"}>
              <Button component="a" color="inherit" onClick={toggleDrawer}>
                Dashboard
              </Button>
            </NextLink>
            <Button component="a" color="inherit" onClick={handleLogout}>
              Log out
            </Button>
          </Fragment>
        )}
      </SwipeableDrawer>
    </Fragment>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(1),
      width: "auto",
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  inputRoot: {
    color: "inherit",
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: "12ch",
      "&:focus": {
        width: "20ch",
      },
    },
  },
}));
