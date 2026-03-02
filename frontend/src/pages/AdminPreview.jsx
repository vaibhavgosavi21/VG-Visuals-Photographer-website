import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FiHeart, FiMessageCircle, FiShare2 } from 'react-icons/fi';
import { postAPI } from '../services/api';
import { Link } from 'react-router-dom';

const AdminPreview = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    postAPI.getAll({ limit: 6 })
      .then(res => {
        setPosts(res.data.posts);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  return (
    <div className="min-h-screen py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold mb-2">Visitor Preview</h1>
              <p className="text-gray-400">See how visitors view your portfolio</p>
            </div>
            <Link
              to="/"
              target="_blank"
              className="bg-accent text-black px-6 py-2 rounded-lg font-semibold hover:bg-accent/90 transition-colors"
            >
              Open Full Site
            </Link>
          </div>
        </motion.div>

        {/* Hero Preview */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mb-12"
        >
          <div className="bg-secondary rounded-lg p-6 border-2 border-accent/30">
            <h2 className="text-2xl font-bold mb-4 text-accent">Home Page Preview</h2>
            <div className="relative h-64 rounded-lg overflow-hidden mb-4">
              <img
                src="https://images.unsplash.com/photo-1452587925148-ce544e77e70d?w=1920"
                alt="Hero"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-black/50 to-primary flex items-center justify-center">
                <div className="text-center">
                  <h1 className="text-4xl font-bold mb-2">
                    Capturing Life's <span className="text-accent">Moments</span>
                  </h1>
                  <p className="text-lg text-gray-300">Professional photography that tells your story</p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Recent Posts Preview */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <h2 className="text-2xl font-bold mb-6">Recent Posts (Visitor View)</h2>
          
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="bg-secondary rounded-lg overflow-hidden animate-pulse">
                  <div className="aspect-square bg-gray-800" />
                  <div className="p-4 space-y-3">
                    <div className="h-4 bg-gray-800 rounded" />
                    <div className="h-4 bg-gray-800 rounded w-2/3" />
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {posts.map((post) => (
                <div
                  key={post._id}
                  className="bg-secondary rounded-lg overflow-hidden"
                >
                  <div className="relative aspect-square overflow-hidden">
                    <img
                      src={post.mediaUrl}
                      alt={post.caption}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  
                  <div className="p-4">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center space-x-4">
                        <div className="flex items-center space-x-1 text-gray-400">
                          <FiHeart className="text-xl" />
                          <span className="text-sm">{post.likes}</span>
                        </div>
                        <div className="text-gray-400">
                          <FiMessageCircle className="text-xl" />
                        </div>
                        <div className="text-gray-400">
                          <FiShare2 className="text-xl" />
                        </div>
                      </div>
                    </div>
                    <p className="text-white font-medium line-clamp-2 mb-1">{post.caption || 'Untitled'}</p>
                    <p className="text-gray-400 text-sm">{post.category}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </motion.div>

        {/* Quick Stats */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="mt-12 bg-secondary rounded-lg p-6"
        >
          <h2 className="text-2xl font-bold mb-4">Visitor Experience</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-primary rounded-lg p-4">
              <p className="text-gray-400 text-sm mb-1">Total Posts Visible</p>
              <p className="text-3xl font-bold text-accent">{posts.length}</p>
            </div>
            <div className="bg-primary rounded-lg p-4">
              <p className="text-gray-400 text-sm mb-1">Total Likes</p>
              <p className="text-3xl font-bold text-accent">
                {posts.reduce((sum, p) => sum + p.likes, 0)}
              </p>
            </div>
            <div className="bg-primary rounded-lg p-4">
              <p className="text-gray-400 text-sm mb-1">Total Views</p>
              <p className="text-3xl font-bold text-accent">
                {posts.reduce((sum, p) => sum + p.views, 0)}
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default AdminPreview;
