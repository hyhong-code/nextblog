import React, { useState } from "react";

const useRefreshDropzone = () => {
  const [show, setShow] = useState(true);

  const refresh = () => {
    setShow(false);
    setTimeout(() => {
      setShow(true);
    }, 0);
  };

  return {
    show,
    refresh,
  };
};

export default useRefreshDropzone;
