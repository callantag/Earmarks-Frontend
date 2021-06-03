import { createContext, useState, useEffect } from "react";

export const ApplicationContext = createContext();

export default function ApplicationProvider(props) {
	const [user, setUser] = useState({
		userId: "",
		isAdmin: false,
		email: "",
		firstName: "",
		lastName: "",
	});

	const [entries, setEntries] = useState([]);

	const [expense, setExpense] = useState({
		description: "",
		amount: "",
		income: "",
	});

	const [categories, setCategories] = useState([]);

	const [category, setCategory] = useState({
		name: "",
		description: "",
	});

	useEffect(() => {
		if (!user.userId) return;

		fetch("http://localhost:4000/api/categories", {
			headers: {
				Authorization: `Bearer ${localStorage.getItem("token")}`,
			},
		})
			.then((res) => res.json())
			.then((data) => {
				// console.log(data)
				setCategories(data);
			})
			.catch((err) => console.log(err));
	}, [user]);

	useEffect(() => {
		if (!user.userId) return;

		fetch("http://localhost:4000/api/entries", {
			headers: {
				Authorization: `Bearer ${localStorage.getItem("token")}`,
			},
		})
			.then((res) => res.json())
			.then((data) => {
				// console.log(data)
				setEntries(data);
			})
			.catch((err) => console.log(err));
	}, [user]);

	// Fetch
	//useEffect(<function to run>, <array of state that you are watching>)
	useEffect(() => {
		// ...................
		// if (localStorage.getItem('token')) =fetch
		fetch("http://localhost:4000/api/users", {
			headers: {
				Authorization: `Bearer ${localStorage.getItem("token")}`,
			},
		})
			.then((res) => res.json())
			.then((data) => {
				// console.log(data)
				let { firstName, lastName, isAdmin, email } = data;
				setUser({
					userId: data._id,
					firstName,
					lastName,
					email,
					isAdmin,
				});
			})
			.catch((err) => console.log(err));
	}, []);

	return (
		<ApplicationContext.Provider
			value={{
				setUser,
				user,
				setEntries,
				entries,
				setExpense,
				expense,
				categories,
				setCategories,
				category,
				setCategory,
			}}
		>
			{props.children}
		</ApplicationContext.Provider>
	);
}
