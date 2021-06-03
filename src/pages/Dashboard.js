import { useState } from "react";

import BudgetSummary from "./../components/BudgetSummary";
import ExpenseForm from "../components/ExpenseForm";

export default function Dashboard() {
	return (
		<div>
			<BudgetSummary />
			<ExpenseForm />
		</div>
	);
}
