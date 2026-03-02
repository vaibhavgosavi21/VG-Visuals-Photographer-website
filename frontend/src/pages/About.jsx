import { motion } from 'framer-motion';
import { FiCamera, FiAward, FiMapPin } from 'react-icons/fi';
import profilePhoto from '../assets/profilephoto.jpeg';

const About = () => {
  const skills = [
    'Portrait Photography',
    'Landscape Photography', 
    'Wildlife Photography',
    'Street Photography',
    'Event Photography',
    'Photo Editing & Retouching',
    'Drone Photography',
    'Night Photography'
  ];
  
  const equipment = [
    'Canon EOS R5',
    'Sony A7 IV', 
    'Canon EF 24-70mm f/2.8L',
    'Canon EF 70-200mm f/2.8L',
    'DJI Mavic 3 Pro',
    'Godox AD200 Pro',
    'Adobe Lightroom & Photoshop'
  ];

  return (
    <div className="min-h-screen py-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-5xl font-bold mb-4">About Me</h1>
          <p className="text-gray-400 text-lg">Professional Photographer & Visual Artist</p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <img
              src={profilePhoto}
              alt="Mr. Vaibhav Gosavi"
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
              <h2 className="text-3xl font-bold">Mr. Vaibhav Gosavi</h2>
            </div>
            <p className="text-gray-300 mb-4 leading-relaxed">
              Hello! I'm Vaibhav Gosavi, a passionate photographer dedicated to capturing life's most 
              beautiful moments through my lens. With years of experience in various photography styles, 
              I specialize in creating stunning visual stories that resonate with emotion and authenticity.
            </p>
            <p className="text-gray-300 mb-4 leading-relaxed">
              My journey in photography began with a simple fascination for light and composition, which 
              has evolved into a professional career. I believe that every photograph tells a unique story, 
              and my mission is to freeze those fleeting moments into timeless memories that you can cherish forever.
            </p>
            <p className="text-gray-300 mb-4 leading-relaxed">
              From breathtaking landscapes to intimate portraits, from vibrant street scenes to majestic wildlife, 
              I approach each project with creativity, technical expertise, and a deep understanding of visual storytelling. 
              My work has been featured in various exhibitions and publications, and I continue to push the boundaries 
              of photographic art.
            </p>
            <div className="flex items-center space-x-2 text-accent">
              <FiMapPin />
              <span>Based in India, Available Worldwide</span>
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
