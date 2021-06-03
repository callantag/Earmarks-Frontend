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
					<Nav.Link as={Link} to="/admin">
						&#x1F4B8; All Budget Entries
					</Nav.Link>
					<Nav.Link as={Link} to="/" onClick={handleClick}>
						&#x1F4B8; Logout
					</Nav.Link>
				</>
			);
		}

		if (user.userId) {
			return (
				<>
					<Nav.Link as={Link} to="/dash">
						&#x1F4B8; {user.firstName}'s Dashboard
					</Nav.Link>
					<Nav.Link as={Link} to="/categories">
						&#x1F4B8; Manage Categories
					</Nav.Link>
					<Nav.Link as={Link} to="/" onClick={handleClick}>
						&#x1F4B8; Logout
					</Nav.Link>
				</>
			);
		}

		return (
			<>
				<Nav.Item className="navbar-text px-3">HELLO GUEST!</Nav.Item>
				<Nav.Link as={Link} to="/login" className="px-3">
					&#x1F4B8; Login
				</Nav.Link>
				<Nav.Link as={Link} to="/register" className="px-3">
					&#x1F4B8; Register
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
				<Nav className="ml-auto">{navLinks()}</Nav>
			</Navbar.Collapse>
		</Navbar>
	);
}
