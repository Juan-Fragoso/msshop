import { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Button from "react-bootstrap/Button";
import Dropdown from "react-bootstrap/Dropdown";
import { useProductsData } from "../hooks/useProductsData.ts";
import type { User } from "../hooks/useAuth";
import logo from "../assets/msshop.png";

type Props = {
  selectedCategoryId?: string | null;
  onScrollToProducts?: () => void;
  onSearch?: (query: string) => void;
  isLoggedIn?: boolean;
  user?: User | null;
  onLogout?: () => void;
};

function Navbars({
  selectedCategoryId,
  onScrollToProducts,
  onSearch,
  isLoggedIn = false,
  user = null,
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

  // Función para obtener las iniciales del usuario
  const getUserInitials = (username: string): string => {
    return username.substring(0, 2).toUpperCase();
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
            {isLoggedIn && user ? (
              <Dropdown align="end" className="user-dropdown">
                <Dropdown.Toggle
                  variant="link"
                  id="user-dropdown"
                  className="user-dropdown-toggle"
                >
                  <div className="user-profile-menu">
                    <div className="user-avatar">
                      <span className="user-initials">
                        {getUserInitials(user.username)}
                      </span>
                      <div className="user-status-indicator"></div>
                    </div>
                    <div className="user-info d-none d-lg-block">
                      <span className="user-name">{user.username}</span>
                      <span className="user-badge">Premium</span>
                    </div>
                  </div>
                </Dropdown.Toggle>

                <Dropdown.Menu className="user-dropdown-menu">
                  <div className="user-dropdown-header">
                    <div className="user-avatar-large">
                      {getUserInitials(user.username)}
                    </div>
                    <div className="user-dropdown-info">
                      <strong>{user.username}</strong>
                      <small className="text-muted">Usuario Premium</small>
                    </div>
                  </div>
                  <Dropdown.Divider />
                  <Dropdown.Item href="#/profile" className="dropdown-item-custom">
                    <span className="dropdown-icon">👤</span>
                    Mi Perfil
                  </Dropdown.Item>
                  <Dropdown.Item href="#/orders" className="dropdown-item-custom">
                    <span className="dropdown-icon">📦</span>
                    Mis Pedidos
                  </Dropdown.Item>
                  <Dropdown.Item href="#/settings" className="dropdown-item-custom">
                    <span className="dropdown-icon">⚙️</span>
                    Configuración
                  </Dropdown.Item>
                  <Dropdown.Divider />
                  <Dropdown.Item
                    onClick={handleLogoutClick}
                    className="dropdown-item-custom dropdown-item-logout"
                  >
                    <span className="dropdown-icon">🚪</span>
                    Cerrar Sesión
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            ) : (
              <Button
                variant="primary"
                onClick={handleLoginClick}
                className="btn-login-menu"
              >
                <span className="btn-icon">🔐</span>
                <span className="btn-text">Iniciar Sesión</span>
              </Button>
            )}
          </Form>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Navbars;
