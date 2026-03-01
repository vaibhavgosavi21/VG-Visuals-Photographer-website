# LensPortfolio API Documentation

## Base URL
```
Development: http://localhost:5000/api
Production: https://your-backend-url.com/api
```

---

## Authentication

### Login
**POST** `/auth/login`

Login as admin user.

**Request Body:**
```json
{
  "email": "admin@example.com",
  "password": "your_password"
}
```

**Response:**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "507f1f77bcf86cd799439011",
    "email": "admin@example.com",
    "role": "admin"
  }
}
```

**Status Codes:**
- `200` - Success
- `401` - Invalid credentials
- `500` - Server error

---

### Register (First Time Only)
**POST** `/auth/register`

Create admin account (disable after first use).

**Request Body:**
```json
{
  "email": "admin@example.com",
  "password": "secure_password"
}
```

**Response:**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "507f1f77bcf86cd799439011",
    "email": "admin@example.com",
    "role": "admin"
  }
}
```

---

## Posts

### Get All Posts
**GET** `/posts`

Retrieve all posts with optional filtering.

**Query Parameters:**
- `category` (optional) - Filter by category
- `limit` (optional) - Number of posts to return
- `skip` (optional) - Number of posts to skip (pagination)

**Example:**
```
GET /api/posts?category=Nature&limit=10&skip=0
```

**Response:**
```json
{
  "posts": [
    {
      "_id": "507f1f77bcf86cd799439011",
      "mediaUrl": "https://s3.amazonaws.com/bucket/image.jpg",
      "mediaType": "image",
      "caption": "Beautiful sunset",
      "category": "Nature",
      "tags": ["sunset", "landscape"],
      "likes": 42,
      "views": 156,
      "createdAt": "2024-01-15T10:30:00.000Z",
      "updatedAt": "2024-01-15T10:30:00.000Z"
    }
  ],
  "total": 1
}
```

---

### Get Single Post
**GET** `/posts/:id`

Get post details with comments. Automatically increments view count.

**Response:**
```json
{
  "post": {
    "_id": "507f1f77bcf86cd799439011",
    "mediaUrl": "https://s3.amazonaws.com/bucket/image.jpg",
    "mediaType": "image",
    "caption": "Beautiful sunset",
    "category": "Nature",
    "tags": ["sunset", "landscape"],
    "likes": 42,
    "views": 157,
    "createdAt": "2024-01-15T10:30:00.000Z"
  },
  "comments": [
    {
      "_id": "507f1f77bcf86cd799439012",
      "postId": "507f1f77bcf86cd799439011",
      "name": "John Doe",
      "text": "Amazing photo!",
      "createdAt": "2024-01-15T11:00:00.000Z"
    }
  ]
}
```

---

### Create Post
**POST** `/posts` 🔒 *Admin Only*

Upload new photo or video.

**Headers:**
```
Authorization: Bearer <token>
Content-Type: multipart/form-data
```

**Form Data:**
- `media` (file) - Image or video file
- `caption` (string) - Post caption
- `category` (string) - Category name
- `tags` (string) - Comma-separated tags
- `mediaType` (string) - "image" or "video"

**Example (using curl):**
```bash
curl -X POST http://localhost:5000/api/posts \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -F "media=@photo.jpg" \
  -F "caption=Beautiful sunset" \
  -F "category=Nature" \
  -F "tags=sunset,landscape" \
  -F "mediaType=image"
```

**Response:**
```json
{
  "_id": "507f1f77bcf86cd799439011",
  "mediaUrl": "https://s3.amazonaws.com/bucket/image.jpg",
  "mediaType": "image",
  "caption": "Beautiful sunset",
  "category": "Nature",
  "tags": ["sunset", "landscape"],
  "likes": 0,
  "views": 0,
  "createdAt": "2024-01-15T10:30:00.000Z"
}
```

---

### Update Post
**PUT** `/posts/:id` 🔒 *Admin Only*

Update post details (not media file).

**Headers:**
```
Authorization: Bearer <token>
Content-Type: application/json
```

**Request Body:**
```json
{
  "caption": "Updated caption",
  "category": "Travel",
  "tags": "travel,adventure,explore"
}
```

**Response:**
```json
{
  "_id": "507f1f77bcf86cd799439011",
  "mediaUrl": "https://s3.amazonaws.com/bucket/image.jpg",
  "caption": "Updated caption",
  "category": "Travel",
  "tags": ["travel", "adventure", "explore"],
  "likes": 42,
  "views": 157
}
```

---

### Delete Post
**DELETE** `/posts/:id` 🔒 *Admin Only*

Delete post and all associated comments.

**Headers:**
```
Authorization: Bearer <token>
```

**Response:**
```json
{
  "message": "Post deleted successfully"
}
```

---

### Like Post
**POST** `/posts/:id/like`

Like a post. IP-based duplicate prevention.

**Response:**
```json
{
  "likes": 43
}
```

**Status Codes:**
- `200` - Success
- `400` - Already liked
- `404` - Post not found

---

### Add Comment
**POST** `/posts/:id/comment`

Add comment to post.

**Request Body:**
```json
{
  "name": "John Doe",
  "text": "Amazing photo!"
}
```

**Response:**
```json
{
  "_id": "507f1f77bcf86cd799439012",
  "postId": "507f1f77bcf86cd799439011",
  "name": "John Doe",
  "text": "Amazing photo!",
  "createdAt": "2024-01-15T11:00:00.000Z"
}
```

---

### Delete Comment
**DELETE** `/posts/:id/comment/:commentId` 🔒 *Admin Only*

Delete a comment.

**Headers:**
```
Authorization: Bearer <token>
```

**Response:**
```json
{
  "message": "Comment deleted successfully"
}
```

---

## Analytics

### Get Analytics
**GET** `/analytics` 🔒 *Admin Only*

Get dashboard analytics.

**Headers:**
```
Authorization: Bearer <token>
```

**Response:**
```json
{
  "totalPosts": 25,
  "totalPhotos": 20,
  "totalVideos": 5,
  "totalLikes": 342,
  "totalViews": 1567,
  "totalVisitors": 89,
  "recentPosts": [
    {
      "_id": "507f1f77bcf86cd799439011",
      "caption": "Beautiful sunset",
      "mediaUrl": "https://s3.amazonaws.com/bucket/image.jpg",
      "mediaType": "image",
      "likes": 42,
      "views": 157,
      "createdAt": "2024-01-15T10:30:00.000Z"
    }
  ]
}
```

---

### Track Visitor
**POST** `/analytics/track`

Track visitor (called automatically on page load).

**Response:**
```json
{
  "message": "Visitor tracked"
}
```

---

## Error Responses

All endpoints may return these error responses:

### 400 Bad Request
```json
{
  "message": "Invalid request data"
}
```

### 401 Unauthorized
```json
{
  "message": "No authentication token"
}
```

### 404 Not Found
```json
{
  "message": "Resource not found"
}
```

### 500 Server Error
```json
{
  "message": "Server error",
  "error": "Detailed error message"
}
```

---

## Rate Limiting

- **Limit:** 100 requests per 15 minutes per IP
- **Response when exceeded:**
```json
{
  "message": "Too many requests, please try again later"
}
```

---

## Categories

Valid category values:
- `Nature`
- `Street`
- `Portrait`
- `Wildlife`
- `Travel`
- `Architecture`
- `Events`
- `Other`

---

## Media Types

Valid mediaType values:
- `image` - For photos
- `video` - For videos

---

## File Upload Limits

- **Max file size:** 100MB
- **Allowed types:** Images (jpg, png, gif, webp) and Videos (mp4, mov, avi)

---

## Authentication Flow

1. **Login:**
   ```
   POST /api/auth/login
   → Receive JWT token
   ```

2. **Store Token:**
   ```javascript
   localStorage.setItem('token', token);
   ```

3. **Use Token:**
   ```javascript
   headers: {
     'Authorization': `Bearer ${token}`
   }
   ```

4. **Token Expiry:**
   - Tokens expire after 7 days
   - User must login again

---

## Example Usage (JavaScript)

### Fetch Posts
```javascript
const response = await fetch('http://localhost:5000/api/posts');
const data = await response.json();
console.log(data.posts);
```

### Like Post
```javascript
const response = await fetch('http://localhost:5000/api/posts/POST_ID/like', {
  method: 'POST'
});
const data = await response.json();
console.log(data.likes);
```

### Upload Post (Admin)
```javascript
const formData = new FormData();
formData.append('media', fileInput.files[0]);
formData.append('caption', 'My photo');
formData.append('category', 'Nature');
formData.append('tags', 'sunset,landscape');
formData.append('mediaType', 'image');

const response = await fetch('http://localhost:5000/api/posts', {
  method: 'POST',
  headers: {
    'Authorization': `Bearer ${token}`
  },
  body: formData
});
```

---

## Testing with Postman

1. **Import Collection:**
   - Create new collection "LensPortfolio"
   - Add base URL variable

2. **Test Login:**
   - POST to `/auth/login`
   - Save token from response

3. **Test Protected Routes:**
   - Add Authorization header
   - Use saved token

---

## CORS Configuration

Allowed origins configured in backend `.env`:
```
FRONTEND_URL=http://localhost:5173
```

For production, update to your frontend domain.

---

## WebSocket Support

Currently not implemented. All updates are via REST API.
Future enhancement: Real-time likes/comments via Socket.io

---

## API Versioning

Current version: v1 (implicit)
Future versions will use: `/api/v2/...`

---

## Support

For API issues:
1. Check request format
2. Verify authentication token
3. Check server logs
4. Review error messages

---

**API Documentation Complete!**

For implementation examples, see the frontend code in `src/services/api.js`
