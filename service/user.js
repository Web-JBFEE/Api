// services/userService.js

const bcrypt = require('bcrypt');
const userRepository = require('../repo/user');
const jwtHelper = require('../helper/token'); // Import jwtHelper

exports.registerUser = async (data) => {
  // Validasi konfirmasi kata sandi
  if (data.password !== data.confirm_password) {
    throw new Error('Password and confirm password do not match.');
  }

  // Melakukan hash password sebelum menyimpannya ke database
  const hashedPassword = await bcrypt.hash(data.password, 10);

  // Menyiapkan objek user baru dengan password yang sudah di-hash
  const newUser = {
    name: data.name,
    firstName: data.firstName,
    lastName: data.lastName,
    email: data.email,
    role: data.role,
    password: hashedPassword,
  };

  // Menggunakan repository untuk memasukkan user ke database
  const userId = await userRepository.createUser(newUser);

  // Buat token JWT menggunakan ID user atau informasi lainnya
  const token = jwtHelper.generateToken({ id: userId, role: newUser.role });

  return { token }; // Mengembalikan ID dan token
};


exports.authenticateUser = async (email, password) => {
    try {
      // Mencari pengguna berdasarkan email
      const user = await userRepository.getUserByEmail(email);
  
      if (!user) {
        return null; // Pengguna tidak ditemukan
      }
  
      // Memeriksa apakah password sesuai dengan yang ada di database
      const isPasswordValid = await bcrypt.compare(password, user.password);
  
      if (!isPasswordValid) {
        return null; // Password tidak valid
      }
  
      // Jika password valid, buat token JWT
      const token = jwtHelper.generateToken({ id: user.id, role: user.role });
  
      return { user, token }; // Mengembalikan user dan token
    } catch (error) {
      console.error("Error in authenticateUser service:", error);
      throw new Error("Error authenticating user");
    }
  };

  exports.getProfile = async (id) => {
    try {
        // Get the user profile by ID using the correct repository method
        const user = await userRepository.getProfileById(id);

        if (!user) {
            return null; // User not found
        }

        return user; // Return the user object
    } catch (error) {
        console.error("Error in getProfile service:", error);
        throw new Error("Error retrieving user profile");
    }
};
