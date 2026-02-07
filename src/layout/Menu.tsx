import { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Button from "react-bootstrap/Button";
import { useProductsData } from "../hooks/useProductsData.ts";
import logo from "../assets/msshop.png";

type Props = {
  selectedCategoryId?: string | null;
  onScrollToProducts?: () => void;
  onSearch?: (query: string) => void;
  isLoggedIn?: boolean;
  onLogout?: () => void;
};

function Navbars({
  selectedCategoryId,
  onScrollToProducts,
  onSearch,
  isLoggedIn = false,
  onLogout,
}: Props) {
  const { categories: menus } = useProductsData();
  const [query, setQuery] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    setQuery(value);
  };

  useEffect(() => {
    const timeout = setTimeout(() => {
      // Ejecuta la búsqueda si tiene más de 1 carácter O si está vacío (para limpiar)
      if ((query.length > 1 || query.length === 0) && onSearch) {
        onSearch(query);
      }
    }, 500);
    return () => clearTimeout(timeout);
  }, [query, onSearch]);

  const handleLogoClick = () => {
    window.location.hash = "#/";
  };

  const handleLoginClick = () => {
    window.location.hash = "#/login";
  };

  const handleLogoutClick = () => {
    if (onLogout) {
      onLogout();
      window.location.hash = "#/";
    }
  };

  return (
    <Navbar expand="lg" className="navbar-premium" sticky="top">
      <Container fluid className="px-4">
        <Navbar.Brand
          className="fw-bold fs-5"
          onClick={handleLogoClick}
          style={{ cursor: "pointer" }}
        >
          <img src={logo} alt="logo MsShop" width={150} />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav className="ms-auto me-3 align-items-center gap-2">
            <Nav.Link
              className={`nav-item-premium ${
                selectedCategoryId === null || selectedCategoryId === ""
                  ? "active"
                  : ""
              }`}
              href="#/"
              onClick={() => onScrollToProducts?.()}
            >
              ✨ Todos
            </Nav.Link>
            {menus.map((item) => (
              <Nav.Link
                key={item.id}
                // El href cambia la URL automáticamente
                href={`#/${item.id}`}
                // className dinámico: si el id actual === id del item, añade "active"
                className={`nav-item-premium ${
                  String(selectedCategoryId) === String(item.id) ? "active" : ""
                }`}
                onClick={() => onScrollToProducts?.()}
              >
                {item.name.charAt(0).toUpperCase() + item.name.slice(1)}
              </Nav.Link>
            ))}
          </Nav>
          <Form className="d-flex gap-2 align-items-center">
            <Form.Control
              type="search"
              placeholder="Buscar productos..."
              className="search-input"
              aria-label="Search"
              value={query}
              onChange={handleChange}
            />
            {isLoggedIn ? (
              <Button
                variant="outline-danger"
                size="sm"
                onClick={handleLogoutClick}
                className="ms-2"
              >
                Cerrar Sesión
              </Button>
            ) : (
              <Button
                variant="primary"
                size="sm"
                onClick={handleLoginClick}
                className="ms-2"
              >
                Iniciar Sesión
              </Button>
            )}
          </Form>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Navbars;
