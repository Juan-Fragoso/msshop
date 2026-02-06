import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { useEffect, useState } from "react";
import { getProducts, type Product } from "../api/ProductServices";

type Props = {
  selectedCategory?: string | null;
};

function Products({ selectedCategory }: Props) {
  const [productsList, setProductsList] = useState<Product[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await getProducts();
      setProductsList(response);
    };
    fetchData();
  }, []);

  const filteredProducts = selectedCategory
    ? productsList.filter((p: any) => p.category === selectedCategory)
    : productsList;

  return (
    <section className="products-section">
      <Container className="py-5">
        <div className="section-header mb-5">
          <h2 className="section-title">Nuestros Productos</h2>
          <p className="section-subtitle">
            {selectedCategory
              ? `Productos de la categoría: ${selectedCategory}`
              : "Explora nuestro catálogo completo"}
          </p>
          <div className="title-underline"></div>
        </div>

        {filteredProducts.length === 0 ? (
          <div className="text-center py-5">
            <h4>No hay productos en esta categoría</h4>
            <p className="text-muted">Intenta seleccionar otra categoría</p>
          </div>
        ) : (
          <Row xs={1} sm={2} md={3} lg={4} className="g-4">
            {filteredProducts.map((p: any) => (
              <Col key={p.id}>
                <Card className="product-card h-100">
                  <div className="product-image-wrapper">
                    <img
                      src={p.image}
                      alt={p.title}
                      className="product-image"
                    />
                    <div className="product-badge">
                      <span className="badge-text">Hot Deal</span>
                    </div>
                  </div>

                  <Card.Body className="d-flex flex-column pt-3">
                    <Card.Title className="product-title">
                      {p.title.length > 50
                        ? p.title.substring(0, 50) + "..."
                        : p.title}
                    </Card.Title>

                    <div className="product-rating mb-2">
                      <span className="stars">⭐⭐⭐⭐⭐</span>
                      <span className="rating-text">(128 reviews)</span>
                    </div>

                    <p className="product-category text-muted small">
                      {selectedCategory || p.category}
                    </p>

                    <div className="product-price my-3">
                      <span className="current-price">
                        ${p.price.toFixed(2)}
                      </span>
                      <span className="original-price">
                        ${(p.price * 1.2).toFixed(2)}
                      </span>
                      <span className="discount">-17%</span>
                    </div>

                    <div className="mt-auto">
                      <Button
                        className="btn-add-cart w-100"
                        onClick={() =>
                          alert(`✅ ${p.title} añadido al carrito`)
                        }
                      >
                        🛒 Añadir al Carrito
                      </Button>
                    </div>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        )}
      </Container>
    </section>
  );
}

export default Products;
