import { useState } from 'react';
import { motion } from 'framer-motion';
import { FiUpload, FiImage, FiVideo } from 'react-icons/fi';
import { postAPI } from '../services/api';
import { useNavigate } from 'react-router-dom';

const AdminUpload = () => {
  const [formData, setFormData] = useState({
    caption: '',
    category: 'Nature',
    tags: ''
  });
  const [files, setFiles] = useState([]);
  const [previews, setPreviews] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');
  const [uploadProgress, setUploadProgress] = useState(0);
  const navigate = useNavigate();

  const categories = ['Nature', 'Street', 'Portrait', 'Wildlife', 'Travel', 'Architecture', 'Events', 'Other'];

  const handleFileChange = (e) => {
    const selectedFiles = Array.from(e.target.files);
    
    // Check file sizes (10MB limit for Cloudinary free tier)
    const maxSize = 10 * 1024 * 1024; // 10MB
    const oversizedFiles = selectedFiles.filter(f => f.size > maxSize);
    
    if (oversizedFiles.length > 0) {
      setError(`${oversizedFiles.length} file(s) too large! Maximum size is 10MB per file.`);
      return;
    }
    
    setError('');
    setFiles(selectedFiles);
    
    // Generate previews
    const newPreviews = [];
    selectedFiles.forEach(file => {
      const reader = new FileReader();
      reader.onloadend = () => {
        newPreviews.push({
          url: reader.result,
          type: file.type.startsWith('image/') ? 'image' : 'video',
          name: file.name
        });
        if (newPreviews.length === selectedFiles.length) {
          setPreviews(newPreviews);
        }
      };
      reader.readAsDataURL(file);
    });
  };

  const removeFile = (index) => {
    setFiles(files.filter((_, i) => i !== index));
    setPreviews(previews.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (files.length === 0) {
      setError('Please select at least one file');
      return;
    }

    setUploading(true);
    setError('');
    setUploadProgress(0);

    try {
      let uploaded = 0;
      for (const file of files) {
        const data = new FormData();
        data.append('media', file);
        data.append('caption', formData.caption);
        data.append('category', formData.category);
        data.append('tags', formData.tags);
        data.append('mediaType', file.type.startsWith('image/') ? 'image' : 'video');

        await postAPI.create(data);
        uploaded++;
        setUploadProgress(Math.round((uploaded / files.length) * 100));
      }
      
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
            <label className="block text-sm font-medium mb-2">Upload Media (Multiple)</label>
            <div className="border-2 border-dashed border-gray-700 rounded-lg p-8 text-center hover:border-accent transition-colors cursor-pointer">
              <input
                type="file"
                accept="image/*,video/*"
                onChange={handleFileChange}
                className="hidden"
                id="file-upload"
                multiple
              />
              <label htmlFor="file-upload" className="cursor-pointer">
                {previews.length > 0 ? (
                  <div className="mb-4">
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                      {previews.map((preview, index) => (
                        <div key={index} className="relative group">
                          {preview.type === 'image' ? (
                            <img src={preview.url} alt={`Preview ${index + 1}`} className="w-full h-32 object-cover rounded" />
                          ) : (
                            <video src={preview.url} className="w-full h-32 object-cover rounded" />
                          )}
                          <button
                            type="button"
                            onClick={() => removeFile(index)}
                            className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                          >
                            ×
                          </button>
                        </div>
                      ))}
                    </div>
                    <p className="text-accent mt-4">{files.length} file(s) selected</p>
                  </div>
                ) : (
                  <div className="mb-4">
                    <FiUpload className="text-5xl text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-400">Click to upload or drag and drop</p>
                    <p className="text-gray-500 text-sm mt-2">Select multiple images or videos (Max 10MB each)</p>
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
              <>
                <span>Uploading... {uploadProgress}%</span>
              </>
            ) : (
              <>
                <FiUpload />
                <span>Upload {files.length > 0 ? `${files.length} Post(s)` : 'Posts'}</span>
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminUpload;
