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

const PATHS = [
  {
    pathname: "/admin/categories",
    label: "Categories",
  },
  {
    pathname: "/admin/tags",
    label: "Tags",
  },
];

const SideTabs = () => {
  const classes = useStyles();
  const router = useRouter();

  const value = () => PATHS.findIndex((v) => v.pathname === router.asPath);

  return (
    <Tabs
      orientation="vertical"
      variant="scrollable"
      value={value()}
      aria-label="Vertical tabs example"
      className={classes.tabs}
    >
      {PATHS.map((p, idx) => (
        <NextLink href={p.pathname} key={idx}>
          <Tab component="a" label={p.label} />
        </NextLink>
      ))}
    </Tabs>
  );
};

export default SideTabs;
