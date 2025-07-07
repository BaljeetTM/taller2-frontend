import { ApiBackend } from "@/clients/axios";
import { Product } from "@/interfaces/Product";
import { ResponseAPI } from "@/interfaces/ResponseAPI";

export interface ProductFilters {
    pageNumber: number;
    pageSize: number;
    search?: string;
    categories?: string;
    brands?: string;
    orderBy?: "price" | "priceDesc";
}

export const ProductServices = {

    async fetchProducts(filters: ProductFilters){
        const {data} =  await ApiBackend.get<ResponseAPI>("Product", { 
            params: {...filters}
        });

        if (!data.success) {
            throw new Error(data.message || "Error al obtener los productos");
        }
        if (!data.data || !Array.isArray(data.data)) {
            throw new Error("No se encontraron productos");
        }
        if (data.error){
            console.error("Errors:", data.error);
        }

        return data.data as Product[];
    },

    async updateStatus(id: number) {
        try {
            await ApiBackend.delete(`product/${id}`);
        } catch (error) {
            console.error("Error al cambiar el estado del producto:", error);
        }
    }

}