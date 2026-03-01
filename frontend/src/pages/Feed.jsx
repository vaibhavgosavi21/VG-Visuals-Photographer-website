import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FiHeart, FiMessageCircle, FiShare2, FiEye } from 'react-icons/fi';
import { postAPI } from '../services/api';
import { Link } from 'react-router-dom';

const Feed = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    postAPI.getAll()
      .then(res => {
        setPosts(res.data.posts);
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
      setPosts(posts.map(p => p._id === postId ? { ...p, likes: res.data.likes } : p));
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
    <div className="min-h-screen py-20">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-5xl font-bold mb-4">Feed</h1>
          <p className="text-gray-400 text-lg">Latest photography posts</p>
        </motion.div>

        {loading ? (
          <div className="space-y-8">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="bg-secondary rounded-lg overflow-hidden">
                <div className="aspect-square bg-gray-800 animate-pulse" />
                <div className="p-6 space-y-3">
                  <div className="h-4 bg-gray-800 rounded animate-pulse w-3/4" />
                  <div className="h-4 bg-gray-800 rounded animate-pulse w-1/2" />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="space-y-8">
            {posts.map((post, index) => (
              <motion.div
                key={post._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-secondary rounded-lg overflow-hidden"
              >
                <Link to={`/feed/${post._id}`}>
                  {post.mediaType === 'image' ? (
                    <img
                      src={post.mediaUrl}
                      alt={post.caption}
                      className="w-full aspect-square object-cover"
                    />
                  ) : (
                    <video
                      src={post.mediaUrl}
                      controls
                      className="w-full aspect-square object-cover"
                    />
                  )}
                </Link>

                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-6">
                      <button
                        onClick={() => handleLike(post._id)}
                        className="flex items-center space-x-2 text-gray-400 hover:text-red-500 transition-colors"
                      >
                        <FiHeart className="text-xl" />
                        <span>{post.likes}</span>
                      </button>
                      <Link
                        to={`/feed/${post._id}`}
                        className="flex items-center space-x-2 text-gray-400 hover:text-accent transition-colors"
                      >
                        <FiMessageCircle className="text-xl" />
                      </Link>
                      <button
                        onClick={() => handleShare(post._id)}
                        className="flex items-center space-x-2 text-gray-400 hover:text-accent transition-colors"
                      >
                        <FiShare2 className="text-xl" />
                      </button>
                    </div>
                    <div className="flex items-center space-x-2 text-gray-400">
                      <FiEye />
                      <span>{post.views}</span>
                    </div>
                  </div>

                  <p className="text-white mb-2">{post.caption}</p>
                  <div className="flex flex-wrap gap-2 mb-2">
                    {post.tags?.map(tag => (
                      <span key={tag} className="text-accent text-sm">#{tag}</span>
                    ))}
                  </div>
                  <p className="text-gray-500 text-sm">
                    {new Date(post.createdAt).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Feed;
