import "bootstrap/dist/css/bootstrap.min.css";
import { useEffect, useState } from "react";
import Navbars from "./layout/Menu";
import Hero from "./components/Hero";
import Products from "./components/Products";
import Footer from "./components/Footer";
import "./App.css";

function App() {
  // Estado: guarda el ID de la categoría seleccionada (sincronizado con la URL)
  const [selectedCategoryId, setSelectedCategoryId] = useState<string | null>(
    null,
  );

  // Estado: guarda el término de búsqueda
  const [searchQuery, setSearchQuery] = useState<string>("");

  // Función para manejar la búsqueda
  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  // Función para hacer scroll a los productos
  const scrollToProducts = () => {
    const productsSection = document.querySelector(".products-section");
    if (productsSection) {
      productsSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  // IMPORTANTE: Este effect lee la URL y sincroniza con React
  useEffect(() => {
    // Función para parsear la URL y extraer el ID
    // Ej: location.hash = "#/2" → retorna "2"
    //     location.hash = "#/" → retorna null
    const readCategoryIdFromHash = () => {
      const hash = location.hash.replace("#/", ""); // Quita "#/"
      return hash && hash !== "/" ? hash : null; // Si vacío, retorna null
    };

    // 1. Leer el hash al cargar la página
    setSelectedCategoryId(readCategoryIdFromHash());

    // 2. Escuchar cambios en la URL (cuando el usuario usa botón atrás/adelante o clica un link)
    const handleHashChange = () => {
      setSelectedCategoryId(readCategoryIdFromHash());
    };

    window.addEventListener("hashchange", handleHashChange);

    // 3. Limpiar el listener cuando el componente se desmonta
    return () => {
      window.removeEventListener("hashchange", handleHashChange);
    };
  }, []); // Array vacío = corre solo una vez al montar

  return (
    <div className="app-wrapper">
      <Navbars
        selectedCategoryId={selectedCategoryId}
        onScrollToProducts={scrollToProducts}
        onSearch={handleSearch}
      />
      <Hero onShopClick={scrollToProducts} />
      <Products
        selectedCategoryId={selectedCategoryId}
        searchQuery={searchQuery}
      />
      <Footer />
    </div>
  );
}

export default App;
