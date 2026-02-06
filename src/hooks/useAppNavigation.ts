import { useEffect, useState } from "react";

interface UseAppNavigationReturn {
  selectedCategoryId: string | null;
  searchQuery: string;
  handleSearch: (query: string) => void;
  scrollToProducts: () => void;
}

export function useAppNavigation(): UseAppNavigationReturn {
  const [selectedCategoryId, setSelectedCategoryId] = useState<string | null>(
    null,
  );
  const [searchQuery, setSearchQuery] = useState<string>("");

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

  // Sincronizar categoría con URL
  useEffect(() => {
    const readCategoryIdFromHash = () => {
      const hash = location.hash.replace("#/", "");
      return hash && hash !== "/" ? hash : null;
    };

    setSelectedCategoryId(readCategoryIdFromHash());

    const handleHashChange = () => {
      setSelectedCategoryId(readCategoryIdFromHash());
    };

    window.addEventListener("hashchange", handleHashChange);
    return () => {
      window.removeEventListener("hashchange", handleHashChange);
    };
  }, []);

  return {
    selectedCategoryId,
    searchQuery,
    handleSearch,
    scrollToProducts,
  };
}
