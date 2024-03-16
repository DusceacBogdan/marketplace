import Form from "@/components/create-form";
import { Separator } from "@/components/ui/separator";
import { getAllCategories } from "@/lib/data";

export default async function Page() {
  const categories = await getAllCategories();
  return (
    <main className="pb-10 pt-20 px-5 flex justify-center">
      <div className="space-y-6 max-w-4xl w-full">
        <div>
          <h3 className="text-lg font-medium">Profile</h3>
          <p className="text-sm text-muted-foreground">
            This is how others will see you on the site.
          </p>
        </div>
        <Separator />
        <Form categories={categories} />
      </div>
    </main>
  );
}
