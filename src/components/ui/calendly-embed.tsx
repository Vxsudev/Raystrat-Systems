// src/components/ui/calendly-embed.tsx
'use client';

import { InlineWidget } from 'react-calendly';

export const CalendlyEmbed = () => {
    const calendlyUrl = "https://calendly.com/raystrat?hide_landing_page_details=1&hide_gdpr_banner=1";
  
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
