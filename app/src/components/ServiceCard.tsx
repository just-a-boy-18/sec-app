import { cn } from '@/lib/utils';
import type { LucideIcon } from 'lucide-react';

interface ServiceCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  className?: string;
}

export function ServiceCard({ icon: Icon, title, description, className }: ServiceCardProps) {
  return (
    <div
      className={cn(
        'group relative p-6 bg-card/50 border border-white/10 rounded-lg',
        'hover:border-cyan/30 hover:bg-card/80 transition-all duration-300',
        'hover:-translate-y-1',
        className
      )}
    >
      <div className="flex items-start gap-4">
        <div className="flex-shrink-0 w-10 h-10 flex items-center justify-center rounded-md bg-cyan/10 border border-cyan/20">
          <Icon className="w-5 h-5 text-cyan" />
        </div>
        <div>
          <h3 className="font-heading font-semibold text-foreground mb-1">
            {title}
          </h3>
          <p className="text-sm text-muted-foreground leading-relaxed">
            {description}
          </p>
        </div>
      </div>
    </div>
  );
}
