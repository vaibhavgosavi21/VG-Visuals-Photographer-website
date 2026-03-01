# LensPortfolio - Project Structure

```
Photography portfolio/
│
├── backend/                          # Backend Node.js/Express application
│   ├── config/                       # Configuration files
│   │   ├── db.js                    # MongoDB connection
│   │   └── s3.js                    # AWS S3 configuration
│   │
│   ├── controllers/                  # Route controllers
│   │   ├── authController.js        # Authentication logic
│   │   ├── postController.js        # Post CRUD operations
│   │   └── analyticsController.js   # Analytics logic
│   │
│   ├── middleware/                   # Custom middleware
│   │   └── auth.js                  # JWT authentication middleware
│   │
│   ├── models/                       # MongoDB schemas
│   │   ├── User.js                  # Admin user model
│   │   ├── Post.js                  # Post model
│   │   ├── Comment.js               # Comment model
│   │   └── Visitor.js               # Visitor tracking model
│   │
│   ├── routes/                       # API routes
│   │   ├── auth.js                  # Auth routes
│   │   ├── posts.js                 # Post routes
│   │   └── analytics.js             # Analytics routes
│   │
│   ├── .env.example                 # Environment variables template
│   ├── .gitignore                   # Git ignore file
│   ├── createAdmin.js               # Script to create admin user
│   ├── Dockerfile                   # Docker configuration
│   ├── package.json                 # Dependencies
│   └── server.js                    # Express server entry point
│
├── frontend/                         # Frontend React application
│   ├── public/                      # Static files
│   │
│   ├── src/
│   │   ├── components/              # Reusable components
│   │   │   ├── Navbar.jsx          # Navigation bar
│   │   │   ├── Footer.jsx          # Footer component
│   │   │   └── ProtectedRoute.jsx  # Route protection
│   │   │
│   │   ├── context/                 # React context
│   │   │   └── AuthContext.jsx     # Authentication context
│   │   │
│   │   ├── layouts/                 # Layout components
│   │   │   ├── MainLayout.jsx      # Public layout
│   │   │   └── AdminLayout.jsx     # Admin layout
│   │   │
│   │   ├── pages/                   # Page components
│   │   │   ├── Home.jsx            # Home page
│   │   │   ├── Gallery.jsx         # Gallery page
│   │   │   ├── Feed.jsx            # Feed page
│   │   │   ├── PostDetail.jsx      # Post detail page
│   │   │   ├── Collections.jsx     # Collections page
│   │   │   ├── About.jsx           # About page
│   │   │   ├── Contact.jsx         # Contact page
│   │   │   ├── AdminLogin.jsx      # Admin login
│   │   │   ├── AdminDashboard.jsx  # Admin dashboard
│   │   │   ├── AdminUpload.jsx     # Upload page
│   │   │   └── AdminManage.jsx     # Manage posts
│   │   │
│   │   ├── services/                # API services
│   │   │   └── api.js              # Axios API configuration
│   │   │
│   │   ├── App.jsx                  # Main app component
│   │   ├── main.jsx                 # Entry point
│   │   └── index.css                # Global styles
│   │
│   ├── .env.example                 # Environment variables template
│   ├── .gitignore                   # Git ignore file
│   ├── Dockerfile                   # Docker configuration
│   ├── index.html                   # HTML template
│   ├── nginx.conf                   # Nginx configuration
│   ├── package.json                 # Dependencies
│   ├── postcss.config.js            # PostCSS configuration
│   ├── tailwind.config.js           # Tailwind CSS configuration
│   └── vite.config.js               # Vite configuration
│
├── .gitignore                        # Root git ignore
├── docker-compose.yml                # Docker Compose configuration
├── DEPLOYMENT.md                     # Deployment guide
├── PROJECT_STRUCTURE.md              # This file
└── README.md                         # Project documentation
```

## Key Files Explained

### Backend

**server.js**
- Express server setup
- Middleware configuration
- Route mounting
- Error handling

**config/db.js**
- MongoDB connection logic
- Connection error handling

**config/s3.js**
- AWS S3 configuration
- Multer-S3 setup for file uploads
- File validation

**models/Post.js**
- Post schema definition
- Media URL, type, caption
- Category, tags, likes, views
- Timestamps

**controllers/postController.js**
- CRUD operations for posts
- Like functionality
- Comment handling
- View tracking

**middleware/auth.js**
- JWT token verification
- Protected route middleware

### Frontend

**App.jsx**
- Main routing configuration
- Route protection
- Layout structure

**context/AuthContext.jsx**
- Global authentication state
- Login/logout functions
- Token management

**services/api.js**
- Axios instance configuration
- API endpoint functions
- Request interceptors

**pages/Home.jsx**
- Hero section
- Featured posts
- Visitor tracking

**pages/Gallery.jsx**
- Masonry layout
- Category filtering
- Fullscreen modal

**pages/Feed.jsx**
- Instagram-style feed
- Like/comment/share
- Post cards

**pages/AdminDashboard.jsx**
- Analytics display
- Quick actions
- Recent posts

**pages/AdminUpload.jsx**
- File upload form
- S3 integration
- Preview functionality

**pages/AdminManage.jsx**
- Post management
- Edit/delete operations
- Inline editing

## Data Flow

### Upload Flow
1. Admin selects file in AdminUpload
2. Form data sent to backend with FormData
3. Multer-S3 uploads to AWS S3
4. S3 URL saved in MongoDB
5. Post created and returned

### View Flow
1. User visits post detail page
2. Backend checks IP address
3. If new IP, increment view count
4. Return post with updated views

### Like Flow
1. User clicks like button
2. Backend checks IP in likedBy array
3. If not present, increment likes
4. Add IP to likedBy array
5. Return updated like count

### Comment Flow
1. User submits comment form
2. Comment saved to database
3. Comment returned and displayed
4. Admin can delete via manage page

## Environment Variables

### Backend Required
- `MONGODB_URI`: Database connection
- `JWT_SECRET`: Token signing key
- `AWS_ACCESS_KEY_ID`: S3 access
- `AWS_SECRET_ACCESS_KEY`: S3 secret
- `AWS_REGION`: S3 region
- `AWS_BUCKET_NAME`: S3 bucket
- `FRONTEND_URL`: CORS origin

### Frontend Required
- `VITE_API_URL`: Backend API URL

## API Endpoints

### Public Endpoints
- `GET /api/posts` - Get all posts
- `GET /api/posts/:id` - Get single post
- `POST /api/posts/:id/like` - Like post
- `POST /api/posts/:id/comment` - Add comment
- `POST /api/analytics/track` - Track visitor

### Protected Endpoints (Admin Only)
- `POST /api/auth/login` - Admin login
- `POST /api/posts` - Create post
- `PUT /api/posts/:id` - Update post
- `DELETE /api/posts/:id` - Delete post
- `DELETE /api/posts/:id/comment/:commentId` - Delete comment
- `GET /api/analytics` - Get analytics

## Database Collections

### users
- Admin authentication
- Email, hashed password, role

### posts
- Media content
- URL, type, caption, category
- Tags, likes, views, timestamps

### comments
- Post comments
- Post ID, name, text, timestamp

### visitors
- Analytics tracking
- IP address, visit date

## Security Features

1. **JWT Authentication**
   - Token-based auth
   - 7-day expiration
   - Secure HTTP-only recommended

2. **Password Hashing**
   - Bcrypt with salt rounds
   - Never store plain passwords

3. **Rate Limiting**
   - 100 requests per 15 minutes
   - Prevents abuse

4. **IP Tracking**
   - Prevents multiple likes
   - Tracks unique visitors

5. **Protected Routes**
   - Admin-only endpoints
   - JWT verification middleware

6. **Environment Variables**
   - Sensitive data not in code
   - Different configs per environment

## Performance Optimizations

1. **Image Lazy Loading**
   - Images load as needed
   - Improves initial page load

2. **Pagination Ready**
   - Limit/skip parameters
   - Can add infinite scroll

3. **CDN via S3**
   - Fast media delivery
   - Global distribution

4. **Framer Motion**
   - Smooth animations
   - Hardware accelerated

5. **Tailwind CSS**
   - Purged unused styles
   - Minimal CSS bundle

## Future Enhancements

- [ ] Image compression before upload
- [ ] Multiple image upload
- [ ] Advanced search functionality
- [ ] User profiles for commenters
- [ ] Email notifications
- [ ] Social media integration
- [ ] Advanced analytics dashboard
- [ ] Export portfolio as PDF
- [ ] Watermark functionality
- [ ] Booking system integration
