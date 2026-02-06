import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { useState } from "react";

type Props = {
  show: boolean;
  product: any | null;
  onHide: () => void;
  onAddToCart?: (product: any) => void;
};

function ProductDetail({ show, product, onHide, onAddToCart }: Props) {
  const [quantity, setQuantity] = useState(1);

  if (!product) return null;

  const handleAddToCart = () => {
    onAddToCart?.(product);
    setQuantity(1);
    onHide();
  };

  const incrementQuantity = () => setQuantity(quantity + 1);
  const decrementQuantity = () => {
    if (quantity > 1) setQuantity(quantity - 1);
  };

  return (
    <Modal
      show={show}
      onHide={onHide}
      size="lg"
      centered
      className="product-modal"
    >
      <Modal.Header closeButton className="border-bottom-0">
        <Modal.Title className="fw-bold">{product.title}</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Row className="g-4">
          {/* Columna de imagen */}
          <Col md={5} className="text-center">
            <div className="product-detail-image-wrapper">
              <img
                src={product.image}
                alt={product.title}
                className="product-detail-image"
              />
            </div>
          </Col>

          {/* Columna de detalles */}
          <Col md={7}>
            <div className="product-details">
              {/* Categoría y Rating */}
              <div className="d-flex justify-content-between align-items-center mb-3">
                <span className="badge bg-info text-dark fw-bold">
                  {product.category || "Producto"}
                </span>
                <div className="product-rating">
                  <span className="stars">⭐⭐⭐⭐⭐</span>
                  <span className="ms-2 text-muted">(128 reviews)</span>
                </div>
              </div>

              {/* Descripción */}
              <p className="text-muted mb-4 lh-lg">
                {product.description ||
                  "Producto de alta calidad. Descripción completa del producto disponible."}
              </p>

              <hr />

              {/* Precio */}
              <div className="price-section mb-4">
                <div className="d-flex align-items-center gap-3">
                  <span className="current-price fs-3">
                    ${product.price.toFixed(2)}
                  </span>
                  <span className="original-price fs-5">
                    ${(product.price * 1.2).toFixed(2)}
                  </span>
                  <span className="discount fs-6 fw-bold">Ahorra 17%</span>
                </div>
              </div>

              <hr />

              {/* Stock disponible */}
              <div className="stock-section mb-4">
                <p className="mb-2">
                  <strong>Stock disponible:</strong>{" "}
                  <span className="text-success fw-bold">
                    10+ en inventario
                  </span>
                </p>
                <p className="mb-0">
                  <strong>Envío:</strong>{" "}
                  <span className="text-primary">Gratis a todo el país</span>
                </p>
              </div>

              <hr />

              {/* Selector de cantidad */}
              <div className="quantity-section mb-4">
                <p className="mb-2">
                  <strong>Cantidad:</strong>
                </p>
                <div className="quantity-control d-flex gap-2 align-items-center">
                  <Button
                    variant="outline-secondary"
                    size="sm"
                    onClick={decrementQuantity}
                    className="quantity-btn"
                  >
                    −
                  </Button>
                  <input
                    type="number"
                    min="1"
                    value={quantity}
                    onChange={(e) =>
                      setQuantity(Math.max(1, parseInt(e.target.value) || 1))
                    }
                    className="quantity-input"
                    readOnly
                  />
                  <Button
                    variant="outline-secondary"
                    size="sm"
                    onClick={incrementQuantity}
                    className="quantity-btn"
                  >
                    +
                  </Button>
                </div>
              </div>

              {/* Botones de acción */}
              <div className="action-buttons d-grid gap-2">
                <Button
                  className="btn-add-cart-modal"
                  size="lg"
                  onClick={handleAddToCart}
                >
                  🛒 Añadir {quantity} al Carrito
                </Button>
                <Button variant="outline-secondary" size="lg" onClick={onHide}>
                  Continuar comprando
                </Button>
              </div>

              {/* Features */}
              <div className="features-section mt-4 p-3 bg-light rounded">
                <p className="mb-1">
                  <strong>✓</strong> Garantía de 12 meses
                </p>
                <p className="mb-1">
                  <strong>✓</strong> Entrega segura
                </p>
                <p className="mb-0">
                  <strong>✓</strong> Soporte al cliente 24/7
                </p>
              </div>
            </div>
          </Col>
        </Row>
      </Modal.Body>
    </Modal>
  );
}

export default ProductDetail;
