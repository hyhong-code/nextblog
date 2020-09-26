import React from "react";

import restrictToAdmin from "../utils/restrictToAdmin";

const admin = () => {
  return <h1>ADMIN</h1>;
};

export default admin;

export const getServerSideProps = async ({ req, res }) => {
  const access = await restrictToAdmin({ req, res });

  return {
    props: {
      access,
    },
  };
};
