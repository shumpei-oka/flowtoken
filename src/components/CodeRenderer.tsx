import React from "react";
import { codeToTokens, bundledLanguages } from "shiki";
import type { BundledLanguage } from "shiki";

interface CodeRendererProps {
  codeContent: string;
  language: string;
  animation?: string;
  animationDuration?: string;
  animationTimingFunction?: string;
}

// Shiki code renderer with dual theme support
const CodeRenderer: React.FC<CodeRendererProps> = ({
  codeContent,
  language,
  animation,
  animationDuration,
  animationTimingFunction,
}) => {
  const [renderedTokens, setRenderedTokens] = React.useState<React.ReactNode>(null);

  React.useEffect(() => {
    const renderCode = async () => {
      try {
        // Use static import for better Next.js compatibility
        
        // Check if language is valid, fallback to 'text' if invalid
        const validLanguage =
          language in bundledLanguages
            ? (language as BundledLanguage)
            : ("text" as BundledLanguage);

        // text言語（フォールバック）の場合のみ末尾改行を除去
        const isUnsupportedLanguage = !(language in bundledLanguages);
        const processedCode = isUnsupportedLanguage
          ? codeContent.trimEnd()
          : codeContent;

        // Use dual themes with defaultColor: false for CSS variable consistency
        const { tokens } = await codeToTokens(processedCode, {
          lang: validLanguage,
          themes: {
            light: "github-light",
            dark: "github-dark",
          },
          defaultColor: false,
        });

        // Apply animation logic similar to original customCodeRenderer
        // Filter out empty lines and lines with only whitespace tokens
        const rendered = tokens
          .filter((line) => line.length > 0 && line.some(token => token.content.trim().length > 0))
          .map((line, lineIndex) => (
            <div key={lineIndex} style={{ display: "block" }}>
              {line.map((token, tokenIndex) => {
              // Debug: Log actual token structure in React component
              if (lineIndex === 0 && tokenIndex < 3) {
                console.log(`React Token ${tokenIndex}:`, {
                  content: token.content,
                  htmlStyle: (token as any).htmlStyle,
                  hasShikiLight: (token as any).htmlStyle && '--shiki-light' in (token as any).htmlStyle,
                  hasShikiDark: (token as any).htmlStyle && '--shiki-dark' in (token as any).htmlStyle
                });
              }
              
              // Use token.htmlStyle with CSS variables for dual themes
              return (
                <span 
                  key={tokenIndex} 
                  style={(token as any).htmlStyle}
                  className="shiki"
                >
                  {token.content
                    .split(" ")
                    .map((word: string, wordIndex: number) => (
                      <span
                        key={wordIndex}
                        style={{
                          animationName: animation || "",
                          animationDuration,
                          animationTimingFunction,
                          animationIterationCount: 1,
                          whiteSpace: "pre-wrap",
                          display: "inline-block",
                        }}
                      >
                        {word +
                          (wordIndex < token.content.split(" ").length - 1
                            ? " "
                            : "")}
                      </span>
                    ))}
                </span>
              );
            })}
          </div>
        ));

        setRenderedTokens(rendered);
      } catch (error) {
        console.warn(`Failed to render code for language: ${language}`, error);
        setRenderedTokens(`Error rendering code: ${error}`);
      }
    };

    renderCode();
  }, [
    codeContent,
    language,
    animation,
    animationDuration,
    animationTimingFunction,
    // Removed isDark dependency to prevent flickering
  ]);

  return (
    <pre
      style={{
        margin: 0,
        padding: "1rem",
        background: "transparent",
        fontSize: "0.775rem",
        overflow: "auto",
        borderRadius: "0 0 0.75rem 0.75rem",
      }}
    >
      <code>{renderedTokens}</code>
    </pre>
  );
};

export default CodeRenderer;