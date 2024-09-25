"use client";

import { Button } from '@writeme/wmc';
import { Download } from 'lucide-react';
import { toast } from '@writeme/wmc/lib/ui/use-toast';
import { useState, useEffect } from 'react';
import { PDFDownloadLink } from '@react-pdf/renderer';
import PDFFile from '../components/pdf/PDFFile'; 

interface ExportButtonProps {
  storyId: string;
  chapterId?: string;
}

export default function ExportButton({ storyId, chapterId }: ExportButtonProps) {
  const [loading, setLoading] = useState(false);
  const [storyData, setStoryData] = useState(null);

  useEffect(() => {
    const fetchStoryData = async () => {
      setLoading(true);
      try {
        const res = await fetch(chapterId ? '/api/export/chapter' : '/api/export/story', {
          method: 'POST',
          body: JSON.stringify({id: storyId}),
          headers: {
            'Content-Type': 'application/json'
          }
        });
        const data = await res.json();
        setStoryData(data);
      } catch (error) {
        toast({
          title: 'Failed to fetch story data.',
          variant: 'destructive',
        });
        console.error('Error fetching story:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchStoryData();
  }, [storyId, chapterId]);

  if (loading || !storyData) {
    return <Button variant="ghost" size="icon" disabled></Button>;
  }

  console.log(storyData)
  return (

    <PDFDownloadLink
      document={<PDFFile story={storyData} />}
      fileName="story.pdf"
    >
      {/* {({ loading }) => 
        loading ? (
          <Button variant="ghost" size="icon" disabled>
            Generating PDF...
          </Button>
        ) : ( */}
          <Button variant="ghost" size="icon">
            <Download />
          </Button>
        {/* ) */}
      {/* } */}
    </PDFDownloadLink>
  );
}
