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

  // Filtrar productos según la categoría seleccionada
  const filteredProducts = selectedCategory
    ? productsList.filter((p: any) => p.category === selectedCategory)
    : productsList;

  return (
    <Container className="py-3">
      <Row xs={1} sm={2} md={3} lg={4} className="g-3">
        {filteredProducts.map((p: any) => (
          <Col key={p.id}>
            <Card className="h-100 shadow-sm">
              <div
                style={{
                  height: 180,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  background: "#f8f9fa",
                }}
              >
                <img
                  src={p.image}
                  alt={p.title}
                  style={{
                    maxHeight: "100%",
                    maxWidth: "100%",
                    objectFit: "contain",
                  }}
                />
              </div>

              <Card.Body className="d-flex flex-column">
                <Card.Title className="fs-6 mb-2">{p.title}</Card.Title>
                <div className="mt-auto d-flex justify-content-between align-items-center">
                  <div className="text-primary fw-bold">
                    ${"" + p.price.toFixed(2)}
                  </div>
                  <Button
                    variant="success"
                    size="sm"
                    onClick={() =>
                      alert(`Producto ${p.title} añadido al carrito`)
                    }
                  >
                    Añadir
                  </Button>
                </div>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
}

export default Products;
