import { motion, useScroll } from 'framer-motion';

const ScrollProgress = () => {
  const { scrollYProgress } = useScroll();

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-1 bg-primaryAccent origin-left z-50"
      style={{ 
        scaleX: scrollYProgress,
        position: 'fixed',
        transformOrigin: 'left'
      }}
    />
  );
};

export default ScrollProgress;
