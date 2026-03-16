import { cn } from '@/lib/utils';

interface StatCardProps {
  value: string;
  label: string;
  className?: string;
}

export function StatCard({ value, label, className }: StatCardProps) {
  return (
    <div
      className={cn(
        'group relative p-3 sm:p-4 lg:p-6 bg-card/50 border border-white/10 rounded-lg',
        'hover:border-cyan/30 hover:bg-card/80 transition-all duration-300',
        className
      )}
    >
      <div className="text-xl sm:text-2xl lg:text-4xl font-heading font-bold text-cyan mb-1 sm:mb-2">
        {value}
      </div>
      <div className="text-xs sm:text-sm text-muted-foreground leading-tight">
        {label}
      </div>
    </div>
  );
}
