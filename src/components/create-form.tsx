"use client";
import Link from "next/link";
import { CurrencyDollarIcon } from "@heroicons/react/24/outline";
import { createProduct } from "@/lib/actions";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { GlassesIcon, ImagesIcon, PenIcon } from "lucide-react";
import { Textarea } from "./ui/textarea";
import { UploadDropzone } from "@/lib/uploadthing";
import { ClientUploadedFileData } from "uploadthing/types";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import toast from "react-hot-toast";

export default function Form({ categories }: { categories: string[] }) {
  let files: ClientUploadedFileData<string>[] = [];
  return (
    <form action={(formData) => createProduct(formData, files)}>
      <div className="flex justify-center ">
        <div className="rounded-m dark:bg-background w-full  space-y-6">
          {/* Product Title */}
          <div className="grid w-full items-center gap-1.5">
            <Label htmlFor="title">Title/Model</Label>
            <div className="relative">
              <Input
                id="title"
                name="title"
                type="text"
                placeholder="Enter product title"
                className="peer block pl-10"
                required
              />
              <GlassesIcon className=" pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500  dark:text-gray-400 peer-focus:text-gray-900 dark:peer-focus:text-gray-200" />
            </div>
          </div>

          {/* price Amount */}
          <div className="grid w-full items-center gap-1.5">
            <Label htmlFor="price">Price</Label>
            <div className="relative">
              <Input
                id="price"
                name="price"
                type="number"
                step="0.01"
                placeholder="Enter USD amount"
                className="peer block pl-10"
                min={0}
                required
              />
              <CurrencyDollarIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 dark:text-gray-400 peer-focus:text-gray-900 dark:peer-focus:text-gray-200" />
            </div>
          </div>

          {/* product description */}
          <div className="grid w-full gap-1.5">
            <Label htmlFor="message">Description</Label>
            <div className="relative">
              <Textarea
                placeholder="Type your message here."
                id="message"
                name="description"
                className="peer block pl-10"
                required
              />
              <PenIcon className="pointer-events-none absolute left-3 top-[19px] h-[18px] w-[18px] -translate-y-1/2 text-gray-500 dark:text-gray-400 peer-focus:text-gray-900 dark:peer-focus:text-gray-200" />
            </div>
          </div>
          {/* Product categories */}
          <div className="w-full">
            <Select name={"category"} required>
              <SelectTrigger>
                <SelectValue placeholder="Select a category" />
              </SelectTrigger>
              <SelectContent className="max-h-72 overflow-y-auto">
                <SelectGroup>
                  <SelectLabel>Categories</SelectLabel>
                  {categories.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          {/* Product Images */}
          <div className="grid w-full gap-1.5">
            <Label htmlFor="images">Images</Label>
            <div className="relative">
              <Input
                id="images"
                name="images"
                type="file"
                multiple
                accept="image/*"
                className="peer block pl-10" //would have used cloudinary instead of uploadthing if i had more time
                disabled
              />
              <ImagesIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 dark:text-gray-400 peer-focus:text-gray-900 dark:peer-focus:text-gray-200" />
            </div>
          </div>
          <UploadDropzone
            className="w-full max-h-72 p-2 border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-lg"
            appearance={{
              button:
                "p-4 bg-primary/80 dark:bg-primary text-white dark:text-secondary rounded-md dark:disabled:bg-gray-800 dark:disabled:text-gray-500",
              uploadIcon: "text-primary/80 dark:text-gray-200",
              label: "text-gray-900 dark:text-gray-200",
            }}
            endpoint="imageUploader"
            onClientUploadComplete={(res) => {
              // Do something with the response
              // console.log("Files: ", res);
              files = res;
              toast.success("Upload Completed");
            }}
            onUploadError={(error: Error) => {
              // Do something with the error.
              toast.error(`ERROR! ${error.message}`);
            }}
          />
        </div>
      </div>
      <div className="mt-6 flex justify-end gap-4">
        <Link href="/dashboard/invoices">
          <Button variant={"secondary"}>Cancel</Button>
        </Link>
        <Button variant={"default"} type="submit">
          Add Product
        </Button>
      </div>
    </form>
  );
}
