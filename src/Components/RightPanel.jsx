import React from "react";
import styles from "./RightPanel.module.css";
import background from "../Assets/background.png";
import vector from "../Assets/vector.png";
const RightPanel = () => {
  return (
    <>
      <div className={styles.outerdiv}>
        <div className={styles.rightdiv}>
          <img src={background} alt="bg" />
          <h1>Pocket Notes</h1>
          <p>
            Send and receive messages without keeping your phone online. Use
            Pocket Notes on up to 4 linked devices and 1 mobile phone
          </p>
        </div>
        <div className={styles.rightdiv2}>
          <img src={vector} alt="" />
          <span>end-to-end encrypted</span>
        </div>
      </div>
    </>
  );
};

export default RightPanel;
