"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const { user, status } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (status === "checking") return;

    if (!user?.token) {
      router.replace("/login");
      return;
    }

    if (!user || user.roleName !== "Admin") {
      router.replace("/");
    }
  }, [user, status, router]);

  return (
    <div className="admin-layout">
      <h1>Admin Panel</h1>
      <main>{children}</main>
    </div>
  );
}