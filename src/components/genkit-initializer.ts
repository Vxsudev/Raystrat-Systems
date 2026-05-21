// src/components/genkit-initializer.ts
'use client';
import { useEffect } from 'react';

// This is a client-side component that doesn't render anything.
// Its only purpose is to be included in the root layout to ensure
// that the Genkit AI object is initialized when the application starts.
// By importing `ai` from `@/ai/genkit`, we trigger the initialization code in that file.
import { ai } from '@/ai/genkit';

export function GenkitInitializer() {
  useEffect(() => {
    // You can log to confirm initialization if needed.
    // console.log('Genkit Initialized on client:', ai);
  }, []);

  return null;
}
