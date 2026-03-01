import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiHeart, FiShare2, FiEye, FiTrash2 } from 'react-icons/fi';
import { postAPI } from '../services/api';
import { useAuth } from '../context/AuthContext';

const PostDetail = () => {
  const { id } = useParams();
  const { isAuthenticated } = useAuth();
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [commentForm, setCommentForm] = useState({ name: '', text: '' });

  useEffect(() => {
    loadPost();
  }, [id]);

  const loadPost = () => {
    postAPI.getById(id)
      .then(res => {
        setPost(res.data.post);
        setComments(res.data.comments);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  };

  const handleLike = async () => {
    try {
      const res = await postAPI.like(id);
      setPost({ ...post, likes: res.data.likes });
    } catch (err) {
      alert(err.response?.data?.message || 'Error liking post');
    }
  };

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    alert('Link copied to clipboard!');
  };

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    if (!commentForm.name || !commentForm.text) return;

    try {
      const res = await postAPI.comment(id, commentForm);
      setComments([res.data, ...comments]);
      setCommentForm({ name: '', text: '' });
    } catch (err) {
      console.error(err);
    }
  };

  const handleDeleteComment = async (commentId) => {
    if (!window.confirm('Delete this comment?')) return;
    
    try {
      await postAPI.deleteComment(id, commentId);
      setComments(comments.filter(c => c._id !== commentId));
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen py-20 flex items-center justify-center">
        <div className="text-accent text-2xl">Loading...</div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen py-20 flex items-center justify-center">
        <div className="text-white text-2xl">Post not found</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-secondary rounded-lg overflow-hidden"
        >
          {post.mediaType === 'image' ? (
            <img src={post.mediaUrl} alt={post.caption} className="w-full" />
          ) : (
            <video src={post.mediaUrl} controls className="w-full" />
          )}

          <div className="p-6">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-6">
                <button
                  onClick={handleLike}
                  className="flex items-center space-x-2 text-gray-400 hover:text-red-500 transition-colors"
                >
                  <FiHeart className="text-2xl" />
                  <span className="text-lg">{post.likes}</span>
                </button>
                <button
                  onClick={handleShare}
                  className="flex items-center space-x-2 text-gray-400 hover:text-accent transition-colors"
                >
                  <FiShare2 className="text-2xl" />
                </button>
              </div>
              <div className="flex items-center space-x-2 text-gray-400">
                <FiEye className="text-xl" />
                <span>{post.views}</span>
              </div>
            </div>

            <h1 className="text-2xl font-bold mb-4">{post.caption}</h1>
            <div className="flex items-center space-x-4 mb-4">
              <span className="bg-accent/20 text-accent px-3 py-1 rounded-full text-sm">
                {post.category}
              </span>
              {post.tags?.map(tag => (
                <span key={tag} className="text-accent text-sm">#{tag}</span>
              ))}
            </div>
            <p className="text-gray-400 text-sm mb-8">
              {new Date(post.createdAt).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}
            </p>

            <div className="border-t border-gray-700 pt-6">
              <h2 className="text-xl font-bold mb-4">Comments ({comments.length})</h2>

              <form onSubmit={handleCommentSubmit} className="mb-6">
                <input
                  type="text"
                  placeholder="Your name"
                  value={commentForm.name}
                  onChange={(e) => setCommentForm({ ...commentForm, name: e.target.value })}
                  className="w-full bg-primary border border-gray-700 rounded-lg px-4 py-2 mb-3 text-white focus:outline-none focus:border-accent"
                  required
                />
                <textarea
                  placeholder="Add a comment..."
                  value={commentForm.text}
                  onChange={(e) => setCommentForm({ ...commentForm, text: e.target.value })}
                  className="w-full bg-primary border border-gray-700 rounded-lg px-4 py-2 mb-3 text-white focus:outline-none focus:border-accent resize-none"
                  rows="3"
                  required
                />
                <button
                  type="submit"
                  className="bg-accent text-black px-6 py-2 rounded-lg font-semibold hover:bg-accent/90 transition-colors"
                >
                  Post Comment
                </button>
              </form>

              <div className="space-y-4">
                {comments.map(comment => (
                  <div key={comment._id} className="bg-primary rounded-lg p-4">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <p className="font-semibold text-accent mb-1">{comment.name}</p>
                        <p className="text-gray-300">{comment.text}</p>
                        <p className="text-gray-500 text-sm mt-2">
                          {new Date(comment.createdAt).toLocaleDateString()}
                        </p>
                      </div>
                      {isAuthenticated && (
                        <button
                          onClick={() => handleDeleteComment(comment._id)}
                          className="text-red-500 hover:text-red-400 ml-4"
                        >
                          <FiTrash2 />
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default PostDetail;
