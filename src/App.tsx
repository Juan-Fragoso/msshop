import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import { useAuth } from "./hooks/useAuth";
import { useAppNavigation } from "./hooks/useAppNavigation";
import Login from "./components/Login";
import { MainLayout } from "./layout/MainLayout";

function App() {
  const { isLoggedIn, login, isLoading, error } = useAuth();
  const { selectedCategoryId, searchQuery, handleSearch, scrollToProducts } =
    useAppNavigation();

  if (!isLoggedIn) {
    return <Login onLogin={login} isLoading={isLoading} error={error} />;
  }

  return (
    <MainLayout
      selectedCategoryId={selectedCategoryId}
      searchQuery={searchQuery}
      onSearch={handleSearch}
      onScrollToProducts={scrollToProducts}
    />
  );
}

export default App;
