import React, { useState, useEffect, useRef } from "react";
import cn from "classnames";
import styles from "./Select.module.css";

export const Select = ({ options, value, onChange, label, placeholder }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [focusedIndex, setFocusedIndex] = useState(-1);
  const selectRef = useRef(null);

  const toggleDropdown = () => {
    setIsOpen((prev) => !prev);
  };

  const handleOptionClick = (event, optionValue) => {
    event.stopPropagation();
    onChange(optionValue);
    setIsOpen(false);
  };

  const handleKeyDown = (event) => {
    if (!isOpen) return;

    if (event.key === "ArrowDown") {
      event.preventDefault();
      setFocusedIndex((prev) => (prev < options.length - 1 ? prev + 1 : 0));
    } else if (event.key === "ArrowUp") {
      event.preventDefault();
      setFocusedIndex((prev) => (prev > 0 ? prev - 1 : options.length - 1));
    } else if (event.key === "Enter" && focusedIndex !== -1) {
      event.preventDefault();
      onChange(options[focusedIndex].value);
      setIsOpen(false);
    } else if (event.key === "Escape") {
      setIsOpen(false);
    }
  };

  // Закрытие по клику вне компонента
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (selectRef.current && !selectRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    if (!isOpen) setFocusedIndex(-1);
  }, [isOpen]);

  return (
    <div className={styles["custom-select"]} ref={selectRef}>
      {label && <label className={styles["select-label"]}>{label}</label>}
      <div
        className={styles["select-wrapper"]}
        onClick={toggleDropdown}
        onKeyDown={handleKeyDown}
        role="combobox"
        aria-expanded={isOpen}
        tabIndex="0"
      >
        <div className={styles["selected-value"]}>{value ?? placeholder}</div>
        <div className={cn(styles["dropdown"], { [styles["open"]]: isOpen })}>
          {options.map((option, index) => (
            <div
              key={option}
              className={cn(styles["option"], {
                [styles["selected"]]: option === value,
                [styles["focused"]]: index === focusedIndex,
              })}
              onClick={(event) => handleOptionClick(event, option)}
              role="option"
              aria-selected={option === value}
            >
              {option}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
