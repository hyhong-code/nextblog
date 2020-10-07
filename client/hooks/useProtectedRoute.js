import { useContext, useEffect } from "react";
import { useRouter } from "next/router";

import { AuthContext } from "../context/authContext";

const useProtectedRoute = (redirectRoute, ...allowedRoles) => {
  const {
    state: { user },
  } = useContext(AuthContext);
  const router = useRouter();

  useEffect(() => {
    let access = true;
    if (!user) {
      access = false;
    } else if (allowedRoles.length) {
      if (!allowedRoles.includes(user.role)) {
        access = false;
      }
    }

    if (!access) router.push(redirectRoute);
  }, [user]);
  return null;
};

export default useProtectedRoute;
