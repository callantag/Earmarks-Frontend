import { Button, Card, Form } from "react-bootstrap";
import { useState, useContext } from "react";
import { ApplicationContext } from "../contexts/ApplicationContext";

export default function LoginForm({ setIsRedirect }) {
	const { setUser } = useContext(ApplicationContext);

	const [credentials, setCredentials] = useState({
		email: "",
		password: "",
	});

	const [isLoading, setIsLoading] = useState(false);

	const handleSubmit = (e) => {
		e.preventDefault();
		setIsLoading(true);
		fetch("//localhost:4000/api/users/login", {
			method: "POST",
			body: JSON.stringify(credentials),
			headers: {
				"Content-Type": "application/json",
			},
		})
			.then((res) => {
				console.log(res);
				setIsLoading(false);
				if (res.status === 200) {
					alert("Login successful");
					return res.json();
				} else {
					alert("Invalid Credentials");
					throw new Error("Invalid Credentials");
				}
			})
			.then((token) => {
				let access = token.token;

				localStorage.setItem("token", access);
				// console.log(access)
				return fetch("http://localhost:4000/api/users", {
					headers: {
						Authorization: `Bearer ${access}`,
					},
				});
			})
			.then((res) => res.json())
			.then((data) => {
				// console.log(data)
				const { firstName, lastName, email, isAdmin } = data;
				setUser({
					userId: data._id,
					firstName,
					lastName,
					email,
					isAdmin,
				});
				setIsRedirect(true);
			})
			.catch((err) => console.log(err));
	};

	const handleChange = (e) => {
		setCredentials({
			...credentials,
			[e.target.id]: e.target.value,
		});
	};

	return (
		<Card className="mt-4">
			<Card.Body>
				<Form onSubmit={handleSubmit}>
					<h3 className="text-center pb-3" st>
						Login
					</h3>

					<Form.Group controlId="email">
						<Form.Label>Email:</Form.Label>
						<Form.Control
							type="email"
							onChange={handleChange}
							value={credentials.email}
						/>
					</Form.Group>

					<Form.Group controlId="password">
						<Form.Label>Password:</Form.Label>
						<Form.Control
							type="password"
							onChange={handleChange}
							value={credentials.password}
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
