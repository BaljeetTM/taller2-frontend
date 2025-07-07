"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useProductStore } from "@/stores/ProductStore";
import { useEffect, useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogClose } from "@/components/ui/dialog";
import { useForm } from "react-hook-form";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { ApiBackend } from "@/clients/axios";
import { useRouter } from "next/navigation";
import { Product } from "@/interfaces/Product";

const productSchema = z.object({
  name: z.string().nonempty("El título es requerido"),
  description: z.string().nonempty("La descripción es requerida"),
  price: z.number().min(0, "El precio debe ser mayor o igual a 0"),
  stock: z.number().int().min(0, "El stock debe ser un número positivo"),
  brand: z.string().nonempty("La marca es requerida"),
  category: z.string().nonempty("La categoría es requerida"),
  image: z.instanceof(File, { message: "Debe subir una imagen" }).optional(),
});

type ProductForm = z.infer<typeof productSchema>;

export const TablePage = () => {
  const { products, fetchProducts, loading, filters, setFilters, deleteProduct } = useProductStore();
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const router = useRouter();

  const form = useForm<ProductForm>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      name: "",
      description: "",
      price: 0,
      stock: 0,
      brand: "",
      category: "",
      image: undefined,
    },
  });

  useEffect(() => {
    fetchProducts();
  }, [filters]);

  const handleSearch = () => {
    setFilters({ search: searchTerm, pageNumber: 1, pageSize: 10 });
  };

  const handleSort = (orderBy: "price" | "priceDesc") => {
    setFilters({ ...filters, orderBy, pageNumber: 1 });
  };

  const handleCategoryFilter = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const category = e.target.value;
    setFilters({ ...filters, categories: category, pageNumber: 1 });
  };

  const handleBrandFilter = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const brand = e.target.value;
    setFilters({ ...filters, brands: brand, pageNumber: 1 });
  };

  const nextPage = () => {
    setFilters({ pageNumber: filters.pageNumber + 1 });
  };

  const prevPage = () => {
    if (filters.pageNumber > 1) {
      setFilters({ pageNumber: filters.pageNumber - 1 });
    }
  };

  const openCreateModal = () => {
    form.reset();
    setEditingProduct(null);
    setIsModalOpen(true);
  };

  const openEditModal = (product: Product) => {
    form.reset({
      name: product.name,
      description: product.description,
      price: product.price,
      stock: product.stock ?? 0,
      brand: product.brand ?? "",
      category: product.category?.toString() ?? "",
    });
    setEditingProduct(product);
    setIsModalOpen(true);
  };

  const toggleProductStatus = async (product: Product) => {
    try {
      await deleteProduct(product.id);
      fetchProducts();
      alert("Producto eliminado.");
    } catch (error: any) {
      console.error("Error al cambiar el estado del producto:", error);
    }
  };

  const onSubmit = async (values: ProductForm) => {
    try {
      const formData = new FormData();
      formData.append("name", values.name);
      formData.append("description", values.description);
      formData.append("price", values.price.toString());
      formData.append("stock", values.stock.toString());
      formData.append("brand", values.brand);
      formData.append("category", values.category);
      if (values.image) {
        formData.append("images", values.image);
      }

      if (editingProduct) {
        await ApiBackend.patch(`/product/${editingProduct.id}`, formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
      } else {
        await ApiBackend.post("/product/create", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
      }

      fetchProducts();
      form.reset();
      setIsModalOpen(false);
    } catch (error: any) {
      console.error("Error al guardar el producto:", error);
    }
  };

  return (
    <div className="p-4 mt-20 relative">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Gestión de Productos</h1>
        <div className="flex gap-2">
          <Button
            onClick={() => router.push("/admin/users")}
            className="bg-purple-600 text-white hover:bg-purple-700"
          >
            Gestión de Usuarios
          </Button>
          <Button
            onClick={() => router.push("/viewProductsPage")}
            className="bg-gray-700 text-white hover:bg-gray-800"
          >
            Volver
          </Button>
        </div>
      </div>

      <div className="flex gap-4 flex-wrap mb-4">
        <Input
          type="text"
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
          onChange={handleCategoryFilter}
          className="border p-2 rounded"
          defaultValue={""}
        >
          <option value="">Todas las Categorías</option>
          <option value="Clothing">Clothing</option>
          <option value="Otros">Otro ejemplo X</option>
        </select>

        <Button
          onClick={() => handleSort("price")}
          className="bg-green-500 text-white hover:bg-green-600"
        >
          Ordenar por Precio Ascendente
        </Button>

        <Button
          onClick={() => handleSort("priceDesc")}
          className="bg-green-500 text-white hover:bg-green-600"
        >
          Ordenar por Precio Descendente
        </Button>
      </div>

      {loading ? (
        <p>Cargando productos...</p>
      ) : (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nombre</TableHead>
              <TableHead>Marca</TableHead>
              <TableHead>Categoría</TableHead>
              <TableHead>Precio</TableHead>
              <TableHead>Acciones</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {products.map((product) => (
              <TableRow key={product.id}>
                <TableCell>{product.name}</TableCell>
                <TableCell>{product.brand}</TableCell>
                <TableCell>{product.category}</TableCell>
                <TableCell>${product.price.toFixed(2)}</TableCell>
                <TableCell className="flex gap-2">
                  <Button
                    onClick={() => openEditModal(product)}
                    className="bg-yellow-500 text-white hover:bg-yellow-600"
                  >
                    Editar
                  </Button>
                  <Button
                    onClick={() => toggleProductStatus(product)}
                    className={`${
                      product.isActive ? "bg-red-500 hover:bg-red-600" : "bg-green-500 hover:bg-green-600"
                    } text-white`}
                  >
                    {product.isActive ? "Eliminar" : "Activar"}
                  </Button>
                </TableCell>
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

      <Button
        onClick={openCreateModal}
        className="fixed bottom-6 right-6 bg-green-600 text-white hover:bg-green-700 rounded-full p-4 shadow-lg"
      >
        Agregar Producto
      </Button>

      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {editingProduct ? "Editar Producto" : "Crear Nuevo Producto"}
            </DialogTitle>
          </DialogHeader>
          <form onSubmit={form.handleSubmit(onSubmit)} encType="multipart/form-data" className="space-y-4">
            <div>
              <label>Título</label>
              <Input {...form.register("name")} placeholder="Ingrese el título" />
              {form.formState.errors.name && (
                <p className="text-red-500 text-sm">{form.formState.errors.name.message}</p>
              )}
            </div>

            <div>
              <label>Descripción</label>
              <Input {...form.register("description")} placeholder="Ingrese la descripción" />
              {form.formState.errors.description && (
                <p className="text-red-500 text-sm">{form.formState.errors.description.message}</p>
              )}
            </div>

            <div>
              <label>Precio</label>
              <Input
                type="number"
                step="0.01"
                {...form.register("price", { valueAsNumber: true })}
                placeholder="0.00"
              />
              {form.formState.errors.price && (
                <p className="text-red-500 text-sm">{form.formState.errors.price.message}</p>
              )}
            </div>

            <div>
              <label>Stock</label>
              <Input
                type="number"
                {...form.register("stock", { valueAsNumber: true })}
                placeholder="0"
              />
              {form.formState.errors.stock && (
                <p className="text-red-500 text-sm">{form.formState.errors.stock.message}</p>
              )}
            </div>

            <div>
              <label>Marca</label>
              <Input {...form.register("brand")} placeholder="Marca del producto" />
              {form.formState.errors.brand && (
                <p className="text-red-500 text-sm">{form.formState.errors.brand.message}</p>
              )}
            </div>

            <div>
              <label>Categoría</label>
              <Input {...form.register("category")} placeholder="Categoría del producto" />
              {form.formState.errors.category && (
                <p className="text-red-500 text-sm">{form.formState.errors.category.message}</p>
              )}
            </div>

            <div>
              <label>Imagen</label>
              <Input
                type="file"
                accept="image/*"
                onChange={(e) => {
                  if (e.target.files && e.target.files[0]) {
                    form.setValue("image", e.target.files[0]);
                  }
                }}
              />
              {form.formState.errors.image && (
                <p className="text-red-500 text-sm">{form.formState.errors.image.message}</p>
              )}
            </div>

            <div className="flex justify-end gap-2">
              <DialogClose asChild>
                <Button type="button" variant="secondary">
                  Cancelar
                </Button>
              </DialogClose>
              <Button type="submit" className="bg-green-600 text-white hover:bg-green-700">
                {editingProduct ? "Guardar Cambios" : "Crear Producto"}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};
