import Typography from "@material-ui/core/Typography";

import restrictToUser from "../../utils/restrictToUser";

const user = () => {
  return (
    <Typography variant="h4" component="h1">
      User Dashboard
    </Typography>
  );
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
