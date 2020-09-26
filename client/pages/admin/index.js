import Typography from "@material-ui/core/Typography";

import restrictToAdmin from "../../utils/restrictToAdmin";

const admin = () => {
  return (
    <Typography variant="h4" component="h1">
      Admin Dashboard
    </Typography>
  );
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
