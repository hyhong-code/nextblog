import { Fragment } from "react";

import Navbar from "./Navbar";

const Layout = ({ children }) => {
  return (
    <Fragment>
      <Navbar />
      {children}
      <div className="">Footer</div>
    </Fragment>
  );
};

export default Layout;
