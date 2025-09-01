// src/components/ui/calendly-embed.tsx
'use client';

import { InlineWidget } from 'react-calendly';

export const CalendlyEmbed = () => {
    // TODO: Replace with your actual Calendly link.
    const calendlyUrl = "https://calendly.com/your-username/15min";
  
    return (
      <div className="h-[700px] md:h-[650px] overflow-hidden">
         <InlineWidget 
              url={calendlyUrl} 
              styles={{
                  height: '1000px',
                  transform: 'translateY(-50px)'
              }}
          />
      </div>
    );
  };
