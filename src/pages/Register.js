import RegisterForm from "./../components/RegisterForm";
import { Container, Row, Col } from "react-bootstrap";
import { Redirect } from "react-router-dom";
import { useState } from "react";

export default function Register() {
	const [isRedirect, setIsRedirect] = useState(false);

	return isRedirect ? (
		<Redirect to="/login" />
	) : (
		<Container className="mt-5">
			<Row>
				<Col className="mx-auto" xs={12} sm={10} md={6}>
					<RegisterForm setIsRedirect={setIsRedirect} />
				</Col>
			</Row>
		</Container>
	);
}
