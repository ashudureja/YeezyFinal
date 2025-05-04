import React, { useState } from "react";
import { FaPlus } from "react-icons/fa6";
import { IoIosArrowForward, IoIosArrowBack } from "react-icons/io";
import { RxCross1 } from "react-icons/rx";
import { useCart } from "../CartContext/ContextHook";
import useSound from "use-sound";


import { IoMdClose } from "react-icons/io";

const Productadd = () => {
  const [currentStep, setCurrentStep] = useState(null);
  const [selectedQuantity, setSelectedQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState(5);
  const quantities = Array.from({ length: 10 }, (_, i) => i + 1);
  const sizes = Array.from({ length: 10 }, (_, i) => i + 1);
  const {
    items: cartItems,
    addItem: addToCart,
    removeItem: removeFromCart,
    updateQuantity,
    cartTotal,
    isOpen,
    setIsOpen,
    product,
  } = useCart()
  // const [playclick1] = useSound("./click4.mp4");
const [playclick] = useSound("./click8.mp4");
const [playclick1] = useSound("./click5.mp4");

const [playclick2] = useSound("./click6.mp4");
// const [playclick2] = useSound("./click6.mp4");
// const [playclick3] = useSound("./click9.mp4");
const [playhover] = useSound("./hoversound.mp4");

  const handlePrev = () => currentStep === "size" && setCurrentStep("quantity");
  const handleNext = () => currentStep === "quantity" && setCurrentStep("size");

  const getVisibleNumbers = (current, max) => {
    if (current === 1) return [1, 2, 3];
    if (current === max) return [max - 2, max - 1, max];
    return [current - 1, current, current + 1];
  };

  const handleNumberChange = (increment) => {
    const currentArray = currentStep === "quantity" ? quantities : sizes;
    const currentValue =
      currentStep === "quantity" ? selectedQuantity : selectedSize;
    const newValue = Math.min(Math.max(currentValue + increment, 1), 10);

    currentStep === "quantity"
      ? setSelectedQuantity(newValue)
      : setSelectedSize(newValue);
  };

  const handleclick=()=>{
    playclick1();
    addToCart(product);
    updateQuantity(product.id,selectedQuantity);
   

  }
  const handleclick1=()=>{
    playclick();
    handleNumberChange(1);
  }
  const handleclick2=()=>{
    playclick();
    handleNumberChange(-1);
  }
  

  return (
    <div className="flex  items-center justify-center gap-3">
      <div className="w-full flex items-center justify-center p-2 bg-white rounded-xl shadow-lg max-w-xs border border-gray-100 transition-all duration-300 hover:shadow-xl hover:-translate-y-0.5">
        {!currentStep ? (
          <button
            aria-label="Add product"
            className="text-black hover:text-gray-600 transition-all duration-200 group relative"
            onClick={() => {playclick1();setCurrentStep("quantity");}}
          >
            <div className="absolute inset-0 rounded-full bg-gray-100 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
            <FaPlus className="w-10 h-10 p-2 transform group-hover:rotate-90 transition-[transform] duration-300 ease-[cubic-bezier(0.68,-0.55,0.27,1.55)]" />
          </button>
        ) : (
          <div className="flex flex-col items-center gap-4 w-full relative">
            <div className="flex justify-between items-center w-full px-3">
              {/* Left controls */}
              <button
                aria-label={currentStep === "quantity" ? "Close" : "Previous step"}
                className="p-1.5 rounded-full hover:bg-gray-100 transition-all duration-200 active:scale-95"
                onClick={() => {
                  playhover();
                  if (currentStep === "quantity") {
                    setCurrentStep(null);
                  } else {
                    handlePrev();
                  }
                }}
              >
                {currentStep === "quantity" ? (
                  <RxCross1 className="w-4 h-4 text-gray-600 transition-transform hover:rotate-90" />
                ) : (
                  <IoIosArrowBack className="w-5 h-5 text-gray-600 hover:-translate-x-0.5 transition-transform" />
                )}
              </button>

              {/* Animated title */}
              <h2 className="text-lg font-semibold text-gray-800 uppercase tracking-wide transition-all duration-300">
                {currentStep}
              </h2>

              {/* Right controls */}
              <button
                aria-label={currentStep === "quantity" ? "Next step" : "Close"}
                className="p-1.5 rounded-full hover:bg-gray-100 transition-all duration-200 active:scale-95"
                onClick={() => {
                  playhover();
                  currentStep === "quantity" ? handleNext() : setCurrentStep(null);
                }}
                
              >
                {currentStep === "quantity" ? (
                  <IoIosArrowForward className="w-5 h-5 text-gray-600 hover:translate-x-0.5 transition-transform" />
                ) : (
                  <IoMdClose className="w-5 h-5 text-gray-600 transition-transform hover:rotate-90" />
                )}
              </button>
            </div>

            <div className="w-full relative overflow-hidden">
              <div className="flex items-center justify-between px-2">
                <button
                  className="text-gray-400 hover:text-gray-600 p-1 rounded-full hover:bg-gray-100 transition-all duration-200 active:scale-95"
                  onClick={handleclick2}
                >
                  <IoIosArrowBack className="w-5 h-5 hover:-translate-x-0.5 transition-transform" />
                </button>

                <div className="flex justify-center gap-3 mx-2">
                  {getVisibleNumbers(
                    currentStep === "quantity" ? selectedQuantity : selectedSize,
                    10
                  ).map((num) => (
                    <button
                      key={num}
                      className={`relative transition-all duration-300 ease-out ${
                        num === (currentStep === "quantity" ? selectedQuantity : selectedSize)
                          ? "text-3xl font-bold scale-125 text-gray-800"
                          : "text-xl scale-100 text-gray-300"
                      }`}
                      onClick={() => {
                        currentStep === "quantity" ? setSelectedQuantity(num) : setSelectedSize(num);
                      }}
                    >
                      {num}
                      {num === (currentStep === "quantity" ? selectedQuantity : selectedSize) && (
                        <span className="absolute inset-0 -z-10 w-full h-full bg-gray-100 rounded-full scale-75 animate-pulse-slow" />
                      )}
                    </button>
                  ))}
                </div>

                <button
                  className="text-gray-400 hover:text-gray-600 p-1 rounded-full hover:bg-gray-100 transition-all duration-200 active:scale-95"
                  onClick={handleclick1}
                >
                  <IoIosArrowForward className="w-5 h-5 hover:translate-x-0.5 transition-transform" />
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      <button onClick={handleclick} className="w-full flex items-center justify-center p-5 bg-black text-white rounded-xl shadow-lg max-w-xs transition-all duration-300 hover:shadow-xl hover:-translate-y-0.5 active:scale-95 cursor-pointer group">
        <span className="text-sm font-semibold uppercase tracking-wide transition-transform duration-200 group-hover:scale-100">
          Add to cart
        </span>
      </button>
    </div>
  );
};

export default Productadd;