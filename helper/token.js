// helper/jwtHelper.js

const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config();

const secretKey = process.env.SECRET_KEY || 'your_secret_key'; // Pastikan untuk mengganti dengan kunci rahasia yang aman

// Fungsi untuk membuat JWT
exports.generateToken = (payload) => {
  return jwt.sign(payload, secretKey, { expiresIn: '1h' }); // Expiry bisa disesuaikan
};

// Fungsi untuk memverifikasi JWT
exports.verifyToken = (token) => {
  try {
    return jwt.verify(token, secretKey);
  } catch (error) {
    throw new Error('Invalid or expired token.');
  }
};
