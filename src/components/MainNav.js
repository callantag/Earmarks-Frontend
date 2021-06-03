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

	const navLinks = !user.userId ? (
		<>
			<Nav.Link as={Link} to="/login">
				Login
			</Nav.Link>
			<Nav.Link as={Link} to="/register">
				Register
			</Nav.Link>
		</>
	) : (
		<>
			<Nav.Link as={Link} to="/transactions">
				{user.firstName}'s Dashboard{" "}
			</Nav.Link>
			<Nav.Link onClick={handleClick}>Logout</Nav.Link>
		</>
	);

	const adminLink = user.isAdmin ? (
		<>
			<Nav.Link as={Link} to="/dash/allUsers">
				Users Entries
			</Nav.Link>
		</>
	) : (
		""
	);
	return (
		<Navbar className="navbar" variant="dark" expand="md">
			<Navbar.Brand as={Link} to="/">
				Earmark$
			</Navbar.Brand>
			<Navbar.Toggle aria-controls="basic-navbar-nav" />
			<Navbar.Collapse id="basic-navbar-nav">
				<Nav className="ml-auto">
					{adminLink}
					<Nav.Link as={Link} to="/dash">
						Dashboard(No auth-Remove later)
					</Nav.Link>
					{navLinks}
				</Nav>
			</Navbar.Collapse>
		</Navbar>
	);
}
