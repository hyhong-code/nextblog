import React from "react";

import restrictToUser from "../utils/restrictToUser";

const user = () => {
  return <h1>USER</h1>;
};

export default user;

export const getServerSideProps = async ({ req, res }) => {
  const access = await restrictToUser({ req, res });

  return {
    props: {
      access,
    },
  };
};
