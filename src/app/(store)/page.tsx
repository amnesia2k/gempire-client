import { Button } from "@/components/ui/button";
import PageContent from "./page-content";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function HomePage() {
  return (
    <section className="space-y-10 p-5">
      <h1 className="text-center text-4xl">New Arrivals</h1>

      <PageContent />

      <div className="flex justify-center">
        <Button asChild variant="outline">
          <Link href="/products" className="inline-flex items-center gap-2">
            <span>View All Products</span>
            <ArrowRight className="h-4 w-4" />
          </Link>
        </Button>
      </div>
    </section>
  );
}
