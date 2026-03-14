import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';

const Skills = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const skillCategories = [
    {
      category: 'Frontend',
      skills: [
        { name: 'React', level: 90, icon: '⚛️' },
        { name: 'JavaScript', level: 85, icon: '🟨' },
        { name: 'HTML/CSS', level: 90, icon: '🎨' },
        { name: 'Tailwind', level: 85, icon: '💨' },
      ],
    },
    {
      category: 'Backend',
      skills: [
        { name: 'Node.js', level: 85, icon: '🟢' },
        { name: 'MongoDB', level: 80, icon: '🍃' },
        { name: 'Python', level: 75, icon: '🐍' },
        { name: 'MySQL', level: 80, icon: '🐬' },
      ],
    },
    {
      category: 'Tools & Cloud',
      skills: [
        { name: 'Git', level: 85, icon: '📦' },
        { name: 'AWS', level: 70, icon: '☁️' },
        { name: 'Docker', level: 75, icon: '🐳' },
        { name: 'VS Code', level: 90, icon: '💻' },
      ],
    },
  ];

  return (
    <section id="skills" ref={ref} className="py-section bg-background">
      <div className="max-w-container mx-auto px-8">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-darkText mb-4">Skills & Expertise</h2>
          <p className="text-xl text-darkText/70 max-w-2xl mx-auto">
            Technologies and tools I work with to bring ideas to life
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {skillCategories.map((category, categoryIndex) => (
            <motion.div
              key={category.category}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: categoryIndex * 0.2 }}
              className="space-y-6"
            >
              <h3 className="text-2xl font-bold text-darkText text-center mb-6">
                {category.category}
              </h3>

              {category.skills.map((skill, skillIndex) => (
                <motion.div
                  key={skill.name}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={isInView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ duration: 0.5, delay: categoryIndex * 0.2 + skillIndex * 0.1 }}
                  whileHover={{ scale: 1.05, translateY: -5 }}
                  className="bg-lightAccent rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all cursor-pointer"
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <span className="text-3xl">{skill.icon}</span>
                      <span className="text-lg font-semibold text-darkText">{skill.name}</span>
                    </div>
                    <span className="text-sm font-medium text-darkText/70">{skill.level}%</span>
                  </div>

                  <div className="w-full bg-background rounded-full h-2 overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={isInView ? { width: `${skill.level}%` } : {}}
                      transition={{ duration: 1, delay: categoryIndex * 0.2 + skillIndex * 0.1 + 0.3 }}
                      className="h-full gradient-primary rounded-full"
                    />
                  </div>
                </motion.div>
              ))}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
