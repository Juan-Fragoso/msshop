import "bootstrap/dist/css/bootstrap.min.css";
import { useState } from "react";
import Navbars from "./layout/Menu";
import "./App.css";
import Products from "./components/Products";

function App() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  return (
    <>
      <Navbars onSelectCategory={setSelectedCategory} />
      <Products selectedCategory={selectedCategory} />
    </>
  );
}

export default App;
