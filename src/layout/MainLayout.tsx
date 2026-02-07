import Navbars from "./Menu";
import Hero from "../components/Hero";
import Products from "../components/Products";
import Footer from "../components/Footer";
import type { User } from "../hooks/useAuth";

interface MainLayoutProps {
  selectedCategoryId: string | null;
  searchQuery: string;
  onSearch: (query: string) => void;
  onScrollToProducts: () => void;
  isLoggedIn: boolean;
  user: User | null;
  onLogout: () => void;
}

export function MainLayout({
  selectedCategoryId,
  searchQuery,
  onSearch,
  onScrollToProducts,
  isLoggedIn,
  user,
  onLogout,
}: MainLayoutProps) {
  return (
    <div className="app-wrapper">
      <Navbars
        selectedCategoryId={selectedCategoryId}
        onScrollToProducts={onScrollToProducts}
        onSearch={onSearch}
        isLoggedIn={isLoggedIn}
        user={user}
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
