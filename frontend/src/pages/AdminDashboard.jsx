import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FiImage, FiVideo, FiHeart, FiEye, FiUsers } from 'react-icons/fi';
import { analyticsAPI } from '../services/api';
import { Link } from 'react-router-dom';

const AdminDashboard = () => {
  const [analytics, setAnalytics] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    analyticsAPI.get()
      .then(res => {
        setAnalytics(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  const stats = [
    { label: 'Total Photos', value: analytics?.totalPhotos || 0, icon: FiImage, color: 'text-blue-500' },
    { label: 'Total Videos', value: analytics?.totalVideos || 0, icon: FiVideo, color: 'text-purple-500' },
    { label: 'Total Likes', value: analytics?.totalLikes || 0, icon: FiHeart, color: 'text-red-500' },
    { label: 'Total Views', value: analytics?.totalViews || 0, icon: FiEye, color: 'text-green-500' },
    { label: 'Total Visitors', value: analytics?.totalVisitors || 0, icon: FiUsers, color: 'text-yellow-500' },
  ];

  return (
    <div className="min-h-screen py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-4xl font-bold mb-2">Dashboard</h1>
          <p className="text-gray-400">Welcome back! Here's your portfolio overview.</p>
        </motion.div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 mb-12">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="bg-secondary rounded-lg p-6 animate-pulse">
                <div className="h-12 bg-gray-800 rounded mb-4" />
                <div className="h-8 bg-gray-800 rounded" />
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 mb-12">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-secondary rounded-lg p-6"
              >
                <div className="flex items-center justify-between mb-4">
                  <stat.icon className={`text-3xl ${stat.color}`} />
                </div>
                <p className="text-3xl font-bold mb-1">{stat.value}</p>
                <p className="text-gray-400 text-sm">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-secondary rounded-lg p-6"
          >
            <h2 className="text-2xl font-bold mb-6">Quick Actions</h2>
            <div className="space-y-3">
              <Link
                to="/admin/upload"
                className="block bg-accent text-black px-6 py-3 rounded-lg font-semibold text-center hover:bg-accent/90 transition-colors"
              >
                Upload New Post
              </Link>
              <Link
                to="/admin/manage"
                className="block bg-primary border border-gray-700 px-6 py-3 rounded-lg font-semibold text-center hover:border-accent transition-colors"
              >
                Manage Posts
              </Link>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-secondary rounded-lg p-6"
          >
            <h2 className="text-2xl font-bold mb-6">Recent Posts</h2>
            <div className="space-y-4">
              {analytics?.recentPosts?.slice(0, 5).map(post => (
                <div key={post._id} className="flex items-center space-x-4">
                  <img
                    src={post.mediaUrl}
                    alt={post.caption}
                    className="w-16 h-16 object-cover rounded"
                  />
                  <div className="flex-1">
                    <p className="font-semibold truncate">{post.caption || 'Untitled'}</p>
                    <div className="flex items-center space-x-4 text-sm text-gray-400">
                      <span className="flex items-center space-x-1">
                        <FiHeart className="text-xs" />
                        <span>{post.likes}</span>
                      </span>
                      <span className="flex items-center space-x-1">
                        <FiEye className="text-xs" />
                        <span>{post.views}</span>
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
