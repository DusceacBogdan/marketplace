import Grid from "@/components/grid";
import Pagination from "@/components/pagination";
import ProductGridItems from "@/components/grid/product-grid-items";
import { ThemeToggle } from "@/components/ui/toggle-theme";
import { getNumberOfProducts, getProducts, getTotalPages } from "@/lib/data";
import { Product } from "@prisma/client";
import Image from "next/image";
import { Suspense } from "react";
import { pageLimit } from "@/lib/constants";

export default async function Home({
  searchParams,
}: {
  searchParams?: { query?: string; page?: string };
}) {
  const query = searchParams?.query || "";
  const currentPage = Number(searchParams?.page) || 1;
  const numberOfProducts = await getNumberOfProducts(query);
  const totalPages = getTotalPages(numberOfProducts, pageLimit);
  const products: Product[] = await getProducts(query, currentPage, pageLimit);

  const resultsText2 = products.length > 1 ? "results" : "result";
  const resultsText = products.length > 1 ? "are" : "is";
  return (
    <div className="pt-20">
      {query ? (
        <p className="mb-4">
          {products.length === 0
            ? "There are no products that match "
            : `There ${resultsText} in total ${numberOfProducts} ${resultsText2} for `}
          <span className="font-bold">&quot;{query}&quot;</span>
        </p>
      ) : null}

      {products.length > 0 ? (
        <>
          <Suspense key={query + currentPage}>
            <Grid className="grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
              <ProductGridItems products={products} />
            </Grid>
          </Suspense>
          <div className="mt-5 flex w-full justify-center">
            <Pagination totalPages={totalPages} />
          </div>
        </>
      ) : null}
    </div>
  );
}
