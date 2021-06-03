import React, { useContext } from "react";
import { Button, Card, Form, Table } from "react-bootstrap";

import { ApplicationContext } from "./../contexts/ApplicationContext";

const CategorySummary = () => {
    const { categories, setCategories, category, setCategory } =
        useContext(ApplicationContext);

    const handleDelete = (entry) => (evt) => {
        fetch(
            `https://earmarks-backend.herokuapp.com/api/categories/${entry._id}`,
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
                    alert("Category has been removed");
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
                setCategories([...categories.filter((e) => e !== entry)]);
            })
            .catch((err) => console.log(err));
    };

    const handleEdit = (entry) => (evt) => {
        setCategory(entry);
    };

    return (
        <>
            <div style={{ background: "white", width: 700, margin: "0 auto" }}>
                <h3 style={{ padding: "10px 0" }}>Categories</h3>
                <Table
                    striped
                    bordered
                    hover
                    size="sm"
                    style={{ width: "95%", margin: "10px auto" }}
                >
                    <tr>
                        <th>Name</th>
                        <th>Description</th>
                        <th colSpan="2"> </th>
                    </tr>
                    {categories.map((entry) => (
                        <tr>
                            <td>{entry.name}</td>
                            <td>{entry.description}</td>
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
                <h5 style={{ color: "grey" }}>...</h5>
            </div>
        </>
    );
};

export default CategorySummary;
