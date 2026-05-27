import { prisma } from "../../config/prisma.js";

export const getProducts = async (req, res) => {
  const products = await prisma.product.findMany();
  res.json(products);
};

export const createProduct = async (req, res) => {
  const product = await prisma.product.create({
    data: req.body,
  });

  res.json(product);
};
