const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/User');

const generateToken = (user) => {
  return jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1d' });
};

const authService = {
    register: async ({ name, email, password, role }) => {
        const existingUser = await User.findOne({ email });
        if (existingUser) throw new Error('User already exists');
        
        // Hash the password before saving the user
        const hashedPassword = await bcrypt.hash(password, 12);
      
        const newUser = new User({ name, email, password: hashedPassword, role });
        await newUser.save();
      
        return { user: newUser, token: generateToken(newUser) };
    },
      

    login: async ({ email, password }) => {
        const user = await User.findOne({ email });
        if (!user) {
          console.log('User not found'); // Log if user is not found
          throw new Error('Invalid credentials');
        }
      
        // Log the password comparison
        console.log('Comparing passwords...');
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
          console.log('Invalid password'); // Log if password is invalid
          throw new Error('Invalid credentials');
        }
      
        console.log('Login successful'); // Log if login is successful
        return { user, token: generateToken(user) };
    },           
};

module.exports = authService;
