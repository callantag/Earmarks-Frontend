import React, { useContext } from "react";
import { Button, Card, Form } from "react-bootstrap";

import { ApplicationContext } from "./../contexts/ApplicationContext";

const CategoryForm = () => {
    const { setUser } = useContext(ApplicationContext);
    const { categories, setCategories, category, setCategory } =
        useContext(ApplicationContext);

    const handleSubmit = (e) => {
        e.preventDefault();

        const token = localStorage.getItem("token");
        const isNew = !category._id;

        const url = isNew
            ? "//localhost:4000/api/categories"
            : `//localhost:4000/api/categories/${category._id}`;

        fetch(url, {
            method: isNew ? "POST" : "PUT",
            body: JSON.stringify(category),
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
        })
            .then((res) => {
                console.log(res);
                if (res.status === 200) {
                    alert("category has been categoryd");
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
                if (isNew) setCategories([...categories, data]);
                else {
                    setCategories([
                        ...categories.map((e) =>
                            e._id === data._id ? data : e
                        ),
                    ]);
                }

                setCategory({
                    name: "",
                    description: "",
                });
            })
            .catch((err) => console.log(err));
    };

    const handleChange = (e) => {
        setCategory({
            ...category,
            [e.target.id]: e.target.value,
        });
    };

    return (
        <Card className="mt-4" style={{ width: 400, margin: "0 auto" }}>
            <Card.Body>
                <Form onSubmit={handleSubmit}>
                    <h3 className="text-center pb-3" st>
                        Category
                    </h3>

                    <Form.Group controlId="name">
                        <Form.Label>name:</Form.Label>
                        <Form.Control
                            type="text"
                            onChange={handleChange}
                            value={category.name}
                        />
                    </Form.Group>

                    <Form.Group controlId="description">
                        <Form.Label>Description:</Form.Label>
                        <Form.Control
                            type="text"
                            onChange={handleChange}
                            value={category.description}
                        />
                    </Form.Group>

                    <div className="text-center py-2">
                        <Button type="submit" block>
                            Submit
                        </Button>
                    </div>
                </Form>
            </Card.Body>
        </Card>
    );
};

const CategorySummary = () => {
    const { categories, setCategories, category, setCategory } =
        useContext(ApplicationContext);

    const handleDelete = (entry) => (evt) => {
        fetch(`//localhost:4000/api/categories/${entry._id}`, {
            method: "DELETE",
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
                "Content-Type": "application/json",
            },
        })
            .then((res) => {
                console.log(res);
                if (res.status === 200) {
                    alert("category has been uncategoryd");
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
            <CategoryForm />

            <div style={{ background: "white", width: 700, margin: "0 auto" }}>
                <h3>Categories</h3>
                <table style={{ width: "95%", margin: "10px auto" }}>
                    <tr>
                        <th>Name</th>
                        <th>Description</th>
                    </tr>
                    {categories.map((entry) => (
                        <tr>
                            <td>{entry.name}</td>
                            <td>{entry.description}</td>
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
            </div>
        </>
    );
};

export default CategorySummary;
