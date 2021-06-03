import React, { useState, useContext } from "react";

import { ApplicationContext } from "./../contexts/ApplicationContext";

import { Table, Button } from "react-bootstrap";

import { Form } from "react-bootstrap";

const UsersEntries = () => {
	const [search, setSearch] = useState("");

	const handleChange = (e) => {
		setSearch(e.target.value);
	};

	const { categories, entries, setEntries, expense, setExpense } =
		useContext(ApplicationContext);

	const income = entries.reduce(
		(acc, e) => acc + (e.income ? e.amount : 0),
		0
	);
	const expenditure = entries.reduce(
		(acc, e) => acc + (!e.income ? e.amount : 0),
		0
	);

	const budget = income - expenditure;

	const filter = (e) =>
		!search ||
		e.user.firstName.includes(search) ||
		e.user.lastName.includes(search) ||
		e.description.includes(search);

	return (
		<>
			<div
				style={{
					background: "white",
					width: 700,
					margin: "50px auto 0",
					textAlign: "center",
				}}
			>
				<h3 style={{ padding: "10px 0" }}>
					Budget Summary for All Users
				</h3>

				{budget <= 0 ? (
					<h1>
						BUDGET TOTAL:
						<span style={{ color: "red" }}>
							{" "}
							${budget.toFixed(2)}{" "}
						</span>{" "}
					</h1>
				) : (
					<h1>
						NET INCOME:
						<span style={{ color: "teal" }}>
							${budget.toFixed(2)}{" "}
						</span>
					</h1>
				)}

				<Form.Group controlId="search">
					<Form.Label>Search:</Form.Label>
					<Form.Control
						type="text"
						onChange={handleChange}
						value={search}
						style={{ width: "94%", margin: "0 auto" }}
					/>
				</Form.Group>

				<Table
					striped
					bordered
					hover
					size="sm"
					style={{ width: "95%", margin: "10px auto" }}
				>
					<tr>
						<th>User</th>
						<th>Description</th>
						<th>Amount</th>
						<th>Category</th>
						<th>Income/Expense</th>
					</tr>
					{entries.filter(filter).map((entry) => (
						<tr>
							<td>
								{entry.user.firstName} {entry.user.lastName}
							</td>
							<td>{entry.description}</td>
							<td>{entry.amount.toFixed(2)}</td>
							<td>
								{categories.find(
									(e) => e._id === entry.category
								)?.name || "-"}
							</td>
							<td>{entry.income ? "Income" : "Expense"}</td>
						</tr>
					))}
				</Table>
				<h4>
					<span style={{ margin: "0 15px" }}>
						Total Income:
						<span style={{ color: "green" }}>
							${income.toFixed(2)}
						</span>
					</span>
					<span style={{ margin: "0 15px" }}>
						Total Expenses:{" "}
						<span style={{ color: "red" }}>
							{" "}
							${expenditure.toFixed(2)}{" "}
						</span>
					</span>
				</h4>
				<h5 style={{ color: "grey" }}>...</h5>
			</div>
		</>
	);
};

export default UsersEntries;
