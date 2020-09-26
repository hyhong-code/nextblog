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

const PATHNAMES = ["/admin", "/admin/categories/create"];

const AdminSideTabs = () => {
  const classes = useStyles();
  const router = useRouter();

  const value = () => PATHNAMES.findIndex((v) => v === router.pathname);

  return (
    <Tabs
      orientation="vertical"
      variant="scrollable"
      value={value()}
      aria-label="Vertical tabs example"
      className={classes.tabs}
    >
      <NextLink href="/admin">
        <Tab component="a" label="Dashboard" />
      </NextLink>
      <NextLink href="/admin/categories/create">
        <Tab component="a" label="Categories" />
      </NextLink>
      <Tab label="Item Three" />
    </Tabs>
  );
};

export default AdminSideTabs;
