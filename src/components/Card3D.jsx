import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';

const Card3D = ({ 
  children, 
  className = '', 
  intensity = 0.05, 
  scale = 1.01,
  glowEffect = false,
}) => {
  const ref = useRef(null);
  const [shouldAnimate, setShouldAnimate] = useState(true);
  
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  
  const mouseXSpring = useSpring(x, { stiffness: 150, damping: 20 });
  const mouseYSpring = useSpring(y, { stiffness: 150, damping: 20 });
  
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], [8 * intensity, -8 * intensity]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], [-8 * intensity, 8 * intensity]);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setShouldAnimate(!mediaQuery.matches);
    
    const handleChange = () => setShouldAnimate(!mediaQuery.matches);
    mediaQuery.addEventListener('change', handleChange);
    
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  const handleMouseMove = (e) => {
    if (!ref.current || !shouldAnimate) return;
    
    const rect = ref.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    if (!shouldAnimate) return;
    x.set(0);
    y.set(0);
  };

  if (!shouldAnimate) {
    return (
      <div ref={ref} className={className}>
        {children}
      </div>
    );
  }

  return (
    <motion.div
      ref={ref}
      className={`relative ${className}`}
      style={{
        rotateY: rotateY,
        rotateX: rotateX,
        willChange: 'transform',
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      whileHover={{ 
        scale: scale,
        transition: { duration: 0.2 }
      }}
      whileTap={{ scale: 0.98 }}
    >
      {/* Simplified glow effect */}
      {glowEffect && (
        <motion.div
          className="absolute inset-0 rounded-lg opacity-0 pointer-events-none"
          style={{
            background: 'linear-gradient(135deg, rgba(193, 196, 200, 0.05), rgba(123, 127, 133, 0.05))',
            filter: 'blur(10px)',
          }}
          whileHover={{ 
            opacity: 0.2,
            transition: { duration: 0.2 }
          }}
        />
      )}
      
      {children}
    </motion.div>
  );
};

export default Card3D;