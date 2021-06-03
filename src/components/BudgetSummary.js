import React, { useContext } from "react";

import { ApplicationContext } from "./../contexts/ApplicationContext";
import CategorySummary from "./CategorySummary";

import { Table, Button } from "react-bootstrap";

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
                    alert("Budget entry has been removed");
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
            <div style={{ background: "white", width: 700, margin: "0 auto" }}>
                {budget > 0
                    ? `Net income: ${Math.abs(budget).toFixed(2)}`
                    : `Budget income: ${Math.abs(budget).toFixed(2)}`}
                <Table
                    striped
                    bordered
                    hover
                    size="sm"
                    style={{ width: "95%", margin: "10px auto" }}
                >
                    <tr>
                        <th>Description</th>
                        <th>Amount</th>
                        <th>Category</th>
                        <th>Income/Expense</th>
                        <th colSpan="2"> </th>
                    </tr>
                    {entries.map((entry) => (
                        <tr>
                            <td>{entry.description}</td>
                            <td>{entry.amount.toFixed(2)}</td>
                            <td>
                                {categories.find(
                                    (e) => e._id === entry.category
                                )?.name || "-"}
                            </td>
                            <td>{entry.income ? "Income" : "Expense"}</td>
                            <td>
                                {" "}
                                <Button
                                    className="btn-sm btn-secondary mr-3"
                                    onClick={handleEdit(entry)}
                                >
                                    &#x270E;
                                </Button>
                            </td>
                            <td>
                                {" "}
                                <Button
                                    className="btn-sm btn-danger"
                                    onClick={handleDelete(entry)}
                                >
                                    &#x1F5D1;
                                </Button>
                            </td>
                        </tr>
                    ))}
                </Table>
                <span className="px-3">
                    {" "}
                    Total Income: {income.toFixed(2)}{" "}
                </span>
                <span className="px-3">
                    {" "}
                    Total Expense: {expenditure.toFixed(2)}{" "}
                </span>

                <br />
            </div>
        </>
    );
};

export default BudgetSummary;
