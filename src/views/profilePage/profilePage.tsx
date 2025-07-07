"use client";

import { useContext } from "react";
import { useRouter } from "next/navigation";
import { AuthContext } from "@/contexts/auth/AuthContext";

export default function ProfilePage() {
  const context = useContext(AuthContext);
  const router = useRouter();

  if (!context) {
    return <div className="p-4">Debes iniciar sesión para ver tu perfil.</div>;
  }

  const { user } = context;

  if (!user) {
    return <div className="p-4">Debes iniciar sesión para ver tu perfil.</div>;
  }

  return (
    <div className="max-w-xl mx-auto mt-10 p-6 bg-white rounded shadow flex flex-col min-h-[300px]">
      <h1 className="text-2xl font-bold mb-4">Información Personal</h1>

      <div className="space-y-4 text-gray-700 flex-grow">
        <div>
          <h2 className="font-semibold">Nombre:</h2>
          <p>{user.firtsName}</p>
        </div>
        <div>
          <h2 className="font-semibold">Correo electrónico:</h2>
          <p>{user.email}</p>
        </div>
        <div>
          <h2 className="font-semibold">Teléfono:</h2>
          <p>{user.thelephone || "-"}</p>
        </div>
        <div>
          <h2 className="font-semibold">Fecha de nacimiento:</h2>
          <p>{user.birthDate ? new Date(user.birthDate).toLocaleDateString() : "-"}</p>
        </div>
      </div>

      <div className="mt-6">
        <button
          onClick={() => router.push("/client")}
          className="bg-gray-300 text-gray-800 px-4 py-2 rounded hover:bg-gray-400"
          style={{ alignSelf: "flex-start" }} // para alinearlo a la izquierda
        >
          Volver
        </button>
      </div>
    </div>
  );
}
