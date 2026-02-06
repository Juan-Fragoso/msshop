import { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { getMenuItems, type MenuItem } from "../services/MenuServices.ts";

type Props = {
  onSelectCategory?: (category: string | null) => void;
  onScrollToProducts?: () => void;
};

function Navbars({ onSelectCategory, onScrollToProducts }: Props) {
  const [menus, setMenus] = useState<MenuItem[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getMenuItems();
      setMenus(data);
    };
    fetchData();
  }, []);

  const handleCategoryClick = (category: string | null) => {
    onSelectCategory?.(category);
    onScrollToProducts?.();
  };

  const handleLogoClick = () => {
    onSelectCategory?.(null);
    window.location.href = "/";
  };

  return (
    <Navbar expand="lg" className="navbar-premium" sticky="top">
      <Container fluid className="px-4">
        <Navbar.Brand
          href="#/"
          className="fw-bold fs-5"
          onClick={handleLogoClick}
          style={{ cursor: "pointer" }}
        >
          <img src="/msshop.png" alt="logo MsShop" width={150} />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav className="ms-auto me-3 align-items-center gap-2">
            <Nav.Link
              className="nav-item-premium"
              href="#/"
              onClick={() => handleCategoryClick(null as any)}
            >
              ✨ Todos
            </Nav.Link>
            {menus.map((item) => (
              <Nav.Link
                className="nav-item-premium"
                key={item.id}
                href={`/#/${item.id}`}
                onClick={() => handleCategoryClick(item.name)}
              >
                {item.name.charAt(0).toUpperCase() + item.name.slice(1)}
              </Nav.Link>
            ))}
          </Nav>
          <Form className="d-flex gap-2">
            <Form.Control
              type="search"
              placeholder="Buscar productos..."
              className="search-input"
              aria-label="Search"
            />
          </Form>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Navbars;
