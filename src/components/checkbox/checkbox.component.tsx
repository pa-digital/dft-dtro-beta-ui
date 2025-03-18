import React, { useState } from "react";
import styles from "./checkbox.module.css";
import classNames from "classnames";
import { RadioButtonOption } from "../radio-button/radio-button.component";

interface CheckboxComponentProps {
  items: RadioButtonOption[];
  allowSelectAll?: boolean;
  onChange: (selected: boolean[]) => void;
}

const CheckboxComponent: React.FC<CheckboxComponentProps> = ({
  items,
  allowSelectAll = false,
  onChange,
}) => {
  const [allSelected, setAllSelected] = useState(false);
  const [selectedItems, setSelectedItems] = useState<boolean[]>(
    new Array(items.length).fill(false)
  );

  const handleSelectAll = () => {
    const newSelectAllState = !allSelected;
    setAllSelected(newSelectAllState);
    const newSelectedItems = new Array(items.length).fill(newSelectAllState);
    setSelectedItems(newSelectedItems);
    onChange(newSelectedItems);
  };

  const handleChange = (index: number) => {
    const newSelectedItems = [...selectedItems];
    newSelectedItems[index] = !newSelectedItems[index];
    setSelectedItems(newSelectedItems);
    setAllSelected(newSelectedItems.every((item) => item));
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
