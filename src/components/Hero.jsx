import { motion } from 'framer-motion';
import { ArrowRight, Download } from 'lucide-react';
import ScrollAnimations from './ScrollAnimations';
import Card3D from './Card3D';

const Hero = () => {
  return (
    <section id="home" className="min-h-screen flex items-center pt-20 relative overflow-hidden">
      <div className="max-w-container mx-auto px-8 py-section w-full">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <ScrollAnimations animationType="fadeLeft">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-6"
            >
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="inline-block px-4 py-2 bg-lightAccent/30 rounded-full text-sm font-medium text-darkText"
              >
                MERN Developer • AI Builder
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="text-5xl md:text-7xl font-bold text-darkText leading-tight"
              >
                Roshan Kumar Singh
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="text-xl md:text-2xl text-darkText/80 leading-relaxed"
              >
                Building intelligent systems and modern web experiences.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="flex flex-wrap gap-4 pt-4"
              >
                <Card3D intensity={0.05} scale={1.03}>
                  <motion.a
                    href="#projects"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-8 py-4 gradient-primary text-darkText rounded-full font-semibold flex items-center gap-2 shadow-lg hover:shadow-xl transition-shadow"
                  >
                    View Projects
                    <ArrowRight size={20} />
                  </motion.a>
                </Card3D>

                <Card3D intensity={0.05} scale={1.03}>
                  <motion.a
                    href="/resume.pdf"
                    download="Roshan_Kumar_Singh_Resume.pdf"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-8 py-4 bg-transparent border-2 border-primaryAccent text-darkText rounded-full font-semibold flex items-center gap-2 hover:bg-primaryAccent/10 transition-colors"
                  >
                    <Download size={20} />
                    Download Resume
                  </motion.a>
                </Card3D>
              </motion.div>
            </motion.div>
          </ScrollAnimations>

          <ScrollAnimations animationType="parallax">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="relative flex items-center justify-center"
            >
              <Card3D intensity={0.15} scale={1.02} glowEffect={true}>
                <div className="relative w-full max-w-md mx-auto">
                  {/* Simplified floating background cards */}
                  <motion.div 
                    animate={{ 
                      rotate: [6, 8, 6],
                    }}
                    transition={{ 
                      duration: 8,
                      repeat: Infinity,
                      ease: "linear"
                    }}
                    className="absolute inset-0 gradient-primary rounded-3xl transform rotate-6 opacity-15 will-change-transform"
                  ></motion.div>
                  <motion.div 
                    animate={{ 
                      rotate: [-3, -5, -3],
                    }}
                    transition={{ 
                      duration: 10,
                      repeat: Infinity,
                      ease: "linear"
                    }}
                    className="absolute inset-0 gradient-primary rounded-3xl transform -rotate-3 opacity-20 will-change-transform"
                  ></motion.div>
                  
                  {/* Main image card */}
                  <motion.div
                    whileHover={{ 
                      scale: 1.03, 
                      rotate: 1,
                      y: -5
                    }}
                    transition={{ 
                      duration: 0.4,
                      ease: "easeOut"
                    }}
                    className="relative bg-white/20 backdrop-blur-md rounded-3xl p-1 shadow-2xl border border-white/30"
                  >
                    {/* Inner gradient border */}
                    <div className="gradient-primary rounded-[1.4rem] p-[2px]">
                      <div className="bg-white/90 backdrop-blur-sm rounded-[1.3rem] p-3">
                        <div className="relative overflow-hidden rounded-2xl">
                          <img
                            src="https://res.cloudinary.com/dptci2jft/image/upload/v1773487910/my-pic_xsuwym.jpg
                            "
                            alt="Roshan Kumar Singh"
                            className="w-full h-full object-cover object-center transition-transform duration-500 hover:scale-105"
                            style={{ 
                              aspectRatio: '4/5', 
                              height: '480px',
                              objectPosition: 'center top'
                            }}
                          />
                          {/* Subtle overlay gradient */}
                          <div className="absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-transparent"></div>
                        </div>
                      </div>
                    </div>
                  </motion.div>

                  {/* Simplified decorative elements */}
                  <motion.div
                    animate={{ 
                      y: [0, -10, 0],
                      opacity: [0.4, 0.6, 0.4]
                    }}
                    transition={{ 
                      duration: 6,
                      repeat: Infinity,
                      ease: "linear"
                    }}
                    className="absolute -top-6 -right-6 w-12 h-12 gradient-primary rounded-full opacity-40 blur-lg will-change-transform"
                  ></motion.div>
                  
                  <motion.div
                    animate={{ 
                      y: [0, 10, 0],
                      opacity: [0.3, 0.5, 0.3]
                    }}
                    transition={{ 
                      duration: 8,
                      repeat: Infinity,
                      ease: "linear",
                      delay: 1
                    }}
                    className="absolute -bottom-6 -left-6 w-16 h-16 gradient-primary rounded-full opacity-30 blur-xl will-change-transform"
                  ></motion.div>
                </div>
              </Card3D>
            </motion.div>
          </ScrollAnimations>
        </div>
      </div>
    </section>
  );
};

export default Hero;