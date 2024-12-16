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
      // Validate that email and password are provided
      if (!email || !password) {
        throw new Error('Email and password are required');
      }
    
      // Sanitize and log email (trim and lowercase)
      const sanitizedEmail = email.trim().toLowerCase();
      console.log('Searching for email:', sanitizedEmail);
    
      // Find the user by email
      const user = await User.findOne({ email: sanitizedEmail });
      if (!user) {
        console.log('User not found for email:', sanitizedEmail);
        throw new Error('Invalid credentials');
      }
    
      // Validate password
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        console.log('Invalid password for user:', sanitizedEmail);
        throw new Error('Invalid credentials');
      }
    
      // Generate and return the token
      console.log('Login successful for user:', sanitizedEmail);
      return { user, token: generateToken(user) };
    },    
}; 

module.exports = authService;
