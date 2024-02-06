import React, { createContext, useEffect, useState, useContext } from "react";
import axios from "axios";
import { io } from "socket.io-client";
import { user } from "./UserProvider";

const messages = createContext();

const { Provider } = messages;

const socket = io("http://localhost:5001");

// Listen for the 'connect' event
socket.on('connect', () => {
	console.log('Connected to the server');
});

// Listen for the 'disconnect' event
socket.on('disconnect', () => {
	console.log('Disconnected from the server');
});

// Listen for the 'error' event
socket.on('error', (error) => {
	console.error('Socket error:', error);
});

const MessagesProvider = ({ children }) => {
	const [ messages, setMessages ] = useState({});
	const userContext = useContext(user);

	const refreshMessages = async () => {
		try {
			const res = await axios.get("/messages");

			const userWiseMessages = {};

			for (let message of res.data) {

				const otherUser = message.to._id === userContext.user._id ? message.from : message.to;

				if (!(otherUser._id in userWiseMessages)) {
					userWiseMessages[ otherUser._id ] = {
						user: otherUser,
						messages: [],
					};
				}
				userWiseMessages[ otherUser._id ].messages.push({
					message: message.message,
					from: message.from._id,
				});
			}

			console.log(userWiseMessages);

			setMessages(userWiseMessages);

		} catch (err) {
			console.log(err);
		}
	};

	const addNewMessage = (message) => {
		const otherUser = message.to._id === userContext.user._id ? message.from : message.to;
		setMessages((prev) => {
			return {
				...prev,
				[ otherUser._id ]: {
					user: otherUser,
					messages: [
						...(prev[ otherUser._id ] ? prev[ otherUser._id ].messages : []),
						{
							message: message.message,
							from: message.from._id,
						},
					],
				},
			};
		});
	};

	const addNewContact = (contact) => {
		setMessages((prev) => {
			return {
				...prev,
				[ contact._id ]: {
					user: contact,
					messages: []
				}
			};
		});
	};

	useEffect(() => {
		if (!userContext.user._id) {
			return;
		}
		refreshMessages();
	}, [ userContext.user._id ]);

	useEffect(() => {

		if (!userContext.user._id) {
			return;
		}

		console.log(userContext.user._id);

		socket.on(userContext.user._id, (data) => {
			addNewMessage(data);
		});

	}, [ userContext.user._id ]);

	return (
		<Provider value={ { messages, setMessages, refreshMessages, addNewMessage, addNewContact } }>
			{ children }
		</Provider>
	);
};

export { messages, MessagesProvider };
