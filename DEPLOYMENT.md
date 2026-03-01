# LensPortfolio Deployment Guide

## Quick Start Checklist

- [ ] MongoDB Atlas database created
- [ ] AWS S3 bucket configured
- [ ] AWS IAM user with S3 access created
- [ ] Environment variables configured
- [ ] Admin user created
- [ ] Backend deployed
- [ ] Frontend deployed

---

## 1. MongoDB Atlas Setup (5 minutes)

### Step 1: Create Account
1. Go to https://www.mongodb.com/cloud/atlas
2. Sign up for free account
3. Create a new project

### Step 2: Create Cluster
1. Click "Build a Database"
2. Choose FREE tier (M0)
3. Select cloud provider and region
4. Click "Create Cluster"

### Step 3: Configure Access
1. **Database Access:**
   - Click "Database Access" in left sidebar
   - Click "Add New Database User"
   - Choose "Password" authentication
   - Create username and password (save these!)
   - Set role to "Read and write to any database"
   - Click "Add User"

2. **Network Access:**
   - Click "Network Access" in left sidebar
   - Click "Add IP Address"
   - Click "Allow Access from Anywhere" (0.0.0.0/0)
   - Click "Confirm"

### Step 4: Get Connection String
1. Click "Database" in left sidebar
2. Click "Connect" on your cluster
3. Choose "Connect your application"
4. Copy the connection string
5. Replace `<password>` with your database user password
6. Replace `<dbname>` with `lensportfolio`

Example: `mongodb+srv://admin:mypassword@cluster0.xxxxx.mongodb.net/lensportfolio`

---

## 2. AWS S3 Setup (10 minutes)

### Step 1: Create S3 Bucket
1. Go to AWS Console → S3
2. Click "Create bucket"
3. Bucket name: `lensportfolio-media` (must be globally unique)
4. Region: Choose closest to your users
5. **Uncheck** "Block all public access"
6. Acknowledge the warning
7. Click "Create bucket"

### Step 2: Configure Bucket
1. Click on your bucket name
2. Go to "Permissions" tab
3. Scroll to "Cross-origin resource sharing (CORS)"
4. Click "Edit" and paste:

```json
[
    {
        "AllowedHeaders": ["*"],
        "AllowedMethods": ["GET", "PUT", "POST", "DELETE", "HEAD"],
        "AllowedOrigins": ["*"],
        "ExposeHeaders": ["ETag"]
    }
]
```

5. Click "Save changes"

### Step 3: Create IAM User
1. Go to AWS Console → IAM
2. Click "Users" → "Add users"
3. Username: `lensportfolio-s3-user`
4. Select "Access key - Programmatic access"
5. Click "Next: Permissions"
6. Click "Attach existing policies directly"
7. Search and select "AmazonS3FullAccess"
8. Click through to "Create user"
9. **IMPORTANT:** Download CSV with credentials or copy:
   - Access Key ID
   - Secret Access Key
10. Store these securely!

---

## 3. Backend Deployment

### Option A: Render (Easiest - Recommended)

1. **Prepare Repository:**
   - Push code to GitHub
   - Ensure `.env` is in `.gitignore`

2. **Deploy on Render:**
   - Go to https://render.com
   - Sign up / Login
   - Click "New +" → "Web Service"
   - Connect your GitHub repository
   - Configure:
     - **Name:** lensportfolio-backend
     - **Root Directory:** backend
     - **Environment:** Node
     - **Build Command:** `npm install`
     - **Start Command:** `npm start`
     - **Plan:** Free

3. **Add Environment Variables:**
   Click "Environment" and add:
   ```
   MONGODB_URI=your_mongodb_connection_string
   JWT_SECRET=your_random_secret_key_min_32_chars
   AWS_ACCESS_KEY_ID=your_aws_access_key
   AWS_SECRET_ACCESS_KEY=your_aws_secret_key
   AWS_REGION=us-east-1
   AWS_BUCKET_NAME=lensportfolio-media
   FRONTEND_URL=https://your-frontend-url.vercel.app
   PORT=5000
   ```

4. **Deploy:**
   - Click "Create Web Service"
   - Wait for deployment (5-10 minutes)
   - Copy your backend URL (e.g., `https://lensportfolio-backend.onrender.com`)

### Option B: AWS EC2 (Advanced)

See detailed EC2 instructions in main README.md

---

## 4. Frontend Deployment

### Option A: Vercel (Easiest - Recommended)

1. **Install Vercel CLI:**
   ```bash
   npm install -g vercel
   ```

2. **Deploy:**
   ```bash
   cd frontend
   vercel
   ```

3. **Configure:**
   - Follow prompts
   - Choose project name
   - Set root directory to `frontend`

4. **Add Environment Variable:**
   - Go to Vercel Dashboard
   - Select your project
   - Go to Settings → Environment Variables
   - Add:
     ```
     VITE_API_URL=https://your-backend-url.onrender.com/api
     ```

5. **Redeploy:**
   ```bash
   vercel --prod
   ```

### Option B: AWS Amplify

1. Go to AWS Amplify Console
2. Click "New app" → "Host web app"
3. Connect GitHub repository
4. Configure build settings:
   - **Build command:** `cd frontend && npm install && npm run build`
   - **Output directory:** `frontend/dist`
5. Add environment variable:
   - `VITE_API_URL`: Your backend URL
6. Click "Save and deploy"

---

## 5. Create Admin User

### Method 1: Using Script (Recommended)

1. **On your local machine:**
   ```bash
   cd backend
   node createAdmin.js
   ```

2. Enter your admin email and password when prompted

### Method 2: Using MongoDB Compass

1. Download MongoDB Compass
2. Connect using your MongoDB URI
3. Go to `lensportfolio` database → `users` collection
4. Insert document:
   ```json
   {
     "email": "admin@lensportfolio.com",
     "password": "$2a$10$hashed_password_here",
     "role": "admin"
   }
   ```
   Note: Password must be bcrypt hashed

### Method 3: Using API (First Time Only)

If you enabled the register endpoint:
```bash
curl -X POST https://your-backend-url.com/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@lensportfolio.com","password":"your_password"}'
```

---

## 6. Post-Deployment Testing

### Test Backend
```bash
curl https://your-backend-url.com/api/posts
```
Should return: `{"posts":[],"total":0}`

### Test Frontend
1. Visit your frontend URL
2. Navigate to `/admin/login`
3. Login with admin credentials
4. Try uploading a test image

### Test S3 Upload
1. Login to admin panel
2. Go to Upload page
3. Select an image
4. Fill in details
5. Click Upload
6. Check if image appears in S3 bucket

---

## 7. Custom Domain Setup (Optional)

### For Vercel:
1. Go to Project Settings → Domains
2. Add your custom domain
3. Follow DNS configuration instructions

### For Render:
1. Go to Dashboard → Settings → Custom Domains
2. Add your domain
3. Update DNS records as instructed

---

## 8. Environment Variables Reference

### Backend (.env)
```env
PORT=5000
MONGODB_URI=mongodb+srv://user:pass@cluster.mongodb.net/lensportfolio
JWT_SECRET=your_super_secret_key_minimum_32_characters_long
AWS_ACCESS_KEY_ID=AKIAIOSFODNN7EXAMPLE
AWS_SECRET_ACCESS_KEY=wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY
AWS_REGION=us-east-1
AWS_BUCKET_NAME=lensportfolio-media
FRONTEND_URL=https://your-frontend-url.vercel.app
```

### Frontend (.env)
```env
VITE_API_URL=https://your-backend-url.onrender.com/api
```

---

## 9. Troubleshooting

### Backend won't start
- Check MongoDB connection string
- Verify all environment variables are set
- Check logs for specific errors

### Can't upload images
- Verify AWS credentials
- Check S3 bucket permissions
- Ensure CORS is configured on S3

### CORS errors
- Update `FRONTEND_URL` in backend .env
- Check CORS configuration in server.js

### Images not loading
- Check S3 bucket public access
- Verify image URLs in database
- Check browser console for errors

---

## 10. Maintenance

### Update Backend
```bash
git pull
cd backend
npm install
# Restart service (depends on hosting)
```

### Update Frontend
```bash
git pull
cd frontend
npm install
npm run build
# Redeploy (depends on hosting)
```

### Backup Database
Use MongoDB Atlas automated backups or:
```bash
mongodump --uri="your_mongodb_uri"
```

---

## 11. Cost Estimates

### Free Tier (Recommended for starting)
- MongoDB Atlas: Free (512MB storage)
- AWS S3: ~$0.023/GB/month
- Render: Free (with limitations)
- Vercel: Free (with limitations)

**Total: ~$0-5/month** for small portfolio

### Production Tier
- MongoDB Atlas: $9/month (2GB)
- AWS S3: ~$0.023/GB/month
- Render: $7/month
- Vercel: $20/month

**Total: ~$36-50/month** for professional use

---

## Support

If you encounter issues:
1. Check the troubleshooting section
2. Review deployment logs
3. Verify all environment variables
4. Check AWS/MongoDB/hosting service status pages

---

**Deployment Complete! 🎉**

Your photography portfolio is now live and ready to showcase your work!
