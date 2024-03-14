// import type { Product } from "@prisma/client";
import prisma from "./db";

export async function getProducts() {
  const products = await prisma.product.findMany();
  return products;
}

export async function getProductsByCategory(category: string) {
  const products = await prisma.product.findMany({
    where: {
      category: category,
    },
  });
  return products;
}

export async function getProductById(id: string) {
  try {
    const product = await prisma.product.findUnique({
      where: {
        id: BigInt(id),
      },
    });
    return product;
  } catch (error) {
    // Error handling logic here
    console.error("Error finding product:", error);

    return null;
  }
}
