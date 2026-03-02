import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FiArrowRight, FiHeart, FiMessageCircle, FiShare2 } from 'react-icons/fi';
import { useEffect, useState } from 'react';
import { postAPI, analyticsAPI } from '../services/api';

const Home = () => {
  const [featuredPosts, setFeaturedPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    analyticsAPI.track().catch(console.error);
    
    postAPI.getAll({ limit: 6 })
      .then(res => {
        setFeaturedPosts(res.data.posts);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  const handleLike = async (postId) => {
    try {
      const res = await postAPI.like(postId);
      setFeaturedPosts(featuredPosts.map(p => 
        p._id === postId ? { ...p, likes: res.data.likes } : p
      ));
    } catch (err) {
      console.error(err);
    }
  };

  const handleShare = (postId) => {
    const url = `${window.location.origin}/feed/${postId}`;
    navigator.clipboard.writeText(url);
    alert('Link copied to clipboard!');
  };

  return (
    <div>
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 to-primary z-10" />
        <img
          src="https://images.unsplash.com/photo-1452587925148-ce544e77e70d?w=1920"
          alt="Hero"
          className="absolute inset-0 w-full h-full object-cover"
        />
        
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="relative z-20 text-center px-4"
        >
          <h1 className="text-5xl md:text-7xl font-bold mb-6">
            Capturing Life's
            <span className="text-accent"> Moments</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Professional photography that tells your story
          </p>
          <Link
            to="/gallery"
            className="inline-flex items-center space-x-2 bg-accent text-black px-8 py-3 rounded-full font-semibold hover:bg-accent/90 transition-colors"
          >
            <span>Explore Gallery</span>
            <FiArrowRight />
          </Link>
        </motion.div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl font-bold mb-12 text-center">Featured Work</h2>
          
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="aspect-square bg-secondary animate-pulse rounded-lg" />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredPosts.map((post, index) => (
                <motion.div
                  key={post._id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-secondary rounded-lg overflow-hidden"
                >
                  <Link to={`/feed/${post._id}`} className="block relative overflow-hidden aspect-square">
                    <img
                      src={post.mediaUrl}
                      alt={post.caption}
                      className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                    />
                  </Link>
                  
                  <div className="p-4">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center space-x-4">
                        <button
                          onClick={() => handleLike(post._id)}
                          className="flex items-center space-x-1 text-gray-400 hover:text-red-500 transition-colors"
                        >
                          <FiHeart className="text-xl" />
                          <span className="text-sm">{post.likes}</span>
                        </button>
                        <Link
                          to={`/feed/${post._id}`}
                          className="flex items-center space-x-1 text-gray-400 hover:text-accent transition-colors"
                        >
                          <FiMessageCircle className="text-xl" />
                        </Link>
                        <button
                          onClick={() => handleShare(post._id)}
                          className="text-gray-400 hover:text-accent transition-colors"
                        >
                          <FiShare2 className="text-xl" />
                        </button>
                      </div>
                    </div>
                    <Link to={`/feed/${post._id}`}>
                      <p className="text-white font-medium line-clamp-2 mb-1">{post.caption || 'Untitled'}</p>
                      <p className="text-gray-400 text-sm">{post.category}</p>
                    </Link>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </motion.div>
      </section>
    </div>
  );
};

export default Home;
