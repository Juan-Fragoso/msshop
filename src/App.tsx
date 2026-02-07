import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import { useAuth } from "./hooks/useAuth";
import { useAppNavigation } from "./hooks/useAppNavigation";
import Login from "./components/Login";
import { MainLayout } from "./layout/MainLayout";

function App() {
  const { isLoggedIn, login, logout, isLoading, error } = useAuth();
  const {
    selectedCategoryId,
    searchQuery,
    currentRoute,
    handleSearch,
    scrollToProducts,
  } = useAppNavigation();

  // Si la ruta es #/login, mostrar el formulario de login
  if (currentRoute === "login") {
    return <Login onLogin={login} isLoading={isLoading} error={error} />;
  }

  // De lo contrario, mostrar el layout principal
  return (
    <MainLayout
      selectedCategoryId={selectedCategoryId}
      searchQuery={searchQuery}
      onSearch={handleSearch}
      onScrollToProducts={scrollToProducts}
      isLoggedIn={isLoggedIn}
      onLogout={logout}
    />
  );
}

export default App;
