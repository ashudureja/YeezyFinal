import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { products } from "../Constants/Products";
import useSound from "use-sound";
import { MdOutlineArrowBackIosNew } from "react-icons/md";
import ProductAction from "./ProductAction";
import Productadd from "./Productadd";
import { useCart } from "../CartContext/ContextHook";

const ProductPage = () => {
  const { id } = useParams();
  const { product, currentProduct } = useCart();
  const [playclick] = useSound("./click5.mp4");
  const navigate = useNavigate();

  // ✅ set currentProduct safely here
  useEffect(() => {
    const productFromList = products.find((val) => val.id === Number(id));
    if (productFromList) {
      currentProduct(productFromList);
    }
  }, [id, currentProduct]);

  const handleclick = () => {
    playclick();
    navigate(-1);
  };

  if (!product) {
    return <div className="text-center py-10">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="container mx-auto px-4 py-6">
        <div className="absolute top-8 left-8">
          <button
            onClick={handleclick}
            className="text-gray-500 cursor-pointer hover:text-black transition-colors duration-300 flex items-center gap-2 group"
          >
            <MdOutlineArrowBackIosNew className="text-xl group-hover:-translate-x-1 transition-transform" />
            <span className="text-sm font-medium">Back</span>
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-15">
          <div className="lg:col-span-2 flex flex-col gap-6">
            {product.images?.[0]?.src && (
              <div className="aspect-auto rounded-lg overflow-hidden flex items-center justify-center h-[80vh]">
                <img
                  src={product.images[0].src}
                  alt={product.images[0].alt || "Product Image"}
                  className="max-w-full max-h-full object-contain"
                />
              </div>
            )}

            <div className="flex flex-col gap-10">
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                <h1 className="text-2xl font-bold">{product.name}</h1>
                <div className="text-2xl font-bold">${product.price}</div>
              </div>
              <Productadd />
              <div className="text-gray-700">{product.description}</div>
            </div>
          </div>

          <div className="lg:col-span-1">
            <ProductAction />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
