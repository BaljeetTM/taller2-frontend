"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";
import { decode } from "punycode";

export default function UserLayout({ children }: { children: React.ReactNode }) {
  const { user, status } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (status === "checking") return;

    if (!user?.token) {
      router.replace("/login");
      return;
    }

    const payload = decode(user.token);
    if (!user || user.roleName !== "Cliente") {
      router.replace("/");
    }
  }, [user, status, router]);

  return (
    <div className="user-layout">
      <h1>User Panel</h1>
      <main>{children}</main>
    </div>
  );
}
