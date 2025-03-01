import { useEffect } from "react";

/**
 * Хук для обробки кліку поза елементом
 * @param {React.RefObject} ref - Реф елемента, поза яким треба відстежувати кліки
 * @param {Function} callback - Функція, яка буде викликана при кліку поза елементом
 * @param {Array} dependencies - Масив залежностей для useEffect
 */
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
