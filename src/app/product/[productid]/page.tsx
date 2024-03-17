import { Gallery } from "@/components/gallery";
import { ProductDescription } from "@/components/product-description";
import RelatedProducts from "@/components/related-products";
import { getProductById } from "@/lib/data";
import { notFound } from "next/navigation";
import { FC, Suspense } from "react";

interface pageProps {
  params: {
    productid: string;
  };
}

const Page: FC<pageProps> = async ({ params }) => {
  const product = await getProductById(params.productid);
  if (!product) {
    notFound();
  }
  return (
    <div className="mx-auto max-w-screen-2xl px-4 pt-20">
      <div className="flex flex-col rounded-lg border border-neutral-200 bg-white p-8 pb-0 dark:border-neutral-800 dark:bg-black md:p-12 md:pb-0 lg:flex-row lg:gap-8">
        <div className="h-full w-full basis-full lg:basis-4/6 -translate-y-16 ">
          <Gallery
            images={product.images.map((image: string) => ({
              src: image,
              altText: product.title,
            }))}
          />
        </div>

        <div className="basis-full">
          <ProductDescription product={product} />
        </div>
      </div>
      <Suspense>
        <RelatedProducts id={product.id.toString()} />
      </Suspense>
    </div>
  );
};

export default Page;
