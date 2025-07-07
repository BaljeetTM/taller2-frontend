"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ApiBackend } from "@/clients/axios";
import { useRouter } from "next/navigation";
import { useUserStore } from "@/stores/UserStore";

interface User {
  id: number;
  name: string;
  email: string;
  isActive: boolean;
}

interface PaginationMetadata {
  currentPage: number;
  totalPages: number;
  pageSize: number;
  totalCount: number;
}

export const UserManagementPage = () => {
  const [loading, setLoading] = useState(false);
  const [filters, setFilters] = useState({
    searchName: "",
    searchEmail: "",
    status: "", // "", "active", "inactive"
    pageNumber: 1,
    pageSize: 10,
  });
  const [pagination, setPagination] = useState<PaginationMetadata | null>(null);
  const router = useRouter();
  const {updateStatus, fetchUsers, users} = useUserStore();

  useEffect(() => {
    fetchUsers();
  }, [filters]);

  const toggleUserStatus = async (user: User) => {
    try {
      await updateStatus(user.email, user.isActive ? "inactive" : "active");
      fetchUsers();
    } catch (error) {
      console.error("Error al cambiar estado del usuario:", error);
    }
  };

  const goToProfile = (userId: number) => {
    router.push(`/user/profile/${userId}`);
  };

  return (
    <div className="p-4 mt-20 relative">
      <h1 className="text-2xl font-bold mb-4">Gestión de Usuarios</h1>

      <div className="flex flex-wrap gap-4 mb-4">
        <Input
          placeholder="Filtrar por nombre"
          value={filters.searchName}
          onChange={e => setFilters({ ...filters, searchName: e.target.value, pageNumber: 1 })}
          className="border p-2 rounded w-1/4"
        />
        <Input
          placeholder="Filtrar por correo"
          value={filters.searchEmail}
          onChange={e => setFilters({ ...filters, searchEmail: e.target.value, pageNumber: 1 })}
          className="border p-2 rounded w-1/4"
        />
        <select
          className="border p-2 rounded w-1/6"
          value={filters.status}
          onChange={e => setFilters({ ...filters, status: e.target.value, pageNumber: 1 })}
        >
          <option value="">Todos</option>
          <option value="active">Activos</option>
          <option value="inactive">Inactivos</option>
        </select>
      </div>

      {loading ? (
        <p>Cargando usuarios...</p>
      ) : (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nombre</TableHead>
              <TableHead>Correo</TableHead>
              <TableHead>Estado</TableHead>
              <TableHead>Acciones</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users.map(user => (
              <TableRow key={user.id}>
                <TableCell>{user.name}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.isActive ? "Activo" : "Inactivo"}</TableCell>
                <TableCell className="flex gap-2">
                  <Button
                    onClick={() => goToProfile(user.id)}
                    className="bg-blue-500 text-white hover:bg-blue-600"
                  >
                    Ver Perfil
                  </Button>
                  <Button
                    onClick={() => toggleUserStatus(user)}
                    className={`${
                      user.isActive ? "bg-red-500 hover:bg-red-600" : "bg-green-500 hover:bg-green-600"
                    } text-white`}
                  >
                    {user.isActive ? "Deshabilitar" : "Habilitar"}
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}

      <div className="flex justify-between items-center mt-6">
        <Button
          onClick={() => filters.pageNumber > 1 && setFilters({ ...filters, pageNumber: filters.pageNumber - 1 })}
          disabled={filters.pageNumber <= 1}
          className="bg-gray-500 text-white hover:bg-gray-600 mr-2"
        >
          Anterior
        </Button>
        <span>
          Página {filters.pageNumber} {pagination ? `de ${pagination.totalPages}` : ""}
        </span>
        <Button
          onClick={() =>
            pagination &&
            filters.pageNumber < pagination.totalPages &&
            setFilters({ ...filters, pageNumber: filters.pageNumber + 1 })
          }
          disabled={!pagination || filters.pageNumber >= pagination.totalPages}
          className="bg-gray-500 text-white hover:bg-gray-600"
        >
          Siguiente
        </Button>
      </div>

      {/* Botón para volver */}
      <Button
        onClick={() => router.push("/admin")}
        className="fixed bottom-6 left-6 bg-gray-700 text-white hover:bg-gray-800 rounded-full p-4 shadow-lg"
      >
        Volver
      </Button>
    </div>
  );
};
