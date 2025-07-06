import { User } from "@/interfaces/User";
import { decode } from "punycode";

export const decodeJWT = (token: string) => {
  try {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split('')
        .map(c => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
        .join('')
    );

    return JSON.parse(jsonPayload);
  } catch (error) {
    console.error("Error al decodificar token:", error);
    return null;
  }
};

/*
export const getUserFromToken = (token : string) : User | null => {
  try{
    const payload = decodeJWT(token);
    if (!payload){
      console.warn("invalid token payload");
      return null;
    }
    const user : User = {
      fullName: payload.fullName,
      lastName: payload.lastName,
      email: payload.email,
      roleName: payload.roleName,
      token,
    }
    return user;
  }
  catch (error) {
    console.error("Error al obtener el usuario del token:", error);
    return null;
  }
}
*/