import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Copy, Lock, Key, Zap } from 'lucide-react';
import { encryptMessage, generateSecurePassword } from '@/lib/crypto';
import { useToast } from '@/hooks/use-toast';

export function EncryptionCard() {
  const [message, setMessage] = useState('');
  const [password, setPassword] = useState('');
  const [encryptedResult, setEncryptedResult] = useState('');
  const [isEncrypting, setIsEncrypting] = useState(false);
  const { toast } = useToast();

  const handleEncrypt = async () => {
    if (!message.trim()) {
      toast({
        title: "Error",
        description: "Please enter a message to encrypt",
        variant: "destructive",
      });
      return;
    }

    if (!password.trim()) {
      toast({
        title: "Error", 
        description: "Please enter a password",
        variant: "destructive",
      });
      return;
    }

    setIsEncrypting(true);
    try {
      const result = await encryptMessage(message, password);
      const encryptedPackage = JSON.stringify(result, null, 2);
      setEncryptedResult(encryptedPackage);
      
      toast({
        title: "Encryption Successful",
        description: "Your message has been encrypted with AES-256-GCM",
      });
    } catch (error) {
      toast({
        title: "Encryption Failed",
        description: "An error occurred while encrypting your message",
        variant: "destructive",
      });
    }
    setIsEncrypting(false);
  };

  const handleGeneratePassword = () => {
    const newPassword = generateSecurePassword(16);
    setPassword(newPassword);
    toast({
      title: "Password Generated",
      description: "A secure 16-character password has been generated",
    });
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(encryptedResult);
      toast({
        title: "Copied to Clipboard",
        description: "Encrypted message copied successfully",
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
    setMessage('');
    setPassword('');
    setEncryptedResult('');
  };

  return (
    <Card className="w-full max-w-2xl mx-auto bg-card/50 backdrop-blur-sm border-border/50 shadow-glow-primary/10">
      <CardHeader className="text-center space-y-2">
        <div className="mx-auto w-12 h-12 bg-gradient-cyber rounded-lg flex items-center justify-center mb-4">
          <Lock className="w-6 h-6 text-primary-foreground" />
        </div>
        <CardTitle className="text-2xl font-mono text-glow">Encrypt Message</CardTitle>
        <CardDescription className="text-muted-foreground">
          Secure your message with AES-256-GCM encryption
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="message" className="text-sm font-mono text-foreground">Message</Label>
          <Textarea
            id="message"
            placeholder="Enter your secret message here..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="input-cyber min-h-[120px] font-mono text-sm resize-none"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="password" className="text-sm font-mono text-foreground">Encryption Password</Label>
          <div className="flex gap-2">
            <Input
              id="password"
              type="password"
              placeholder="Enter a strong password..."
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="input-cyber font-mono flex-1"
            />
            <Button
              variant="neural"
              size="icon"
              onClick={handleGeneratePassword}
              className="shrink-0"
            >
              <Key className="w-4 h-4" />
            </Button>
          </div>
        </div>

        <div className="flex gap-3">
          <Button
            variant="cyber"
            size="cyber"
            onClick={handleEncrypt}
            disabled={isEncrypting}
            className="flex-1"
          >
            {isEncrypting ? (
              <>
                <Zap className="w-4 h-4 animate-pulse" />
                Encrypting...
              </>
            ) : (
              <>
                <Lock className="w-4 h-4" />
                Encrypt Message
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

        {encryptedResult && (
          <div className="space-y-3 p-4 bg-muted/30 rounded-lg border border-border/50">
            <div className="flex items-center justify-between">
              <Label className="text-sm font-mono text-accent text-glow-accent">Encrypted Package</Label>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleCopy}
                className="text-accent hover:text-accent"
              >
                <Copy className="w-4 h-4 mr-1" />
                Copy
              </Button>
            </div>
            <Textarea
              value={encryptedResult}
              readOnly
              className="input-cyber min-h-[150px] font-mono text-xs"
            />
            <p className="text-xs text-muted-foreground">
              Share this encrypted package with your recipient along with the password (separately)
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}