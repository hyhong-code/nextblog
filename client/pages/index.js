import axios from "../utils/axios";
import { API } from "../config";

export default function Home() {
  return <h1>H1</h1>;
}

export const getServerSideProps = async ({ req, res }) => {
  console.log(req.headers.cookie);
  try {
    const res = await axios.get(`${API}/v1/auth`);
    console.log(res);
  } catch (error) {
    console.error("[AUTH ERROR]", error.response?.data || error);
  }
  return {
    props: {},
  };
};
