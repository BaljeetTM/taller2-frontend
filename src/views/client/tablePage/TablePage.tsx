'use client';

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useProductStore } from "@/stores/ProductStore"
import { useEffect, useState } from "react";


export const TablePage = () => {
    const { products, fetchProducts, loading, filters, setFilters } = useProductStore();
    const [searchTerm, setSearchTerm] = useState("");

    useEffect(() => {
        fetchProducts();
    }, [filters]);

    const handleSearch = () => {
        setFilters({ search: searchTerm, pageNumber: 1, pageSize: 10 });
    }

    const handleSort = (orderBy: "price" | "priceDesc") => {
        setFilters({ ...filters, orderBy, pageNumber: 1 });
    }

    const handleCatorgoryFilter = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const category = e.target.value;
        setFilters({ ...filters, categories: category, pageNumber: 1 });
    }

    const handleBrandFilter = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const brand = e.target.value;
        setFilters({ ...filters, brands: brand, pageNumber: 1 });
    }

    const nextPage = () => {
        setFilters({ pageNumber: filters.pageNumber + 1 });
    }

    const prevPage = () => {
        if (filters.pageNumber > 1) {
            setFilters({ pageNumber: filters.pageNumber - 1 });
        }
    }

    return (
        <div className="p-4 mt-20">
            <div className="flex gap-4 flex-wrap mb-4">
                <Input type="text"
                    placeholder="Buscar producto"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="border p-2 rounded w-1/3"
                />

                <Button
                    onClick={handleSearch}
                    className="bg-blue-500 text-white hover:bg-blue-600"
                >
                    Buscar
                </Button>

                <select
                    onChange={handleBrandFilter}
                    className="border p-2 rounded"
                    defaultValue={""}
                >
                    <option value="">Todas las marcas</option>
                    <option value="HomePlus">HomePlus</option>
                    <option value="Otros">Otro ejemplo X</option>
                </select>

                <select
                    onChange={handleCatorgoryFilter}
                    className="border p-2 rounded"
                    defaultValue={""}
                >
                    <option value="">Todas las Categorías</option>
                    <option value="Clothing">Clothing</option>
                    <option value="Otros">Otro ejemplo X</option>
                </select>

                <Button
                    onClick={() => handleSort("price")}
                    className="bg-green-500 text-white hover:bg-green-600">
                    Ordenar por Precio Ascendente
                </Button>

                <Button
                    onClick={() => handleSort("priceDesc")}
                    className="bg-green-500 text-white hover:bg-green-600">
                    Ordenar por Precio Descendente
                </Button>
            </div>

            {
                loading ? (
                    <p>Cargando productos...</p>
                ) : (
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Nombre</TableHead>
                                <TableHead>Marca</TableHead>
                                <TableHead>Categoría</TableHead>
                                <TableHead>Precio</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {products.map((product) => (
                                <TableRow key={product.id}>
                                    <TableCell>{product.name}</TableCell>
                                    <TableCell>{product.brand}</TableCell>
                                    <TableCell>{product.category}</TableCell>
                                    <TableCell>${product.price.toFixed(2)}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                )}

            <div className="flex justify-between items-center mt-6">
                <Button
                    onClick={prevPage}
                    disabled={filters.pageNumber <= 1}
                    className="bg-gray-500 text-white hover:bg-gray-600 mr-2"
                >
                    Anterior
                </Button>
                <span>Página {filters.pageNumber}</span>
                <Button
                    onClick={nextPage}
                    className="bg-gray-500 text-white hover:bg-gray-600"
                >
                    Siguiente
                </Button>
            </div>
        </div>
    )
}