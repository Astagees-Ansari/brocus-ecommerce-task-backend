import { prisma } from "../../config/prisma.js";

export const purchase = async (req, res) => {
  const { productId, quantity } = req.body;

  const product = await prisma.product.findUnique({
    where: { id: productId },
  });

  const order = await prisma.order.create({
    data: {
      userId: req.user.id,
      productId,
      quantity,
      totalPrice: product.price * quantity,
    },
  });

  res.json(order);
};

export const getOrders = async (req, res) => {
  try {
    const orders = await prisma.order.findMany({
      where: {
        userId: req.user.id
      },
      include: {
        product: true
      }
    });

    res.json(orders);

  } catch (error) {
    console.log("ERROR:", error); // 👈 ADD THIS
    res.status(500).json({ message: "Error fetching orders" });
  }
};