// LeftPanel.js
import React, { useState, useEffect } from "react";
import styles from "./LeftPanel.module.css";
import PopupPage from "./PopupPage";

const LeftPanel = ({ setGroupSelection }) => {
  const [showPopup, setShowPopup] = useState(false);
  const [groupData, setGroupData] = useState([]);
  const [selectedGroup, setSelectedGroup] = useState(null);

  const handleGroupClick = (group) => {
    setSelectedGroup(group);
    setGroupSelection(group);
    setShowPopup(false); // Close popup on group selection (if it's open)
  };

  useEffect(() => {
    const storedGroups = localStorage.getItem("groups");
    if (storedGroups) {
      setGroupData(JSON.parse(storedGroups));
    }
  }, []);

  const updateGroup = (name, color, id) => {
    const newGroup = { name, color, id };
    const updatedData = [...groupData, newGroup];
    setGroupData(updatedData);
    localStorage.setItem("groups", JSON.stringify(updatedData));
    setShowPopup(false); // Close the popup after creating the group
  };

  const handleClick = () => {
    setShowPopup(true);
  };

  const handleClose = () => {
    setShowPopup(false);
  };

  return (
    <div className={styles.sidebardiv}>
      <div className={styles.title}>Pocket Notes</div>
      <div className={styles.createNotesBtn}>
        <button onClick={handleClick}>
          <span style={{ fontSize: "30px" }}>+</span>
          <span>Create Notes Group</span>
        </button>
        <PopupPage
          showPopup={showPopup}
          onClose={handleClose}
          updateGroup={updateGroup}
        />
        {showPopup && <div className={styles.overlay} />}
      </div>

      {groupData.map((group, index) => (
        <div
          key={index}
          className={styles.groupEntry}
          onClick={() => handleGroupClick(group)}
        >
          <div style={{ display: "flex", alignItems: "center" }}>
            <div
              className={styles.groupIcon}
              style={{ backgroundColor: group.color }}
            >
              <span className={styles.groupInitials}>
                {group.name.split(" ").map((word) => word.charAt(0))}
              </span>
            </div>
            <div className="groupNameLeft">{group.name}</div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default LeftPanel;
