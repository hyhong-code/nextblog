import axios from "axios";

export default axios.create({
  // For aioxs to attach cookies on every requests
  withCredentials: true,
});
