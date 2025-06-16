'use client';
import { Navbar } from "@/components/Navbar";
import { ProductCard } from "@/components/products/ProductCard";
import { ProductDialog } from "@/components/products/ProductDialog";
import { Product } from "@/interfaces/Product";
import { useProductStore } from "@/stores/ProductStore";
import { use, useEffect, useState } from "react";



export default function ViewProductsPage() {
    const {products, loading, fetchProducts, filters    } = useProductStore();
    const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

    useEffect(() => {
        fetchProducts();
    }, [filters]);

    if (loading) {
        return <div className="text-center py-20 text-lg font-semibold">Cargando productos...</div>;
    }

    return (
        <div className="min-h-screen bg-gray-100">
            {/* Navbar */}
            <Navbar/>


            {/* Banner */}
            <div className="relative h-64 md:h-96">
                <div className="absolute inset-0 bg-cover bg-center" style={{backgroundImage: "url('/tienda.jpeg"}}/>
                <div className="absolute inset-0 bg-black opacity-60"/>
                <div className="relative z-10 flex flex-col justify-center items-center h-full text-white text-center">
                    <h1 className="text-4xl md:text-6xl font-bold">Bienvenido a nuestra tienda</h1>
                    <p className="mt-4 text-lg md:text-xl">Explora nuestros productos y ofertas especiales</p>
                </div>
            </div>

            <div className="max-w-7xl mx-auto py-12 px-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
               {products.map((product) => (
                    <ProductCard
                        key={product.id}
                        product={product}
                        onClick={() => setSelectedProduct(product)}
                    />
               ))} 
            </div>

            {/* ProductDialog con Producto seleccionado */}
            <ProductDialog
                product={selectedProduct}
                open={!!selectedProduct}
                onClose={() => setSelectedProduct(null)}
            />
            
        </div>
    )
}