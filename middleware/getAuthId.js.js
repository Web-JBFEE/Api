const jwt = require('jsonwebtoken');

const getAuthId = (req, res, next) => {
  const token = req.headers['authorization']?.split(' ')[1]; // Extract Bearer token
  
  if (!token) {
    return res.status(403).json({ message: "No token provided" });
  }

  try {
    const decoded = jwt.verify(token, process.env.SECRET_KEY); // Verify token
    req.authID = parseInt(decoded.id, 10); // Parse the `id` from the token and attach to req
    next(); // Continue to the next middleware/controller
  } catch (error) {
    console.error("JWT verification failed:", error);
    return res.status(401).json({ message: "Invalid or expired token" });
  }
};

module.exports = getAuthId;
