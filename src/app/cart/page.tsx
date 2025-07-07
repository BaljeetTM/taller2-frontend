'use client';

import { useAuth } from "@/hooks/useAuth";
import { CartPage } from "@/views/cartPage/CartPage";
import { useRouter } from "next/navigation";


export default function Cart() {

    const {user} = useAuth();
    const router = useRouter();

    if (!user) {
        router.push("/login");
        return null;
    }

    return <CartPage/>
}