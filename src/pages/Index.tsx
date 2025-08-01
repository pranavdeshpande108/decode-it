import { useState } from 'react';
import { CyberHeader } from '@/components/CyberHeader';
import { EncryptionCard } from '@/components/EncryptionCard';
import { DecryptionCard } from '@/components/DecryptionCard';
import { FileEncryptionCard } from '@/components/FileEncryptionCard';
import { MorseCodeCard } from '@/components/MorseCodeCard';
import { QRReaderCard } from '@/components/QRReaderCard';

const Index = () => {
  const [activeTab, setActiveTab] = useState<'encrypt' | 'decrypt' | 'file' | 'morse' | 'qr'>('encrypt');

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <CyberHeader activeTab={activeTab} onTabChange={setActiveTab} />
        
        <div className="max-w-4xl mx-auto">
          {activeTab === 'encrypt' && <EncryptionCard />}
          {activeTab === 'decrypt' && <DecryptionCard />}
          {activeTab === 'file' && <FileEncryptionCard />}
          {activeTab === 'morse' && <MorseCodeCard />}
          {activeTab === 'qr' && <QRReaderCard />}
        </div>

        {/* Footer */}
        <footer className="mt-20 text-center text-sm text-muted-foreground animate-fade-in">
          <p className="font-mono">
            🔐 Powered by Web Crypto API • Client-side encryption • Zero knowledge architecture
          </p>
        </footer>
      </div>
    </div>
  );
};

export default Index;
