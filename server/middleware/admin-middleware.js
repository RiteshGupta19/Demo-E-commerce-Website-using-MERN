const adminMiddleware = async (req, res, next) => {
  try {
    // Assuming isAdmin is a property of req.user
    const isAdminn = req.user.isAdmin;

    if (!isAdminn) {
      return res.status(403).json({ msg: "Access denied, user is not an admin" });
    }

    next();
  } catch (error) {
    next(error);
  }
};

module.exports = adminMiddleware;
