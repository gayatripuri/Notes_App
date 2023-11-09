import React,{useState} from "react";
import LeftPanel from "../Components/LeftPanel";
import RightPanel from "../Components/RightPanel";

import styles from "./NotePage.module.css";
import ChatPanel from "../Components/ChatPanel";


import PopupPage from "../Components/PopupPage";
const NotePage = () => {
  const [selectedGroup, setSelectedGroup] = useState(null);

  const setGroupSelection = (group) => {
    setSelectedGroup(group);
  };
  
  return (
    <>
      <div className={styles.container}>
        <div className={styles.leftPanel}>
          <LeftPanel setGroupSelection={setGroupSelection} />
        </div>
        <div className={styles.rightPanel}>
        {selectedGroup ? (
          <ChatPanel group={selectedGroup} />
        ) : (
          <RightPanel />
        )}
       
        </div>
      </div>





     









      
    



      <PopupPage />
    </>
  );
}

export default NotePage;
