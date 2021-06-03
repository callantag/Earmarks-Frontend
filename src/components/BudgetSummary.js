import React, { useContext } from "react";

import { ApplicationContext } from "./../contexts/ApplicationContext";

import { Table, Button } from "react-bootstrap";

const BudgetSummary = () => {
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

    const handleDelete = (entry) => (evt) => {
        fetch(
            `https://earmarks-backend.herokuapp.com/api/entries/${entry._id}`,
            {
                method: "DELETE",
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                    "Content-Type": "application/json",
                },
            }
        )
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
                <h3 style={{ padding: "10px 0" }}>Budget Summary</h3>

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

export default BudgetSummary;
