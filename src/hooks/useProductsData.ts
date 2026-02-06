import { useEffect, useState } from "react";
import axios from "axios";
import { API_AXIOS } from "../services/config";

export interface Product {
  id: number;
  title: string;
  image: string;
  price: number;
  category: string;
  description: string;
}

export interface MenuItem {
  id: number;
  name: string;
}

interface UseProductsDataReturn {
  products: Product[];
  categories: MenuItem[];
  isLoading: boolean;
  error: string | null;
}

// Cache global para almacenar los datos y evitar múltiples llamadas
let cachedData: UseProductsDataReturn | null = null;
let cachePromise: Promise<Product[]> | null = null;

export function useProductsData(): UseProductsDataReturn {
  const [data, setData] = useState<UseProductsDataReturn>({
    products: [],
    categories: [],
    isLoading: true,
    error: null,
  });

  useEffect(() => {
    const fetchData = async () => {
      // Si ya tenemos datos cacheados, los usamos
      if (cachedData) {
        setData(cachedData);
        return;
      }

      // Si ya hay una promesa en curso, esperamos a que se complete
      if (cachePromise) {
        try {
          const products = await cachePromise;
          const categories = extractCategories(products);
          cachedData = { products, categories, isLoading: false, error: null };
          setData(cachedData);
        } catch (err) {
          const errorMessage =
            err instanceof Error ? err.message : "Error al obtener productos";
          setData({
            products: [],
            categories: [],
            isLoading: false,
            error: errorMessage,
          });
        }
        return;
      }

      // Primera llamada: hacer la solicitud a la API
      cachePromise = (async () => {
        try {
          const response = await axios.get(`${API_AXIOS}/products`);
          return response.data as Product[];
        } catch (err) {
          throw new Error("Error al obtener productos");
        }
      })();

      try {
        const products = await cachePromise;
        const categories = extractCategories(products);
        cachedData = { products, categories, isLoading: false, error: null };
        setData(cachedData);
      } catch (err) {
        const errorMessage =
          err instanceof Error ? err.message : "Error al obtener productos";
        setData({
          products: [],
          categories: [],
          isLoading: false,
          error: errorMessage,
        });
      }
    };

    fetchData();
  }, []);

  return data;
}

// Función auxiliar para extraer categorías únicas
function extractCategories(products: Product[]): MenuItem[] {
  const categories = [...new Set(products.map((p) => p.category))];
  return categories.map((category, index) => ({
    id: index + 1,
    name: category as string,
  }));
}

// Función para limpiar el cache (útil si necesitas refrescar la data)
export function clearProductsCache() {
  cachedData = null;
  cachePromise = null;
}
