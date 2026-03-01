# Quick Start Guide - LensPortfolio

Get your photography portfolio running in 15 minutes!

## Prerequisites Checklist

- [ ] Node.js installed (v18+)
- [ ] MongoDB Atlas account (free)
- [ ] AWS account (free tier)
- [ ] Git installed

---

## Step 1: Clone & Install (2 minutes)

```bash
# Navigate to project
cd "Photography portfolio"

# Install backend dependencies
cd backend
npm install

# Install frontend dependencies
cd ../frontend
npm install
```

---

## Step 2: MongoDB Setup (3 minutes)

1. Go to https://mongodb.com/cloud/atlas
2. Create free account → Create cluster (M0 Free)
3. Create database user (save username/password)
4. Allow access from anywhere (0.0.0.0/0)
5. Get connection string:
   - Click "Connect" → "Connect your application"
   - Copy the string
   - Replace `<password>` with your password

Example: `mongodb+srv://admin:mypass123@cluster0.xxxxx.mongodb.net/lensportfolio`

---

## Step 3: AWS S3 Setup (5 minutes)

### Create Bucket
1. AWS Console → S3 → Create bucket
2. Name: `lensportfolio-media-[your-name]` (must be unique)
3. **Uncheck** "Block all public access"
4. Create bucket

### Configure CORS
1. Click bucket → Permissions → CORS
2. Paste this:

```json
[
    {
        "AllowedHeaders": ["*"],
        "AllowedMethods": ["GET", "PUT", "POST", "DELETE"],
        "AllowedOrigins": ["*"],
        "ExposeHeaders": ["ETag"]
    }
]
```

### Create IAM User
1. IAM Console → Users → Add user
2. Name: `lensportfolio-user`
3. Access type: Programmatic access
4. Attach policy: `AmazonS3FullAccess`
5. **Save Access Key ID and Secret Access Key**

---

## Step 4: Configure Environment (2 minutes)

### Backend .env

Create `backend/.env`:

```env
PORT=5000
MONGODB_URI=mongodb+srv://your-user:your-pass@cluster.mongodb.net/lensportfolio
JWT_SECRET=my_super_secret_jwt_key_change_this_in_production_min_32_chars
AWS_ACCESS_KEY_ID=YOUR_AWS_ACCESS_KEY
AWS_SECRET_ACCESS_KEY=YOUR_AWS_SECRET_KEY
AWS_REGION=us-east-1
AWS_BUCKET_NAME=lensportfolio-media-yourname
FRONTEND_URL=http://localhost:5173
```

### Frontend .env

Create `frontend/.env`:

```env
VITE_API_URL=http://localhost:5000/api
```

---

## Step 5: Create Admin User (1 minute)

```bash
cd backend
node createAdmin.js
```

Enter your email and password when prompted.

Example:
- Email: `admin@example.com`
- Password: `Admin123!`

---

## Step 6: Start Application (1 minute)

### Terminal 1 - Backend
```bash
cd backend
npm run dev
```

Should see: `Server running on port 5000` and `MongoDB Connected`

### Terminal 2 - Frontend
```bash
cd frontend
npm run dev
```

Should see: `Local: http://localhost:5173`

---

## Step 7: Test Everything (1 minute)

### Test Public Site
1. Open http://localhost:5173
2. Should see home page with hero image

### Test Admin Login
1. Go to http://localhost:5173/admin/login
2. Login with your admin credentials
3. Should redirect to dashboard

### Test Upload
1. Click "Upload" in admin sidebar
2. Select an image from your computer
3. Add caption: "Test Photo"
4. Select category: "Nature"
5. Click "Upload Post"
6. Should redirect to manage page with your photo

### Test Public View
1. Go back to http://localhost:5173
2. Should see your uploaded photo on home page
3. Click on it to view details
4. Try liking and commenting

---

## Common Issues & Fixes

### "MongoDB connection error"
- Check your connection string
- Verify password is correct (no special characters issues)
- Ensure IP whitelist includes 0.0.0.0/0

### "AWS S3 upload failed"
- Verify AWS credentials are correct
- Check bucket name matches
- Ensure bucket CORS is configured
- Verify IAM user has S3 permissions

### "Cannot find module"
- Run `npm install` in both backend and frontend
- Delete `node_modules` and reinstall if needed

### Port already in use
- Backend: Change PORT in .env
- Frontend: Change port in vite.config.js

### CORS errors
- Ensure FRONTEND_URL in backend .env is correct
- Check backend is running on port 5000

---

## Next Steps

### Customize Your Portfolio

1. **Update About Page**
   - Edit `frontend/src/pages/About.jsx`
   - Add your bio, skills, equipment

2. **Change Colors**
   - Edit `frontend/tailwind.config.js`
   - Modify primary, secondary, accent colors

3. **Add Your Photos**
   - Login to admin panel
   - Upload your best photography work
   - Organize by categories

4. **Update Contact Info**
   - Edit `frontend/src/pages/Contact.jsx`
   - Add your email, phone, location

5. **Social Links**
   - Edit `frontend/src/components/Footer.jsx`
   - Add your Instagram, Twitter, etc.

### Deploy to Production

See `DEPLOYMENT.md` for detailed deployment instructions to:
- Render (Backend)
- Vercel (Frontend)
- AWS Amplify (Alternative)

---

## Useful Commands

### Backend
```bash
npm run dev          # Start development server
npm start            # Start production server
node createAdmin.js  # Create admin user
```

### Frontend
```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build
```

---

## Project URLs

- **Frontend:** http://localhost:5173
- **Backend API:** http://localhost:5000/api
- **Admin Login:** http://localhost:5173/admin/login
- **Admin Dashboard:** http://localhost:5173/admin/dashboard

---

## Support

If you encounter issues:

1. Check this guide again
2. Review error messages in terminal
3. Check `README.md` for detailed documentation
4. Review `DEPLOYMENT.md` for deployment help

---

## Success! 🎉

Your photography portfolio is now running locally!

**What you can do now:**
- ✅ Upload photos and videos
- ✅ Organize by categories
- ✅ Share with visitors
- ✅ Track analytics
- ✅ Manage comments
- ✅ Deploy to production

**Start uploading your amazing photography work!** 📸
