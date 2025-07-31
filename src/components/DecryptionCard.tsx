import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Copy, Unlock, Shield, Zap } from 'lucide-react';
import { decryptMessage, type DecryptionInput } from '@/lib/crypto';
import { useToast } from '@/hooks/use-toast';

export function DecryptionCard() {
  const [encryptedPackage, setEncryptedPackage] = useState('');
  const [password, setPassword] = useState('');
  const [decryptedMessage, setDecryptedMessage] = useState('');
  const [isDecrypting, setIsDecrypting] = useState(false);
  const { toast } = useToast();

  const handleDecrypt = async () => {
    if (!encryptedPackage.trim()) {
      toast({
        title: "Error",
        description: "Please paste the encrypted package",
        variant: "destructive",
      });
      return;
    }

    if (!password.trim()) {
      toast({
        title: "Error",
        description: "Please enter the decryption password",
        variant: "destructive",
      });
      return;
    }

    setIsDecrypting(true);
    try {
      // Parse the encrypted package
      const packageData = JSON.parse(encryptedPackage);
      
      // Validate package structure
      if (!packageData.encryptedData || !packageData.iv || !packageData.salt) {
        throw new Error('Invalid package format');
      }

      const decryptionInput: DecryptionInput = {
        encryptedData: packageData.encryptedData,
        iv: packageData.iv,
        salt: packageData.salt,
        password: password,
      };

      const result = await decryptMessage(decryptionInput);
      setDecryptedMessage(result);
      
      toast({
        title: "Decryption Successful",
        description: "Your message has been decrypted successfully",
      });
    } catch (error) {
      let errorMessage = "Failed to decrypt message";
      
      if (error instanceof SyntaxError) {
        errorMessage = "Invalid encrypted package format";
      } else if (error instanceof Error) {
        errorMessage = error.message;
      }
      
      toast({
        title: "Decryption Failed",
        description: errorMessage,
        variant: "destructive",
      });
      setDecryptedMessage('');
    }
    setIsDecrypting(false);
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(decryptedMessage);
      toast({
        title: "Copied to Clipboard",
        description: "Decrypted message copied successfully",
      });
    } catch (error) {
      toast({
        title: "Copy Failed",
        description: "Failed to copy to clipboard",
        variant: "destructive",
      });
    }
  };

  const handleClear = () => {
    setEncryptedPackage('');
    setPassword('');
    setDecryptedMessage('');
  };

  return (
    <Card className="w-full max-w-2xl mx-auto bg-card/50 backdrop-blur-sm border-border/50 shadow-glow-secondary/10">
      <CardHeader className="text-center space-y-2">
        <div className="mx-auto w-12 h-12 bg-gradient-to-r from-secondary to-accent rounded-lg flex items-center justify-center mb-4">
          <Unlock className="w-6 h-6 text-primary-foreground" />
        </div>
        <CardTitle className="text-2xl font-mono text-glow">Decrypt Message</CardTitle>
        <CardDescription className="text-muted-foreground">
          Decrypt messages secured with AES-256-GCM encryption
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="package" className="text-sm font-mono text-foreground">Encrypted Package</Label>
          <Textarea
            id="package"
            placeholder='Paste the encrypted package here (JSON format)...'
            value={encryptedPackage}
            onChange={(e) => setEncryptedPackage(e.target.value)}
            className="input-cyber min-h-[120px] font-mono text-xs resize-none"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="decrypt-password" className="text-sm font-mono text-foreground">Decryption Password</Label>
          <Input
            id="decrypt-password"
            type="password"
            placeholder="Enter the password used for encryption..."
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="input-cyber font-mono"
          />
        </div>

        <div className="flex gap-3">
          <Button
            variant="glow"
            size="cyber"
            onClick={handleDecrypt}
            disabled={isDecrypting}
            className="flex-1"
          >
            {isDecrypting ? (
              <>
                <Zap className="w-4 h-4 animate-pulse" />
                Decrypting...
              </>
            ) : (
              <>
                <Unlock className="w-4 h-4" />
                Decrypt Message
              </>
            )}
          </Button>
          <Button
            variant="neural"
            onClick={handleClear}
            className="px-6"
          >
            Clear
          </Button>
        </div>

        {decryptedMessage && (
          <div className="space-y-3 p-4 bg-primary/5 rounded-lg border border-primary/20 shadow-glow-primary/20">
            <div className="flex items-center justify-between">
              <Label className="text-sm font-mono text-primary text-glow">Decrypted Message</Label>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleCopy}
                className="text-primary hover:text-primary"
              >
                <Copy className="w-4 h-4 mr-1" />
                Copy
              </Button>
            </div>
            <div className="p-4 bg-background/50 rounded border border-border/50">
              <p className="font-mono text-sm whitespace-pre-wrap break-words text-foreground">
                {decryptedMessage}
              </p>
            </div>
            <div className="flex items-center gap-2 text-xs text-primary">
              <Shield className="w-3 h-3" />
              Message successfully decrypted and verified
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}