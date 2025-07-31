import { useState } from 'react';
import { CyberHeader } from '@/components/CyberHeader';
import { EncryptionCard } from '@/components/EncryptionCard';
import { DecryptionCard } from '@/components/DecryptionCard';
import { FileEncryptionCard } from '@/components/FileEncryptionCard';

const Index = () => {
  const [activeTab, setActiveTab] = useState<'encrypt' | 'decrypt' | 'file'>('encrypt');

  return (
    <div className="min-h-screen bg-background matrix-bg">
      <div className="container mx-auto px-4 py-8">
        <CyberHeader activeTab={activeTab} onTabChange={setActiveTab} />
        
        <div className="max-w-4xl mx-auto">
          {activeTab === 'encrypt' && <EncryptionCard />}
          {activeTab === 'decrypt' && <DecryptionCard />}
          {activeTab === 'file' && <FileEncryptionCard />}
        </div>

        {/* Footer */}
        <footer className="mt-20 text-center text-sm text-muted-foreground animate-fade-in">
          <p className="font-mono">
            🔐 Powered by Web Crypto API • Client-side encryption • Zero knowledge architecture • QR Code sharing
          </p>
        </footer>
      </div>
    </div>
  );
};

export default Index;
