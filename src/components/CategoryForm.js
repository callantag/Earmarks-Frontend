import React, { useContext } from "react";
import { Button, Card, Form, Table } from "react-bootstrap";

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
                    alert("Category has been added.");
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
                        Add Category
                    </h3>

                    <Form.Group controlId="name">
                        <Form.Label>Name:</Form.Label>
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

export default CategoryForm;
