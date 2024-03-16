import { Product } from "@prisma/client";
import Link from "next/link";
import Grid from ".";
import { GridTileImage } from "./tile";
// import { Suspense } from "react";

export default function ProductGridItems({
  products,
}: {
  products: Product[];
}) {
  return (
    <>
      {products.map((product) => (
        // <Suspense key={product.id}>
        <Grid.Item key={product.id} className="animate-fadeIn">
          <Link
            className="relative inline-block h-full w-full"
            href={`/product/${product.id}`}
          >
            <GridTileImage
              alt={product.title}
              label={{
                title: product.title,
                amount: product.price.toString(),
              }}
              src={product.images[0]}
              fill
              sizes="(min-width: 768px) 33vw, (min-width: 640px) 50vw, 100vw"
            />
          </Link>
        </Grid.Item>
        // </Suspense>
      ))}
    </>
  );
}
