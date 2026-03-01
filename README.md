# LensPortfolio - Photography Portfolio Platform

A complete, production-ready photography portfolio and social-style web platform built with the MERN stack.

## 🚀 Features

### Public Features
- **Home Page**: Full-screen hero banner with featured photography
- **Gallery**: Masonry layout with category filters
- **Feed**: Instagram-style posts with likes, comments, and shares
- **Collections**: Organized photo albums by category
- **About**: Photographer bio and information
- **Contact**: Contact form for inquiries

### Admin Features
- **Secure Dashboard**: Analytics and overview
- **Upload System**: Upload photos/videos to AWS S3
- **Post Management**: Edit and delete posts
- **Comment Moderation**: Delete inappropriate comments
- **Analytics**: Track views, likes, and visitors

### Social Features
- Like posts (IP-based duplicate prevention)
- Comment on posts
- Share post links
- View tracking

## 🛠️ Tech Stack

**Frontend:**
- React.js with Vite
- Tailwind CSS
- Framer Motion
- React Router DOM
- Axios

**Backend:**
- Node.js
- Express.js
- MongoDB with Mongoose
- JWT Authentication
- AWS S3 for media storage

## 📋 Prerequisites

- Node.js (v18 or higher)
- MongoDB Atlas account
- AWS account with S3 bucket
- Git

## 🔧 Installation

### 1. Clone the repository

```bash
git clone <repository-url>
cd "Photography portfolio"
```

### 2. Backend Setup

```bash
cd backend
npm install
```

Create `.env` file in backend directory:

```env
PORT=5000
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/lensportfolio
JWT_SECRET=your_jwt_secret_key_here_change_in_production
AWS_ACCESS_KEY_ID=your_aws_access_key
AWS_SECRET_ACCESS_KEY=your_aws_secret_key
AWS_REGION=us-east-1
AWS_BUCKET_NAME=lensportfolio-media
FRONTEND_URL=http://localhost:5173
```

### 3. Frontend Setup

```bash
cd ../frontend
npm install
```

Create `.env` file in frontend directory:

```env
VITE_API_URL=http://localhost:5000/api
```

### 4. Create Admin User

Run this script to create your admin account:

```bash
cd backend
node -e "
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('./models/User');
require('dotenv').config();

mongoose.connect(process.env.MONGODB_URI).then(async () => {
  const hashedPassword = await bcrypt.hash('your_password', 10);
  const user = new User({
    email: 'admin@lensportfolio.com',
    password: hashedPassword,
    role: 'admin'
  });
  await user.save();
  console.log('Admin user created!');
  process.exit(0);
});
"
```

## 🚀 Running Locally

### Start Backend
```bash
cd backend
npm run dev
```

### Start Frontend
```bash
cd frontend
npm run dev
```

Visit `http://localhost:5173` for the website and `http://localhost:5173/admin/login` for admin panel.

## 📦 AWS S3 Setup

1. **Create S3 Bucket:**
   - Go to AWS S3 Console
   - Create a new bucket (e.g., `lensportfolio-media`)
   - Enable public access for uploaded files
   - Set CORS configuration:

```json
[
    {
        "AllowedHeaders": ["*"],
        "AllowedMethods": ["GET", "PUT", "POST", "DELETE"],
        "AllowedOrigins": ["*"],
        "ExposeHeaders": []
    }
]
```

2. **Create IAM User:**
   - Go to IAM Console
   - Create new user with programmatic access
   - Attach policy: `AmazonS3FullAccess`
   - Save Access Key ID and Secret Access Key

3. **Update Environment Variables:**
   - Add AWS credentials to backend `.env` file

## 🗄️ MongoDB Atlas Setup

1. Create account at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a new cluster
3. Create database user
4. Whitelist IP addresses (0.0.0.0/0 for all IPs)
5. Get connection string and add to `.env`

## 🌐 Deployment

### Backend Deployment (AWS EC2 / Render)

#### Option 1: AWS EC2

1. Launch EC2 instance (Ubuntu)
2. SSH into instance
3. Install Node.js and PM2:

```bash
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs
sudo npm install -g pm2
```

4. Clone repository and setup:

```bash
git clone <repository-url>
cd "Photography portfolio/backend"
npm install --production
```

5. Create `.env` file with production values

6. Start with PM2:

```bash
pm2 start server.js --name lensportfolio-backend
pm2 startup
pm2 save
```

7. Setup Nginx reverse proxy:

```bash
sudo apt install nginx
sudo nano /etc/nginx/sites-available/lensportfolio
```

Add configuration:

```nginx
server {
    listen 80;
    server_name your-domain.com;

    location / {
        proxy_pass http://localhost:5000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

```bash
sudo ln -s /etc/nginx/sites-available/lensportfolio /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl restart nginx
```

#### Option 2: Render

1. Create account at [Render](https://render.com)
2. Create new Web Service
3. Connect GitHub repository
4. Configure:
   - Build Command: `cd backend && npm install`
   - Start Command: `cd backend && npm start`
5. Add environment variables
6. Deploy

### Frontend Deployment (AWS Amplify / Vercel)

#### Option 1: AWS Amplify

1. Go to AWS Amplify Console
2. Connect repository
3. Configure build settings:

```yaml
version: 1
frontend:
  phases:
    preBuild:
      commands:
        - cd frontend
        - npm install
    build:
      commands:
        - npm run build
  artifacts:
    baseDirectory: frontend/dist
    files:
      - '**/*'
  cache:
    paths:
      - frontend/node_modules/**/*
```

4. Add environment variables
5. Deploy

#### Option 2: Vercel

1. Install Vercel CLI: `npm i -g vercel`
2. Navigate to frontend directory
3. Run: `vercel`
4. Follow prompts
5. Add environment variables in Vercel dashboard

### Docker Deployment

Build and run with Docker Compose:

```bash
docker-compose up -d
```

## 📱 Usage

### Admin Access
1. Navigate to `/admin/login`
2. Login with admin credentials
3. Access dashboard at `/admin/dashboard`

### Upload Photos/Videos
1. Go to `/admin/upload`
2. Select media file
3. Add caption, category, and tags
4. Click Upload

### Manage Posts
1. Go to `/admin/manage`
2. Edit or delete posts
3. View analytics

## 🎨 Customization

### Colors
Edit `tailwind.config.js`:

```js
colors: {
  primary: '#0B0B0B',    // Main background
  secondary: '#121212',   // Card background
  accent: '#C19A6B',      // Accent color
}
```

### Categories
Edit categories in:
- `backend/models/Post.js`
- `frontend/src/pages/AdminUpload.jsx`
- `frontend/src/pages/Gallery.jsx`

## 🔒 Security

- JWT tokens expire in 7 days
- Passwords hashed with bcrypt
- Rate limiting on API endpoints
- Protected admin routes
- Environment variables for sensitive data

## 📊 API Endpoints

### Authentication
- `POST /api/auth/login` - Admin login
- `POST /api/auth/register` - Register admin (first time only)

### Posts
- `GET /api/posts` - Get all posts
- `GET /api/posts/:id` - Get single post
- `POST /api/posts` - Create post (admin only)
- `PUT /api/posts/:id` - Update post (admin only)
- `DELETE /api/posts/:id` - Delete post (admin only)
- `POST /api/posts/:id/like` - Like post
- `POST /api/posts/:id/comment` - Add comment
- `DELETE /api/posts/:id/comment/:commentId` - Delete comment (admin only)

### Analytics
- `GET /api/analytics` - Get analytics (admin only)
- `POST /api/analytics/track` - Track visitor

## 🐛 Troubleshooting

### CORS Issues
- Ensure `FRONTEND_URL` in backend `.env` matches your frontend URL
- Check CORS configuration in `server.js`

### AWS S3 Upload Fails
- Verify AWS credentials
- Check S3 bucket permissions
- Ensure bucket CORS is configured

### MongoDB Connection Error
- Verify connection string
- Check IP whitelist in MongoDB Atlas
- Ensure database user has correct permissions

## 📄 License

MIT License - feel free to use for personal or commercial projects.

## 🤝 Support

For issues or questions, please open an issue on GitHub.

---

Built with ❤️ using MERN Stack



Connected to MongoDB
Enter admin email: vaibhavgosavi2003@gmail.com
Enter admin password: Vaibhav@11
✅ Admin user created successfully!