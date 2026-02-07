import { useEffect, useState } from "react";

interface UseAppNavigationReturn {
  selectedCategoryId: string | null;
  searchQuery: string;
  currentRoute: string | null;
  handleSearch: (query: string) => void;
  scrollToProducts: () => void;
}

export function useAppNavigation(): UseAppNavigationReturn {
  const [selectedCategoryId, setSelectedCategoryId] = useState<string | null>(
    null,
  );
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [currentRoute, setCurrentRoute] = useState<string | null>(null);

  // Manejar búsqueda
  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  // Scroll a productos
  const scrollToProducts = () => {
    const productsSection = document.querySelector(".products-section");
    if (productsSection) {
      productsSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  // Sincronizar categoría y ruta con URL
  useEffect(() => {
    const readRouteFromHash = () => {
      const hash = location.hash.replace("#/", "");
      
      // Si el hash es "login", es una ruta especial
      if (hash === "login") {
        setCurrentRoute("login");
        setSelectedCategoryId(null);
        return;
      }
      
      // Si no hay hash o es "/", mostrar página principal
      if (!hash || hash === "/" || hash === "") {
        setCurrentRoute(null);
        setSelectedCategoryId(null);
        return;
      }
      
      // De lo contrario, es una categoría
      setCurrentRoute(null);
      setSelectedCategoryId(hash);
    };

    readRouteFromHash();

    const handleHashChange = () => {
      readRouteFromHash();
    };

    window.addEventListener("hashchange", handleHashChange);
    return () => {
      window.removeEventListener("hashchange", handleHashChange);
    };
  }, []);

  return {
    selectedCategoryId,
    searchQuery,
    currentRoute,
    handleSearch,
    scrollToProducts,
  };
}
