import { getWorks } from "@/lib/content";
import { SectionHeading } from "@/components/SectionHeading";
import { WorksBrowser } from "@/components/WorksBrowser";

export default function WorksPage() {
  return (
    <div className="space-y-8 pb-24 pt-10">
      <SectionHeading as="h1">WORKS</SectionHeading>
      <WorksBrowser works={getWorks()} />
    </div>
  );
}
