import Navbars from "./Menu";
import Hero from "../components/Hero";
import Products from "../components/Products";
import Footer from "../components/Footer";

interface MainLayoutProps {
  selectedCategoryId: string | null;
  searchQuery: string;
  onSearch: (query: string) => void;
  onScrollToProducts: () => void;
}

export function MainLayout({
  selectedCategoryId,
  searchQuery,
  onSearch,
  onScrollToProducts,
}: MainLayoutProps) {
  return (
    <div className="app-wrapper">
      <Navbars
        selectedCategoryId={selectedCategoryId}
        onScrollToProducts={onScrollToProducts}
        onSearch={onSearch}
      />
      <Hero onShopClick={onScrollToProducts} />
      <Products
        selectedCategoryId={selectedCategoryId}
        searchQuery={searchQuery}
      />
      <Footer />
    </div>
  );
}
