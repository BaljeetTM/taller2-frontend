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
import { set } from "zod/v4-mini";
import { AuthContext } from "@/contexts/auth/AuthContext";
import Link from "next/link";
import { useRouter } from "next/navigation";

const formSchema = z.object({
  username: z.string().min(2, {
    message: "Ingrse una correo electrónico válido.",
  }),
  password: z.string().min(6, {
    message: "la contraseña debe tener al menos 6 caracteres.",
  }),
});

export const LoginPage = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });
  const [errors, setErrors] = useState<string | null>(null);
  const [errorBool, setErrorBool] = useState<boolean>(false);
  const { auth } = useContext(AuthContext);
  const router = useRouter();
  // const onSubmit = async (values: z.infer<typeof formSchema>) => {
  //   try {
  //     console.log("Valores enviados de formulario:", values);
  //     const { data } = await ApiBackend.post<ResponseAPI>("Auth/login", values);
  //     if(data.success === false){
  //         console.error("Error al enviar el formulario:", data.message);
  //         setErrors("Error en la respuesta del servidor:");
  //         setErrorBool(true);
  //         return;
  //     }
  //     setErrors(null);
  //     setErrorBool(false);
  //     const data_ = data.data as ResponseAPI;
  //     const user_: User = {
  //       id: data_.data.id,
  //       fullName: data_.data.fullName,
  //       lastName: data_.data.lastName,
  //       email: data_.data.email,
  //       phoneNumber: data_.data.phoneNumber,
  //       roleName: data_.data.roleName,
  //       addresses: data_.data.addresses,
  //       dateOfBirth: data_.data.dateOfBirth,
  //       registrationDate: data_.data.registrationDate,
  //       isActive: data_.data.isActive,
  //       token: data_.data.token,
        
  //     };

  //     console.log("Datos del usuario:", user_);
  //     auth(user_);

  //   } catch (error: any) {
  //     console.error("Error al enviar el formulario:", error);
  //     // setErrors(error);
  //     // setErrorBool(true);
  //   }

  //   console.log("Valores enviados de formulario:", values);
  // };
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
  try {
    console.log("Valores enviados de formulario:", values);

    // Simulación de datos del usuario autenticado
    const user_: User = {
      id: 2, // ID ficticio
      fullName: "Ernes",
      lastName: "Fuenzalida",
      email: "ernitoph@example.com",
      phoneNumber: "+56912345678",
      roleName: "Cliente",
      addresses: [],
      // dateOfBirth: "0001-01-01T00:00:00",
      // registrationDate: "2025-06-26T22:26:59.4595226-04:00",
      isActive: false,
      token: "fake-jwt-token", // Token ficticio para simular autenticación
    };

    console.log("Datos del usuario:", user_);
    auth(user_); // Autenticación directa con los datos harcodeados
    router.push("/");
    // Manejo de errores desactivado porque no hay llamada real al backend
    setErrors(null);
    setErrorBool(false);
  } catch (error: any) {
    console.error("Error al enviar el formulario:", error);
    // Manejo opcional de errores (aunque no se espera que ocurra aquí)
    setErrors("Error simulado al procesar los datos");
    setErrorBool(true);
  }

  console.log("Valores enviados de formulario:", values);
};

  return (
    <div className="flex flex-col md:flex-row h-screen">
      {/* Lado izquierdo */}
      <div className="md:w-1/2 w-full bg-blue-700 text-white flex flex-col justify-center items-center p-10">
        <h1 className="text-3xl md:text-4xl font-bold mb-4 text-center">
          Bienvenido a la aplicación
        </h1>
        <p className="text-base md:text-lg text-justify max-w-md">
          Inicia sesión para acceder a nuestra plataforma.
        </p>
      </div>

      {/* Lado derecho */}
      <div className="md:w-1/2 w-full flex items-center justify-center bg-white px-6 py-10">
        <div className="w-full max-w-md">
          <h2 className="text-2xl md:text-3xl font-bold mb-2 text-center md:text-left">
            Iniciar sesión
          </h2>
          <h3 className="text-lg md:text-xl font-medium mb-2 text-center md:text-left">
            ¡Bienvenido de vuelta!
          </h3>
          <p className="mb-4 text-sm text-gray-600 text-center md:text-left">
            ¿No tienes una cuenta?{" "}
            <Link href="/register" className="text-blue-600 underline">
              Regístrate aquí
            </Link>
          </p>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>email</FormLabel>
                    <FormControl>
                      <Input placeholder="correo@example.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Contraseña</FormLabel>
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

              {errorBool && (
                <div className="text-red-500 text-sm mt-2 p-2 bg-red-100 rounded">{errors}</div>
              )}

              <Button type="submit">Iniciar sesión</Button>
            </form>
          </Form>

          <div className="mt-4 text-sm text-center md:text-left">
            ¿Olvidaste tu contraseña?{" "}
            <a href="#" className="text-blue-600 underline">
              Haz click aquí
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
