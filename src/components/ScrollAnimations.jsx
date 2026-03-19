import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { useRef, useEffect, useState, useMemo } from 'react';

const ScrollAnimations = ({ children, className = '', animationType = 'fadeUp' }) => {
  const ref = useRef(null);
  const [isInView, setIsInView] = useState(false);
  const [shouldAnimate, setShouldAnimate] = useState(true);

  // Detect reduced motion preference
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setShouldAnimate(!mediaQuery.matches);
    
    const handleChange = () => setShouldAnimate(!mediaQuery.matches);
    mediaQuery.addEventListener('change', handleChange);
    
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  // Optimized spring config
  const springConfig = { stiffness: 60, damping: 20, restDelta: 0.01 };
  const y = useSpring(useTransform(scrollYProgress, [0, 1], [50, -50]), springConfig);
  const rotateX = useSpring(useTransform(scrollYProgress, [0, 1], [8, -8]), springConfig);
  const scale = useSpring(useTransform(scrollYProgress, [0, 0.5, 1], [0.95, 1, 0.95]), springConfig);
  const opacity = useSpring(useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]), springConfig);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting);
      },
      { threshold: 0.1, rootMargin: '50px' }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, []);

  const getAnimationVariants = useMemo(() => {
    if (!shouldAnimate) {
      return {
        hidden: { opacity: 1 },
        visible: { opacity: 1 }
      };
    }

    switch (animationType) {
      case 'fadeUp':
        return {
          hidden: { opacity: 0, y: 30 },
          visible: { 
            opacity: 1, 
            y: 0,
            transition: { duration: 0.6, ease: "easeOut" }
          }
        };
      case 'fadeLeft':
        return {
          hidden: { opacity: 0, x: -30 },
          visible: { 
            opacity: 1, 
            x: 0,
            transition: { duration: 0.6, ease: "easeOut" }
          }
        };
      case 'fadeRight':
        return {
          hidden: { opacity: 0, x: 30 },
          visible: { 
            opacity: 1, 
            x: 0,
            transition: { duration: 0.6, ease: "easeOut" }
          }
        };
      case 'scale':
        return {
          hidden: { opacity: 0, scale: 0.9 },
          visible: { 
            opacity: 1, 
            scale: 1,
            transition: { duration: 0.6, ease: "easeOut" }
          }
        };
      case 'parallax':
        return {
          hidden: { opacity: 0 },
          visible: { opacity: 1 }
        };
      default:
        return {
          hidden: { opacity: 0, y: 30 },
          visible: { 
            opacity: 1, 
            y: 0,
            transition: { duration: 0.6, ease: "easeOut" }
          }
        };
    }
  }, [animationType, shouldAnimate]);

  const variants = getAnimationVariants;

  if (animationType === 'parallax' && shouldAnimate) {
    return (
      <motion.div
        ref={ref}
        className={className}
        style={{
          y: y,
          rotateX: rotateX,
          scale: scale,
          opacity: opacity,
          willChange: 'transform',
        }}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        variants={variants}
      >
        {children}
      </motion.div>
    );
  }

  return (
    <motion.div
      ref={ref}
      className={className}
      style={{
        willChange: shouldAnimate ? 'transform' : 'auto',
      }}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={variants}
      whileHover={shouldAnimate ? {
        scale: 1.01,
        transition: { duration: 0.2 }
      } : {}}
    >
      {children}
    </motion.div>
  );
};

// Optimized stagger container
export const StaggerContainer = ({ children, className = '', staggerDelay = 0.08 }) => {
  const ref = useRef(null);
  const [isInView, setIsInView] = useState(false);
  const [shouldAnimate, setShouldAnimate] = useState(true);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setShouldAnimate(!mediaQuery.matches);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting);
      },
      { threshold: 0.1, rootMargin: '50px' }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, []);

  const containerVariants = useMemo(() => ({
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: shouldAnimate ? staggerDelay : 0,
        delayChildren: shouldAnimate ? 0.1 : 0,
      }
    }
  }), [staggerDelay, shouldAnimate]);

  const itemVariants = useMemo(() => ({
    hidden: { 
      opacity: 0, 
      y: shouldAnimate ? 20 : 0,
    },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: shouldAnimate ? 0.4 : 0, 
        ease: "easeOut" 
      }
    }
  }), [shouldAnimate]);

  return (
    <motion.div
      ref={ref}
      className={className}
      variants={containerVariants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      style={{
        willChange: shouldAnimate ? 'transform' : 'auto',
      }}
    >
      {Array.isArray(children) 
        ? children.map((child, index) => (
            <motion.div key={index} variants={itemVariants}>
              {child}
            </motion.div>
          ))
        : <motion.div variants={itemVariants}>{children}</motion.div>
      }
    </motion.div>
  );
};

export default ScrollAnimations;