import { makeStyles } from "@material-ui/core/styles";
import NextLink from "next/link";
import { useRouter } from "next/router";

import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";

const useStyles = makeStyles((theme) => ({
  tabs: {
    borderRight: `1px solid ${theme.palette.divider}`,
  },
}));

const SideTabs = ({ isAdmin = true }) => {
  const subPaths = isAdmin
    ? [
        {
          pathname: "/admin/profile",
          label: "Profile",
        },
        {
          pathname: "/admin/blogs-manage",
          label: "Manage Blogs",
        },
        {
          pathname: "/admin/blogs-create",
          label: "Create Blogs",
        },
        {
          pathname: "/admin/categories",
          label: "Manage Categories",
        },
        {
          pathname: "/admin/tags",
          label: "Manage Tags",
        },
      ]
    : [
        {
          pathname: "/user/profile",
          label: "Profile",
        },
        {
          pathname: "/user/blogs-manage",
          label: "Manage Blogs",
        },
        {
          pathname: "/user/blogs-create",
          label: "Create Blogs",
        },
      ];
  const classes = useStyles();
  const router = useRouter();

  const value = () => subPaths.findIndex((v) => v.pathname === router.asPath);

  return (
    <Tabs
      orientation="vertical"
      variant="scrollable"
      value={value()}
      aria-label="Vertical tabs example"
      className={classes.tabs}
    >
      {subPaths.map((p, idx) => (
        <NextLink href={p.pathname} key={idx}>
          <Tab component="a" label={p.label} />
        </NextLink>
      ))}
    </Tabs>
  );
};

export default SideTabs;
