import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

function Footer() {
  return (
    <footer className="footer-section">
      <Container className="py-5">
        <Row className="mb-5">
          <Col md={3} className="mb-4 mb-md-0">
            <h5 className="fw-bold mb-3">🛍️ MetaShop</h5>
            <p className="text-muted">
              Tu tienda online de confianza para comprar productos de
              calidad.
            </p>
            <div className="social-links">
              <a href="#" className="social-icon">📘</a>
              <a href="#" className="social-icon">🐦</a>
              <a href="#" className="social-icon">📷</a>
            </div>
          </Col>

          <Col md={3} className="mb-4 mb-md-0">
            <h6 className="fw-bold mb-3">Categorías</h6>
            <ul className="footer-links">
              <li><a href="#/1">Electrónica</a></li>
              <li><a href="#/2">Ropa</a></li>
              <li><a href="#/3">Hogar</a></li>
              <li><a href="#/4">Deportes</a></li>
            </ul>
          </Col>

          <Col md={3} className="mb-4 mb-md-0">
            <h6 className="fw-bold mb-3">Información</h6>
            <ul className="footer-links">
              <li><a href="#">Acerca de Nosotros</a></li>
              <li><a href="#">Blog</a></li>
              <li><a href="#">Careers</a></li>
              <li><a href="#">Press</a></li>
            </ul>
          </Col>

          <Col md={3}>
            <h6 className="fw-bold mb-3">Contacto</h6>
            <ul className="footer-links">
              <li>📧 info@metashop.com</li>
              <li>📱 +1 (555) 123-4567</li>
              <li>📍 123 Main St, City</li>
            </ul>
          </Col>
        </Row>

        <hr className="my-4" />

        <Row className="align-items-center">
          <Col md={6} className="text-center text-md-start mb-3 mb-md-0">
            <p className="text-muted mb-0">
              &copy; 2024 MetaShop. Todos los derechos reservados.
            </p>
          </Col>
          <Col md={6} className="text-center text-md-end">
            <a href="#" className="footer-link me-3">
              Privacidad
            </a>
            <a href="#" className="footer-link me-3">
              Términos
            </a>
            <a href="#" className="footer-link">
              Cookies
            </a>
          </Col>
        </Row>
      </Container>
    </footer>
  );
}

export default Footer;
