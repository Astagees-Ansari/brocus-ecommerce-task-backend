import { prisma } from "../../config/prisma.js";
import { hashPassword, comparePassword } from "../../utils/hash.js";
import { generateToken } from "../../utils/jwt.js";

export const signup = async (req, res) => {
  const { name, email, password } = req.body;

  const hashed = await hashPassword(password);

  const user = await prisma.user.create({
    data: { name, email, password: hashed },
  });

  res.json({ token: generateToken(user) });
};

export const login = async (req, res) => {
  const { email, password } = req.body;

  const user = await prisma.user.findUnique({ where: { email } });

  if (!user || !(await comparePassword(password, user.password))) {
    return res.status(400).json({ message: "Invalid credentials" });
  }

  res.json({ token: generateToken(user) });
};
