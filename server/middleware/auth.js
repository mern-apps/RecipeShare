import jwt from 'jsonwebtoken';

const auth = async (req, res, next) => {

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
        const token = req.headers.authorization.split(" ")[1];

        if (!token) return res.status(401).json({message:"no token"})

      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.userId = decoded?._id;

      next();

    } catch (error) {
      console.error(error);
      res.status(401);
      throw new Error('Not authorized, token failed');
    }
  } else {
    res.status(401);
    throw new Error('Not authorized, no token');
  }
};

export default auth;
