import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FiMail, FiTrash2, FiCheck, FiClock } from 'react-icons/fi';
import { contactAPI } from '../services/api';

const AdminMessages = () => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [unreadCount, setUnreadCount] = useState(0);

  useEffect(() => {
    loadMessages();
  }, []);

  const loadMessages = async () => {
    try {
      const res = await contactAPI.getAll();
      setMessages(res.data.contacts);
      setUnreadCount(res.data.unreadCount);
      setLoading(false);
    } catch (err) {
      console.error(err);
      setLoading(false);
    }
  };

  const handleMarkRead = async (id) => {
    try {
      await contactAPI.markRead(id);
      setMessages(messages.map(m => m._id === id ? { ...m, read: true } : m));
      setUnreadCount(prev => prev - 1);
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this message?')) return;
    
    try {
      await contactAPI.delete(id);
      setMessages(messages.filter(m => m._id !== id));
    } catch (err) {
      console.error(err);
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
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold mb-2">Contact Messages</h1>
              <p className="text-gray-400">Messages from visitors</p>
            </div>
            {unreadCount > 0 && (
              <div className="bg-red-500 text-white px-4 py-2 rounded-full font-semibold">
                {unreadCount} New
              </div>
            )}
          </div>
        </motion.div>

        {loading ? (
          <div className="space-y-4">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="bg-secondary rounded-lg p-6 animate-pulse">
                <div className="h-4 bg-gray-800 rounded w-1/4 mb-3" />
                <div className="h-4 bg-gray-800 rounded w-3/4" />
              </div>
            ))}
          </div>
        ) : messages.length === 0 ? (
          <div className="bg-secondary rounded-lg p-12 text-center">
            <FiMail className="text-6xl text-gray-600 mx-auto mb-4" />
            <p className="text-gray-400 text-lg">No messages yet</p>
          </div>
        ) : (
          <div className="space-y-4">
            {messages.map((message, index) => (
              <motion.div
                key={message._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className={`bg-secondary rounded-lg p-6 ${!message.read ? 'border-2 border-accent' : ''}`}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <h3 className="text-xl font-bold">{message.name}</h3>
                      {!message.read && (
                        <span className="bg-accent text-black text-xs px-2 py-1 rounded-full font-semibold">
                          NEW
                        </span>
                      )}
                    </div>
                    <p className="text-accent mb-1">{message.email}</p>
                    <p className="text-gray-400 text-sm flex items-center space-x-1">
                      <FiClock className="text-xs" />
                      <span>{new Date(message.createdAt).toLocaleString()}</span>
                    </p>
                  </div>
                  <div className="flex items-center space-x-2">
                    {!message.read && (
                      <button
                        onClick={() => handleMarkRead(message._id)}
                        className="bg-green-500/20 text-green-500 p-2 rounded-lg hover:bg-green-500/30 transition-colors"
                        title="Mark as read"
                      >
                        <FiCheck />
                      </button>
                    )}
                    <button
                      onClick={() => handleDelete(message._id)}
                      className="bg-red-500/20 text-red-500 p-2 rounded-lg hover:bg-red-500/30 transition-colors"
                      title="Delete"
                    >
                      <FiTrash2 />
                    </button>
                  </div>
                </div>
                <div className="bg-primary rounded-lg p-4">
                  <p className="text-gray-300 whitespace-pre-wrap">{message.message}</p>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminMessages;
