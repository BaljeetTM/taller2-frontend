import { User } from "@/interfaces/User";

export interface AuthState {
  user: User | null;
  status: "checking" | "authenticated" | "not-authenticated";
}

export type AuthAction =
  | { type: "auth", payload: {user: User} }
  | { type: "logout" }
  | { type: "not-authenticated" }
  | { type: "update-user", payload: {user: User} };

export const authReducer = (state: AuthState, action: AuthAction): AuthState => {
    switch (action.type) {
      case "auth":
        return {
          ...state,
          user: action.payload.user,
          status: "authenticated",
        };
      case "logout":
        return {
          ...state,
          user: null,
          status: "not-authenticated",
        };
      case "not-authenticated":
        return {
          ...state,
          user: null,
          status: "not-authenticated",
        };
      case "update-user":
        return {
          ...state,
          status: "authenticated",
          user: {
            ...action.payload.user
          }
        };
      default:
        return state;
    }
} 