
import { useEffect, useState } from 'react';

export function useParallax() {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    // Passive true improves scroll performance
    window.addEventListener('scroll', handleScroll, { passive: true });
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const calculateParallax = (speed = 0.2) => {
    return {
      transform: `translateY(${scrollY * speed}px)`,
    };
  };

  return { scrollY, calculateParallax };
}
