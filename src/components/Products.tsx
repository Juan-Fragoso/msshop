import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { useEffect, useState } from "react";
import { getProducts, type Product } from "../services/ProductServices";
import ProductDetail from "./ProductDetail";
import type { MenuItem } from "../services/MenuServices";

type Props = {
  selectedCategoryId: string | null; // NUEVO: recibe el id actual
  menus?: MenuItem[]; // NUEVO: recibe las categorías
};

function Products({ selectedCategoryId, menus = [] }: Props) {
  const [productsList, setProductsList] = useState<Product[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<any | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const response = await getProducts();
      setProductsList(response);
    };
    fetchData();
  }, []);

  // PIEZA CLAVE: mapea ID → nombre de categoría
  const getCategoryNameById = (id: string | null): string | null => {
    if (!id) return null;
    // Busca en menus el item que tenga ese ID
    const menu = menus.find((m) => String(m.id) === String(id));
    // Retorna el nombre si existe, sino null
    return menu ? menu.name : null;
  };

  // Obtén el NOMBRE de la categoría seleccionada
  const selectedCategoryName = getCategoryNameById(selectedCategoryId);

  // Filtra productos por NOMBRE de categoría
  const filteredProducts = selectedCategoryName
    ? productsList.filter((p: any) => {
        // Compara el nombre del producto con el nombre de la categoría seleccionada
        // Asegúrate que comparas en minúsculas por si acaso
        return (
          String(p.category).toLowerCase() ===
          String(selectedCategoryName).toLowerCase()
        );
      })
    : productsList;

  const handleImageClick = (product: any) => {
    setSelectedProduct(product);
    setShowModal(true);
  };

  const handleAddToCart = (product: any) => {
    alert(`✅ ${product.title} añadido al carrito`);
  };

  return (
    <section className="products-section">
      <Container className="py-5">
        <div className="section-header mb-5">
          <h2 className="section-title">Nuestros Productos</h2>
          <p className="section-subtitle">
            {selectedCategoryId
              ? `Productos de la categoría: ${selectedCategoryId}`
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
                  <div
                    className="product-image-wrapper"
                    onClick={() => handleImageClick(p)}
                    style={{ cursor: "pointer" }}
                  >
                    <img
                      src={p.image}
                      alt={p.title}
                      className="product-image"
                    />
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
                      {p.category || "Categoría"}
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
                        onClick={() => handleAddToCart(p)}
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

      {/* Modal de detalles del producto */}
      <ProductDetail
        show={showModal}
        product={selectedProduct}
        onHide={() => setShowModal(false)}
        onAddToCart={handleAddToCart}
      />
    </section>
  );
}

export default Products;
