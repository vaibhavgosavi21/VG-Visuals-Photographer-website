const Post = require('../models/Post');
const Visitor = require('../models/Visitor');

exports.getAnalytics = async (req, res) => {
  try {
    const totalPosts = await Post.countDocuments();
    const totalPhotos = await Post.countDocuments({ mediaType: 'image' });
    const totalVideos = await Post.countDocuments({ mediaType: 'video' });
    
    const posts = await Post.find();
    const totalLikes = posts.reduce((sum, post) => sum + post.likes, 0);
    const totalViews = posts.reduce((sum, post) => sum + post.views, 0);
    
    const totalVisitors = await Visitor.countDocuments();
    
    const recentPosts = await Post.find()
      .sort({ createdAt: -1 })
      .limit(5)
      .select('caption mediaUrl mediaType likes views createdAt');

    res.json({
      totalPosts,
      totalPhotos,
      totalVideos,
      totalLikes,
      totalViews,
      totalVisitors,
      recentPosts
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

exports.trackVisitor = async (req, res) => {
  try {
    const clientIp = req.ip || req.connection.remoteAddress;
    
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    const existingVisitor = await Visitor.findOne({
      ipAddress: clientIp,
      visitDate: { $gte: today }
    });

    if (!existingVisitor) {
      const visitor = new Visitor({ ipAddress: clientIp });
      await visitor.save();
    }

    res.json({ message: 'Visitor tracked' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};
