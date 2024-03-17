import { Product } from "@prisma/client";
import Price from "./price";
import Prose from "./prose";
import { Button } from "./ui/button";

export function ProductDescription({ product }: { product: Product }) {
  return (
    <>
      <div className="mb-6 flex flex-col border-b pb-6 dark:border-neutral-700">
        <h1 className="mb-2 text-5xl font-medium">{product.title}</h1>
        <div className="mr-auto w-auto rounded-full bg-blue-600 p-2 text-sm text-white">
          <Price currencyCode="USD" amount={product.price.toString()} />
        </div>
      </div>

      {product.description ? (
        <Prose
          className="mb-6 text-sm leading-tight dark:text-white/[60%]"
          text={product.description}
        />
      ) : null}

      <Button
        className="flex w-full items-center justify-center rounded-full bg-blue-600 p-4 tracking-wide dark:text-white"
        size="lg"
      >
        Add To Cart
      </Button>
    </>
  );
}
