import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { postAPI } from '../services/api';
import { FiX } from 'react-icons/fi';

const Gallery = () => {
  const [posts, setPosts] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedPost, setSelectedPost] = useState(null);
  const [loading, setLoading] = useState(true);

  const categories = ['All', 'Nature', 'Street', 'Portrait', 'Wildlife', 'Travel', 'Architecture', 'Events', 'Other'];

  useEffect(() => {
    postAPI.getAll()
      .then(res => {
        const imagePosts = res.data.posts.filter(p => p.mediaType === 'image');
        setPosts(imagePosts);
        setFilteredPosts(imagePosts);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    if (selectedCategory === 'All') {
      setFilteredPosts(posts);
    } else {
      setFilteredPosts(posts.filter(p => p.category === selectedCategory));
    }
  }, [selectedCategory, posts]);

  return (
    <div className="min-h-screen py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-5xl font-bold mb-4">Gallery</h1>
          <p className="text-gray-400 text-lg">Explore my photography collection</p>
        </motion.div>

        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map(category => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-6 py-2 rounded-full text-sm font-medium transition-colors ${
                selectedCategory === category
                  ? 'bg-accent text-black'
                  : 'bg-secondary text-gray-300 hover:bg-gray-800'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {loading ? (
          <div className="columns-1 md:columns-2 lg:columns-3 gap-4">
            {[...Array(9)].map((_, i) => (
              <div key={i} className="mb-4 break-inside-avoid">
                <div className="bg-secondary animate-pulse rounded-lg" style={{ height: `${200 + Math.random() * 200}px` }} />
              </div>
            ))}
          </div>
        ) : (
          <div className="columns-1 md:columns-2 lg:columns-3 gap-4">
            {filteredPosts.map((post, index) => (
              <motion.div
                key={post._id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: index * 0.05 }}
                className="mb-4 break-inside-avoid cursor-pointer group"
                onClick={() => setSelectedPost(post)}
              >
                <div className="relative overflow-hidden rounded-lg">
                  <img
                    src={post.mediaUrl}
                    alt={post.caption}
                    className="w-full transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <p className="text-white font-semibold px-4 text-center">{post.caption}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {selectedPost && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4"
            onClick={() => setSelectedPost(null)}
          >
            <button
              className="absolute top-4 right-4 text-white text-3xl hover:text-accent"
              onClick={() => setSelectedPost(null)}
            >
              <FiX />
            </button>
            <img
              src={selectedPost.mediaUrl}
              alt={selectedPost.caption}
              className="max-w-full max-h-full object-contain"
              onClick={(e) => e.stopPropagation()}
            />
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Gallery;
