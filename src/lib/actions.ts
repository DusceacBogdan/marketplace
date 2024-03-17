"use server";

import { ClientUploadedFileData } from "uploadthing/types";
import prisma from "./db";
import { z } from "zod";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

const Product = z.object({
  title: z.string(),
  description: z.string(),
  price: z.coerce.number(),
  category: z.string(),
});

export async function createProduct(
  formData: FormData,
  files: ClientUploadedFileData<string>[]
) {
  const rawFormData = Object.fromEntries(formData.entries());
  const { title, category, description, price } = Product.parse(rawFormData);

  const images =
    files.length === 0
      ? ["https://utfs.io/f/c7e662af-d2ea-48c9-9d25-30097a4a354f-n5b1b0.png"]
      : files.map((file) => file.url as string);

  if (price <= 0) {
    throw new Error("Price must be a positive number.");
  }

  try {
    await prisma.product.create({
      data: {
        title: title,
        description: description,
        price: price,
        category: category ?? "Other",
        images: images,
      },
    });
  } catch (error) {
    return { message: "Database Error: Failed to Create Product." };
  }
  revalidatePath("/home");
  redirect("/home");
}
