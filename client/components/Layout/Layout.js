import { Fragment } from "react";

const Layout = ({ children }) => {
  return (
    <Fragment>
      <div className="">Header</div>
      {children}
      <div className="">Footer</div>
    </Fragment>
  );
};

export default Layout;
