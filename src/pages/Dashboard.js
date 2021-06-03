import BudgetForm from "../components/BudgetForm";
import BudgetSummary from "./../components/BudgetSummary";
import CategoryForm from "./../components/CategoryForm";
import CategorySummary from "./../components/CategorySummary";

import { Container, Row, Col } from "react-bootstrap";

export default function Dashboard() {
	return (
		<Container className="mt-5 text-center">
			<Row className="justify-content-center align-items-center">
				<Col className="mx-auto" xs={12} sm={10} md={3}>
					<BudgetForm />
				</Col>
				<Col className="mx-auto" xs={12} sm={10} md={8}>
					<BudgetSummary />
				</Col>
			</Row>
			<Row className="justify-content-center align-items-center">
				<Col className="mx-auto" xs={12} sm={10} md={4}>
					<CategoryForm />
				</Col>
				<Col className="mx-auto " xs={12} sm={10} md={8}>
					<CategorySummary />
				</Col>
			</Row>
		</Container>
	);
}
