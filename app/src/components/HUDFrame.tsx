import { forwardRef } from 'react';
import { cn } from '@/lib/utils';

interface HUDFrameProps {
  className?: string;
}

export const HUDFrame = forwardRef<HTMLDivElement, HUDFrameProps>(
  ({ className }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          'absolute pointer-events-none z-10',
          className
        )}
        style={{
          inset: '8vh 6vw',
        }}
      >
        {/* Top line */}
        <div className="absolute top-0 left-0 right-0 h-px bg-cyan-dim hud-line-top" />
        {/* Bottom line */}
        <div className="absolute bottom-0 left-0 right-0 h-px bg-cyan-dim hud-line-bottom" />
        {/* Left line */}
        <div className="absolute top-0 bottom-0 left-0 w-px bg-cyan-dim hud-line-left" />
        {/* Right line */}
        <div className="absolute top-0 bottom-0 right-0 w-px bg-cyan-dim hud-line-right" />
        
        {/* Corner brackets */}
        <div className="corner-bracket corner-bracket-tl absolute -top-1 -left-1" />
        <div className="corner-bracket corner-bracket-tr absolute -top-1 -right-1" />
        <div className="corner-bracket corner-bracket-bl absolute -bottom-1 -left-1" />
        <div className="corner-bracket corner-bracket-br absolute -bottom-1 -right-1" />
      </div>
    );
  }
);

HUDFrame.displayName = 'HUDFrame';
