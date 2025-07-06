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
import { useState } from "react";
import Link from "next/link";

const formSchema = z
  .object({
    firstName: z.string().min(3, {
      message: "El nombre debe tener al menos 3 caracteres.",
    }),
    lastName: z.string().min(3, {
      message: "El apellido debe tener al menos 3 caracteres.",
    }),
    email: z.string().email({
      message: "Ingrese un correo electrónico válido.",
    }),
    password: z.string().min(8, {
      message: "La contraseña debe tener al menos 8 caracteres.",
    }),
    confirmPassword: z.string().min(8, {
      message:
        "La confirmación de contraseña debe tener al menos 8 caracteres.",
    }),
    dateOfBirth: z.string().regex(/\d{4}-\d{2}-\d{2}/, {
      message: "La fecha debe estar en formato YYYY-MM-DD.",
    }),
    phoneNumber: z.string().min(10, {
      message: "El número de teléfono debe tener al menos 10 dígitos.",
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Las contraseñas no coinciden.",
  });

export const RegisterPage = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
      dateOfBirth: "",
      phoneNumber: "",
    },
  });
  const [errors, setErrors] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean>(false);

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      console.log("Valores enviados de formulario:", values);

      const newUser = {
        firtsName: values.firstName, // coincide con el backend (typo incluido)
        lastName: values.lastName,
        email: values.email,
        thelephone: values.phoneNumber, // coincide con el backend (typo incluido)
        password: values.password,
        confirmPassword: values.confirmPassword,
        birthDate: values.dateOfBirth, // formato ISO: YYYY-MM-DD
      };

      const { data } = await ApiBackend.post<ResponseAPI>(
        "Auth/register",
        newUser
      );

      if (!data.success) {
        console.error("Error en la respuesta del servidor:", data.message);
        setErrors(data.message || "Error en la respuesta del servidor.");
        setSuccess(false);
        return;
      }

      setErrors(null);
      setSuccess(true);
      console.log("Registro exitoso:", data);
    } catch (error: any) {
      let errorCatch =
        error.response?.data?.message || "Error desconocido al registrar.";
      console.error("Error al enviar el formulario:", error);
      setErrors(errorCatch);
      setSuccess(false);
    }
  };

  return (
    <div className="flex flex-col md:flex-row h-screen">
      {/* Lado izquierdo */}
      <div className="md:w-1/2 w-full bg-blue-700 text-white flex flex-col justify-center items-center p-10">
        <h1 className="text-3xl md:text-4xl font-bold mb-4 text-center">
          Únete a nuestra comunidad
        </h1>
        <p className="text-base md:text-lg text-justify max-w-md">
          Regístrate para obtener acceso a todas nuestras funciones exclusivas.
        </p>
      </div>

      {/* Lado derecho */}
      <div className="md:w-1/2 w-full flex items-center justify-center bg-white px-6 py-10">
        <div className="w-full max-w-md">
          <h2 className="text-2xl md:text-3xl font-bold mb-2 text-center md:text-left">
            Crear una cuenta
          </h2>
          <p className="mb-4 text-sm text-gray-600 text-center md:text-left">
            ¿Ya tienes una cuenta?{" "}
            <Link href="/login" className="text-blue-700 underline">
              Inicia sesión aquí
            </Link>
          </p>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              {/* Nombre */}
              <FormField
                control={form.control}
                name="firstName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nombre</FormLabel>
                    <FormControl>
                      <Input placeholder="Juan" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Apellido */}
              <FormField
                control={form.control}
                name="lastName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Apellido</FormLabel>
                    <FormControl>
                      <Input placeholder="Pérez" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Correo */}
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

              {/* Fecha de nacimiento */}
              <FormField
                control={form.control}
                name="dateOfBirth"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Fecha de nacimiento</FormLabel>
                    <FormControl>
                      <Input type="date" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Teléfono */}
              <FormField
                control={form.control}
                name="phoneNumber"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Número de teléfono</FormLabel>
                    <FormControl>
                      <Input type="tel" placeholder="+56912345678" {...field} />
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

              {/* Confirmar contraseña */}
              <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Confirmar contraseña</FormLabel>
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
              {errors && (
                <div className="text-red-500 text-sm mt-2 p-2 bg-red-100 rounded">
                  {errors}
                </div>
              )}

              {/* Éxito */}
              {success && (
                <div className="text-green-500 text-sm mt-2 p-2 bg-green-100 rounded">
                  Registro exitoso. Ahora puedes iniciar sesión.
                </div>
              )}

              <Button type="submit">Registrarse</Button>
            </form>
          </Form>

          <div className="mt-4 text-sm text-center md:text-left">
            ¿Olvidaste tu contraseña?{" "}
            <a href="#" className="text-blue-700 underline">
              Haz click aquí
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
