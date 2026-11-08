import { Approach } from "@/components/home/approach";
import { Categories } from "@/components/home/categories";
import { Hero } from "@/components/home/hero";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";

export default function Home() {
  return (
    <>
      <SiteHeader />
      <main id="main" className="flex-1">
        <Hero />
        <Approach />
        <Categories />
      </main>
      <SiteFooter />
    </>
  );
}
