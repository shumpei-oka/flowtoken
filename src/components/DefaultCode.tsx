'use client';
import React from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { IconCheck, IconCopy } from "@tabler/icons-react";
import { Button } from './ui/button';
import { cn } from '../utils';
import customCodeRenderer from './CodeRenderer';

interface DefaultCodeProps {
    node: any;
    className?: string;
    children: React.ReactNode & React.ReactNode[];
    style?: React.CSSProperties; // For animationStyle
    codeStyle?: any;
    animateText: (text: any) => React.ReactNode;
    animation?: string;
    animationDuration?: string;
    animationTimingFunction?: string;
}

const DefaultCode: React.FC<DefaultCodeProps> = ({
    node,
    className,
    children,
    style,
    codeStyle,
    animateText,
    animation,
    animationDuration,
    animationTimingFunction,
    ...props
}) => {
    const [copied, setCopied] = React.useState(false);

    const handleCopy = () => {
        // Ensure children is a string for navigator.clipboard.writeText
        const textToCopy = Array.isArray(children) ? children.join('') : String(children);
        navigator.clipboard.writeText(textToCopy);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    if (!className || !className.startsWith("language-")) {
        return <code {...props} className="text-sm bg-zinc-100 dark:bg-zinc-800 py-0.5 px-1 rounded-md">
            {animateText(children)}
        </code>;
    }

    // Extract language name
    const language = className?.substring(9).trim() || 'text';

    return (
        <div {...props} style={style} className="relative my-2">
            {/* Header section */}
            <div className="flex justify-between items-center bg-zinc-100 dark:bg-zinc-800 px-4 py-1 rounded-t-xl border border-b-0 border-zinc-200 dark:border-zinc-700">
                <span className="text-sm font-semibold text-zinc-900 dark:text-zinc-50">
                    {language}
                </span>
                <Button
                    variant="ghost"
                    size="sm"
                    className="flex items-center hover:bg-zinc-200 dark:hover:bg-zinc-700 gap-1 text-xs transition-colors duration-300"
                    onClick={handleCopy}
                    aria-label={copied ? 'Copied!' : 'Copy code'}
                >
                    {copied ? (
                        <IconCheck
                            className="w-3 h-3 text-green-500 transition-all duration-300"
                            aria-hidden="true"
                        />
                    ) : (
                        <IconCopy
                            className="w-3 h-3 text-zinc-500 dark:text-zinc-400 transition-all duration-300"
                            aria-hidden="true"
                        />
                    )}
                    <span
                        className={cn(
                            copied ? "text-green-500" : "text-zinc-500 dark:text-zinc-400",
                            "transition-colors duration-300"
                        )}
                    >
                        {copied ? 'Copied!' : 'Copy'}
                    </span>
                </Button>
            </div>
            {/* Content section */}
            <div className="border border-zinc-200 dark:border-zinc-700 rounded-b-xl dark:bg-zinc-900 overflow-hidden">
                <SyntaxHighlighter
                    style={codeStyle}
                    language={language}
                    renderer={customCodeRenderer({ animation, animationDuration, animationTimingFunction })}
                    customStyle={{
                        margin: 0,
                        padding: '1rem',
                        background: 'transparent',
                        fontSize: '0.875rem',
                        borderRadius: 0,
                    }}
                >
                    {String(children)}
                </SyntaxHighlighter>
            </div>
        </div>
    );
};

export default DefaultCode; 