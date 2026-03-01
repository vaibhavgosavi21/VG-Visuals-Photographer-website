const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
  mediaUrl: {
    type: String,
    required: true
  },
  mediaType: {
    type: String,
    required: true,
    enum: ['image', 'video']
  },
  caption: {
    type: String,
    default: ''
  },
  category: {
    type: String,
    required: true,
    enum: ['Nature', 'Street', 'Portrait', 'Wildlife', 'Travel', 'Architecture', 'Events', 'Other']
  },
  tags: [{
    type: String
  }],
  likes: {
    type: Number,
    default: 0
  },
  likedBy: [{
    type: String // IP addresses or session IDs
  }],
  views: {
    type: Number,
    default: 0
  },
  viewedBy: [{
    type: String // IP addresses
  }]
}, { timestamps: true });

module.exports = mongoose.model('Post', postSchema);
