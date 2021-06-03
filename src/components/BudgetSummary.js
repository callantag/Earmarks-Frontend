import React, { useContext } from "react";

import { ApplicationContext } from "./../contexts/ApplicationContext";
import CategorySummary from "./CategorySummary";

const BudgetSummary = () => {
    const { categories, entries, setEntries, expense, setExpense } =
        useContext(ApplicationContext);

    const income = entries.reduce(
        (acc, e) => acc + (!e.income ? e.amount : 0),
        0
    );
    const expenditure = entries.reduce(
        (acc, e) => acc + (e.income ? e.amount : 0),
        0
    );

    const handleDelete = (entry) => (evt) => {
        fetch(`//localhost:4000/api/entries/${entry._id}`, {
            method: "DELETE",
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
                "Content-Type": "application/json",
            },
        })
            .then((res) => {
                console.log(res);
                if (res.status === 200) {
                    alert("Expense has been unexpensed");
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
                setEntries([...entries.filter((e) => e !== entry)]);
            })
            .catch((err) => console.log(err));
    };

    const handleEdit = (entry) => (evt) => {
        setExpense(entry);
    };

    const budget = income - expenditure;

    return (
        <>
            <CategorySummary />
            <div style={{ background: "white", width: 700, margin: "0 auto" }}>
                Total Income: {income}
                <br />
                Total Expense: {expenditure}
                <br />
                <table style={{ width: "95%", margin: "10px auto" }}>
                    <tr>
                        <th>Description</th>
                        <th>Amount</th>
                        <th>Category</th>
                        <th>Income</th>
                    </tr>
                    {entries.map((entry) => (
                        <tr>
                            <td>{entry.description}</td>
                            <td>{entry.amount}</td>
                            <td>
                                {categories.find(
                                    (e) => e._id === entry.category
                                )?.name || "-"}
                            </td>
                            <td>{entry.income ? "Y" : "N"}</td>
                            <td>
                                <button onClick={handleEdit(entry)}>
                                    Edit
                                </button>
                            </td>
                            <td>
                                <button onClick={handleDelete(entry)}>
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </table>
                {budget > 0
                    ? `Net income: ${Math.abs(budget)}`
                    : `Budget income: ${Math.abs(budget)}`}
            </div>
        </>
    );
};

export default BudgetSummary;
