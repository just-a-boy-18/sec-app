import { cn } from '@/lib/utils';

interface GridOverlayProps {
  className?: string;
  opacity?: number;
}

export function GridOverlay({ className, opacity = 0.05 }: GridOverlayProps) {
  return (
    <div
      className={cn(
        'fixed inset-0 pointer-events-none z-[1]',
        className
      )}
      style={{
        opacity,
        backgroundImage: `
          repeating-linear-gradient(
            90deg,
            rgba(0, 240, 255, 0.4) 0px,
            rgba(0, 240, 255, 0.4) 1px,
            transparent 1px,
            transparent 12vw
          ),
          repeating-linear-gradient(
            0deg,
            rgba(0, 240, 255, 0.4) 0px,
            rgba(0, 240, 255, 0.4) 1px,
            transparent 1px,
            transparent 12vh
          )
        `,
      }}
    />
  );
}
