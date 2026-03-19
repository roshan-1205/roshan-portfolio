import { motion } from 'framer-motion';
import { useEffect, useState, useMemo } from 'react';

const AnimatedBackground = () => {
  const [mousePosition, setMousePosition] = useState({ x: 50, y: 50 });
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    let ticking = false;
    
    const handleMouseMove = (e) => {
      if (!ticking) {
        requestAnimationFrame(() => {
          setMousePosition({
            x: (e.clientX / window.innerWidth) * 100,
            y: (e.clientY / window.innerHeight) * 100,
          });
          ticking = false;
        });
        ticking = true;
      }
    };

    // Reduce animations on low-end devices
    const handleVisibilityChange = () => {
      setIsVisible(!document.hidden);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    document.addEventListener('visibilitychange', handleVisibilityChange);
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, []);

  // Reduce particle count for better performance
  const particles = useMemo(() => 
    Array.from({ length: 8 }, (_, i) => ({
      id: i,
      size: Math.random() * 3 + 2,
      x: Math.random() * 100,
      y: Math.random() * 100,
      duration: Math.random() * 15 + 8,
      delay: Math.random() * 3,
    })), []
  );

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      {/* Simplified gradient mesh background */}
      <div className="absolute inset-0 opacity-20">
        <div
          className="absolute inset-0 transition-all duration-1000 ease-out"
          style={{
            background: `radial-gradient(circle at ${mousePosition.x}% ${mousePosition.y}%, 
              rgba(193, 196, 200, 0.08) 0%, 
              rgba(123, 127, 133, 0.04) 50%, 
              transparent 100%)`,
          }}
        />
      </div>

      {/* Reduced geometric shapes */}
      <motion.div
        className="absolute top-20 left-20 w-24 h-24 rounded-full opacity-8"
        style={{
          background: 'linear-gradient(135deg, #C1C4C8, #7B7F85)',
        }}
        animate={{
          x: [0, 60, 0],
          y: [0, -30, 0],
          rotate: [0, 180, 360],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "linear",
        }}
      />

      <motion.div
        className="absolute bottom-1/4 right-1/4 w-16 h-16 opacity-6"
        style={{
          background: 'linear-gradient(90deg, #C1C4C8, #7B7F85)',
          borderRadius: '30% 70% 70% 30% / 30% 30% 70% 70%',
        }}
        animate={{
          x: [0, 40, 0],
          y: [0, -40, 0],
          rotate: [0, 90, 180],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "linear",
        }}
      />

      {/* Reduced floating particles */}
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute rounded-full opacity-15 will-change-transform"
          style={{
            width: particle.size,
            height: particle.size,
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            background: 'linear-gradient(135deg, #C1C4C8, #7B7F85)',
          }}
          animate={{
            y: [0, -60, 0],
            opacity: [0.15, 0.3, 0.15],
          }}
          transition={{
            duration: particle.duration,
            repeat: Infinity,
            ease: "linear",
            delay: particle.delay,
          }}
        />
      ))}

      {/* Simplified grid pattern */}
      <div 
        className="absolute inset-0 opacity-3"
        style={{
          backgroundImage: `
            linear-gradient(rgba(123, 127, 133, 0.05) 1px, transparent 1px),
            linear-gradient(90deg, rgba(123, 127, 133, 0.05) 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px',
        }}
      />

      {/* Single animated gradient orb */}
      <motion.div
        className="absolute top-1/2 left-1/2 w-80 h-80 rounded-full opacity-4 blur-3xl will-change-transform"
        style={{
          background: 'radial-gradient(circle, #C1C4C8, #7B7F85, transparent)',
          transform: 'translate(-50%, -50%)',
        }}
        animate={{
          scale: [1, 1.2, 1],
          rotate: [0, 360],
        }}
        transition={{
          duration: 30,
          repeat: Infinity,
          ease: "linear",
        }}
      />
    </div>
  );
};

export default AnimatedBackground;