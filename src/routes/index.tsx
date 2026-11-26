import { createFileRoute } from "@tanstack/react-router";
import { WeekPlate } from "@/components/weekplate";

export const Route = createFileRoute("/")({ component: Home });

function Home() {
  return <WeekPlate />;
}
