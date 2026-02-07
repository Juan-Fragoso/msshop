import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Badge from "react-bootstrap/Badge";
import heroShopping from "../assets/hero-shopping.svg";

type Props = {
  onShopClick?: () => void;
};

function Hero({ onShopClick }: Props) {
  return (
    <section className="hero-section">
      <Container>
        <Row className="align-items-center min-vh-100 py-5">
          <Col lg={6} className="mb-5 mb-lg-0">
            <div className="hero-content">
              {/* Badge Superior */}
              <div className="hero-badge-wrapper">
                <Badge className="hero-badge">✨ Nueva Colección 2026</Badge>
              </div>

              {/* Título Principal */}
              <h1 className="hero-title">
                Descubre lo Mejor en{" "}
                <span className="highlight-gradient">MsShop</span>
              </h1>

              {/* Subtítulo */}
              <p className="hero-subtitle">
                Tu destino para compras inteligentes. Encuentra productos de
                alta calidad, precios increíbles y envío rápido a tu puerta.
              </p>

              {/* Características Destacadas */}
              <div className="hero-features">
                <div className="feature-item">
                  <div className="feature-icon">✓</div>
                  <span>Envío gratis +$50</span>
                </div>
                <div className="feature-item">
                  <div className="feature-icon">✓</div>
                  <span>Garantía 30 días</span>
                </div>
                <div className="feature-item">
                  <div className="feature-icon">✓</div>
                  <span>Pago seguro</span>
                </div>
              </div>

              {/* Botones de Acción */}
              <div className="hero-buttons">
                <Button size="lg" className="btn-premium" onClick={onShopClick}>
                  <span className="btn-icon">🛍️</span>
                  Explorar Productos
                </Button>
                <Button
                  size="lg"
                  variant="outline-dark"
                  className="btn-outline-premium"
                >
                  <span className="btn-icon">📞</span>
                  Contactar
                </Button>
              </div>

              {/* Estadísticas */}
              <div className="hero-stats">
                <div className="stat-item">
                  <div className="stat-number">1000+</div>
                  <div className="stat-label">Productos</div>
                </div>
                <div className="stat-divider"></div>
                <div className="stat-item">
                  <div className="stat-number">5000+</div>
                  <div className="stat-label">Clientes Felices</div>
                </div>
                <div className="stat-divider"></div>
                <div className="stat-item">
                  <div className="stat-number">4.9★</div>
                  <div className="stat-label">Valoración</div>
                </div>
              </div>
            </div>
          </Col>

          <Col lg={6} className="position-relative">
            <div className="hero-image-wrapper">
              {/* Tarjetas Flotantes */}
              <div className="floating-card floating-card-1">
                <div className="floating-card-icon">🎁</div>
                <div className="floating-card-content">
                  <div className="floating-card-title">Ofertas</div>
                  <div className="floating-card-subtitle">Hasta 50% OFF</div>
                </div>
              </div>

              <div className="floating-card floating-card-2">
                <div className="floating-card-icon">🚚</div>
                <div className="floating-card-content">
                  <div className="floating-card-title">Envío Gratis</div>
                  <div className="floating-card-subtitle">En 24-48h</div>
                </div>
              </div>

              <div className="floating-card floating-card-3">
                <div className="floating-card-icon">⭐</div>
                <div className="floating-card-content">
                  <div className="floating-card-title">Premium</div>
                  <div className="floating-card-subtitle">Calidad top</div>
                </div>
              </div>

              {/* Decoración de fondo */}
              <div className="hero-decoration hero-decoration-1"></div>
              <div className="hero-decoration hero-decoration-2"></div>
              <div className="hero-decoration hero-decoration-3"></div>
            </div>
          </Col>
        </Row>
      </Container>

      {/* Elementos decorativos de fondo */}
      <div className="hero-bg-shape hero-bg-shape-1"></div>
      <div className="hero-bg-shape hero-bg-shape-2"></div>
      <div className="hero-bg-pattern"></div>
    </section>
  );
}

export default Hero;
