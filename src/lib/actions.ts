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
      ? [
          "https://photos.google.com/search/_tra_/photo/AF1QipPETqPU1yWulpLb7GmTpd_gvp9EqWYcWcxfsMUy",
        ]
      : files.map((file) => file.url as string);

  try {
    await prisma.product.create({
      data: {
        title: title,
        description: description,
        price: price,
        category: category,
        images: images,
      },
    });
  } catch (error) {
    return { message: "Database Error: Failed to Create Product." };
  }
  revalidatePath("/home");
  redirect("/home");
}
