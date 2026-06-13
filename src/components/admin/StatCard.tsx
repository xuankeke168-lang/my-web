interface StatCardProps {
  label: string;
  value: string | number;
  unit?: string;
  icon: string;
  trend: string;
  isText?: boolean;
}

export default function StatCard({
  label,
  value,
  unit,
  icon,
  trend,
  isText = false,
}: StatCardProps) {
  return (
    <div className="p-5 bg-white dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800 card-lift">
      <div className="flex items-center justify-between mb-3">
        <span className="text-sm text-zinc-500 dark:text-zinc-500">
          {label}
        </span>
        <span className="text-xl">{icon}</span>
      </div>
      <div className="flex items-baseline gap-1">
        <span
          className={`font-bold text-zinc-900 dark:text-white ${
            isText ? "text-base" : "text-3xl"
          }`}
        >
          {value}
        </span>
        {!isText && unit && (
          <span className="text-sm text-zinc-500 dark:text-zinc-500">
            {unit}
          </span>
        )}
      </div>
      <p className="text-xs text-zinc-400 dark:text-zinc-600 mt-2 truncate">
        {trend}
      </p>
    </div>
  );
}
