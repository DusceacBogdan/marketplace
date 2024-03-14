import Grid from "@/components/grid";
import ProductGridItems from "@/components/product-grid-items";
import { ThemeToggle } from "@/components/ui/toggle-theme";
import { getProducts, getProductsByCategory } from "@/lib/data";
import { Product } from "@prisma/client";
import Image from "next/image";
import { Suspense } from "react";

export default async function Home() {
  // const products: Product[] = await getProductsByCategory("Versace");
  const products: Product[] = await getProducts();
  // console.log(products);
  return (
    <Suspense>
      <div className="mx-auto flex max-w-screen-2xl flex-col gap-8 px-4 pb-4 text-black dark:text-white md:flex-row min-h-screen pt-[80px] sm:pt-[90px] md:pt-[100px]">
        {/* <div className="order-first w-full flex-none md:max-w-[125px]">
            <Collections />
          </div> */}
        <div className="order-last min-h-screen w-full md:order-none">
          {products.length > 0 ? (
            <Grid className="grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
              <ProductGridItems products={products} />
            </Grid>
          ) : null}
        </div>
        {/* <div className="order-none flex-none md:order-last md:w-[125px]">
            <FilterList list={sorting} title="Sort by" />
          </div> */}
      </div>
    </Suspense>
  );
}
