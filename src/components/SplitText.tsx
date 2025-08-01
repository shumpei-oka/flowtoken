import React, {
  useRef,
  useEffect,
  ReactElement,
  useCallback,
  useState,
} from "react";

interface TokenWithSource {
  text: string;
  source: number;
}

type TokenType = string | TokenWithSource | ReactElement;

const TokenizedText = ({
  input,
  sep,
  animation,
  animationDuration,
  animationTimingFunction,
  animationIterationCount,
}: any) => {
  // Early return for no animation case
  if (animation === "none" || !animation) {
    return <>{input}</>;
  }

  // Track previous input to detect changes
  const prevInputRef = useRef<string>("");
  // Track tokens with their source for proper keying in diff mode
  const tokensWithSources = useRef<TokenWithSource[]>([]);

  // For detecting and handling duplicated content
  const fullTextRef = useRef<string>("");

  // Track completed animations to clear styles (using ref to avoid re-renders)
  const completedTokensRef = useRef<Set<number>>(new Set());
  const [isFullyAnimated, setIsFullyAnimated] = useState(false);

  const tokens = React.useMemo(() => {
    if (React.isValidElement(input)) return [input];

    if (typeof input !== "string") return null;

    // For diff mode, we need to handle things differently
    if (sep === "diff") {
      // If this is the first render or we've gone backward, reset everything
      if (!prevInputRef.current || input.length < prevInputRef.current.length) {
        tokensWithSources.current = [];
        fullTextRef.current = "";
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
              source: tokensWithSources.current.length,
            });

            // Update our full text tracking
            fullTextRef.current = input;
          }
        } else {
          // Handle case when input completely changes
          // Just take the whole thing as a new token
          tokensWithSources.current = [
            {
              text: input,
              source: 0,
            },
          ];
          fullTextRef.current = input;
        }
      }

      // Return the tokensWithSources directly
      return tokensWithSources.current;
    }

    // Original word/char splitting logic
    let splitRegex;
    if (sep === "word") {
      splitRegex = /(\s+)/;
    } else if (sep === "char") {
      splitRegex = /(.)/;
    } else {
      throw new Error('Invalid separator: must be "word", "char", or "diff"');
    }

    return input.split(splitRegex).filter((token) => token.length > 0);
  }, [input, sep]);

  // Update previous input after processing
  useEffect(() => {
    if (typeof input === "string") {
      prevInputRef.current = input;
    }
  }, [input]);

  // Helper function to check if token is a TokenWithSource type
  const isTokenWithSource = (token: TokenType): token is TokenWithSource => {
    return (
      token !== null &&
      typeof token === "object" &&
      "text" in token &&
      "source" in token
    );
  };

  // Handle animation completion with direct DOM manipulation
  const handleAnimationEnd = useCallback(
    (tokenIndex: number, event: React.AnimationEvent<HTMLSpanElement>) => {
      // Direct DOM manipulation to clear styles without re-rendering
      const spanElement = event.currentTarget;
      spanElement.removeAttribute("style");

      // Track completion without triggering re-render
      completedTokensRef.current.add(tokenIndex);
      
      // V3 pattern: Check if all animations are complete immediately
      if (tokens && completedTokensRef.current.size === tokens.length) {
        setTimeout(() => {
          setIsFullyAnimated(true);
        }, 100);
      }
    },
    [tokens]
  );

  // V3 pattern: Remove the useEffect - span removal is handled by animation completion only

  // Get initial animation style (completion handled by direct DOM manipulation)
  const animationStyle = React.useMemo(
    () => ({
      animationName: animation,
      animationDuration,
      animationTimingFunction,
      animationIterationCount,
    }),
    [
      animation,
      animationDuration,
      animationTimingFunction,
      animationIterationCount,
    ]
  );

  // V3 pattern: Return clean HTML when all animations are done
  if (isFullyAnimated) {
    return <>{input}</>;
  }

  return (
    <>
      {tokens?.map((token, index) => {
        // Determine the key and text based on token type
        let key = index;
        let text = "";

        if (isTokenWithSource(token)) {
          key = token.source;
          text = token.text;
        } else if (typeof token === "string") {
          key = index;
          text = token;
        } else if (React.isValidElement(token)) {
          key = index;
          text = "";
          return React.cloneElement(token, { key });
        }

        return (
          <span
            key={key}
            style={animationStyle}
            onAnimationEnd={(event) => handleAnimationEnd(index, event)}
          >
            {text}
          </span>
        );
      })}
    </>
  );
};

export default React.memo(TokenizedText); // Memoize the entire component to prevent unnecessary rerenders
