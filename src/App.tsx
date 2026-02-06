import "bootstrap/dist/css/bootstrap.min.css";
import { useState } from "react";
import Navbars from "./layout/Menu";
import Hero from "./components/Hero";
import Products from "./components/Products";
import Footer from "./components/Footer";
import "./App.css";

function App() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const scrollToProducts = () => {
    const productsSection = document.querySelector(".products-section");
    if (productsSection) {
      productsSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="app-wrapper">
      <Navbars onSelectCategory={setSelectedCategory} onScrollToProducts={scrollToProducts} />
      <Hero onShopClick={scrollToProducts} />
      <Products selectedCategory={selectedCategory} />
      <Footer />
    </div>
  );
}

export default App;
