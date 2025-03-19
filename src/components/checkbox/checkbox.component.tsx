import React, { useEffect, useState } from "react";
import styles from "./checkbox.module.css";
import classNames from "classnames";
import { RadioButtonOption } from "../radio-button/radio-button.component";

interface CheckboxComponentProps {
  items: RadioButtonOption[];
  allowSelectAll?: boolean;
  selectedItems: boolean[];
  onChange: (selected: boolean[]) => void;
}

const CheckboxComponent: React.FC<CheckboxComponentProps> = ({
  items,
  allowSelectAll = false,
  selectedItems,
  onChange,
}) => {
  const [allSelected, setAllSelected] = useState(
    selectedItems.every((item) => item)
  );

  useEffect(() => {
    setAllSelected(selectedItems.every((item) => item));
  }, [selectedItems]);

  const handleSelectAll = () => {
    const newSelectAllState = !allSelected;
    const newSelectedItems = new Array(items.length).fill(newSelectAllState);
    onChange(newSelectedItems);
  };

  const handleChange = (index: number) => {
    const newSelectedItems = [...selectedItems];
    newSelectedItems[index] = !newSelectedItems[index];
    onChange(newSelectedItems);
  };

  return (
    <div className={styles.container}>
      {allowSelectAll && (
        <div className={styles.item}>
          <label>
            <input
              type="checkbox"
              checked={allSelected}
              onChange={handleSelectAll}
            ></input>
            ({allSelected ? "Unselect all" : "Select all"})
          </label>
        </div>
      )}
      {items.map((item, index) => (
        <div
          className={classNames(styles.item, {
            [styles.indented]: allowSelectAll,
          })}
        >
          <label>
            <input
              type="checkbox"
              checked={selectedItems[index]}
              onChange={() => handleChange(index)}
            ></input>
            {item.title}
          </label>
        </div>
      ))}
    </div>
  );
};

export default CheckboxComponent;
