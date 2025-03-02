import { useEffect } from "react";

export const useOutsideClick = (ref, callback, dependencies = []) => {
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (ref.current && !ref.current.contains(event.target)) {
        callback();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref, callback, ...dependencies]); // eslint-disable-line react-hooks/exhaustive-deps
};

export default useOutsideClick;
