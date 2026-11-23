import { ArrowUpRight } from "lucide-react";
import { cn } from "../lib/cn";

export default function ArrowUpRightIcon({ className }: { className?: string }) {
  return <ArrowUpRight className={cn("shrink-0", className)} strokeWidth={2.4} aria-hidden="true" />;
}
