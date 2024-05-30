function checkRole(role) {
  return (req, res, next) => {
    // if (req.user.role !== role) {
    //   return res.status(403).json({ message: "Forbidden" });
    // }
    //todo : role check logic here
    next();
  };
}

export default checkRole;
