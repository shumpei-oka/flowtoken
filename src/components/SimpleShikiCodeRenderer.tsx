import React from "react";
import type { BundledLanguage } from "shiki";

interface SimpleShikiCodeRendererProps {
  codeContent: string;
  language: string;
  animation?: string;
  animationDuration?: string;
  animationTimingFunction?: string;
}

// Simple Shiki renderer without dark mode detection to avoid flickering
const SimpleShikiCodeRenderer: React.FC<SimpleShikiCodeRendererProps> = ({
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
        // Dynamic import to avoid serverExternalPackages issues
        const { codeToTokens, bundledLanguages } = await import("shiki");
        
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

        // Use CSS variables for theme switching instead of JS detection
        const { tokens } = await codeToTokens(processedCode, {
          lang: validLanguage,
          theme: "github-light", // Fixed theme, will be overridden by CSS
        });

        // Apply animation logic similar to original customCodeRenderer
        const rendered = tokens.map((line, lineIndex) => (
          <div key={lineIndex} style={{ display: "block" }}>
            {line.map((token, tokenIndex) => {
              // Apply animation to each word like original customCodeRenderer
              return (
                <span key={tokenIndex} style={{ color: token.color }}>
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

export default SimpleShikiCodeRenderer;