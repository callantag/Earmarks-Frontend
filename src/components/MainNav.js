import { Navbar, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { ApplicationContext } from "./../contexts/ApplicationContext";
import "./MainNav.css";

export default function MainNav() {
	const { user, setUser } = useContext(ApplicationContext);

	const handleClick = () => {
		setUser({
			userId: "",
			isAdmin: false,
			email: "",
			firstName: "",
			lastName: "",
		});

		localStorage.clear();
	};

	const navLinks = () => {
		if (user.isAdmin) {
			return (
				<>
					<Nav.Link as={Link} to="/dash/allUsers">
						Users Entries
					</Nav.Link>
					<Nav.Link as={Link} to="/" onClick={handleClick}>
						Logout
					</Nav.Link>
				</>
			);
		}


		if (user.userId) {
			return (
				<>
					<Nav.Link as={Link} to="/dash">
						{user.firstName}'s Dashboard{" "}
					</Nav.Link>
					<Nav.Link as={Link} to="categories">
						Categories
					</Nav.Link>
					<Nav.Link as={Link} to="/" onClick={handleClick}>
						Logout
					</Nav.Link>
				</>
			);
		}

		return (
			<>
				<Nav.Item className="navbar-text px-3">
					HELLO GUEST!
				</Nav.Item>
				<Nav.Link as={Link} to="/login" className="px-3">
					Login
				</Nav.Link>
				<Nav.Link as={Link} to="/register" className="px-3">
					Register
				</Nav.Link>
			</>
		);
	};

	return (
		<Navbar className="navbar" variant="dark" expand="md">
			<Navbar.Brand as={Link} to="/">
				Earmark$
			</Navbar.Brand>
			<Navbar.Toggle aria-controls="basic-navbar-nav" />
			<Navbar.Collapse id="basic-navbar-nav">
				<Nav className="ml-auto">
					{navLinks()}
				</Nav>
			</Navbar.Collapse>
		</Navbar>
	);


}
