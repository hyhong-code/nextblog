import axios from "./axios";
import extractCookieValue from "./extractCookieValue";
import { API } from "../config";

const restrictToAdmin = async ({ req, res }) => {
  let access = false;

  try {
    const adminRes = await axios.get(`${API}/v1/auth/admin`, {
      headers: {
        authorization: `Bearer ${extractCookieValue(
          req.headers.cookie,
          "AUTH_TOKEN"
        )}`,
      },
    });
    access = adminRes.data.data.access;
  } catch (error) {
    console.error("[ADMIN ROUTE ERROR]", error.response?.data || error);
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

export default restrictToAdmin;
