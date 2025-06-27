"use client";

import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "next/navigation";

export default function Home() {
  const { user } = useAuth();
  const router = useRouter();
  console.log("User data:", user);

  if (user?.roleName === "Admin") {
    console.log("User is admin, redirecting to admin page");
    return router.push("/admin");
  } else if (user?.roleName === "Cliente") {
    console.log("User is client, redirecting to client page");
    return router.push("/user");
  }
  
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1 className="text-3xl font-bold underline">Home</h1>
      <Button onClick={() => router.push("/register")}>Register</Button>
      <Button onClick={() => router.push("/login")}>Login</Button>
    </main>
  );
}
