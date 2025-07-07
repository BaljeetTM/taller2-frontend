'use client';

import { CartItem } from "@/interfaces/Product";
import { useCartStore } from "@/stores/CartStore";
import { useEffect } from "react";
import Image from "next/image";
import { CircleMinus, PlusIcon, Trash2Icon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Navbar } from "@/components/Navbar";


export const CartPage = () => {
    const { items: cart, totalPrice, fetchCart, addToCart, removeFromCart, createOrder } = useCartStore();

    useEffect(() => {
        fetchCart();
        console.log("Carrito de compras cargado:", cart);
    }, []);

    const handleCheckout = () => {
        if (cart.length === 0) {
            alert("El carrito está vacío. Agrega productos antes de proceder al pago.");
            return;
        }
        createOrder()
            .then(() => {
                console.log("Orden creada exitosamente");
                cart.forEach(item => {
                    removeFromCart(item.productId, item.quantity)
                });
            }).catch((error) => {
                console.error("Error al crear la orden:", error);
                alert("Ocurrió un error al procesar tu pedido. Por favor, inténtalo de nuevo más tarde.");
            });
        alert(`Pedido realizado exitosamente. Total: $${totalPrice}`);
    }

    const handleRemoveItem = (productId: number) => {
        const item = cart.find(item => item.productId === productId);
        if (item) {
            removeFromCart(productId, item.quantity);
            alert(`Producto ${item.name} eliminado del carrito.`);
        } else {
            alert(`Producto no encontrado en el carrito.`);
        }
    }

    return (
        <div className="bg-gray-100 min-h-screen py-10 px-4">
            {/* Navbar */}
            <Navbar/>
            <div className="max-w-7x1 mx-auto">
                <h1 className="text-2xl font-bold mb-6">
                    {cart.map ((item:CartItem) => (
                        <div key={item.productId} className="bg-white p-4 rounded shadow flex flex-col md:flex-row gap-4">
                            <Image
                            src={item.urls?.[0] || '/producto.jpg'}
                            alt={item.name}
                            width={100}
                            height={100}
                            className="object-contain border rounded mx-auto md:mx-0"
                            />
                            <div className="flex-1 flex flex-col justify-between">
                                <div>
                                    <h2 className="font-semibold text-base md:text-lg">{item.name}</h2>
                                    <p className="text-blue-700 font-bold text-lg md:text-xl">${item.price.toFixed(2)}</p>
                                    <div className="flex items-center mt-2 gap-2 flex-wrap">
                                        <span className="text-sm">Cantidad:</span>
                                        <Button
                                            size={"sm"}
                                            onClick={() => removeFromCart(item.productId, 1)}
                                            className="bg-black text-white"
                                        >
                                            <CircleMinus/>
                                        </Button>

                                        <span className="text-sm">{item.quantity}</span>

                                        <Button
                                            
                                            onClick={() => addToCart(item.productId, 1)}
                                            className="bg-blue-500 text-white"
                                        >
                                            <PlusIcon/>
                                        </Button>
                                    </div>
                                </div>
                            </div>

                            <div className="flex flex-col justify-between items-end ml-auto">
                                <div className="text-sm">
                                    <span className="fontsemibold text-black">Subtotal:</span><br/>
                                    $ {(item.price * item.quantity).toFixed(2)}
                                </div>
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    className="text-red-500 hover:bg-red-100"
                                    onClick={() => handleRemoveItem(item.productId)}
                                >
                                    <Trash2Icon className="w-5 h-5"/>
                                </Button>
                            </div>
                        </div>
                    ))}
                    <div className="bg-white p-6 rounded shadow h-fit">
                        <h2 className="text-lg font-bold mb-4">Resumen de Compras</h2>
                        <div className="space-y-2 text-sm">
                            <div className="flex justify-between ">
                                <span>Total:</span>
                                <span>$ {totalPrice.toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between font-bold text-lg border-t pt-2">
                                <span>TOTAL:</span>
                                <span>$ {totalPrice.toFixed(2)}</span>
                            </div>
                        </div>
                        <div className="mt-6 space-y-2">
                            <Button
                            className="w-full bg-green-600 hover:bg-green-700 text-white"
                            onClick={handleCheckout}
                            >
                            Hacer Pedido
                            </Button>
                            <Button
                            variant="outline"
                            className="w-full"
                            onClick={() => cart.forEach((item: {productId: number; quantity: number; }) => removeFromCart(item.productId, item.quantity))}
                            >
                                Vaciar Carrito
                            </Button>
                        </div>
                    </div>
                </h1>
            </div>
        </div>
    );
}