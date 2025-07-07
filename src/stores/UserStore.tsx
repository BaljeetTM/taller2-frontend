import { create } from "zustand";
import { User } from "@/services/UserServices";
import { UserFilters, UserServices } from "@/services/UserServices";

interface UserState {
  users: User[];
  loading: boolean;
  error: string | null;
  filters: UserFilters;
  fetchUsers: () => Promise<void>;
  setFilters: (filters: Partial<UserFilters>) => void;
  updateStatus: (email: string, reason: string) => Promise<void>;
}

export const useUserStore = create<UserState>((set, get) => ({
  users: [],
  loading: false,
  error: null,
  filters: { pageNumber: 1, pageSize: 10 },

  fetchUsers: async () => {
    set({ loading: true, error: null });
    try {
      const { filters } = get();
      const data = await UserServices.fetchUsers(filters);
      console.log("Usuarios obtenidos:", data);

      set({ users: data, loading: false });
    } catch (error: any) {
      console.error("Error en fetchUsers:", error);
      set({
        loading: false,
        error: error.message || "Error al obtener los usuarios",
      });
    }
  },
  
  updateStatus: async (email: string, reason: string) => {
    await UserServices.toggleUserStatus(email, reason);
    },


  setFilters: (newFilters) =>
    set((state) => ({
      filters: { ...state.filters, ...newFilters },
    })),
}));
