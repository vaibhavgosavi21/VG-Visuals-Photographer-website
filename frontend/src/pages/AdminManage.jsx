import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FiEdit2, FiTrash2, FiHeart, FiEye } from 'react-icons/fi';
import { postAPI } from '../services/api';

const AdminManage = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingPost, setEditingPost] = useState(null);
  const [editForm, setEditForm] = useState({ caption: '', category: '', tags: '' });

  const categories = ['Nature', 'Street', 'Portrait', 'Wildlife', 'Travel', 'Architecture', 'Events', 'Other'];

  useEffect(() => {
    loadPosts();
  }, []);

  const loadPosts = () => {
    postAPI.getAll()
      .then(res => {
        setPosts(res.data.posts);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this post?')) return;

    try {
      await postAPI.delete(id);
      setPosts(posts.filter(p => p._id !== id));
    } catch (err) {
      alert('Failed to delete post');
    }
  };

  const handleEdit = (post) => {
    setEditingPost(post._id);
    setEditForm({
      caption: post.caption,
      category: post.category,
      tags: post.tags?.join(', ') || ''
    });
  };

  const handleUpdate = async (id) => {
    try {
      const res = await postAPI.update(id, editForm);
      setPosts(posts.map(p => p._id === id ? res.data : p));
      setEditingPost(null);
    } catch (err) {
      alert('Failed to update post');
    }
  };

  return (
    <div className="min-h-screen py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-4xl font-bold mb-2">Manage Posts</h1>
          <p className="text-gray-400">Edit or delete your posts</p>
        </motion.div>

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
            {posts.map((post, index) => (
              <motion.div
                key={post._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="bg-secondary rounded-lg overflow-hidden"
              >
                {post.mediaType === 'image' ? (
                  <img src={post.mediaUrl} alt={post.caption} className="w-full aspect-square object-cover" />
                ) : (
                  <video src={post.mediaUrl} className="w-full aspect-square object-cover" />
                )}

                <div className="p-4">
                  {editingPost === post._id ? (
                    <div className="space-y-3">
                      <textarea
                        value={editForm.caption}
                        onChange={(e) => setEditForm({ ...editForm, caption: e.target.value })}
                        className="w-full bg-primary border border-gray-700 rounded px-3 py-2 text-sm text-white focus:outline-none focus:border-accent"
                        rows="2"
                      />
                      <select
                        value={editForm.category}
                        onChange={(e) => setEditForm({ ...editForm, category: e.target.value })}
                        className="w-full bg-primary border border-gray-700 rounded px-3 py-2 text-sm text-white focus:outline-none focus:border-accent"
                      >
                        {categories.map(cat => (
                          <option key={cat} value={cat}>{cat}</option>
                        ))}
                      </select>
                      <input
                        type="text"
                        value={editForm.tags}
                        onChange={(e) => setEditForm({ ...editForm, tags: e.target.value })}
                        className="w-full bg-primary border border-gray-700 rounded px-3 py-2 text-sm text-white focus:outline-none focus:border-accent"
                        placeholder="Tags"
                      />
                      <div className="flex space-x-2">
                        <button
                          onClick={() => handleUpdate(post._id)}
                          className="flex-1 bg-accent text-black px-3 py-2 rounded text-sm font-semibold hover:bg-accent/90"
                        >
                          Save
                        </button>
                        <button
                          onClick={() => setEditingPost(null)}
                          className="flex-1 bg-gray-700 px-3 py-2 rounded text-sm font-semibold hover:bg-gray-600"
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  ) : (
                    <>
                      <p className="text-white mb-2 line-clamp-2">{post.caption}</p>
                      <div className="flex items-center justify-between text-sm text-gray-400 mb-3">
                        <span className="bg-accent/20 text-accent px-2 py-1 rounded text-xs">
                          {post.category}
                        </span>
                        <div className="flex items-center space-x-3">
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
                      <div className="flex space-x-2">
                        <button
                          onClick={() => handleEdit(post)}
                          className="flex-1 bg-primary border border-gray-700 px-3 py-2 rounded text-sm font-semibold hover:border-accent transition-colors flex items-center justify-center space-x-1"
                        >
                          <FiEdit2 className="text-xs" />
                          <span>Edit</span>
                        </button>
                        <button
                          onClick={() => handleDelete(post._id)}
                          className="flex-1 bg-red-500/20 border border-red-500 text-red-500 px-3 py-2 rounded text-sm font-semibold hover:bg-red-500/30 transition-colors flex items-center justify-center space-x-1"
                        >
                          <FiTrash2 className="text-xs" />
                          <span>Delete</span>
                        </button>
                      </div>
                    </>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminManage;
