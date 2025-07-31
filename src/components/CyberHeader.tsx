import { Shield, Lock, Unlock, Zap } from 'lucide-react';

interface CyberHeaderProps {
  activeTab: 'encrypt' | 'decrypt';
  onTabChange: (tab: 'encrypt' | 'decrypt') => void;
}

export function CyberHeader({ activeTab, onTabChange }: CyberHeaderProps) {
  return (
    <div className="text-center space-y-6 mb-12">
      {/* Logo and Title */}
      <div className="space-y-4">
        <div className="mx-auto w-20 h-20 bg-gradient-cyber rounded-2xl flex items-center justify-center shadow-glow-primary">
          <Shield className="w-10 h-10 text-primary-foreground" />
        </div>
        <div className="space-y-2">
          <h1 className="text-4xl md:text-5xl font-mono font-bold text-glow bg-gradient-cyber bg-clip-text text-transparent">
            CyberVault
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Military-grade AES-256-GCM encryption for secure communication
          </p>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="flex justify-center">
        <div className="flex bg-muted/30 rounded-lg p-1 backdrop-blur-sm border border-border/50">
          <button
            onClick={() => onTabChange('encrypt')}
            className={`flex items-center gap-2 px-6 py-3 rounded-md font-mono font-medium transition-all duration-300 ${
              activeTab === 'encrypt'
                ? 'bg-gradient-cyber text-primary-foreground shadow-glow-primary'
                : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
            }`}
          >
            <Lock className="w-4 h-4" />
            Encrypt
          </button>
          <button
            onClick={() => onTabChange('decrypt')}
            className={`flex items-center gap-2 px-6 py-3 rounded-md font-mono font-medium transition-all duration-300 ${
              activeTab === 'decrypt'
                ? 'bg-gradient-to-r from-secondary to-accent text-primary-foreground shadow-glow-secondary'
                : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
            }`}
          >
            <Unlock className="w-4 h-4" />
            Decrypt
          </button>
        </div>
      </div>

      {/* Security Features */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-3xl mx-auto text-sm">
        <div className="flex items-center justify-center gap-2 p-3 bg-muted/20 rounded-lg border border-border/30">
          <Zap className="w-4 h-4 text-primary" />
          <span className="text-muted-foreground">AES-256-GCM</span>
        </div>
        <div className="flex items-center justify-center gap-2 p-3 bg-muted/20 rounded-lg border border-border/30">
          <Shield className="w-4 h-4 text-secondary" />
          <span className="text-muted-foreground">PBKDF2 Key Derivation</span>
        </div>
        <div className="flex items-center justify-center gap-2 p-3 bg-muted/20 rounded-lg border border-border/30">
          <Lock className="w-4 h-4 text-accent" />
          <span className="text-muted-foreground">Client-Side Security</span>
        </div>
      </div>
    </div>
  );
}