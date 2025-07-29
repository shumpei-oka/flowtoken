import React from "react";
import { codeToTokens, type BundledLanguage, bundledLanguages } from "shiki";

interface ShikiCodeRendererProps {
  codeContent: string;
  language: string;
  animation?: string;
  animationDuration?: string;
  animationTimingFunction?: string;
}

// Custom hook for dark mode detection
const useDarkMode = () => {
  const [isDark, setIsDark] = React.useState(false);

  React.useEffect(() => {
    const checkDarkMode = () => {
      // Detect Storybook dark mode toggle
      const htmlElement = document.documentElement;
      const isDarkMode = htmlElement.classList.contains("dark");
      setIsDark(isDarkMode);
    };

    // Initial check
    checkDarkMode();

    // Monitor class changes with MutationObserver
    const observer = new MutationObserver(checkDarkMode);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    return () => observer.disconnect();
  }, []);

  return isDark;
};

// Custom renderer for SHIKI (based on original customCodeRenderer animation logic)
const ShikiCodeRenderer: React.FC<ShikiCodeRendererProps> = ({
  codeContent,
  language,
  animation,
  animationDuration,
  animationTimingFunction,
}) => {
  const [renderedTokens, setRenderedTokens] =
    React.useState<React.ReactNode>(null);
  const isDark = useDarkMode();

  React.useEffect(() => {
    const renderCode = async () => {
      try {
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

        // Select theme based on dark mode
        const selectedTheme = isDark ? "github-dark" : "github-light";

        const { tokens } = await codeToTokens(processedCode, {
          lang: validLanguage,
          theme: selectedTheme, // Specify single theme
        });

        // Apply animation logic similar to original customCodeRenderer
        const rendered = tokens.map((line, lineIndex) => (
          <div key={lineIndex} style={{ display: "block" }}>
            {line.map((token, tokenIndex) => {
              // SHIKI's ThemedToken actually only has color property
              const tokenStyles = {
                color: token.color || (isDark ? "#e6edf3" : "#24292f"), // Theme default color when undefined
              };

              // Apply animation to each word like original customCodeRenderer
              return (
                <span key={tokenIndex} style={tokenStyles}>
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
    isDark, // Re-render when dark mode changes
  ]);

  return (
    <pre
      style={{
        margin: 0,
        padding: "1rem",
        background: "transparent",
        fontSize: "0.775rem",
        overflow: "auto",
        borderRadius: "0 0 0.75rem 0.75rem", // rounded-b-xl
      }}
    >
      <code>{renderedTokens}</code>
    </pre>
  );
};

export default ShikiCodeRenderer;
