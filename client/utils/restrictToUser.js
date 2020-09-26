import axios from "./axios";
import extractCookieValue from "./extractCookieValue";
import { API } from "../config";

const restrictToUser = async ({ req, res }) => {
  let access = false;
  try {
    const userRes = await axios.get(`${API}/v1/auth/user`, {
      headers: {
        authorization: `Bearer ${extractCookieValue(
          req.headers.cookie,
          "AUTH_TOKEN"
        )}`,
      },
    });
    access = userRes.data.data.access;
  } catch (error) {
    console.error("[USER ROUTE ERROR]", error.response?.data || error);
  }

  // Redirect to '/' is not admin
  if (!access) {
    res.writeHead(302, {
      Location: "/",
    });
    res.end();
  }

  return access;
};

export default restrictToUser;
