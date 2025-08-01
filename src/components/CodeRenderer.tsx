import React from 'react';

interface CustomRendererProps {
    rows: any[];
    stylesheet: any;
    useInlineStyles: boolean;
}

// React-syntax-highlighter custom renderer with CSS variables support for dual themes
const customCodeRenderer = ({ animation, animationDuration, animationTimingFunction }: any) => {
    // Memoize the animation style to avoid recreating it for each text segment
    const animationStyle = {
        animationName: animation || '',
        animationDuration,
        animationTimingFunction,
        animationIterationCount: 1,
        whiteSpace: 'pre-wrap',
        display: 'inline-block',
    };

    return ({rows, stylesheet, useInlineStyles}: CustomRendererProps) => rows.map((node, i) => (
        <div key={i} style={node.properties?.style || {}}>
            {node.children.map((token: any, key: string) => {
                // For CSS variables approach, ignore inline styles and use CSS classes
                const tokenStyles = useInlineStyles ? {} : {}; // Empty styles to let CSS variables take control
                
                // Add CSS class for token type if available
                const tokenClassName = token?.properties?.className ? token.properties.className.join(' ') : '';
                
                return (
                    <span key={key} style={tokenStyles} className={tokenClassName}>
                        {token.children && token.children[0].value.split(' ').map((word: string, index: number) => (
                            <span key={index} style={animationStyle}>
                                {word + (index < token.children[0].value.split(' ').length - 1 ? ' ' : '')}
                            </span>
                        ))}
                    </span>
                );
            })}
        </div>
    ));
};

export default customCodeRenderer;