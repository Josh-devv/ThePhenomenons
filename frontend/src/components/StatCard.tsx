import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";

interface StatCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  trend?: string;
  trendUp?: boolean;
  className?: string;
}

export function StatCard({
  title,
  value,
  icon: Icon,
  trend,
  trendUp,
  className,
}: StatCardProps) {
  return (
    <div className={cn("rounded-xl bg-card p-6 shadow-card", className)}>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-body text-muted-foreground">{title}</p>
          <p className="mt-1 text-[28px] font-bold text-foreground">{value}</p>
          {trend && (
            <p
              className={cn(
                "mt-1 text-small font-medium",
                trendUp ? "text-success" : "text-destructive",
              )}
            >
              {trendUp ? "↑" : "↓"} {trend}
            </p>
          )}
        </div>
        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
          <Icon className="h-6 w-6 text-primary" />
        </div>
      </div>
    </div>
  );
}
