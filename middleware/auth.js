const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
  const token = req.headers['authorization']?.split(' ')[1]; // Get token from Bearer token

  if (!token) {
    return res.status(403).json({ message: "No token provided" });
  }

  try {
    console.log("Verifying token:", token);
    console.log("Using SECRET_KEY:", process.env.SECRET_KEY);

    // Decode token using secret key
    const decoded = jwt.verify(token, process.env.SECRET_KEY);

    // Store decoded information (like userId) in request for further use
    req.userId = decoded.id;
    next(); // Proceed to the next middleware/controller
  } catch (error) {
    console.error("JWT verification failed:", error);
    return res.status(401).json({ message: "Invalid or expired token" });
  }
};

module.exports = { verifyToken };
