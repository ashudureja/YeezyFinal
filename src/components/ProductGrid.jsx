import React, { useRef, useState } from "react";
import { Minus, MoreVertical, Plus, ShoppingCart, X } from "lucide-react";
import { motion } from "framer-motion";
import { useEffect } from "react";
import { PiDotsThree } from "react-icons/pi";
// import Checkout from './Checkout'
import { useCart } from "../CartContext/ContextHook";
import useSound from "use-sound";

import { Sheet } from "../ui/Sheet";
import { SheetContent } from "../ui/Sheet";
import { SheetTitle } from "../ui/Sheet";
import { SheetTrigger } from "../ui/Sheet";
import { SheetHeader } from "../ui/Sheet";
import { products } from "../Constants/Products";
import { navbarData } from "../Constants/Products";
import clsx from "clsx";
import { BsThreeDots } from "react-icons/bs";
import { Link } from "react-router-dom";

const ProductGrid = () => {
  const [toggle, setToggle] = useState(false);
  const audioref = useRef();
  const [playHover] = useSound("./hoversound.mp4");
  const [playclick] = useSound("./click8.mp4");
  const [playclick1] = useSound("./click5.mp4");

  const {
    isOpen,
    setIsOpen,
    audioplaying,
    Setaudioplaying,

    items: cartItems,
    addItem,
    updateQuantity,
    removeItem: removeFromCart,
    cartTotal,
  } = useCart();

  

  const handleclick = () => {
    playclick1();
    Setaudioplaying(!audioplaying);
  };

  const handleclick1 = (product) => {
    addItem(product);
    playclick1();
  };
  return (
    <div className="min-h-screen bg-white">
      <header className="sticky top-0 z-10 bg-white ">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          {/* Mobile Menu Toggle */}
          {/* <button className="p-2" onClick={() => setToggle(!toggle)}>
            {toggle ? (
              <X className="h-6 w-6 font-bold" />
            ) : (
              <MoreVertical className="h-6 w-6" />
            )}
            <span className="sr-only">Menu</span>
          </button> */}
          <button className="text-3xl text-black" onClick={handleclick}>
            {audioplaying ? (
              <img
                className="h-8"
                src="https://media.tenor.com/NjavXXAMRD8AAAAM/sound.gif"
              ></img>
            ) : (
              <PiDotsThree />
            )}
          </button>

          {/* Navigation Links */}

          <div className="w-full flex gap-x-10 items-center justify-center">
            {navbarData.map((item) => (
              <Link
                onClick={() => playclick()}
                to={`/${item.title}`}
                key={item.idx}
                className="sm:text-lg  text-xs font-bold sm:font-medium text-primary"
              >
                {item.title}
              </Link>
            ))}
          </div>

          {/* Cart Button */}
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <button className="sm:text-lg  text-xs font-medium flex items-center gap-2">
                <span>Cart</span>
                {cartItems.length > 0 && (
                  <span className="inline-flex items-center justify-center w-5 h-5 text-xs font-medium bg-black text-white rounded-full">
                    {cartItems.reduce(
                      (total, item) => total + item.quantity,
                      0
                    )}
                  </span>
                )}
              </button>
            </SheetTrigger>
            <SheetContent className="w-full sm:max-w-md">
              <SheetHeader>
                <SheetTitle>Your Cart</SheetTitle>
              </SheetHeader>
              {cartItems.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-[50vh]">
                  <ShoppingCart className="h-12 w-12 text-gray-300 mb-4" />
                  <p className="text-gray-500">Your cart is empty</p>
                </div>
              ) : (
                <div className="flex flex-col h-full">
                  <div className="flex-1 overflow-auto p-6">
                    <ul className="space-y-6">
                      {cartItems.map((item) => (
                        <li key={item.id} className="flex gap-4">
                          <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border">
                            <img
                              src={item.images?.[0]?.src || "/placeholder.svg"}
                              alt={item.name}
                              width={96}
                              height={96}
                              className="h-full w-full object-contain p-2"
                            />
                          </div>
                          <div className="flex flex-1 flex-col">
                            <div className="flex justify-between text-base font-medium text-gray-900">
                              <h3>{item.name}</h3>
                              <p className="ml-4">${item.price}</p>
                            </div>
                            <div className="flex items-center mt-2">
                              <button
                                className="rounded-md border p-1"
                                onClick={() =>
                                  updateQuantity(item.id, item.quantity - 1)
                                }
                              >
                                <Minus className="h-4 w-4" />
                              </button>
                              <span className="mx-2 w-8 text-center">
                                {item.quantity}
                              </span>
                              <button
                                className="rounded-md border p-1"
                                onClick={() =>
                                  updateQuantity(item.id, item.quantity + 1)
                                }
                              >
                                <Plus className="h-4 w-4" />
                              </button>
                              <button
                                onClick={() => removeFromCart(item.id)}
                                className="ml-auto text-gray-400 hover:text-gray-500"
                              >
                                <X className="h-5 w-5" />
                                <span className="sr-only">Remove</span>
                              </button>
                            </div>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="border-t border-gray-200 p-6">
                    <div className="flex justify-between text-base font-medium text-gray-900 mb-4">
                      <p>Subtotal</p>
                      <p>${cartTotal}</p>
                    </div>
                    {/* <Checkout /> */}
                  </div>
                </div>
              )}
            </SheetContent>
          </Sheet>
        </div>
      </header>

      {/* Product Grid */}
      <main className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-35">
          {products.map((product, index) => (
            <Link
              onMouseEnter={playHover}
              onClick={playclick}
              to={`/product/${product.id}`}
              key={index}
              className="flex flex-col group relative"
            >
              <div className="aspect-square rounded-md overflow-hidden">
                <motion.img
                  initial={{ y: 100 }}
                  animate={{ y: 0 }}
                  transition={{ duration: 1, delay: 1 }}
                  viewport={{ once: true }}
                  src={product.images?.[0]?.src || "/placeholder.svg"}
                  alt={product.name}
                  width={300}
                  height={300}
                  className="w-full h-full object-contain relative"
                />
                <motion.button
                  onClick={(e) => {
                    e.stopPropagation(); // stop the event from bubbling up to the Link
                    e.preventDefault(); // prevent default navigation just in case
                    handleclick1(product);
                  }}
                  className="absolute text-zinc-200 text-sm top-3 right-3 cursor-pointer hover:text-black hover:scale-1.5"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1.7 }}
                >
                  +
                </motion.button>
              </div>
              <div className="group-hover:opacity-100 opacity-0 flex flex-col justify-end">
                <div className="flex justify-between items-center gap-1 mb-2">
                  <h3 className="text-base font-bold text-sm">
                    {product.name}
                  </h3>
                  <p className="text-base  text-xs">${product.price}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </main>
    </div>
  );
};

export default ProductGrid;
