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
