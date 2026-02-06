import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { getMenuItems, type MenuItem } from "../api/MenuServices.ts";

type Props = {
  onSelectCategory?: (category: string) => void;
};

function Navbars({ onSelectCategory }: Props) {
  // Menu
  const [menus, setMenus] = useState<MenuItem[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getMenuItems();
      setMenus(data);
    };
    fetchData();
  }, []);

  return (
    <Navbar expand="lg" className="navbar-custom" data-bs-theme="dark">
      <Container fluid>
        <Navbar.Brand href="#">Logo</Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: "100px" }}
            navbarScroll
          >
            <Nav.Link
              className="text-color"
              href="#/"
              onClick={() => onSelectCategory?.(null as any)}
            >
              Todos
            </Nav.Link>
            {menus.map((item) => (
              <Nav.Link
                className="text-color"
                key={item.id}
                href={`/#/${item.id}`}
                onClick={() => onSelectCategory?.(item.name)}
              >
                {item.name}
              </Nav.Link>
            ))}
          </Nav>
          <Form className="d-flex">
            <Form.Control
              type="search"
              placeholder="Search"
              className="me-2"
              aria-label="Search"
            />
            <Button variant="outline-success">Search</Button>
          </Form>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Navbars;
