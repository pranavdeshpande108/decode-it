import { useState, useRef } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Upload, Camera, Copy } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import QrScanner from 'qr-scanner';

export const QRReaderCard = () => {
  const [result, setResult] = useState('');
  const [isScanning, setIsScanning] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const scannerRef = useRef<QrScanner | null>(null);
  const { toast } = useToast();

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    try {
      const result = await QrScanner.scanImage(file);
      setResult(result);
      toast({
        title: 'QR Code Decoded!',
        description: 'Successfully extracted content from QR code',
      });
    } catch (error) {
      toast({
        title: 'Scan Failed',
        description: 'Could not decode QR code from image',
        variant: 'destructive',
      });
    }
  };

  const startCameraScanning = async () => {
    if (!videoRef.current) return;

    try {
      setIsScanning(true);
      scannerRef.current = new QrScanner(
        videoRef.current,
        (result) => {
          setResult(result.data);
          stopScanning();
          toast({
            title: 'QR Code Scanned!',
            description: 'Successfully scanned QR code from camera',
          });
        },
        {
          onDecodeError: () => {
            // Silently handle decode errors during scanning
          },
        }
      );

      await scannerRef.current.start();
    } catch (error) {
      setIsScanning(false);
      toast({
        title: 'Camera Error',
        description: 'Could not access camera for scanning',
        variant: 'destructive',
      });
    }
  };

  const stopScanning = () => {
    if (scannerRef.current) {
      scannerRef.current.stop();
      scannerRef.current.destroy();
      scannerRef.current = null;
    }
    setIsScanning(false);
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(result);
      toast({
        title: 'Copied!',
        description: 'QR code content copied to clipboard',
      });
    } catch (error) {
      toast({
        title: 'Copy Failed',
        description: 'Could not copy to clipboard',
        variant: 'destructive',
      });
    }
  };

  return (
    <Card className="w-full max-w-2xl mx-auto bg-card/80 backdrop-blur-sm border-border/50">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-glow">QR Code Reader</CardTitle>
        <CardDescription>
          Decode QR codes from images or camera to extract their content
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label>Upload QR Code Image</Label>
            <Input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleFileUpload}
              className="input-cyber"
            />
            <Button
              onClick={() => fileInputRef.current?.click()}
              variant="outline"
              className="w-full flex items-center gap-2"
            >
              <Upload className="h-4 w-4" />
              Choose Image
            </Button>
          </div>

          <div className="space-y-2">
            <Label>Camera Scanning</Label>
            <div className="space-y-2">
              {!isScanning ? (
                <Button
                  onClick={startCameraScanning}
                  variant="outline"
                  className="w-full flex items-center gap-2"
                >
                  <Camera className="h-4 w-4" />
                  Start Camera Scan
                </Button>
              ) : (
                <Button
                  onClick={stopScanning}
                  variant="destructive"
                  className="w-full"
                >
                  Stop Scanning
                </Button>
              )}
            </div>
          </div>
        </div>

        {isScanning && (
          <div className="w-full max-w-sm mx-auto">
            <video
              ref={videoRef}
              className="w-full rounded-lg border border-border"
              style={{ maxHeight: '300px' }}
            />
          </div>
        )}

        {result && (
          <div className="space-y-2">
            <Label htmlFor="result">Decoded Content</Label>
            <div className="relative">
              <Textarea
                id="result"
                value={result}
                readOnly
                className="input-cyber min-h-[120px] font-mono pr-12"
              />
              <Button
                variant="ghost"
                size="sm"
                onClick={copyToClipboard}
                className="absolute top-2 right-2 h-8 w-8 p-0"
              >
                <Copy className="h-4 w-4" />
              </Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};