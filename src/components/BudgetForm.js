import { useState, useContext } from "react";
import { ApplicationContext } from "../contexts/ApplicationContext";
import { Button, Card, Form } from "react-bootstrap";

export default function BudgetForm({ setIsRedirect }) {
	const { setUser } = useContext(ApplicationContext);
	const { categories, entries, setEntries, expense, setExpense } =
		useContext(ApplicationContext);

	const [isLoading, setIsLoading] = useState(false);

	const handleSubmit = (e) => {
		e.preventDefault();
		setIsLoading(true);

		const token = localStorage.getItem("token");
		const isNew = !expense._id;

		const url = isNew
			? "https://earmarks-backend.herokuapp.com/api/entries"
			: `https://earmarks-backend.herokuapp.com/api/entries/${expense._id}`;

		fetch(url, {
			method: isNew ? "POST" : "PUT",
			body: JSON.stringify(expense),
			headers: {
				Authorization: `Bearer ${token}`,
				"Content-Type": "application/json",
			},
		})
			.then((res) => {
				console.log(res);
				setIsLoading(false);
				if (res.status === 200) {
					alert("Budget entry has been submitted");
					return res;
				} else {
					return res.json().then((json) => {
						alert(json.error.message);
						throw new Error(json.error.message);
					});
				}
			})
			.then((res) => res.json())
			.then((data) => {
				if (isNew) setEntries([...entries, data]);
				else {
					setEntries([
						...entries.map((e) => (e._id === data._id ? data : e)),
					]);
				}

				setExpense({
					description: "",
					amount: "",
					category: "",
					income: "",
				});
			})
			.catch((err) => console.log(err));
	};

	const handleChange = (e) => {
		setExpense({
			...expense,
			[e.target.id]: e.target.value,
		});
	};

	return (
		<Card className="mt-4" style={{ width: 400, margin: "0 auto" }}>
			<Card.Body>
				<Form onSubmit={handleSubmit}>
					<h3 className="text-center pb-3" st>
						Add Budget Entry
					</h3>

					<Form.Group controlId="description">
						<Form.Label>Description:</Form.Label>
						<Form.Control
							type="text"
							onChange={handleChange}
							value={expense.description}
						/>
					</Form.Group>

					<Form.Group controlId="amount">
						<Form.Label>Amount:</Form.Label>
						<Form.Control
							type="text"
							onChange={handleChange}
							value={expense.amount}
						/>
					</Form.Group>

					<Form.Group controlId="category">
						<Form.Label>Category:</Form.Label>
						<Form.Control
							as="select"
							onChange={handleChange}
							value={expense.category}
						>
							<option>Select a category</option>
							{categories.map((e) => (
								<option value={e._id}>{e.name}</option>
							))}
						</Form.Control>
					</Form.Group>

					<Form.Group
						controlId="income"
						className="d-flex align-items-end"
					>
						<Form.Label>Income:</Form.Label>
						<Form.Control
							value="true"
							type="radio"
							name="income"
							onClick={handleChange}
							required
						/>
						<Form.Label>Expense:</Form.Label>
						<Form.Control
							value="false"
							type="radio"
							label="Expense"
							name="income"
							onClick={handleChange}
							required
						/>
					</Form.Group>

					<div className="text-center py-2">
						{isLoading ? (
							<Button type="submit" block disabled>
								Submit
							</Button>
						) : (
							<Button type="submit" block>
								Submit
							</Button>
						)}
					</div>
				</Form>
			</Card.Body>
		</Card>
	);
}
