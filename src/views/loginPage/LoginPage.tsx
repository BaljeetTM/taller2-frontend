"use client";

import { Button } from "@/components/ui/button";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
  Form,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { ApiBackend } from "@/clients/axios";
import { ResponseAPI } from "@/interfaces/ResponseAPI";
import { User } from "@/interfaces/User";
import { useContext, useState } from "react";
import { AuthContext } from "@/contexts/auth/AuthContext";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { decodeJWT } from "@/helpers/decodeJWT";

const formSchema = z.object({
  email: z.string().email({
    message: "Ingrese un correo electrónico válido.",
  }),
  password: z.string().min(6, {
    message: "La contraseña debe tener al menos 6 caracteres.",
  }),
});

export const LoginPage = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const [errors, setErrors] = useState<string | null>(null);
  const [errorBool, setErrorBool] = useState<boolean>(false);
  const { auth } = useContext(AuthContext);
  const router = useRouter();

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      console.log("Valores enviados de formulario:", values);

      const { data } = await ApiBackend.post<ResponseAPI>(
        "Auth/login",
        values
      );

      if (data.success === false) {
        console.error("Error en el login:", data.message);
        setErrors(data.message || "Error en la respuesta del servidor");
        setErrorBool(true);
        return;
      }

      setErrors(null);
      setErrorBool(false);

      const userData = data.data; // AuthenticatedUserDto
      const payload = decodeJWT(userData.token);

      if (!payload) {
        console.error("Error al decodificar el token:", userData.token);
        setErrorBool(true);
        setErrors("Token inválido recibido");
        return;
      }

      const user_: User = {
        id: userData.id,
        fullName: userData.fullName,
        lastName: userData.lastName,
        email: userData.email,
        phoneNumber: userData.phoneNumber,
        roleName: payload.roleName,
        addresses: userData.addresses,
        dateOfBirth: userData.dateOfBirth,
        registrationDate: userData.registrationDate,
        isActive: userData.isActive,
        token: userData.token,
      };

      localStorage.setItem("token", userData.token);
      console.log("Datos del usuario:", user_);
      auth(user_);

      if (payload.roleName === "Admin") {
        router.push("/admin");
      } else {
        router.push("/user");
      }
    } catch (error: any) {
      console.error("Error al enviar el formulario:", error);
      const message =
        error.response?.data?.message || "Error de red o servidor no disponible.";
      setErrors(message);
      setErrorBool(true);
    }
  };

  return (
    <div className="flex flex-col md:flex-row h-screen">
      {/* Lado izquierdo */}
      <div className="md:w-1/2 w-full bg-blue-700 text-white flex flex-col justify-center items-center p-10">
        <h1 className="text-3xl md:text-4xl font-bold mb-4 text-center">
          Bienvenido a la aplicación
        </h1>
        <p className="text-base md:text-lg text-justify max-w-md">
          Inicia sesión para acceder a nuestra plataforma.
        </p>
      </div>

      {/* Lado derecho */}
      <div className="md:w-1/2 w-full flex items-center justify-center bg-white px-6 py-10">
        <div className="w-full max-w-md">
          <h2 className="text-2xl md:text-3xl font-bold mb-2 text-center md:text-left">
            Iniciar sesión
          </h2>
          <h3 className="text-lg md:text-xl font-medium mb-2 text-center md:text-left">
            ¡Bienvenido de vuelta!
          </h3>
          <p className="mb-4 text-sm text-gray-600 text-center md:text-left">
            ¿No tienes una cuenta?{" "}
            <Link href="/register" className="text-blue-600 underline">
              Regístrate aquí
            </Link>
          </p>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              {/* Email */}
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Correo electrónico</FormLabel>
                    <FormControl>
                      <Input placeholder="correo@example.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Contraseña */}
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Contraseña</FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="••••••••"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Errores */}
              {errorBool && (
                <div className="text-red-500 text-sm mt-2 p-2 bg-red-100 rounded">
                  {errors}
                </div>
              )}

              <Button type="submit">Iniciar sesión</Button>
            </form>
          </Form>

          <div className="mt-4 text-sm text-center md:text-left">
            ¿Olvidaste tu contraseña?{" "}
            <a href="#" className="text-blue-600 underline">
              Haz click aquí
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
