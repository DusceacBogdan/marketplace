"use client";

import { SearchIcon } from "lucide-react";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";

export default function Search() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace, push } = useRouter();

  const handleSearch = useDebouncedCallback((term) => {
    const params = new URLSearchParams(searchParams);
    if (term !== "") {
      params.set("query", term);
    } else params.delete("query");
    replace(`${pathname}?${params.toString()}`); //no history update
  }, 300);

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const val = e.target as HTMLFormElement;
    const search = val.search as HTMLInputElement;

    const params = new URLSearchParams(searchParams);
    if (search.value !== "") {
      params.set("query", search.value);
    } else params.delete("query");
    push(`/?${params.toString()}`); //with history update
  };

  return (
    <form
      className="w-max-[550px] relative w-full sm:w-80 xl:w-100"
      onSubmit={onSubmit}
    >
      <input
        className="peer w-full rounded-lg border bg-white px-4 py-2 text-sm text-black placeholder:text-neutral-500 dark:border-neutral-800 dark:bg-transparent dark:text-white dark:placeholder:text-neutral-400"
        key={searchParams?.get("q")}
        onChange={(e) => handleSearch(e.target.value)}
        type="text"
        name="search"
        placeholder="Search for products..."
        autoComplete="off"
        defaultValue={searchParams?.get("query") || ""}
      />
      <div className="absolute right-0 top-0 mr-3 flex h-full items-center text-neutral-500 peer-focus:text-gray-900 dark:peer-focus:text-gray-200">
        <SearchIcon className="h-4" />
      </div>
    </form>
  );
}
