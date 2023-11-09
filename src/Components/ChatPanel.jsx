import React, { useState, useEffect } from "react";
import styles from "./ChatPanel.module.css";
import enter from "../Assets/enter.png";

const ChatPanel = ({ group }) => {
  const [message, setMessage] = useState("");
  const [chatMessages, setChatMessages] = useState([]);
  const groupId = group.id;
  console.log(group, "group");

  useEffect(() => {
    const savedMessages =
      JSON.parse(localStorage.getItem(`savedMessages_${groupId}`)) || [];
    setChatMessages(savedMessages);
  }, [groupId]);

  const handleMessageChange = (event) => {
    setMessage(event.target.value);
  };

  const handleSendMessage = () => {
    if (message.trim() !== "") {
      const currentTime = new Date().toLocaleString();
      console.log(currentTime, "currentTime");
      const messageObject = { text: message, timestamp: currentTime };
      const storedMessages =
        JSON.parse(localStorage.getItem(`savedMessages_${groupId}`)) || [];
      const updatedMessages = [...storedMessages, messageObject];
      localStorage.setItem(
        `savedMessages_${groupId}`,
        JSON.stringify(updatedMessages)
      );
      setChatMessages(updatedMessages);
      setMessage("");
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className={styles.chatPanel}>
      <div className={styles.groupDetails}>
        <div className={styles.groupDetailsFixed}>
          <div className={styles.groupInfo}>
            <div
              className={styles.groupCircle}
              style={{ backgroundColor: group.color }}
            >
              <span className={styles.groupInitials}>
                {group.name.split(" ").map((word) => word.charAt(0))}
              </span>
            </div>
            <div className={styles.groupName}>{group.name}</div>
          </div>
        </div>
      </div>

      <div className={styles.messageContainer}>
        <div className={styles.chatMessages}>
          {chatMessages.map((messageObj, index) => {
            console.log(messageObj, "messageObj");
            const dateTimeArray = messageObj.timestamp
              ? messageObj.timestamp.split(" ")
              : ["", ""];
            console.log(dateTimeArray, "dateTimeArray");
            const date = dateTimeArray[0].replace(/,$/, "");
            console.log(date, "date");
            const time = dateTimeArray[1];
            return (
              <div
                className={`${styles.message} ${
                  messageObj.isCurrentUser ? styles.currentUser : ""
                }`}
              >
                <div className={styles.msgcontent}>
                  <div className={styles.messageWrapper}>
                    <div className={styles.timestamp}>
                      <span>{date}</span>
                      <span>{time}</span>
                    </div>
                    <p
                      className={`${styles.textRight} ${
                        messageObj.isCurrentUser ? styles.currentUser : ""
                      }`}
                    >
                      {messageObj.text}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className={styles.msgArea}>
        <textarea
          value={message}
          onChange={handleMessageChange}
          placeholder="Enter your text here"
          onKeyDown={handleKeyDown}
        ></textarea>
        <img src={enter} alt="enter" onClick={handleSendMessage} />
      </div>
    </div>
  );
};

export default ChatPanel;
