import { useEffect, useRef, useState } from "react";
import { ArrowDown } from "lucide-react";
import { useParallax } from "../Hooks/useParallax";
import { motion } from "framer-motion";
import { Link, useLocation } from "react-router-dom";
import { useCart } from "../CartContext/ContextHook";
import useSound from "use-sound";

const HeroSection = () => {
  const textRef = useRef(null);
  const overlayRef = useRef(null);
  const containerRef = useRef(null);
  const { calculateParallax } = useParallax();
  const [playclick] = useSound("./click8.mp4");
  const [isHovered, setIsHovered] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  
  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!textRef.current || !overlayRef.current || !containerRef.current) return;

      const { clientX, clientY } = e;
      const centerX = window.innerWidth / 2;
      const centerY = window.innerHeight / 2;

      const posX = (clientX - centerX) / centerX;
      const posY = (clientY - centerY) / centerY;

      // Smoother transform with easing
      textRef.current.style.transform = `
        translate3d(${posX * 15}px, ${posY * 15}px, 0)
        rotate3d(${posY * 0.8}, ${-posX * 0.8}, 0, 3deg)
      `;

      // More subtle, high-end gradient overlay
      overlayRef.current.style.background = `
        radial-gradient(
          1200px circle at ${clientX}px ${clientY}px,
          rgba(255,255,255,0.15) 0%,
          rgba(240,240,240,0.08) 40%,
          rgba(230,230,230,0.02) 80%,
          transparent 100%
        )
      `;

      // Update mouse position for custom cursor
      setMousePosition({ x: clientX, y: clientY });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const location = useLocation();
  const {
    isOpen,
    setIsOpen,
    audioplaying,
    Setaudioplaying,
    items: cartItems,
    updateQuantity,
    removeItem: removeFromCart,
    cartTotal,
  } = useCart();
   
  const handleclick = () => {
    // playclick();
    Setaudioplaying(true);
  };

  // Button animations
  const buttonVariants = {
    initial: { scale: 1 },
    hover: { scale: 1.03, transition: { duration: 0.3, ease: [0.23, 1, 0.32, 1] } },
    tap: { scale: 0.97, transition: { duration: 0.1 } }
  };

  return (
    <section
      ref={containerRef}
      className="min-h-screen flex flex-col relative overflow-hidden bg-gradient-to-b from-[#fafafa] to-[#f0f0f0]"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Metallic texture overlay */}
      <div className="absolute inset-0 bg-[url('https://assets.codepen.io/1468070/brushed-aluminum.png')] opacity-15 mix-blend-overlay" />

      {/* Dynamic gradient mesh */}
      

      


      <div className="container mx-auto px-6 flex flex-col justify-center items-center h-screen relative z-10">
        <div
          ref={textRef}
          className="text-center will-change-transform transition-transform duration-700 ease-out"
        >
          
          
          {/* Main headline */}
          <h1 className="text-7xl md:text-8xl lg:text-[9rem] font-medium mb-6 leading-[0.85] tracking-[-0.03em]">
            <motion.span
              initial={{ clipPath: 'inset(100% 0 0 0)' }}
              animate={{ clipPath: 'inset(0% 0 0% 0)' }}
              transition={{ duration: 1.5, ease: [0.83, 0, 0.17, 1] }}
              className="inline-block font-serif italic bg-gradient-to-b from-black/80 via-black/60 to-black/50 bg-clip-text text-transparent"
            >
              YE = FUTURE
            </motion.span>
          </h1>

          {/* Center media */}
          <div className="my-12 relative group  flex items-center justify-center">
            
            <div className="w-[400px] relative h-[400px] rounded-full bg-black/5 backdrop-blur-xl transform group-hover:scale-110 transition-transform duration-1000 ease-out" />
            <motion.img 
              className="h-80  absolute w-auto object-contain  z-10 hover:scale-[1.02] transition-transform duration-500 ease-out cursor-pointer"
              src="https://d2w9rnfcy7mm78.cloudfront.net/8391021/original_3cbb026dcfc58a085396384340a9a771.gif?1597923705"
              alt="Future Vision"
              // style={{
              //   filter: 'drop-shadow(0 45px 45px rgba(0,0,0,0.25))'
              // }}
            />
          </div>

          {/* CTA Button */}
          <motion.div 
            className="relative inline-block"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9 }}
          >
            <Link to="/products" onClick={handleclick}>
              <motion.button
                variants={buttonVariants}
                initial="initial"
                whileHover="hover"
                whileTap="tap"
                className="relative overflow-hidden bg-black text-white px-14 py-5 text-lg font-medium tracking-wider rounded-full border-2 border-black transition-all duration-300 hover:bg-white hover:text-black"
              >
                <span className="relative z-10">Explore Collection</span>
                <div className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-20">
                  <div className="absolute w-[200%] h-[200%] bg-[conic-gradient(white_0deg,transparent_180deg)] animate-spin-slow" />
                </div>
              </motion.button>
            </Link>
          </motion.div>

          {/* Scroll indicator */}
          <motion.div
            className="absolute bottom-24 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.6 }}
            transition={{ delay: 1 }}
          >
            <div className="w-px h-24 bg-gradient-to-b from-black/80 to-transparent" />
            <motion.div
              animate={{ y: [0, 15, 0] }}
              transition={{ duration: 2.5, repeat: Infinity }}
            >
              <ArrowDown className="w-6 h-6 text-black/80" />
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;