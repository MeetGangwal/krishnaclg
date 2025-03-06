import jwt from "jsonwebtoken";

const isAuthenticated = (req, res, next) => {
  try {
    let token = req.cookies?.token || (req.headers.authorization?.startsWith("Bearer ") ? req.headers.authorization.split(" ")[1] : null);


    // Check Authorization header (Bearer Token)
    const authHeader = req.headers.authorization;
    if (!token && authHeader && authHeader.startsWith("Bearer ")) {
      token = authHeader.split(" ")[1];
    }

    // If no token, reject the request
    if (!token) {
      return res.status(401).json({
        message: "User not authenticated",
        success: false,
      });
    }

    // Verify the token
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    
    // Attach user ID to request object
    req.id = decoded.id || decoded.userId; 


    // Move to the next middleware
    next();
  } catch (error) {
    console.error("Authentication Error:", error);
    return res.status(401).json({
      message: "Invalid or expired token",
      success: false,
    });
  }
};

export default isAuthenticated;
