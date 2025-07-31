import { useState } from 'react';
import { analyzePasswordStrength, getPasswordStrengthColor } from '@/lib/password-strength';
import { Progress } from '@/components/ui/progress';

interface PasswordStrengthMeterProps {
  password: string;
  className?: string;
}

export function PasswordStrengthMeter({ password, className }: PasswordStrengthMeterProps) {
  const analysis = analyzePasswordStrength(password);
  const progressValue = (analysis.score / 8) * 100;
  const strengthColor = getPasswordStrengthColor(analysis.strength);

  if (!password) return null;

  return (
    <div className={`space-y-2 ${className}`}>
      <div className="flex items-center justify-between">
        <span className="text-xs text-muted-foreground font-mono">
          Password Strength
        </span>
        <span 
          className="text-xs font-mono font-bold capitalize"
          style={{ color: strengthColor }}
        >
          {analysis.strength.replace('-', ' ')}
        </span>
      </div>
      
      <div className="relative">
        <Progress 
          value={progressValue} 
          className="h-2 bg-muted/30" 
        />
        <div 
          className="absolute top-0 left-0 h-2 rounded-full transition-all duration-300"
          style={{ 
            width: `${progressValue}%`,
            backgroundColor: strengthColor,
            boxShadow: `0 0 10px ${strengthColor}40`
          }}
        />
      </div>
      
      {analysis.feedback.length > 0 && (
        <div className="text-xs text-muted-foreground space-y-1">
          {analysis.feedback.map((tip, index) => (
            <div key={index} className="flex items-center gap-2">
              <div className="w-1 h-1 bg-muted-foreground rounded-full" />
              {tip}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}