import React, { useState, useContext } from "react";
import styles from "./ContactList.module.css";
import { AiFillMessage } from "react-icons/ai";
import ChatNavbar from "../ChatNavbar/ChatNavbar";
import {
  Button,
  Modal,
  ModalBody,
  ModalFooter,
  ModalTitle,
} from "react-bootstrap";
import axios from "axios";
import { messages as msgs } from "../../providers/MessagesProvider";
import { user } from "../../providers/UserProvider";

const ContactList = ({ messages, setSelectedUser }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [email, setEmail] = useState("");

  const messagesContext = useContext(msgs);
  const userContext = useContext(user);

  const handleSubmit = async () => {
    for (let msg of Object.values(messagesContext.messages)) {
      if (msg.user.email.toLowerCase() === email.toLowerCase()) {
        return;
      }

      if (email.toLowerCase() === userContext.user.email.toLowerCase()) {
        return;
      }
    }

    try {
      const res = await axios.get(`/users?email=${email}`);

      messagesContext.addNewContact(res.data);

      setIsModalOpen(false);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className={styles.wrapper}>
      <ChatNavbar />
      {Object.values(messages).map((message) => {
        return (
          <div
            className={styles.contact}
            onClick={() => {
              setSelectedUser(message.user._id);
            }}
          >
            <div className={styles.contact_title}>
              {message.user.firstName} {message.user.lastName}
            </div>
            <div className={styles.contact_chat}>
              {(message.messages.slice(-1)[0] || { message: "" }).message}
            </div>
          </div>
        );
      })}

      <div className={styles.new_button}>
        <AiFillMessage
          onClick={() => {
            setIsModalOpen(true);
          }}
          color="black"
          size={30}
        />
      </div>
      <Modal
        show={isModalOpen}
        onBackdropClick={() => {
          setIsModalOpen(false);
        }}
        onEscapeKeyDown={() => {
          setIsModalOpen(false);
        }}
      >
        <ModalTitle>New Chat</ModalTitle>
        <ModalBody>
          <label>Email</label>
          <input
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
          <Button onClick={handleSubmit}>Submit</Button>
        </ModalBody>
        <ModalFooter>
          <Button
            onClick={() => {
              setIsModalOpen(false);
            }}
          >
            Close
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
};

export default ContactList;
