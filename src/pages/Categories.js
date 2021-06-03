import CategoryForm from "./../components/CategoryForm";
import CategorySummary from "./../components/CategorySummary";
import "./Dashboard.css";

import { Row, Col } from "react-bootstrap";

export default function Dashboard() {
	return (
		<div className="mt-5 text-center container">
			<Row className="justify-content-center align-items-center">
				<Col className="mx-auto" xs={12} sm={10} md={4}>
					<CategoryForm />
				</Col>
				<Col className="mx-auto " xs={12} sm={10} md={8}>
					<CategorySummary />
				</Col>
			</Row>
		</div>
	);
}
