'use client';

import { useEffect } from 'react';
import { Button, ButtonProps } from '@/components/ui/button';

declare global {
  interface Window {
    Calendly?: {
      initPopupWidget: (options: { url: string }) => void;
    };
  }
}

export function CalendlyButton({ children, ...props }: ButtonProps) {
  const calendlyUrl = 'https://calendly.com/raystrat/15-min-audit?hide_event_type_details=1&hide_gdpr_banner=1&primary_color=0459ca';

  useEffect(() => {
    const head = document.querySelector('head');
    if (!head) return;

    // Check if stylesheet is already loaded
    if (!document.querySelector('link[href="https://assets.calendly.com/assets/external/widget.css"]')) {
      const stylesheet = document.createElement('link');
      stylesheet.rel = 'stylesheet';
      stylesheet.href = 'https://assets.calendly.com/assets/external/widget.css';
      head.appendChild(stylesheet);
    }
    
    // Check if script is already loaded
    if (!document.querySelector('script[src="https://assets.calendly.com/assets/external/widget.js"]')) {
      const script = document.createElement('script');
      script.src = 'https://assets.calendly.com/assets/external/widget.js';
      script.async = true;
      document.body.appendChild(script);

      return () => {
        // Optional: Clean up script if component unmounts, though usually not necessary
        // if (script.parentNode) {
        //   script.parentNode.removeChild(script);
        // }
      };
    }
  }, []);

  const handleClick = () => {
    if (window.Calendly) {
      window.Calendly.initPopupWidget({ url: calendlyUrl });
    } else {
        console.error('Calendly script not loaded');
    }
  };

  return (
    <Button onClick={handleClick} {...props}>
      {children || 'Book 15-min Audit'}
    </Button>
  );
}
