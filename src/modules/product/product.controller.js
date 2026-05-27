import { prisma } from "../../config/prisma.js";

// Get Products
export const getProducts = async (req, res) => {
  const products = await prisma.product.findMany();
  res.json(products);
};

// Get products By ID
export const getProductById = async (req, res) => {
  const { id } = req.params;

  try {
    const product = await prisma.product.findUnique({
      where: { id }
    });

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.json(product);

  } catch (error) {
    res.status(500).json({ message: "Error fetching product" });
  }
};

// Post Products
export const createProduct = async (req, res) => {
  const product = await prisma.product.create({
    data: req.body,
  });

  res.json(product);
};
