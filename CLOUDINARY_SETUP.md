# Cloudinary Setup Guide (FREE Alternative to AWS S3)

## ✅ Why Cloudinary?
- 🆓 **25 GB storage FREE** (vs AWS 5GB)
- 🆓 **25 GB bandwidth/month FREE**
- ✅ No credit card required
- ✅ Automatic image optimization
- ✅ Easy setup (5 minutes)

---

## 🚀 Setup Steps

### 1. Create Free Account
1. Go to: https://cloudinary.com/users/register/free
2. Sign up with email (no credit card needed)
3. Verify your email

### 2. Get Your Credentials
1. After login, go to **Dashboard**
2. You'll see:
   - **Cloud Name**: `dxxxxxxxx`
   - **API Key**: `123456789012345`
   - **API Secret**: `abcdefghijklmnopqrstuvwxyz`

### 3. Update .env File
Open `backend/.env` and replace:

```env
CLOUDINARY_CLOUD_NAME=your_cloud_name_here
CLOUDINARY_API_KEY=your_api_key_here
CLOUDINARY_API_SECRET=your_api_secret_here
```

With your actual credentials from Cloudinary dashboard.

### 4. Restart Backend
```bash
cd backend
npm run dev
```

---

## ✅ That's It!

Now you can upload photos/videos and they'll be stored on Cloudinary for FREE!

### Test Upload:
1. Go to: http://localhost:5173/admin/login
2. Login with your credentials
3. Click "Upload"
4. Select a photo
5. Upload!

Your photos will be stored on Cloudinary's servers and accessible worldwide! 🌍

---

## 📊 Free Tier Limits

- **Storage**: 25 GB
- **Bandwidth**: 25 GB/month
- **Transformations**: 25,000/month
- **Images**: Unlimited

**Perfect for a photography portfolio!** 📸

---

## 🔗 Useful Links

- Dashboard: https://cloudinary.com/console
- Documentation: https://cloudinary.com/documentation
- Support: https://support.cloudinary.com

---

## 💡 Benefits Over Local Storage

✅ Photos accessible from anywhere
✅ Automatic backups
✅ Fast CDN delivery
✅ Image optimization
✅ No server storage needed
✅ Professional solution

---

**Ready to upload? Get your Cloudinary credentials and update the .env file!** 🚀
