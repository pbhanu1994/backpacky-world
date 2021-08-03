import { useRef, useEffect, useState } from "react";
import { createPortal } from "react-dom";

const Portal = ({ children, selector }) => {
  const [mounted, setMounted] = useState(false);
  const ref = useRef();

  useEffect(() => {
    ref.current = document.querySelector(selector);
    setMounted(true);

    return () => setMounted(false);
  }, []);

  return mounted ? createPortal(children, ref.current) : null;
};

export default Portal;
