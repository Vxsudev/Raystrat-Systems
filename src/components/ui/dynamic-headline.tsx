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
    const [subIndex, setSubIndex] = useState(0);
    const [isDeleting, setIsDeleting] = useState(false);
    const [text, setText] = useState('');

    useEffect(() => {
        if (isDeleting) {
            if (subIndex === 0) {
                setIsDeleting(false);
                setIndex((prev) => (prev + 1) % words.length);
            } else {
                const timeout = setTimeout(() => {
                    setText((prev) => prev.slice(0, -1));
                    setSubIndex((prev) => prev - 1);
                }, 80); // Deleting speed
                return () => clearTimeout(timeout);
            }
        } else {
            if (subIndex === words[index].length) {
                const waitTimeout = setTimeout(() => {
                    setIsDeleting(true);
                }, 2000); // Wait time at full word
                 return () => clearTimeout(waitTimeout);
            } else {
                const timeout = setTimeout(() => {
                    setText((prev) => prev + words[index][subIndex]);
                    setSubIndex((prev) => prev + 1);
                }, 120); // Typing speed
                return () => clearTimeout(timeout);
            }
        }
    }, [subIndex, isDeleting, index]);

    return (
        <span className={cn(
                "text-primary inline-block",
                "after:content-['|'] after:ml-1 after:animate-pulse after:font-light"
            )}
        >
            {text}
        </span>
    );
}
