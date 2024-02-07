import React, { useContext, useEffect, useRef, useState } from "react";
import styles from "./Chat.module.css";
import { AiOutlineSend } from "react-icons/ai";
import { user } from "../../providers/UserProvider";
import axios from "axios";

const Chat = ({ messages, userID }) => {
  const refBottom = useRef();
  const userContext = useContext(user);
  const [message, setMessage] = useState("");

  const handleSubmit = async () => {
    try {
      const res = await axios.post("/messages", {
        message,
        to: userID,
      });

      console.log(res);

      setMessage("");
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    if (messages.length) {
      refBottom.current?.scrollIntoView({
        behavior: "smooth",
        block: "end",
      });
    }
  }, [messages.length]);
  return (
    <div className={styles.wrapper}>
      <div className={styles.message_list}>
        {messages.map((message) => {
          return (
            <div
              className={[
                styles.message,
                message.from === userContext.user._id
                  ? styles.sent
                  : styles.received,
              ].join(" ")}
            >
              {message.message}
            </div>
          );
        })}
        <div ref={refBottom}></div>
      </div>

      <div className={styles.send_box}>
        <input
          value={message}
          placeholder="Type something..."
          onChange={(e) => {
            setMessage(e.target.value);
          }}
          onSubmit={handleSubmit}
          className={styles.send_input}
          onKeyDown={(e) => {
            if (e.key === "Enter") handleSubmit();
          }}
        ></input>

        {/* <AiOutlineSend size={30} onClick={handleSubmit} /> */}
      </div>
    </div>
  );
};

export default Chat;
