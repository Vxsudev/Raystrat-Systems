// src/components/ui/dynamic-headline.tsx
'use client';

import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';

const words = [
    "Your Leads.",
    "Your Follow-Up.",
    "Your Support.",
    "Your Operations.",
    "Your Data.",
];

export function DynamicHeadline() {
    const [index, setIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setIndex((prevIndex) => (prevIndex + 1) % words.length);
        }, 3000); // Change word every 3 seconds

        return () => clearInterval(interval);
    }, []);

    return (
        <span
            key={index}
            className={cn(
                "text-primary inline-block animate-blur-fade-in"
            )}
        >
            {words[index]}
        </span>
    );
}
