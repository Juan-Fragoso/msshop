import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { useState } from "react";
import { useProductsData } from "../hooks/useProductsData";
import ProductDetail from "./ProductDetail";

type Props = {
  selectedCategoryId: string | null;
  searchQuery?: string;
};

function Products({ selectedCategoryId, searchQuery = "" }: Props) {
  const {
    products: productsList,
    categories: menus,
    isLoading,
  } = useProductsData();
  const [showModal, setShowModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<any | null>(null);

  const getCategoryNameById = (id: string | null): string | null => {
    if (!id) return null;
    const menu = menus.find((m) => String(m.id) === String(id));
    return menu ? menu.name : null;
  };

  const selectedCategoryName = getCategoryNameById(selectedCategoryId);

  const filteredProducts = productsList.filter((p: any) => {
    const matchesCategory = selectedCategoryName
      ? String(p.category).toLowerCase() ===
        String(selectedCategoryName).toLowerCase()
      : true;

    const matchesSearch = searchQuery
      ? String(p.title).toLowerCase().includes(searchQuery.toLowerCase()) ||
        String(p.description).toLowerCase().includes(searchQuery.toLowerCase())
      : true;

    return matchesCategory && matchesSearch;
  });

  const handleImageClick = (product: any) => {
    setSelectedProduct(product);
    setShowModal(true);
  };

  const handleAddToCart = (product: any) => {
    // Animación de éxito más elegante
    const button = document.activeElement as HTMLButtonElement;
    if (button) {
      button.style.transform = "scale(0.95)";
      setTimeout(() => {
        button.style.transform = "";
      }, 150);
    }
    alert(`✅ ${product.title} añadido al carrito`);
  };

  if (isLoading) {
    return (
      <section className="products-section">
        <Container className="py-5">
          <div className="text-center">
            <div className="spinner-border text-primary mb-3" role="status">
              <span className="visually-hidden">Cargando...</span>
            </div>
            <p>Cargando productos...</p>
          </div>
        </Container>
      </section>
    );
  }

  return (
    <section className="products-section" id="products-section">
      <Container className="py-5">
        <div className="section-header mb-5">
          <h2 className="section-title">Nuestros Productos</h2>
          <p className="section-subtitle">
            {searchQuery
              ? `Resultados de búsqueda: "${searchQuery}"`
              : selectedCategoryName
                ? `Productos de la categoría: ${selectedCategoryName}`
                : "Explora nuestro catálogo completo"}
          </p>
          <div className="title-underline"></div>
        </div>

        {filteredProducts.length === 0 ? (
          <div className="text-center py-5">
            <div className="mb-4">
              <i
                className="bi bi-search"
                style={{ fontSize: "4rem", color: "#6c757d" }}
              ></i>
            </div>
            <h4>
              {searchQuery
                ? `No hay productos que coincidan con "${searchQuery}"`
                : "No hay productos en esta categoría"}
            </h4>
            <p className="text-muted">
              {searchQuery
                ? "Intenta con otro término de búsqueda"
                : "Intenta seleccionar otra categoría"}
            </p>
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
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        handleImageClick(p);
                      }
                    }}
                    aria-label={`Ver detalles de ${p.title}`}
                  >
                    <img
                      src={p.image}
                      alt={p.title}
                      className="product-image"
                      loading="lazy"
                    />
                  </div>

                  <Card.Body className="d-flex flex-column pt-3">
                    <Card.Title className="product-title" title={p.title}>
                      {p.title.length > 50
                        ? p.title.substring(0, 50) + "..."
                        : p.title}
                    </Card.Title>

                    <div className="product-rating mb-2">
                      <span className="stars" aria-label="5 de 5 estrellas">
                        ⭐⭐⭐⭐⭐
                      </span>
                      <span className="rating-text">(128 reviews)</span>
                    </div>

                    <span className="product-category">
                      {p.category || "Categoría"}
                    </span>

                    <div className="product-price my-3">
                      <span
                        className="current-price"
                        aria-label={`Precio actual: $${p.price.toFixed(2)}`}
                      >
                        ${p.price.toFixed(2)}
                      </span>
                      <span
                        className="original-price"
                        aria-label={`Precio original: $${(p.price * 1.2).toFixed(2)}`}
                      >
                        ${(p.price * 1.2).toFixed(2)}
                      </span>
                      <span className="discount">-17%</span>
                    </div>

                    <div className="mt-auto">
                      <Button
                        className="btn-add-cart w-100"
                        onClick={() => handleAddToCart(p)}
                        aria-label={`Añadir ${p.title} al carrito`}
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
