const jwt = require("jsonwebtoken");
const User = require("../models/user-model");

const authMiddleware = async (req, res, next) => {
  const token = req.header("Authorization");

  if (!token) {
    return res.status(401).json({ message: "Unauthorized HTTP, token not provided" });
  }

  const jwttoken = token.replace("Bearer ", "").trim();
  console.log("Token from auth middleware:", jwttoken);

  try {
    const isVerified = jwt.verify(jwttoken, process.env.JWT_SECRET_KEY);
    const userData = await User.findOne({ email: isVerified.email }).select({
      password: 0,
    });

    // if (!userData) {
    //   console.log("User not found for email:", isVerified.email);
    //   return res.status(404).json({ message: "User not found" });
    // }

    console.log("User data:", userData);
    req.user = userData;
    req.token = token;
    req.userId = userData._id;

    next();
  } catch (error) {
    console.error("Authentication error:", error);
    return res.status(401).json({ message: "Unauthorized HTTP, invalid token" });
  }
};

module.exports = authMiddleware;
