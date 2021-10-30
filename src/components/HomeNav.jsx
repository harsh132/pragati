import { Navbar, Nav, Container, NavDropdown, Button } from "react-bootstrap";
import { getAuth } from "firebase/auth";
import { Link, useHistory } from "react-router-dom";

function HomeNav({ user }) {
    const auth = getAuth();
    const history = useHistory();
    const logout = () => {
        auth.signOut()
            .then(() => {
                history.push("/");
            })
            .catch(console.error);
    };

    return (
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
            <Container>
                <Navbar.Brand as={Link} to="/">
                    Pragati
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link as={Link} to="/stats">
                            Stats
                        </Nav.Link>
                    </Nav>
                    <Nav>
                        {user ? (
                            <>
                                <Nav.Link as={Link} to={user.isadmin ? "/admin" : "ngorep"}>
                                    Dashboard
                                </Nav.Link>
                                <Button variant="danger" onClick={logout}>
                                    Logout
                                </Button>
                            </>
                        ) : (
                            <NavDropdown title="Login" id="collasible-nav-dropdown">
                                <NavDropdown.Item as={Link} to="/ngorep">
                                    NGO representative
                                </NavDropdown.Item>
                                <NavDropdown.Item as={Link} to="/admin">
                                    Admin
                                </NavDropdown.Item>
                            </NavDropdown>
                        )}
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default HomeNav;
