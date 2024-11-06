// repositories/userRepository.js

const db = require("../connection/connection");

exports.createUser = async (userData) => {
    console.log(userData); // Log userData untuk memeriksa nilai yang dikirim
    const query = 'INSERT INTO public.users (name, firstName, lastName, email, role, password) VALUES ($1, $2, $3, $4, $5, $6) RETURNING id';
    const values = [userData.name, userData.firstName, userData.lastName, userData.email, userData.role, userData.password];
    
  try {
    const res = await db.query(query, values);
    return res.rows[0].id; // Mengembalikan id user yang baru ditambahkan
  } catch (error) {
    console.error('Error in createUser repository:', error);
    throw new Error('Database error.');
  }
};


exports.getUserByEmail = async (email) => {
    try {
      const query = 'SELECT * FROM public.users WHERE email = $1';
      const res = await db.query(query, [email]);
  
      if (res.rows.length === 0) {
        return null; // Tidak ada pengguna dengan email tersebut
      }
  
      return res.rows[0]; // Mengembalikan pengguna pertama
    } catch (error) {
      console.error("Error in getUserByEmail repository:", error);
      throw new Error("Database error");
    }
  };


  exports.getProfileById = async (id) => {
    try {
        const query = `SELECT * FROM public.users WHERE id = $1`;
        const res = await db.query(query, [id]);
        if (res.rows.length === 0) {
            return null; // No user found
        }

        return res.rows[0]; // Return the first user found
    } catch (error) {
        console.error("Error in getProfileById repository:", error);
        throw new Error("Database error");
    }
};