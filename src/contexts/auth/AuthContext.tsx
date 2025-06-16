"use client"

import { User } from "@/interfaces/User";
import { authReducer, AuthState } from "./AuthReducer";
import { createContext, useReducer } from "react";


type AuthContextProps = {
    user: User | null;
    status: "checking" | "authenticated" | "not-authenticated";
    auth: (user: User) => void;
    logout: () => void;
    updateUser: (user: User) => void;
}

const authInitialState: AuthState = {
    status: "checking",
    user: null
}

export const AuthContext = createContext({} as AuthContextProps);

export const AuthProvider = ({ children }: any) => {
    const [state, dispatch] = useReducer(authReducer, authInitialState);

    const auth = (user: User) => {
        dispatch({ type: "auth", payload: {user} })
    }

    const logout = () => {
        localStorage.removeItem("user");
        dispatch({ type: "logout" })
    }

    const updateUser = (user: User) => {
        dispatch({ type: "update-user", payload: {user} })
    }

    return (
        <AuthContext.Provider
            value={{
                ...state,
                logout,
                auth,
                updateUser
            }}
        >
            {children}

        </AuthContext.Provider>
    )
}