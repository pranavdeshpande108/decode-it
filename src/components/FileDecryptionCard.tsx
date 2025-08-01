import { useState, useRef } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Upload, Download, Unlock, FileText, Zap } from 'lucide-react';
import { decryptFile } from '@/lib/file-crypto';
import { useToast } from '@/hooks/use-toast';

export function FileDecryptionCard() {
  const [encryptedFile, setEncryptedFile] = useState<string>('');
  const [password, setPassword] = useState('');
  const [decryptedBlob, setDecryptedBlob] = useState<{blob: Blob, fileName: string} | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const content = e.target?.result as string;
          JSON.parse(content); // Validate JSON
          setEncryptedFile(content);
          toast({
            title: "File Loaded",
            description: "Encrypted file loaded successfully",
          });
        } catch (error) {
          toast({
            title: "Invalid File",
            description: "Please select a valid encrypted JSON file",
            variant: "destructive",
          });
        }
      };
      reader.readAsText(file);
    }
  };

  const handleDecryptFile = async () => {
    if (!encryptedFile || !password) {
      toast({
        title: "Missing Information",
        description: "Please load an encrypted file and enter the password",
        variant: "destructive",
      });
      return;
    }

    setIsProcessing(true);

    try {
      const encryptedData = JSON.parse(encryptedFile);
      const decryptedBlob = await decryptFile({
        ...encryptedData,
        password: password
      });

      setDecryptedBlob({
        blob: decryptedBlob,
        fileName: encryptedData.fileName
      });

      toast({
        title: "File Decrypted Successfully",
        description: `${encryptedData.fileName} has been decrypted`,
      });
    } catch (error) {
      toast({
        title: "Decryption Failed",
        description: "Wrong password or corrupted file",
        variant: "destructive",
      });
    }
    setIsProcessing(false);
  };

  const handleDownloadDecrypted = () => {
    if (!decryptedBlob) return;

    const url = URL.createObjectURL(decryptedBlob.blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = decryptedBlob.fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    toast({
      title: "Download Started",
      description: "Decrypted file downloaded successfully",
    });
  };

  return (
    <Card className="w-full max-w-2xl mx-auto bg-card/50 backdrop-blur-sm border-border/50 shadow-glow-secondary/10 animate-fade-in">
      <CardHeader className="text-center space-y-2">
        <div className="mx-auto w-12 h-12 bg-gradient-to-r from-secondary to-accent rounded-lg flex items-center justify-center mb-4 animate-float">
          <Unlock className="w-6 h-6 text-primary-foreground" />
        </div>
        <CardTitle className="text-2xl font-mono text-glow">File Decryption</CardTitle>
        <CardDescription className="text-muted-foreground">
          Decrypt encrypted files with your password
        </CardDescription>
      </CardHeader>
      
      <CardContent className="space-y-6">
        {/* File Selection */}
        <div className="space-y-2">
          <Label className="text-sm font-mono text-foreground">Select Encrypted File</Label>
          <div className="flex gap-2">
            <div 
              onClick={() => fileInputRef.current?.click()}
              className="flex-1 border-2 border-dashed border-border/50 rounded-lg p-6 text-center cursor-pointer hover:border-secondary/50 transition-all duration-300 hover:bg-muted/20"
            >
              {encryptedFile ? (
                <div className="space-y-2">
                  <FileText className="w-8 h-8 text-secondary mx-auto" />
                  <p className="font-mono text-sm text-foreground">Encrypted file loaded</p>
                  <p className="text-xs text-muted-foreground">Ready for decryption</p>
                </div>
              ) : (
                <div className="space-y-2">
                  <Upload className="w-8 h-8 text-muted-foreground mx-auto" />
                  <p className="text-sm text-muted-foreground">Click to select encrypted JSON file</p>
                </div>
              )}
            </div>
            <input
              ref={fileInputRef}
              type="file"
              accept=".json"
              onChange={handleFileSelect}
              className="hidden"
            />
          </div>
        </div>

        {/* Password Input */}
        <div className="space-y-2">
          <Label htmlFor="decrypt-password" className="text-sm font-mono text-foreground">
            Decryption Password
          </Label>
          <Input
            id="decrypt-password"
            type="password"
            placeholder="Enter your decryption password..."
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="input-cyber font-mono"
          />
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3">
          <Button
            variant="glow"
            size="cyber"
            onClick={handleDecryptFile}
            disabled={!encryptedFile || !password || isProcessing}
            className="flex-1"
          >
            {isProcessing ? (
              <>
                <Zap className="w-4 h-4 animate-pulse" />
                Decrypting...
              </>
            ) : (
              <>
                <Unlock className="w-4 h-4" />
                Decrypt File
              </>
            )}
          </Button>
          
          {decryptedBlob && (
            <Button
              variant="neural"
              onClick={handleDownloadDecrypted}
              className="px-6"
            >
              <Download className="w-4 h-4 mr-2" />
              Download
            </Button>
          )}
        </div>

        {/* Success Message */}
        {decryptedBlob && (
          <div className="p-4 bg-secondary/5 rounded-lg border border-secondary/20 shadow-glow-secondary/20 animate-scale-in">
            <div className="flex items-center gap-2 text-secondary text-sm font-mono">
              <Unlock className="w-4 h-4" />
              File decrypted successfully! Download your original file above.
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}