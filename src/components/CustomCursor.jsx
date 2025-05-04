import React, { useEffect, useRef, useState } from 'react';

const CustomCursor = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const cursorRef = useRef(null);

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);

    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useEffect(() => {
    const cursor = cursorRef.current;
    let currentX = 0;
    let currentY = 0;

    const animate = () => {
      // Smoothly move towards the mouse position
      currentX += (mousePosition.x - currentX) * 0.1;
      currentY += (mousePosition.y - currentY) * 0.1;

      cursor.style.transform = `translate3d(${currentX}px, ${currentY}px, 0)`;

      requestAnimationFrame(animate);
    };

    animate(); // Start animation loop
  }, [mousePosition]);

  return (
    <div
      ref={cursorRef}
      className="h-6 w-6 rounded-full bg-black fixed z-[9999] pointer-events-none"
    />
  );
};

export default CustomCursor;
