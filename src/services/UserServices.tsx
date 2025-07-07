import { ApiBackend } from "@/clients/axios";
import { ResponseAPI } from "@/interfaces/ResponseAPI";

export interface User {
  id: number;
  name: string;
  email: string;
  isActive: boolean;
}

export interface UserFilters {
  pageNumber: number;
  pageSize: number;
  searchName?: string;
  searchEmail?: string;
  status?: "active" | "inactive";
}

export const UserServices = {
  async fetchUsers(filters: UserFilters) {
    const { data } = await ApiBackend.get<ResponseAPI>("user", {
      params: { ...filters },
    });

    if (!data.success) {
      throw new Error(data.message || "Error al obtener los usuarios");
    }
    if (!data.data || !Array.isArray(data.data)) {
      throw new Error("No se encontraron usuarios");
    }
    if (data.error) {
      console.error("Errors:", data.error);
    }

    return data.data as User[];
  },

  async toggleUserStatus(email: string, reason: string) {
    try {
      const body = {
        reason,
        Email: email,
      };

      const { data } = await ApiBackend.patch<ResponseAPI>(
        "user/toggle-status",
        body
      );

      if (!data.success) {
        throw new Error(
          data.message || "Error al cambiar el estado del usuario"
        );
      }

      return data;
    } catch (error) {
      console.error("Error en toggleUserStatus:", error);
      throw error;
    }
  },

  async fetchUserById(userId: number) {
    const { data } = await ApiBackend.get<ResponseAPI>(`user/${userId}`);

    if (!data.success) {
      throw new Error(data.message || "Error al obtener el perfil del usuario");
    }
    if (!data.data) {
      throw new Error("Usuario no encontrado");
    }

    return data.data as User;
  },
};
