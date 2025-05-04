import { useEffect, useState } from "react";

const CustomCursor = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [hidden, setHidden] = useState(true);
  const [clicked, setClicked] = useState(false);
  const [linkHovered, setLinkHovered] = useState(false);

  useEffect(() => {
    const updatePosition = (e) => {
      setPosition({ x: e.clientX, y: e.clientY });
      setHidden(false);
    };

    const handleMouseDown = () => setClicked(true);
    const handleMouseUp = () => setClicked(false);
    
    const handleLinkHoverIn = () => setLinkHovered(true);
    const handleLinkHoverOut = () => setLinkHovered(false);
    
    const handleMouseLeave = () => setHidden(true);
    const handleMouseEnter = () => setHidden(false);

    window.addEventListener("mousemove", updatePosition);
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);
    window.addEventListener("mouseleave", handleMouseLeave);
    window.addEventListener("mouseenter", handleMouseEnter);
    
    const linkElements = document.querySelectorAll("a, button, .cursor-pointer");
    linkElements.forEach((link) => {
      link.addEventListener("mouseenter", handleLinkHoverIn);
      link.addEventListener("mouseleave", handleLinkHoverOut);
    });

    return () => {
      window.removeEventListener("mousemove", updatePosition);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
      window.removeEventListener("mouseleave", handleMouseLeave);
      window.removeEventListener("mouseenter", handleMouseEnter);
      
      linkElements.forEach((link) => {
        link.removeEventListener("mouseenter", handleLinkHoverIn);
        link.removeEventListener("mouseleave", handleLinkHoverOut);
      });
    };
  }, []);

  return (
    <>
      <div 
        className={`cursor-dot fixed bg-white w-1 h-1 rounded-full pointer-events-none transition-opacity duration-300 ${hidden ? 'opacity-0' : 'opacity-100'}`} 
        style={{ 
          left: `${position.x}px`, 
          top: `${position.y}px`, 
          zIndex: 9999,
          transition: 'opacity 0.15s ease-in-out'
        }}
      />
      <div 
        className={`cursor-dot fixed rounded-full pointer-events-none ${clicked ? 'scale-75' : linkHovered ? 'scale-[2.5]' : 'scale-100'} ${hidden ? 'opacity-0' : 'opacity-100'}`} 
        style={{ 
          left: `${position.x}px`, 
          top: `${position.y}px`, 
          width: linkHovered ? '80px' : '30px', 
          height: linkHovered ? '80px' : '30px',
          marginLeft: linkHovered ? '-40px' : '-15px',
          marginTop: linkHovered ? '-40px' : '-15px',
          backgroundColor: 'rgba(255, 255, 255, 0.2)',
          border: '1px solid rgba(255, 255, 255, 0.4)',
          zIndex: 9998,
          transition: 'transform 0.2s ease-out, width 0.2s ease-out, height 0.2s ease-out, margin-left 0.2s ease-out, margin-top 0.2s ease-out, opacity 0.15s ease-in-out'
        }}
      />
    </>
  );
};

export default CustomCursor;