import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Copy, ArrowUpDown } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { textToMorse, morseToText } from '@/lib/morse-code';

export const MorseCodeCard = () => {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [mode, setMode] = useState<'encode' | 'decode'>('encode');
  const { toast } = useToast();

  const handleConvert = () => {
    if (!input.trim()) {
      toast({
        title: 'Error',
        description: 'Please enter some text to convert',
        variant: 'destructive',
      });
      return;
    }

    try {
      const result = mode === 'encode' ? textToMorse(input) : morseToText(input);
      setOutput(result);
    } catch (error) {
      toast({
        title: 'Conversion Error',
        description: 'Failed to convert the input',
        variant: 'destructive',
      });
    }
  };

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      toast({
        title: 'Copied!',
        description: 'Text copied to clipboard',
      });
    } catch (error) {
      toast({
        title: 'Copy Failed',
        description: 'Could not copy to clipboard',
        variant: 'destructive',
      });
    }
  };

  const toggleMode = () => {
    setMode(mode === 'encode' ? 'decode' : 'encode');
    setInput('');
    setOutput('');
  };

  return (
    <Card className="w-full max-w-2xl mx-auto bg-card/80 backdrop-blur-sm border-border/50">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-2xl font-bold text-glow">
              {mode === 'encode' ? 'Text to Morse Code' : 'Morse Code to Text'}
            </CardTitle>
            <CardDescription>
              {mode === 'encode' 
                ? 'Convert regular text into morse code'
                : 'Convert morse code back to readable text'
              }
            </CardDescription>
          </div>
          <Button
            onClick={toggleMode}
            variant="outline"
            size="sm"
            className="flex items-center gap-2"
          >
            <ArrowUpDown className="h-4 w-4" />
            Switch
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="input">
            {mode === 'encode' ? 'Text to Convert' : 'Morse Code to Convert'}
          </Label>
          <Textarea
            id="input"
            placeholder={
              mode === 'encode' 
                ? 'Enter your message here...'
                : 'Enter morse code (use dots, dashes, and spaces)...'
            }
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="input-cyber min-h-[120px] font-mono"
          />
        </div>

        <Button 
          onClick={handleConvert} 
          className="w-full btn-cyber text-primary-foreground font-semibold"
        >
          Convert {mode === 'encode' ? 'to Morse' : 'to Text'}
        </Button>

        {output && (
          <div className="space-y-2">
            <Label htmlFor="output">
              {mode === 'encode' ? 'Morse Code Output' : 'Text Output'}
            </Label>
            <div className="relative">
              <Textarea
                id="output"
                value={output}
                readOnly
                className="input-cyber min-h-[120px] font-mono pr-12"
              />
              <Button
                variant="ghost"
                size="sm"
                onClick={() => copyToClipboard(output)}
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