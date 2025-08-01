import { Shield, Lock, Unlock, Zap, File } from 'lucide-react';

interface CyberHeaderProps {
  activeTab: 'encrypt' | 'decrypt' | 'file' | 'morse' | 'qr';
  onTabChange: (tab: 'encrypt' | 'decrypt' | 'file' | 'morse' | 'qr') => void;
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
            Advanced AES-256-GCM encryption for secure communication
          </p>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="flex justify-center">
        <div className="flex flex-wrap justify-center bg-muted/30 rounded-lg p-1 backdrop-blur-sm border border-border/50 gap-1">
          <button
            onClick={() => onTabChange('encrypt')}
            className={`flex items-center gap-2 px-3 py-2 rounded-md font-mono font-medium transition-all duration-300 ${
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
            className={`flex items-center gap-2 px-3 py-2 rounded-md font-mono font-medium transition-all duration-300 ${
              activeTab === 'decrypt'
                ? 'bg-gradient-to-r from-secondary to-accent text-primary-foreground shadow-glow-secondary'
                : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
            }`}
          >
            <Unlock className="w-4 h-4" />
            Decrypt
          </button>
          <button
            onClick={() => onTabChange('file')}
            className={`flex items-center gap-2 px-3 py-2 rounded-md font-mono font-medium transition-all duration-300 ${
              activeTab === 'file'
                ? 'bg-gradient-to-r from-accent to-secondary text-primary-foreground shadow-glow-accent'
                : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
            }`}
          >
            <File className="w-4 h-4" />
            Files
          </button>
          <button
            onClick={() => onTabChange('morse')}
            className={`flex items-center gap-2 px-3 py-2 rounded-md font-mono font-medium transition-all duration-300 ${
              activeTab === 'morse'
                ? 'bg-gradient-cyber text-primary-foreground shadow-glow-primary'
                : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
            }`}
          >
            <span className="w-4 h-4 text-xs">•-</span>
            Morse
          </button>
          <button
            onClick={() => onTabChange('qr')}
            className={`flex items-center gap-2 px-3 py-2 rounded-md font-mono font-medium transition-all duration-300 ${
              activeTab === 'qr'
                ? 'bg-gradient-to-r from-secondary to-accent text-primary-foreground shadow-glow-secondary'
                : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
            }`}
          >
            <span className="w-4 h-4">📱</span>
            QR Read
          </button>
        </div>
      </div>

      {/* Security Features */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-3 max-w-4xl mx-auto text-sm">
        <div className="flex items-center justify-center gap-2 p-3 bg-muted/20 rounded-lg border border-border/30 animate-fade-in">
          <Zap className="w-4 h-4 text-primary" />
          <span className="text-muted-foreground">AES-256-GCM</span>
        </div>
        <div className="flex items-center justify-center gap-2 p-3 bg-muted/20 rounded-lg border border-border/30 animate-fade-in" style={{animationDelay: '0.1s'}}>
          <Shield className="w-4 h-4 text-secondary" />
          <span className="text-muted-foreground">PBKDF2 Keys</span>
        </div>
        <div className="flex items-center justify-center gap-2 p-3 bg-muted/20 rounded-lg border border-border/30 animate-fade-in" style={{animationDelay: '0.2s'}}>
          <Lock className="w-4 h-4 text-accent" />
          <span className="text-muted-foreground">Zero Knowledge</span>
        </div>
        <div className="flex items-center justify-center gap-2 p-3 bg-muted/20 rounded-lg border border-border/30 animate-fade-in" style={{animationDelay: '0.3s'}}>
          <File className="w-4 h-4 text-primary" />
          <span className="text-muted-foreground">File Encryption</span>
        </div>
      </div>
    </div>
  );
}