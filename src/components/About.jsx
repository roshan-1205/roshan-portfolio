import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { Code2, Lightbulb, Rocket } from 'lucide-react';

const About = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const features = [
    {
      icon: <Lightbulb size={32} />,
      title: 'Problem Solver',
      description: 'Analytical approach to complex challenges',
    },
    {
      icon: <Code2 size={32} />,
      title: 'Full Stack Developer',
      description: 'End-to-end web application development',
    },
    {
      icon: <Rocket size={32} />,
      title: 'AI Enthusiast',
      description: 'Building intelligent, scalable systems',
    },
  ];

  return (
    <section id="about" ref={ref} className="py-section bg-lightAccent/20">
      <div className="max-w-container mx-auto px-8">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-darkText mb-4">About Me</h2>
          <p className="text-xl text-darkText/70 max-w-2xl mx-auto">
            Passionate developer focused on creating impactful digital solutions
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative flex items-center justify-center"
          >
            <div className="relative w-full max-w-md mx-auto">
              {/* Gradient background layers */}
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
                    src="https://res.cloudinary.com/dptci2jft/image/upload/v1773487313/mypic_ypvi31.jpg"
                    alt="Roshan Kumar Singh"
                    className="w-full h-auto rounded-[2rem] object-cover shadow-xl"
                    style={{ aspectRatio: '3/4', maxHeight: '500px' }}
                  />
                </div>
              </motion.div>

              {/* Decorative floating elements */}
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

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="space-y-6"
          >
            <p className="text-lg text-darkText/80 leading-relaxed">
              I'm a MERN stack developer with a passion for building intelligent systems that solve real-world problems. 
              My journey in tech has been driven by curiosity and a desire to create meaningful impact through code.
            </p>

            <p className="text-lg text-darkText/80 leading-relaxed">
              From developing women safety platforms to creating voice-first AI civic assistants, 
              I focus on projects that combine technical excellence with social responsibility.
            </p>

            <div className="grid gap-4 pt-4">
              {features.map((feature, index) => (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
                  whileHover={{ scale: 1.02, translateX: 10 }}
                  className="bg-background rounded-2xl p-6 shadow-lg flex items-start gap-4 cursor-pointer"
                >
                  <div className="text-primaryAccent">{feature.icon}</div>
                  <div>
                    <h3 className="text-xl font-semibold text-darkText mb-1">{feature.title}</h3>
                    <p className="text-darkText/70">{feature.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;
