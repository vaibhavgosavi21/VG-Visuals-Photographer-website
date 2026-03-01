import { useState } from 'react';
import { motion } from 'framer-motion';
import { FiUpload, FiImage, FiVideo } from 'react-icons/fi';
import { postAPI } from '../services/api';
import { useNavigate } from 'react-router-dom';

const AdminUpload = () => {
  const [formData, setFormData] = useState({
    caption: '',
    category: 'Nature',
    tags: '',
    mediaType: 'image'
  });
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const categories = ['Nature', 'Street', 'Portrait', 'Wildlife', 'Travel', 'Architecture', 'Events', 'Other'];

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      // Check file size (10MB limit for Cloudinary free tier)
      const maxSize = 10 * 1024 * 1024; // 10MB
      if (selectedFile.size > maxSize) {
        setError(`File too large! Maximum size is 10MB. Your file is ${(selectedFile.size / 1024 / 1024).toFixed(2)}MB. Please compress or resize your image.`);
        return;
      }
      
      setError('');
      setFile(selectedFile);
      const mediaType = selectedFile.type.startsWith('image/') ? 'image' : 'video';
      setFormData({ ...formData, mediaType });
      
      const reader = new FileReader();
      reader.onloadend = () => setPreview(reader.result);
      reader.readAsDataURL(selectedFile);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) {
      setError('Please select a file');
      return;
    }

    setUploading(true);
    setError('');

    const data = new FormData();
    data.append('media', file);
    data.append('caption', formData.caption);
    data.append('category', formData.category);
    data.append('tags', formData.tags);
    data.append('mediaType', formData.mediaType);

    try {
      await postAPI.create(data);
      navigate('/admin/manage');
    } catch (err) {
      console.error('Upload error:', err);
      const errorMsg = err.response?.data?.error || err.response?.data?.message || err.message || 'Upload failed';
      setError(errorMsg);
      setUploading(false);
    }
  };

  return (
    <div className="min-h-screen py-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-4xl font-bold mb-2">Upload New Post</h1>
          <p className="text-gray-400">Share your latest photography work</p>
        </motion.div>

        <form onSubmit={handleSubmit} className="bg-secondary rounded-lg p-8">
          {error && (
            <div className="bg-red-500/20 border border-red-500 text-red-500 px-4 py-3 rounded-lg mb-6">
              {error}
            </div>
          )}

          <div className="mb-6">
            <label className="block text-sm font-medium mb-2">Upload Media</label>
            <div className="border-2 border-dashed border-gray-700 rounded-lg p-8 text-center hover:border-accent transition-colors cursor-pointer">
              <input
                type="file"
                accept="image/*,video/*"
                onChange={handleFileChange}
                className="hidden"
                id="file-upload"
              />
              <label htmlFor="file-upload" className="cursor-pointer">
                {preview ? (
                  <div className="mb-4">
                    {formData.mediaType === 'image' ? (
                      <img src={preview} alt="Preview" className="max-h-64 mx-auto rounded" />
                    ) : (
                      <video src={preview} controls className="max-h-64 mx-auto rounded" />
                    )}
                  </div>
                ) : (
                  <div className="mb-4">
                    <FiUpload className="text-5xl text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-400">Click to upload or drag and drop</p>
                    <p className="text-gray-500 text-sm mt-2">Images or Videos (Max 10MB for free tier)</p>
                  </div>
                )}
              </label>
            </div>
          </div>

          <div className="mb-6">
            <label className="block text-sm font-medium mb-2">Caption</label>
            <textarea
              value={formData.caption}
              onChange={(e) => setFormData({ ...formData, caption: e.target.value })}
              className="w-full bg-primary border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-accent resize-none"
              rows="3"
              placeholder="Write a caption..."
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <label className="block text-sm font-medium mb-2">Category</label>
              <select
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="w-full bg-primary border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-accent"
              >
                {categories.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Tags (comma separated)</label>
              <input
                type="text"
                value={formData.tags}
                onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
                className="w-full bg-primary border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-accent"
                placeholder="landscape, sunset, nature"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={uploading}
            className="w-full bg-accent text-black py-3 rounded-lg font-semibold hover:bg-accent/90 transition-colors disabled:opacity-50 flex items-center justify-center space-x-2"
          >
            {uploading ? (
              <span>Uploading...</span>
            ) : (
              <>
                <FiUpload />
                <span>Upload Post</span>
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminUpload;
