interface PasswordStrengthResult {
  score: number;
  feedback: string[];
  strength: 'weak' | 'fair' | 'good' | 'strong' | 'very-strong';
}

export function analyzePasswordStrength(password: string): PasswordStrengthResult {
  let score = 0;
  const feedback: string[] = [];

  // Length check
  if (password.length >= 8) score += 1;
  else feedback.push('Use at least 8 characters');

  if (password.length >= 12) score += 1;
  else if (password.length >= 8) feedback.push('Consider using 12+ characters for better security');

  // Character variety checks
  if (/[a-z]/.test(password)) score += 1;
  else feedback.push('Add lowercase letters');

  if (/[A-Z]/.test(password)) score += 1;
  else feedback.push('Add uppercase letters');

  if (/[0-9]/.test(password)) score += 1;
  else feedback.push('Add numbers');

  if (/[^a-zA-Z0-9]/.test(password)) score += 1;
  else feedback.push('Add special characters (!@#$%^&*)');

  // Complexity bonus
  if (password.length >= 16) score += 1;
  if (/(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^a-zA-Z0-9])/.test(password)) score += 1;

  // Determine strength level
  let strength: PasswordStrengthResult['strength'];
  if (score <= 2) strength = 'weak';
  else if (score <= 4) strength = 'fair'; 
  else if (score <= 6) strength = 'good';
  else if (score <= 7) strength = 'strong';
  else strength = 'very-strong';

  return { score, feedback, strength };
}

export function getPasswordStrengthColor(strength: PasswordStrengthResult['strength']): string {
  switch (strength) {
    case 'weak': return 'hsl(0 100% 60%)';
    case 'fair': return 'hsl(30 100% 60%)';
    case 'good': return 'hsl(60 100% 60%)';
    case 'strong': return 'hsl(120 100% 50%)';
    case 'very-strong': return 'hsl(135 100% 50%)';
    default: return 'hsl(var(--muted))';
  }
}