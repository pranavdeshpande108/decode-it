import { useState, useRef } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress';
import { Upload, Download, Lock, File, Zap } from 'lucide-react';
import { encryptFile, decryptFile } from '@/lib/file-crypto';
import { useToast } from '@/hooks/use-toast';

export function FileEncryptionCard() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [password, setPassword] = useState('');
  const [encryptedResult, setEncryptedResult] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (file.size > 10 * 1024 * 1024) { // 10MB limit
        toast({
          title: "File Too Large",
          description: "Please select a file smaller than 10MB",
          variant: "destructive",
        });
        return;
      }
      setSelectedFile(file);
    }
  };

  const handleEncryptFile = async () => {
    if (!selectedFile || !password) {
      toast({
        title: "Missing Information",
        description: "Please select a file and enter a password",
        variant: "destructive",
      });
      return;
    }

    setIsProcessing(true);
    setProgress(0);

    try {
      // Simulate progress
      const progressInterval = setInterval(() => {
        setProgress(prev => Math.min(prev + 10, 90));
      }, 200);

      const result = await encryptFile(selectedFile, password);
      const encryptedPackage = JSON.stringify(result, null, 2);
      setEncryptedResult(encryptedPackage);

      clearInterval(progressInterval);
      setProgress(100);

      toast({
        title: "File Encrypted Successfully",
        description: `${selectedFile.name} has been encrypted with AES-256-GCM`,
      });
    } catch (error) {
      toast({
        title: "Encryption Failed",
        description: "An error occurred while encrypting the file",
        variant: "destructive",
      });
    }
    setIsProcessing(false);
  };

  const handleDownloadEncrypted = () => {
    if (!encryptedResult) return;

    const blob = new Blob([encryptedResult], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${selectedFile?.name || 'file'}.encrypted.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    toast({
      title: "Download Started",
      description: "Encrypted file package downloaded successfully",
    });
  };

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <Card className="w-full max-w-2xl mx-auto bg-card/50 backdrop-blur-sm border-border/50 shadow-glow-accent/10 animate-fade-in">
      <CardHeader className="text-center space-y-2">
        <div className="mx-auto w-12 h-12 bg-gradient-to-r from-accent to-secondary rounded-lg flex items-center justify-center mb-4 animate-float">
          <File className="w-6 h-6 text-primary-foreground" />
        </div>
        <CardTitle className="text-2xl font-mono text-glow">File Encryption</CardTitle>
        <CardDescription className="text-muted-foreground">
          Encrypt files and documents with military-grade security
        </CardDescription>
      </CardHeader>
      
      <CardContent className="space-y-6">
        {/* File Selection */}
        <div className="space-y-2">
          <Label className="text-sm font-mono text-foreground">Select File</Label>
          <div className="flex gap-2">
            <div 
              onClick={() => fileInputRef.current?.click()}
              className="flex-1 border-2 border-dashed border-border/50 rounded-lg p-6 text-center cursor-pointer hover:border-primary/50 transition-all duration-300 hover:bg-muted/20"
            >
              {selectedFile ? (
                <div className="space-y-2">
                  <File className="w-8 h-8 text-primary mx-auto" />
                  <p className="font-mono text-sm text-foreground">{selectedFile.name}</p>
                  <p className="text-xs text-muted-foreground">
                    {formatFileSize(selectedFile.size)} • {selectedFile.type || 'Unknown type'}
                  </p>
                </div>
              ) : (
                <div className="space-y-2">
                  <Upload className="w-8 h-8 text-muted-foreground mx-auto" />
                  <p className="text-sm text-muted-foreground">Click to select a file</p>
                  <p className="text-xs text-muted-foreground">Max size: 10MB</p>
                </div>
              )}
            </div>
            <input
              ref={fileInputRef}
              type="file"
              onChange={handleFileSelect}
              className="hidden"
            />
          </div>
        </div>

        {/* Password Input */}
        <div className="space-y-2">
          <Label htmlFor="file-password" className="text-sm font-mono text-foreground">
            Encryption Password
          </Label>
          <Input
            id="file-password"
            type="password"
            placeholder="Enter a strong password for file encryption..."
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="input-cyber font-mono"
          />
        </div>

        {/* Progress Bar */}
        {isProcessing && (
          <div className="space-y-2">
            <div className="flex justify-between text-sm text-muted-foreground">
              <span>Encrypting...</span>
              <span>{progress}%</span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex gap-3">
          <Button
            variant="glow"
            size="cyber"
            onClick={handleEncryptFile}
            disabled={!selectedFile || !password || isProcessing}
            className="flex-1"
          >
            {isProcessing ? (
              <>
                <Zap className="w-4 h-4 animate-pulse" />
                Encrypting...
              </>
            ) : (
              <>
                <Lock className="w-4 h-4" />
                Encrypt File
              </>
            )}
          </Button>
          
          {encryptedResult && (
            <Button
              variant="neural"
              onClick={handleDownloadEncrypted}
              className="px-6"
            >
              <Download className="w-4 h-4 mr-2" />
              Download
            </Button>
          )}
        </div>

        {/* Success Message */}
        {encryptedResult && (
          <div className="p-4 bg-primary/5 rounded-lg border border-primary/20 shadow-glow-primary/20 animate-scale-in">
            <div className="flex items-center gap-2 text-primary text-sm font-mono">
              <Lock className="w-4 h-4" />
              File encrypted successfully! Download the encrypted package above.
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}