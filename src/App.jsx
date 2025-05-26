import React, { useState, useEffect } from "react";
import HeroSection from "./components/Hero";

import { AnimatePresence, motion } from "framer-motion";
import ProductGrid from "./components/Productgrid";
import { useCart } from "./CartContext/ContextHook";
import CartProvider from "./CartContext/Context";
import AudioPlayer from "./components/AudioPlayer";
import { Routes, Route, useLocation, useParams } from "react-router-dom";
import Music from "./components/Music";
import ProductPage from "./components/Productpage";


const App = () => {
  
 

  const smoothEaseOut = [0.76, 0, 0.24, 1];
  const smoothEaseInOut = [0.83, 0, 0.17, 1];
 

 
 

  const location = useLocation(); // Get current location (for AnimatePresence)
   const isHome = location.pathname === '/'

  return (
    <CartProvider>
      <AudioPlayer />
      <div className="h-screen w-full relative bg-black">
        {/* {isHome && <CustomCursor />} */}

       

        {/* Video Section (slides in on top) */}
        <AnimatePresence mode="sync">
          <Routes location={location} key={location.pathname}>
            {/* Hero route should stay at "/" */}
            <Route
              path="/"
              element={
                <motion.div
                  key="hero"
                  initial={{ y: "0", opacity: 1 }}
                  animate={{
                    y: 0,
                    opacity: 1,
                    transition: { duration: 1, ease: [0.76, 0, 0.24, 1] },
                  }}
                  exit={{
                    scale: 0.8,
                    opacity: 0,
                    transition: { duration: 1, ease: [0.76, 0, 0.24, 1] },
                  }}
                  className="absolute w-full h-full z-20"
                >
                  <HeroSection  />
                </motion.div>
              }
            />

            {/* Products Route */}
            <Route
              path="/products"
              element={
                <motion.div
                  key="productGrid"
                  initial={{ y: "100vh", opacity: 1 }}
                  animate={{
                    y: 0,
                    opacity: 1,
                    transition: { duration: 1, ease: [0.76, 0, 0.24, 1] },
                  }}
                  exit={{
                    scale: 0.8,
                    opacity: 0,
                    transition: { duration: 1, ease: [0.76, 0, 0.24, 1] },
                  }}
                  className="absolute w-full h-full z-20"
                >
                  <ProductGrid />
                </motion.div>
              }
            />

            {/* Music Route */}
            <Route
              path="/music"
              element={
                <motion.div
                  key="music"
                  initial={{ y: "100vh", opacity: 1 }}
                  animate={{
                    y: 0,
                    opacity: 1,
                    transition: { duration: 1, ease: [0.76, 0, 0.24, 1] },
                  }}
                  exit={{
                    scale: 0.8,
                    opacity: 0,
                    transition: { duration: 1, ease: [0.76, 0, 0.24, 1] },
                  }}
                  className="absolute w-full h-full z-20"
                >
                  <Music />
                </motion.div>
              }
            />
            <Route
              path="/product/:id"
              element={
                <motion.div
                  key="music"
                  initial={{ y: "100vh", opacity: 1 }}
                  animate={{
                    y: 0,
                    opacity: 1,
                    transition: { duration: 1, ease: [0.76, 0, 0.24, 1] },
                  }}
                  exit={{
                    scale: 0.8,
                    opacity: 0,
                    transition: { duration: 1, ease: [0.76, 0, 0.24, 1] },
                  }}
                  className="absolute w-full h-full z-20"
                >
                  <ProductPage />
                </motion.div>
              }
            />
          </Routes>
        </AnimatePresence>
      </div>
    </CartProvider>
  );
};

export default App;
