import { motion } from 'framer-motion';
import { FiCamera, FiAward, FiMapPin } from 'react-icons/fi';

const About = () => {
  const skills = ['Portrait Photography', 'Landscape', 'Wildlife', 'Street Photography', 'Event Coverage', 'Photo Editing'];
  const equipment = ['Canon EOS R5', 'Sony A7 IV', 'DJI Mavic 3', 'Various Lenses', 'Lighting Equipment'];

  return (
    <div className="min-h-screen py-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-5xl font-bold mb-4">About Me</h1>
          <p className="text-gray-400 text-lg">Professional Photographer & Visual Storyteller</p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <img
              src="https://images.unsplash.com/photo-1554048612-b6a482bc67e5?w=800"
              alt="Photographer"
              className="w-full rounded-lg shadow-2xl"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="flex flex-col justify-center"
          >
            <div className="flex items-center space-x-3 mb-6">
              <FiCamera className="text-accent text-3xl" />
              <h2 className="text-3xl font-bold">My Story</h2>
            </div>
            <p className="text-gray-300 mb-4 leading-relaxed">
              With over 10 years of experience in photography, I specialize in capturing authentic moments
              and creating visual stories that resonate. My passion for photography began as a hobby and
              evolved into a professional career.
            </p>
            <p className="text-gray-300 mb-4 leading-relaxed">
              I believe every photograph tells a story, and my goal is to capture those fleeting moments
              that become timeless memories. Whether it's the raw beauty of nature, the energy of street
              life, or intimate portraits, I strive to create images that evoke emotion.
            </p>
            <div className="flex items-center space-x-2 text-accent">
              <FiMapPin />
              <span>Based in New York, Available Worldwide</span>
            </div>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-secondary rounded-lg p-8"
          >
            <div className="flex items-center space-x-3 mb-6">
              <FiAward className="text-accent text-2xl" />
              <h3 className="text-2xl font-bold">Skills</h3>
            </div>
            <div className="flex flex-wrap gap-3">
              {skills.map(skill => (
                <span
                  key={skill}
                  className="bg-primary px-4 py-2 rounded-full text-sm text-gray-300"
                >
                  {skill}
                </span>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="bg-secondary rounded-lg p-8"
          >
            <div className="flex items-center space-x-3 mb-6">
              <FiCamera className="text-accent text-2xl" />
              <h3 className="text-2xl font-bold">Equipment</h3>
            </div>
            <ul className="space-y-3">
              {equipment.map(item => (
                <li key={item} className="flex items-center space-x-2 text-gray-300">
                  <span className="w-2 h-2 bg-accent rounded-full" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default About;
