import axios from "axios";
import React, { createContext, useEffect, useState } from "react";

const user = createContext();

const { Provider } = user;

const UserProvider = ({ children }) => {
	const [user, setUser] = useState({});

	const getUser = async () => {
		try {
			const res = await axios.get("/users/me");
			setUser(res.data);
		} catch (err) {
			console.log(err);
		}
	};

	useEffect(() => {
		if (localStorage.getItem("token")) {
			getUser();
		}
	}, []);

	return <Provider value={{ user, setUser }}>{children}</Provider>;
};

export { user, UserProvider };
