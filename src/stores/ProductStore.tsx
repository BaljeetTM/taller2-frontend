import { Product } from "@/interfaces/Product";
import { ProductFilters, ProductServices } from "@/services/ProductServices";
import { ca } from "zod/v4/locales";
import { create } from "zustand";



interface ProductState {
    products: Product[];
    loading: boolean;
    error: string | null;
    filters: ProductFilters;
    fetchProducts: () => Promise<void>;
    setFilters: (filters: Partial<ProductFilters>) => void;
    deleteProduct: (id: number) => Promise<void>;

}

export const useProductStore = create<ProductState>((set, get) => ({
    products: [],
    loading: false,
    error: null,
    filters: { pageNumber: 1, pageSize: 10 },

    fetchProducts: async () => {
        set({loading: true, error: null});
        try {
            const { filters } = get();
            const data = await ProductServices.fetchProducts(filters);
            console.log("Productos obtenidos:", data);

            set({ products: data, loading: false});
        }catch (error: any) {
            set({loading: false, error: error.message || "Error al obtener los productos"});
        }
    },
    deleteProduct: async (id: number) => {
        try {
            await ProductServices.updateStatus(id);
        } catch (error) {
            console.error("Error al eliminar el producto:", error);
        }
    },
    setFilters: (newFilters) =>
        set((state) => ({
            filters: { ...state.filters, ...newFilters }
        })),
}));