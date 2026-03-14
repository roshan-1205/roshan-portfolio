import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { Award, Code, GraduationCap, Trophy } from 'lucide-react';

const Timeline = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const achievements = [
    {
      year: '2025',
      title: 'VAANI - AI Civic Platform',
      description: 'Developed voice-first multilingual civic engagement platform',
      icon: <Code size={24} />,
    },
    {
      year: '2024',
      title: 'HamariBeti Launch',
      description: 'Women safety platform with Aadhaar verification',
      icon: <Trophy size={24} />,
    },
    {
      year: '2024',
      title: 'Web Development Certification',
      description: 'Completed advanced MERN stack development course',
      icon: <Award size={24} />,
    },
    {
      year: '2023',
      title: 'Started Development Journey',
      description: 'Began learning full-stack web development',
      icon: <GraduationCap size={24} />,
    },
  ];

  return (
    <section ref={ref} className="py-section bg-background">
      <div className="max-w-container mx-auto px-8">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-darkText mb-4">Journey & Achievements</h2>
          <p className="text-xl text-darkText/70 max-w-2xl mx-auto">
            Milestones in my development career
          </p>
        </motion.div>

        <div className="relative">
          {/* Timeline line - left side for mobile, center for desktop */}
          <div className="absolute left-4 md:left-1/2 md:transform md:-translate-x-1/2 top-0 bottom-0 w-0.5 md:w-1 bg-primaryAccent" />

          <div className="space-y-8 md:space-y-12">
            {achievements.map((achievement, index) => (
              <motion.div
                key={achievement.title}
                initial={{ opacity: 0, x: -50 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className={`flex items-start gap-6 md:gap-8 ${
                  index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                }`}
              >
                {/* Mobile & Tablet Layout */}
                <div className="md:hidden flex-shrink-0 relative">
                  <div className="w-8 h-8 bg-primaryAccent rounded-full border-4 border-background shadow-lg flex items-center justify-center z-10">
                    <div className="text-background text-xs">{achievement.icon}</div>
                  </div>
                </div>

                {/* Desktop Layout - Left/Right Content */}
                <div className={`flex-1 ${index % 2 === 0 ? 'md:text-right' : 'md:text-left'}`}>
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    className="bg-lightAccent/30 rounded-2xl p-5 md:p-6 shadow-lg w-full md:inline-block md:w-auto"
                  >
                    {/* Year Badge */}
                    <div className={`flex items-center gap-3 mb-3 ${index % 2 === 0 ? 'md:justify-end' : 'md:justify-start'}`}>
                      <div className="hidden md:block text-primaryAccent">{achievement.icon}</div>
                      <span className="text-xl md:text-2xl font-bold text-primaryAccent bg-background px-4 py-1 rounded-full">
                        {achievement.year}
                      </span>
                    </div>

                    {/* Title */}
                    <h3 className="text-lg md:text-xl font-bold text-darkText mb-2">
                      {achievement.title}
                    </h3>

                    {/* Description */}
                    <p className="text-sm md:text-base text-darkText/70 leading-relaxed">
                      {achievement.description}
                    </p>
                  </motion.div>
                </div>

                {/* Desktop Center Dot */}
                <div className="hidden md:block w-4 h-4 bg-primaryAccent rounded-full border-4 border-background shadow-lg z-10 flex-shrink-0" />

                {/* Desktop Spacer */}
                <div className="hidden md:block flex-1" />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Timeline;
