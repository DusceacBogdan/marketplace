import { getProductById } from "@/lib/data";
import { notFound } from "next/navigation";
import { FC } from "react";

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
  return <div>{product?.description}</div>;
};

export default Page;