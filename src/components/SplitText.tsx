import React, { useRef, useEffect, ReactElement } from 'react';

interface TokenWithSource {
  text: string;
  source: number;
}

type TokenType = string | TokenWithSource | ReactElement;

const TokenizedText = ({ input, sep, animation, animationDuration, animationTimingFunction, animationIterationCount }: any) => {
    // Early return for no animation case
    if (animation === 'none' || !animation) {
        return <>{input}</>;
    }

    // Track previous input to detect changes
    const prevInputRef = useRef<string>('');
    // Track tokens with their source for proper keying in diff mode
    const tokensWithSources = useRef<TokenWithSource[]>([]);
    
    // For detecting and handling duplicated content
    const fullTextRef = useRef<string>('');

    const tokens = React.useMemo(() => {
        if (React.isValidElement(input)) return [input];

        if (typeof input !== 'string') return null;

        // For diff mode, we need to handle things differently
        if (sep === 'diff') {
            // If this is the first render or we've gone backward, reset everything
            if (!prevInputRef.current || input.length < prevInputRef.current.length) {
                tokensWithSources.current = [];
                fullTextRef.current = '';
            }
            
            // Only process input if it's different from previous
            if (input !== prevInputRef.current) {
                // Find the true unique content by comparing with our tracked full text
                // This handles cases where the input contains duplicates
                
                // First check if we're just seeing the same content repeated
                if (input.includes(fullTextRef.current)) {
                    const uniqueNewContent = input.slice(fullTextRef.current.length);
                    
                    // Only add if there's actual new content
                    if (uniqueNewContent.length > 0) {
                        tokensWithSources.current.push({
                            text: uniqueNewContent,
                            source: tokensWithSources.current.length
                        });
                        
                        // Update our full text tracking
                        fullTextRef.current = input;
                    }
                } else {
                    // Handle case when input completely changes
                    // Just take the whole thing as a new token
                    tokensWithSources.current = [{
                        text: input,
                        source: 0
                    }];
                    fullTextRef.current = input;
                }
            }
            
            // Return the tokensWithSources directly
            return tokensWithSources.current;
        }

        // Original word/char splitting logic
        let splitRegex;
        if (sep === 'word') {
            splitRegex = /(\s+)/;
        } else if (sep === 'char') {
            splitRegex = /(.)/;
        } else {
            throw new Error('Invalid separator: must be "word", "char", or "diff"');
        }

        return input.split(splitRegex).filter(token => token.length > 0);
    }, [input, sep]);

    // Update previous input after processing
    useEffect(() => {
        if (typeof input === 'string') {
            prevInputRef.current = input;
        }
    }, [input]);

    // Helper function to check if token is a TokenWithSource type
    const isTokenWithSource = (token: TokenType): token is TokenWithSource => {
        return token !== null && typeof token === 'object' && 'text' in token && 'source' in token;
    };

    return (
        <>
            {tokens?.map((token, index) => {
                // Determine the key and text based on token type
                let key = index;
                let text = '';

                if (isTokenWithSource(token)) {
                    key = token.source;
                    text = token.text;
                } else if (typeof token === 'string') {
                    key = index;
                    text = token;
                } else if (React.isValidElement(token)) {
                    key = index;
                    text = '';
                    return React.cloneElement(token, { key });
                }
                
                return (
                    <span key={key} style={{
                        animationName: animation,
                        animationDuration,
                        animationTimingFunction, 
                        animationIterationCount,
                        whiteSpace: 'pre-wrap',
                        display: 'inline-block',
                    }}>
                        {text}
                    </span>
                );
            })}
        </>
    );
};

export default TokenizedText;