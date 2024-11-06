const userService = require('../service/user');
const responseHelper = require('../helper/respon'); // Importing the response helper

// Fungsi untuk mendaftar user
exports.registerUser = async (req, res) => {
  try {
    const userData = req.body;
    const result = await userService.registerUser(userData);
    
    // Menggunakan createResponse untuk merespons
    const response = responseHelper.createResponse(200, true, 'User registered successfully', result);
    return res.status(201).json(response);
    
  } catch (error) {
    console.error('Error in registerUser controller:', error.message);
    
    // Menggunakan createResponse untuk merespons error
    const response = responseHelper.createResponse(400, false, 'Error registering user', error.message);
    return res.status(400).json(response);
  }
};

// Fungsi untuk login user
exports.loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Validasi email dan password
    const result = await userService.authenticateUser(email, password);

    if (!result) {
      // Menggunakan createResponse untuk merespons error login
      const response = responseHelper.createResponse(401, false, "Invalid email or password", null);
      return res.status(401).json(response);
    }

    // Jika login sukses, kembalikan token dan user
    const response = responseHelper.createResponse(200, true, "Login successful", { token: result.token });
    return res.status(200).json(response);

  } catch (error) {
    console.error("Error in loginUser controller:", error);

    // Menggunakan createResponse untuk merespons error server
    const response = responseHelper.createResponse(500, false, "Internal server error", error.message);
    return res.status(500).json(response);
  }
};



exports.getProfile = async (req, res) => {
    try {
        const userId = req.authID; // `authID` set by getAuthId middleware

        // Call the service to get the profile
        const user = await userService.getProfile(userId);

        if (!user) {
            // If no user found, return a 404 response
            const response = responseHelper.createResponse(404, false, 'User not found', null);
            return res.status(404).json(response);
        }

        // If user found, return the user profile with a 200 response
        const response = responseHelper.createResponse(200, true, 'User profile fetched successfully', user);
        return res.status(200).json(response);
    } catch (error) {
        console.error("Error in getProfile controller:", error);
        const response = responseHelper.createResponse(500, false, 'Internal server error', error.message);
        return res.status(500).json(response);
    }
};