import Navbars from "./Menu";
import Hero from "../components/Hero";
import Products from "../components/Products";
import Footer from "../components/Footer";

interface MainLayoutProps {
  selectedCategoryId: string | null;
  searchQuery: string;
  onSearch: (query: string) => void;
  onScrollToProducts: () => void;
  isLoggedIn: boolean;
  onLogout: () => void;
}

export function MainLayout({
  selectedCategoryId,
  searchQuery,
  onSearch,
  onScrollToProducts,
  isLoggedIn,
  onLogout,
}: MainLayoutProps) {
  return (
    <div className="app-wrapper">
      <Navbars
        selectedCategoryId={selectedCategoryId}
        onScrollToProducts={onScrollToProducts}
        onSearch={onSearch}
        isLoggedIn={isLoggedIn}
        onLogout={onLogout}
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
