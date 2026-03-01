# LensPortfolio Setup Checklist

Use this checklist to track your setup progress!

## 📋 Pre-Setup Requirements

- [ ] Node.js v18+ installed
- [ ] Git installed
- [ ] Code editor (VS Code recommended)
- [ ] Terminal/Command Prompt access
- [ ] Internet connection

---

## 🗄️ Database Setup (MongoDB Atlas)

- [ ] Created MongoDB Atlas account
- [ ] Created new cluster (M0 Free tier)
- [ ] Created database user with password
- [ ] Saved username and password securely
- [ ] Whitelisted IP address (0.0.0.0/0)
- [ ] Obtained connection string
- [ ] Replaced `<password>` in connection string
- [ ] Tested connection string

**Connection String Format:**
```
mongodb+srv://username:password@cluster.mongodb.net/lensportfolio
```

---

## ☁️ AWS S3 Setup

### S3 Bucket
- [ ] Created AWS account
- [ ] Navigated to S3 Console
- [ ] Created new bucket
- [ ] Chose unique bucket name
- [ ] Unchecked "Block all public access"
- [ ] Configured CORS settings
- [ ] Saved bucket name

### IAM User
- [ ] Navigated to IAM Console
- [ ] Created new IAM user
- [ ] Selected "Programmatic access"
- [ ] Attached "AmazonS3FullAccess" policy
- [ ] Downloaded credentials CSV
- [ ] Saved Access Key ID
- [ ] Saved Secret Access Key
- [ ] Stored credentials securely

---

## 💻 Local Setup

### Backend
- [ ] Navigated to `backend` folder
- [ ] Ran `npm install`
- [ ] Created `.env` file
- [ ] Added `MONGODB_URI`
- [ ] Added `JWT_SECRET` (min 32 characters)
- [ ] Added `AWS_ACCESS_KEY_ID`
- [ ] Added `AWS_SECRET_ACCESS_KEY`
- [ ] Added `AWS_REGION`
- [ ] Added `AWS_BUCKET_NAME`
- [ ] Added `FRONTEND_URL`
- [ ] Verified all environment variables

### Frontend
- [ ] Navigated to `frontend` folder
- [ ] Ran `npm install`
- [ ] Created `.env` file
- [ ] Added `VITE_API_URL`
- [ ] Verified environment variable

---

## 👤 Admin User Creation

- [ ] Navigated to `backend` folder
- [ ] Ran `node createAdmin.js`
- [ ] Entered admin email
- [ ] Entered admin password
- [ ] Saved credentials securely
- [ ] Verified "Admin user created successfully" message

**Admin Credentials:**
```
Email: ___________________________
Password: _________________________
```

---

## 🚀 Running Locally

### Backend Server
- [ ] Opened terminal in `backend` folder
- [ ] Ran `npm run dev`
- [ ] Verified "Server running on port 5000"
- [ ] Verified "MongoDB Connected"
- [ ] Backend running at http://localhost:5000

### Frontend Server
- [ ] Opened new terminal in `frontend` folder
- [ ] Ran `npm run dev`
- [ ] Verified server started
- [ ] Frontend running at http://localhost:5173

---

## ✅ Testing

### Public Website
- [ ] Opened http://localhost:5173
- [ ] Home page loads correctly
- [ ] Navigation works
- [ ] Gallery page accessible
- [ ] Feed page accessible
- [ ] Collections page accessible
- [ ] About page accessible
- [ ] Contact page accessible

### Admin Login
- [ ] Navigated to http://localhost:5173/admin/login
- [ ] Entered admin credentials
- [ ] Successfully logged in
- [ ] Redirected to dashboard
- [ ] Dashboard shows statistics

### Upload Test
- [ ] Clicked "Upload" in admin sidebar
- [ ] Selected test image
- [ ] Added caption
- [ ] Selected category
- [ ] Added tags
- [ ] Clicked "Upload Post"
- [ ] Upload successful
- [ ] Redirected to manage page
- [ ] Post appears in list

### Public View Test
- [ ] Returned to home page
- [ ] Uploaded post visible
- [ ] Clicked on post
- [ ] Post detail page loads
- [ ] Tried liking post
- [ ] Like count increased
- [ ] Added test comment
- [ ] Comment appears

---

## 🎨 Customization

### Branding
- [ ] Updated colors in `tailwind.config.js`
- [ ] Changed logo/brand name
- [ ] Updated favicon

### Content
- [ ] Updated About page with bio
- [ ] Added skills and equipment
- [ ] Updated contact information
- [ ] Added social media links
- [ ] Updated footer content

### Photos
- [ ] Uploaded portfolio photos
- [ ] Organized by categories
- [ ] Added captions and tags
- [ ] Set featured images

---

## 🌐 Deployment (Optional)

### Backend Deployment
- [ ] Chose hosting platform (Render/AWS EC2)
- [ ] Created account
- [ ] Connected repository
- [ ] Configured build settings
- [ ] Added environment variables
- [ ] Deployed backend
- [ ] Verified backend URL works
- [ ] Tested API endpoints

### Frontend Deployment
- [ ] Chose hosting platform (Vercel/AWS Amplify)
- [ ] Created account
- [ ] Connected repository
- [ ] Configured build settings
- [ ] Added environment variables
- [ ] Updated `VITE_API_URL` to backend URL
- [ ] Deployed frontend
- [ ] Verified frontend URL works
- [ ] Tested all pages

### Post-Deployment
- [ ] Updated backend `FRONTEND_URL` to production URL
- [ ] Redeployed backend
- [ ] Tested upload functionality
- [ ] Tested like/comment features
- [ ] Verified analytics tracking
- [ ] Tested on mobile devices
- [ ] Tested on different browsers

---

## 🔒 Security Checklist

- [ ] Changed default JWT_SECRET
- [ ] Used strong admin password
- [ ] Disabled register endpoint (after first use)
- [ ] Verified environment variables not in git
- [ ] Checked `.gitignore` includes `.env`
- [ ] AWS credentials stored securely
- [ ] MongoDB password is strong
- [ ] CORS configured correctly
- [ ] Rate limiting enabled

---

## 📱 SEO & Performance

- [ ] Updated meta tags in `index.html`
- [ ] Added site description
- [ ] Added Open Graph tags
- [ ] Tested page load speed
- [ ] Verified images load properly
- [ ] Checked mobile responsiveness
- [ ] Tested on different screen sizes

---

## 📊 Analytics Setup

- [ ] Verified visitor tracking works
- [ ] Checked view counts increment
- [ ] Tested like tracking
- [ ] Verified analytics dashboard
- [ ] Checked recent posts display

---

## 🐛 Troubleshooting

If you encounter issues, check:

- [ ] All environment variables are set
- [ ] MongoDB connection string is correct
- [ ] AWS credentials are valid
- [ ] S3 bucket permissions are correct
- [ ] CORS is configured on S3
- [ ] Backend server is running
- [ ] Frontend server is running
- [ ] No port conflicts
- [ ] Firewall not blocking connections

---

## 📚 Documentation Review

- [ ] Read README.md
- [ ] Read QUICKSTART.md
- [ ] Reviewed DEPLOYMENT.md
- [ ] Checked PROJECT_STRUCTURE.md
- [ ] Reviewed FEATURES.md
- [ ] Read API_DOCUMENTATION.md

---

## 🎯 Next Steps

After completing setup:

- [ ] Upload 10-20 portfolio photos
- [ ] Organize into categories
- [ ] Write compelling captions
- [ ] Add relevant tags
- [ ] Test all features thoroughly
- [ ] Share with friends for feedback
- [ ] Plan deployment strategy
- [ ] Prepare custom domain (optional)
- [ ] Create social media accounts
- [ ] Plan content strategy

---

## 📝 Notes

Use this space for your own notes:

```
MongoDB URI: _________________________________

AWS Bucket: __________________________________

Backend URL: _________________________________

Frontend URL: ________________________________

Admin Email: _________________________________

Custom Domain: _______________________________

Other Notes:
_____________________________________________
_____________________________________________
_____________________________________________
_____________________________________________
```

---

## ✨ Completion

- [ ] All setup steps completed
- [ ] Application running locally
- [ ] Admin access working
- [ ] Upload functionality tested
- [ ] Public website functional
- [ ] Ready for deployment OR deployed
- [ ] Documentation reviewed
- [ ] Customization complete

---

## 🎉 Success!

Once all items are checked, your LensPortfolio is ready!

**Congratulations on setting up your professional photography portfolio!**

---

**Date Completed:** _______________

**Time Taken:** _______________

**Deployed URL:** _______________

---

## 📞 Need Help?

If stuck on any step:

1. Review the relevant documentation file
2. Check the troubleshooting section
3. Verify all prerequisites are met
4. Double-check environment variables
5. Review error messages carefully
6. Check service status pages (AWS, MongoDB)

---

**Keep this checklist for reference and future updates!**
