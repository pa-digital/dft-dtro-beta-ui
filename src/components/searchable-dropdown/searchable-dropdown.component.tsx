import React, { useEffect, useState } from "react";
import styles from "./searchable-dropdown.module.css";
import classNames from "classnames";
import CloseButton from "../../assets/close.svg";

interface SearchableDropdownComponentProps {
  items: string[];
  leadingIcon?: string;
  placeholderText?: string;
  allowMulti?: boolean;
  onChange: (value: string) => void;
  onSelect: (value: string | string[]) => void;
}

const SearchableDropdownComponent: React.FC<
  SearchableDropdownComponentProps
> = ({ items, leadingIcon, placeholderText, allowMulti = false, onChange, onSelect }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isSearching, setIsSearching] = useState<boolean>(false);
  const [selectedTerm, setSelectedTerm] = useState<string>("");
  const [selectedTerms, setSelectedTerms] = useState<string[]>([]);
  const [inputValue, setInputValue] = useState<string>("");

  useEffect(() => {
    if (allowMulti) {
      onSelect(selectedTerms);
    } else {
      onSelect(selectedTerm);
    }
  }, [selectedTerm, selectedTerms]);

  useEffect(() => {
    setIsSearching(false);
  }, [items]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputValue(value);
    setIsOpen(value !== "");
    setIsSearching(value !== "");
    onChange(value);
  };

  const handleOnSelect = (e: React.MouseEvent) => {
    const value = e.currentTarget.textContent || "";
    if (allowMulti) {
      setSelectedTerms(prev => {
        if (!prev.includes(value)) {
          const updated = [...prev, value];
          return updated;
        }
        return prev;
      });
    } else {
      setSelectedTerm(value);
    }
    setInputValue("");
    setIsOpen(false);
  };

  const handleRemoveOnClick = () => {
    setSelectedTerm("");
  };

  const handleRemoveMulti = (index: number) => {
    setSelectedTerms(prev => {
      const updated = prev.filter((_, ix) => ix !== index);
      return updated;
    });
  };

  return (
    <div className={styles.container}>
      {allowMulti && <div className={styles.selectedTermsContainer}>
        {selectedTerms.map((term, index) => (
          <div className={styles.selectedTermContainer}>
            <div>{term}</div>
            <img src={CloseButton} onClick={() => handleRemoveMulti(index)}></img>
          </div>
        ))}
      </div>}
      <div
        className={classNames(styles.inputWrapper, {
          [styles.rounded]: !isOpen,
        })}
      >
        {leadingIcon && <img className={styles.icon} src={leadingIcon}></img>}
        {allowMulti && <input
          value={inputValue}
          className={styles.input}
          type="text"
          placeholder={placeholderText}
          onChange={handleChange}
        />}

        {!allowMulti && selectedTerm === "" && <input
          value={inputValue}
          className={styles.input}
          type="text"
          placeholder={placeholderText}
          onChange={handleChange}
          disabled={selectedTerm !== ""}
        />}
        {!allowMulti && selectedTerm !== "" && <div className={styles.selectedTermContainer}>
          <div>{selectedTerm}</div>
          <img src={CloseButton} onClick={handleRemoveOnClick}></img>
        </div>}
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
