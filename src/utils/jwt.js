import jwt from "jsonwebtoken";

export const generateToken = (user) =>
  jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: "7d" });
