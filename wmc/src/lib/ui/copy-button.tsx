'use client';

import { Button } from '@writeme/wmc';
import { toast } from '@writeme/wmc/lib/ui/use-toast';
import { Copy } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Tooltip, TooltipProvider, TooltipTrigger } from './tooltip';
import { TooltipContent } from '@radix-ui/react-tooltip';

interface CopyButtonProps {
  inputContent: string;
}

export default function CopyButton({ inputContent }: CopyButtonProps) {
  const [content, setContent] = useState(inputContent);

  useEffect(() => {
    setContent(inputContent);
  }, [inputContent]);

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger>
          <Button
            onClick={async () => {
              await navigator.clipboard.writeText(content);
              toast({
                title: 'Copied to Clipboard',
              });
            }}
            variant={"outline"}
          >
            <Copy className='size-sm'></Copy>
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>Copy Content to Clipboard</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
