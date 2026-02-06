import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";

type Props = {
  onShopClick?: () => void;
};

function Hero({ onShopClick }: Props) {
  return (
    <section className="hero-section">
      <Container>
        <Row className="align-items-center min-vh-100">
          <Col lg={6} className="mb-4 mb-lg-0">
            <div className="hero-content">
              <h1 className="hero-title">
                Bienvenido a <span className="highlight">MsShop</span>
              </h1>
              <p className="hero-subtitle">
                Descubre productos de alta calidad a los mejores precios. Compra
                ahora y disfruta de envíos rápidos.
              </p>
              <div className="hero-buttons">
                <Button size="lg" className="btn-premium" onClick={onShopClick}>
                  Explorar Productos
                </Button>
                <Button
                  size="lg"
                  variant="outline-dark"
                  className="btn-outline-premium"
                >
                  Más Información
                </Button>
              </div>
            </div>
          </Col>
          <Col lg={6} className="text-center">
            <div className="hero-image">
              <div className="floating-box">🎁 Ofertas Especiales</div>
              <div className="floating-box-2">🚚 Envío Gratis</div>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
}

export default Hero;
