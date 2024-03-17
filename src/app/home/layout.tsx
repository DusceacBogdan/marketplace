import { Suspense } from "react";

export default function SearchLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="mx-auto  max-w-screen-2xl px-4 pb-4 text-black dark:text-white ">
      <div className="min-h-screen w-full">
        <Suspense>{children}</Suspense>
      </div>
    </div>
  );
}
