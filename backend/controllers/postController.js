const Post = require('../models/Post');
const Comment = require('../models/Comment');

exports.getAllPosts = async (req, res) => {
  try {
    const { category, limit, skip } = req.query;
    const query = category ? { category } : {};
    
    const posts = await Post.find(query)
      .sort({ createdAt: -1 })
      .limit(parseInt(limit) || 0)
      .skip(parseInt(skip) || 0);
    
    const total = await Post.countDocuments(query);
    
    res.json({ posts, total });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

exports.getPostById = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    const clientIp = req.ip || req.connection.remoteAddress;
    if (!post.viewedBy.includes(clientIp)) {
      post.views += 1;
      post.viewedBy.push(clientIp);
      await post.save();
    }

    const comments = await Comment.find({ postId: post._id }).sort({ createdAt: -1 });
    
    res.json({ post, comments });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

exports.createPost = async (req, res) => {
  try {
    const { caption, category, tags, mediaType } = req.body;
    
    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }

    console.log('File uploaded:', req.file);

    // Cloudinary URL is in req.file.path
    const post = new Post({
      mediaUrl: req.file.path,
      mediaType,
      caption,
      category,
      tags: tags ? tags.split(',').map(tag => tag.trim()) : []
    });

    await post.save();
    console.log('Post saved:', post);
    res.status(201).json(post);
  } catch (error) {
    console.error('Upload error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

exports.updatePost = async (req, res) => {
  try {
    const { caption, category, tags } = req.body;
    
    const post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    if (caption !== undefined) post.caption = caption;
    if (category) post.category = category;
    if (tags) post.tags = tags.split(',').map(tag => tag.trim());

    await post.save();
    res.json(post);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

exports.deletePost = async (req, res) => {
  try {
    const post = await Post.findByIdAndDelete(req.params.id);
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    await Comment.deleteMany({ postId: req.params.id });
    
    res.json({ message: 'Post deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

exports.likePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    const clientIp = req.ip || req.connection.remoteAddress;
    
    if (post.likedBy.includes(clientIp)) {
      return res.status(400).json({ message: 'Already liked' });
    }

    post.likes += 1;
    post.likedBy.push(clientIp);
    await post.save();

    res.json({ likes: post.likes });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

exports.addComment = async (req, res) => {
  try {
    const { name, text } = req.body;
    
    const post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    const comment = new Comment({
      postId: req.params.id,
      name,
      text
    });

    await comment.save();
    res.status(201).json(comment);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

exports.deleteComment = async (req, res) => {
  try {
    const comment = await Comment.findByIdAndDelete(req.params.commentId);
    if (!comment) {
      return res.status(404).json({ message: 'Comment not found' });
    }
    
    res.json({ message: 'Comment deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};
