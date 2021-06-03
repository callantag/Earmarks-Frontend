import { useState, useContext } from "react";
import { ApplicationContext } from "../contexts/ApplicationContext";
import { Button, Card, Form } from "react-bootstrap";

export default function RegisterForm({ setIsRedirect }) {
	const { setUser } = useContext(ApplicationContext);

	const [credentials, setCredentials] = useState({
		firstName: "",
		lastName: "",
		email: "",
		password: "",
		confirmPassword: "",
	});

	const [isLoading, setIsLoading] = useState(false);

	const handleSubmit = (e) => {
		e.preventDefault();
		setIsLoading(true);
		fetch("https://earmarks-backend.herokuapp.com/api/users/register", {
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
					alert("Registration successful");
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
				console.log(data);
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
						Register
					</h3>

					<Form.Group controlId="firstName">
						<Form.Label>First Name:</Form.Label>
						<Form.Control
							type="text"
							onChange={handleChange}
							value={credentials.firstName}
						/>
					</Form.Group>

					<Form.Group controlId="lastName">
						<Form.Label>Last Name:</Form.Label>
						<Form.Control
							type="text"
							onChange={handleChange}
							value={credentials.lastName}
						/>
					</Form.Group>

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

					<Form.Group controlId="confirmPassword">
						<Form.Label>Confirm Password:</Form.Label>
						<Form.Control
							type="password"
							onChange={handleChange}
							value={credentials.confirmPassword}
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
