import { motion } from 'framer-motion';
import { ArrowRight, Download } from 'lucide-react';

const Hero = () => {
  return (
    <section id="home" className="min-h-screen flex items-center bg-background pt-20">
      <div className="max-w-container mx-auto px-8 py-section w-full">
        <div className="grid md:grid-cols-2 gap-16 items-center">
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
              <motion.a
                href="#projects"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 gradient-primary text-darkText rounded-full font-semibold flex items-center gap-2 shadow-lg hover:shadow-xl transition-shadow"
              >
                View Projects
                <ArrowRight size={20} />
              </motion.a>

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
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="relative flex items-center justify-center"
          >
            <div className="relative w-full max-w-md mx-auto">
              {/* Gradient background card */}
              <div className="absolute inset-0 gradient-primary rounded-[3rem] transform rotate-6 opacity-20"></div>
              <div className="absolute inset-0 gradient-primary rounded-[3rem] transform -rotate-3 opacity-30"></div>
              
              {/* Main image container */}
              <motion.div
                whileHover={{ scale: 1.05, rotate: 2 }}
                transition={{ duration: 0.3 }}
                className="relative gradient-primary rounded-[3rem] p-2 shadow-2xl"
              >
                <div className="bg-background rounded-[2.5rem] p-3">
                  <img
                    src="/src/assets/mypic.jpeg"
                    alt="Roshan Kumar Singh"
                    className="w-full h-auto rounded-[2rem] object-cover shadow-xl"
                    style={{ aspectRatio: '3/4', maxHeight: '500px' }}
                  />
                </div>
              </motion.div>

              {/* Decorative elements */}
              <motion.div
                animate={{ 
                  y: [0, -20, 0],
                  rotate: [0, 5, 0]
                }}
                transition={{ 
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                className="absolute -top-4 -right-4 w-20 h-20 gradient-primary rounded-full opacity-40 blur-xl"
              ></motion.div>
              
              <motion.div
                animate={{ 
                  y: [0, 20, 0],
                  rotate: [0, -5, 0]
                }}
                transition={{ 
                  duration: 5,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                className="absolute -bottom-4 -left-4 w-32 h-32 gradient-primary rounded-full opacity-30 blur-2xl"
              ></motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
