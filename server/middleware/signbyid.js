
import jwt from 'jsonwebtoken';

const signbyid = async (req, res, next) => {
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      const token = req.headers.authorization.split(" ")[1];

      if (!token) {
        return res.status(401).json({ message: "No token provided" });
      }

      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.userId = decoded?._id;

      return next(); // Move to the next middleware/controller
    } catch (error) {
      console.error("JWT Error:", error.message);
      return res.status(401).json({ message: "Invalid or expired token" });
    }
  }

  return res.status(401).json({ message: "Not authorized, no token" });
};

export default signbyid;
