import { ApiBackend } from "@/clients/axios";
import { Product } from "@/interfaces/Product";
import { ResponseAPI } from "@/interfaces/ResponseAPI";

export interface ProductFilters{
    pageNumber: number;
    pageSize: number;
}

export const ProductServices = {

    async fetchProducts(filters: ProductFilters) {
        try {
            const {data} = await ApiBackend.get<Product[]>("products",{
            params: filters
        });
            if (!data || !Array.isArray(data)) {
                throw new Error("Invalid response format");
            }
        return data as Product[];
        }catch (error) {
            console.error("Error al obtener los productos:", error);
            throw error;
        }
        
    }
}