import axios from "../utils/axios";
import { API } from "../config";

import extractCookieValue from "../utils/extractCookieValue";
import useLoadUser from "../hooks/useLoadUser";

export default function Home({ user }) {
  useLoadUser(user);

  return <h1>H1</h1>;
}

export const getServerSideProps = async ({ req, res }) => {
  let user = null;
  try {
    const res = await axios.get(`${API}/v1/auth`, {
      headers: {
        authorization: `Bearer ${extractCookieValue(
          req.headers.cookie,
          "AUTH_TOKEN"
        )}`,
      },
    });
    user = res.data.data.user;
  } catch (error) {
    console.error("[AUTH ERROR]", error.response?.data || error);
  }

  return {
    props: {
      user,
    },
  };
};
