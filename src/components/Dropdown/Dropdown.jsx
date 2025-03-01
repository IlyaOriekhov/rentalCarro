import { useState, useRef, memo } from "react";
import clsx from "clsx";
import sprite from "../../images/sprite.svg";
import styles from "./Dropdown.module.css";
import { getIconPath } from "../../utils/iconUtils";
import useOutsideClick from "../../hooks/useOutsideClick";

const Dropdown = ({
  options,
  value,
  onChange,
  placeholder = "Select option",
  displayValue = null,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Використовуємо спільний хук замість локального useEffect
  useOutsideClick(dropdownRef, () => setIsOpen(false), []);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleOptionClick = (optionValue) => {
    onChange(optionValue);
    setIsOpen(false);
  };

  // Знаходимо поточний вибраний елемент для відображення
  const selectedOption = options.find((option) => option.value === value);

  // Обчислюємо текст для відображення у dropdown
  const displayText = displayValue
    ? displayValue(value)
    : selectedOption?.label || placeholder;

  return (
    <div className={styles.dropdownContainer} ref={dropdownRef}>
      <button
        type="button"
        className={styles.dropdownButton}
        onClick={toggleDropdown}
      >
        <span className={clsx({ [styles.placeholder]: !value })}>
          {displayText}
        </span>
        <svg
          className={clsx(styles.arrowIcon, { [styles.open]: isOpen })}
          width="16"
          height="16"
        >
          <use href={getIconPath(sprite, isOpen ? "arr-up" : "arr-down")} />
        </svg>
      </button>

      {isOpen && (
        <div className={styles.dropdownList}>
          <div className={styles.dropdownScroll}>
            {options.map((option) => (
              <div
                key={option.value}
                className={clsx(styles.dropdownItem, {
                  [styles.selected]: option.value === value,
                })}
                onClick={() => handleOptionClick(option.value)}
              >
                {option.label}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default memo(Dropdown);
