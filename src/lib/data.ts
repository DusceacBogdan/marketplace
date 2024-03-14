// import type { Product } from "@prisma/client";
import prisma from "./db";

export async function getAllProducts() {
  const products = await prisma.product.findMany();
  return products;
}

export async function getProducts(
  query: string,
  currentPage: number,
  pageLimit: number
) {
  const products = await prisma.product.findMany({
    where: {
      OR: [
        {
          title: {
            contains: query,
            mode: "insensitive",
          },
        },
        {
          description: {
            contains: query,
            mode: "insensitive",
          },
        },
      ],
    },
    skip: (currentPage - 1) * pageLimit,
    take: pageLimit,
  });
  //limit offset pagination with prisma
  return products;
}

export async function getNumberOfProducts(query: string) {
  const count = await prisma.product.count({
    where: {
      OR: [
        {
          title: {
            contains: query,
            mode: "insensitive",
          },
        },
        {
          description: {
            contains: query,
            mode: "insensitive",
          },
        },
      ],
    },
  });
  return count;
}

export async function getTotalPages(query: string, pageLimit: number) {
  const count = await prisma.product.count({
    where: {
      OR: [
        {
          title: {
            contains: query,
            mode: "insensitive",
          },
        },
        {
          description: {
            contains: query,
            mode: "insensitive",
          },
        },
      ],
    },
  });
  return Math.ceil(count / pageLimit);
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
