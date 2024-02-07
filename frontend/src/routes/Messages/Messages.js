import React, { useContext, useState } from "react";
import { messages } from "../../providers/MessagesProvider";
import ContactList from "../../components/ContactList/ContactList";
import Chat from "../../components/Chat/Chat";
import styles from "./Messages.module.css";

const Messages = () => {
  const messagesContext = useContext(messages);
  const [selectedUser, setSelectedUser] = useState("");

  console.log(messagesContext.messages);

  return (
    <div className={styles.home}>
      <div className={styles.wrapper}>
        <ContactList
          messages={messagesContext.messages}
          setSelectedUser={setSelectedUser}
        />
        <Chat
          userID={selectedUser}
          messages={messagesContext.messages[selectedUser]?.messages || []}
        />
      </div>
    </div>
  );
};

export default Messages;
