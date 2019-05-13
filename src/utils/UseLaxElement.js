import { useEffect, useRef } from "react";
import lax from "lax.js";

export default function() {
  const reference = useRef();

  useEffect(() => {
    const node = reference.current;

    lax.addElement(node);

    return () => {
      lax.removeElement(node);
    };
  }, []);

  return reference;
}
