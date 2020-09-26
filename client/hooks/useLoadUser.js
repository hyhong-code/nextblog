import { useEffect, useContext } from "react";

import { AuthContext, loadUser } from "../context/authContext";

const useLoadUser = () => {
  const { dispatch } = useContext(AuthContext);

  useEffect(() => {
    loadUser(dispatch);
  }, []);

  return null;
};

export default useLoadUser;
