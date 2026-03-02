require('dotenv').config();
const mongoose = require('mongoose');
const User = require('./models/User');

async function checkAdmin() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Connected to MongoDB');
    
    const users = await User.find();
    console.log(`\nTotal users in database: ${users.length}`);
    
    if (users.length === 0) {
      console.log('❌ No users found! Admin not created.');
      console.log('\nRun: node createAdmin.js');
    } else {
      console.log('\n📋 Users found:');
      users.forEach(user => {
        console.log(`- Email: ${user.email}`);
        console.log(`  Role: ${user.role}`);
        console.log(`  Created: ${user.createdAt}`);
      });
    }
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
}

checkAdmin();
