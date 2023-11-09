import React, { useState } from "react";
import styles from "./PopupPage.module.css";

const PopupPage = ({ onClose, showPopup, updateGroup }) => {
  const [inputValue, setInputValue] = useState("");
  const [selectedColor, setSelectedColor] = useState("");
  const [isColorSelected, setIsColorSelected] = useState(false);
  const [groupIdCount, setGroupIdCount] = useState(1);

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleColor = (color) => {
    setSelectedColor(color);
    setIsColorSelected(true);
  };

  const colorButtons = [
    "#B38BFA",
    "#FF79F2",
    "#43E6FC",
    "#F19576",
    "#0047FF",
    "#6691FF",
  ];
  
  const handleCreate = () => {
    if (inputValue.trim() && selectedColor) {
      updateGroup(inputValue.trim(), selectedColor, groupIdCount);
      onClose();
      setInputValue(''); // Clear the inputValue after group creation
      setSelectedColor(''); // Clear the selectedColor for the next group
      setIsColorSelected(false); // Reset the color selection state
      setGroupIdCount(groupIdCount + 1);
    }
  };
  const handleSubmit = (event) => {
    event.preventDefault(); // Prevent default form submission
  };

  return (
    <div>
      {showPopup && (
        <div className={styles.popupBackground}>
          <div className={styles.popup}>
            <div className={styles.popupContent}>
              <p className={styles.heading}>Create New Notes Group</p>
              <form onSubmit={handleSubmit}>
                <div className={styles.groupname}>
                  <label htmlFor="groupname">Group name</label>
                  <input
                    type="text"
                    placeholder="Enter Your Group Name..."
                    value={inputValue}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div className={styles.colorSelection}>
                  <label>Choose color</label>
                  <ul>
                    {colorButtons.map((color, index) => (
                      <button
                        key={index}
                        className={styles.colorButton}
                        style={{ backgroundColor: color }}
                        onClick={() => handleColor(color)}
                      ></button>
                    ))}
                  </ul>
                </div>

                <button
                    type="button" // Specify button type to prevent form submission
                    onClick={handleCreate}
                    className={styles.createButton}
                    disabled={!inputValue || !isColorSelected}
                  >
                    Create
                  </button>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PopupPage;
