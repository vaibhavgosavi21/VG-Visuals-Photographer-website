require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, default: 'admin' }
});

const User = mongoose.model('User', userSchema);

async function createAdmin() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    rl.question('Enter admin email: ', async (email) => {
      rl.question('Enter admin password: ', async (password) => {
        try {
          const existingUser = await User.findOne({ email });
          if (existingUser) {
            console.log('User already exists!');
            process.exit(1);
          }

          const hashedPassword = await bcrypt.hash(password, 10);
          const user = new User({
            email,
            password: hashedPassword,
            role: 'admin'
          });

          await user.save();
          console.log('✅ Admin user created successfully!');
          console.log(`Email: ${email}`);
          process.exit(0);
        } catch (error) {
          console.error('Error creating user:', error);
          process.exit(1);
        }
      });
    });
  } catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1);
  }
}

createAdmin();
