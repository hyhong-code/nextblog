import { Fragment } from "react";

import Navbar from "./Navbar";
import useLoadUser from "../hooks/useLoadUser";

const Layout = ({ children }) => {
  useLoadUser();
  return (
    <Fragment>
      <Navbar />
      {children}
    </Fragment>
  );
};

export default Layout;
