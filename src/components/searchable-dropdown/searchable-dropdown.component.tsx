import React, { useEffect, useState } from "react";
import styles from "./searchable-dropdown.module.css";
import classNames from "classnames";
import CloseButton from "../../assets/close.svg";

interface SearchableDropdownComponentProps {
  items: string[];
  leadingIcon?: string;
  placeholderText?: string;
  onChange: (value: string) => void;
  onSelect: (value: string) => void;
}

const SearchableDropdownComponent: React.FC<
  SearchableDropdownComponentProps
> = ({ items, leadingIcon, placeholderText, onChange, onSelect }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isSearching, setIsSearching] = useState<boolean>(false);
  const [selectedTerm, setSelectedTerm] = useState<string>("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setIsOpen(value !== "");
    setIsSearching(value !== "");
    onChange(value);
  };

  const handleOnSelect = (e: React.MouseEvent) => {
    const value = e.currentTarget.textContent || "";
    setSelectedTerm(value);
    onSelect(value);
    setIsOpen(false);
  };

  const handleRemoveOnClick = () => {
    setSelectedTerm("");
    onSelect("");
  };

  useEffect(() => {
    setIsSearching(false);
  }, [items]);

  return (
    <div className={styles.container}>
      <div
        className={classNames(styles.inputWrapper, {
          [styles.rounded]: !isOpen,
        })}
      >
        {leadingIcon && <img className={styles.icon} src={leadingIcon}></img>}
        {selectedTerm === "" ? (
          <input
            className={styles.input}
            type="text"
            placeholder={placeholderText}
            onChange={handleChange}
            disabled={selectedTerm !== ""}
          />
        ) : (
          <div className={styles.selectedTermContainer}>
            <div>{selectedTerm}</div>
            <img src={CloseButton} onClick={handleRemoveOnClick}></img>
          </div>
        )}
      </div>
      {isOpen && (
        <div className={styles.itemList}>
          {isSearching && <div className={styles.item}>Searching ...</div>}
          {!isSearching &&
            (items.length > 0 ? (
              items.map((item, index) => (
                <div className={styles.itemContainer} key={index}>
                  <div
                    key={index}
                    className={styles.item}
                    onClick={handleOnSelect}
                  >
                    {item}
                  </div>
                </div>
              ))
            ) : (
              <div className={styles.item}>No results to display</div>
            ))}
        </div>
      )}
    </div>
  );
};

export default SearchableDropdownComponent;
