import React, { useRef, useEffect, useState } from "react";
import { createPortal } from "react-dom";

const withPortal =
  (WrapperComponent) =>
  ({ selector, ...rest }) => {
    const [mounted, setMounted] = useState(false);
    const ref = useRef();

    useEffect(() => {
      ref.current = document.querySelector(selector);
      setMounted(true);

      return () => setMounted(false);
    }, []);

    return mounted
      ? createPortal(<WrapperComponent {...rest} />, ref.current)
      : null;
  };

export default withPortal;
