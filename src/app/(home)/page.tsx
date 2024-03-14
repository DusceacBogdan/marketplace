import Grid from "@/components/grid";
import Pagination from "@/components/pagination";
import ProductGridItems from "@/components/grid/product-grid-items";
import { ThemeToggle } from "@/components/ui/toggle-theme";
import { getNumberOfProducts, getProducts, getTotalPages } from "@/lib/data";
import { Product } from "@prisma/client";
import Image from "next/image";
import { Suspense } from "react";

export default async function Home({
  searchParams,
}: {
  searchParams?: { query?: string; page?: string };
}) {
  const query = searchParams?.query || "";
  const currentPage = Number(searchParams?.page) || 1;
  const totalPages = await getTotalPages(query, 9);
  const products: Product[] = await getProducts(query, currentPage, 9);
  const numberOfProducts = await getNumberOfProducts(query);
  const resultsText2 = products.length > 1 ? "results" : "result";
  const resultsText = products.length > 1 ? "are" : "is";
  return (
    <Suspense>
      <div className="mx-auto flex max-w-screen-2xl flex-col gap-8 px-4 pb-4 text-black dark:text-white md:flex-row min-h-screen pt-[80px] sm:pt-[90px] md:pt-[100px]">
        {/* <div className="order-first w-full flex-none md:max-w-[125px]">
            <Collections />
          </div> */}
        <div className="order-last min-h-screen w-full md:order-none">
          {query ? (
            <p className="mb-4">
              {products.length === 0
                ? "There are no products that match "
                : `There ${resultsText} in total ${numberOfProducts} ${resultsText2} for `}
              <span className="font-bold">&quot;{query}&quot;</span>
            </p>
          ) : null}
          {products.length > 0 ? (
            <Grid className="grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
              <ProductGridItems products={products} />
            </Grid>
          ) : null}

          <div className="mt-5 flex w-full justify-center">
            <Pagination totalPages={totalPages} />
          </div>
        </div>
        {/* <div className="order-none flex-none md:order-last md:w-[125px]">
            <FilterList list={sorting} title="Sort by" />
          </div> */}
      </div>
    </Suspense>
  );
}
