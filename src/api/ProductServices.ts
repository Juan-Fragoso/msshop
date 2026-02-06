import axios from "axios";
import { API_AXIOS } from "./config";

export interface Product {
  id: number;
  title: string;
  image: string;
  price: number;
  category: string;
  description: string;
}

export async function getProducts(): Promise<Product[]> {
  try {
    const response = await axios.get(`${API_AXIOS}/products`);
    console.log(response);

    return response.data;
  } catch (error) {
    throw new Error("Error al obtener productos");
  }
}
