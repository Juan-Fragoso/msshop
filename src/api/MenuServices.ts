import axios from "axios";
import { API_AXIOS } from "./config";

export interface MenuItem {
  id: number;
  name: string;
}

export async function getMenuItems(): Promise<MenuItem[]> {
  try {
    const response = await axios.get(`${API_AXIOS}/products`);
    // Extraer categorías y eliminar duplicados con Set
    const categories = [...new Set(response.data.map((p: any) => p.category))];
    console.log(categories);

    return categories.map((category, index) => ({
      id: index + 1,
      name: category as string,
    }));
  } catch (error) {
    throw new Error("Error al obtener productos");
  }
}
