"use client";
import React from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { IconCheck, IconCopy } from "@tabler/icons-react";
import customCodeRenderer from "./CodeRenderer";

interface DefaultCodeProps {
  node: any;
  className?: string;
  children: React.ReactNode & React.ReactNode[];
  style?: React.CSSProperties;
  codeStyle?: any; // react-syntax-highlighter legacy prop (ignored for CSS variables)
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
  codeStyle, // Extract to prevent passing to DOM
  animateText,
  animation,
  animationDuration,
  animationTimingFunction,
  ...props
}) => {
  const [copied, setCopied] = React.useState(false);

  const handleCopy = () => {
    const textToCopy = Array.isArray(children)
      ? children.join("")
      : String(children);
    navigator.clipboard.writeText(textToCopy);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (!className || !className.startsWith("language-")) {
    return (
      <code
        {...props}
        className="ft-inline-code"
      >
        {animateText(children)}
      </code>
    );
  }

  const language = className?.substring(9).trim() || "text";

  return (
    <div {...props} className="ft-code-container" style={style}>
      {/* Header section */}
      <div className="ft-code-header">
        <div style={{ paddingLeft: "0.75rem" }}>
          <span className="ft-code-language">
            {language}
          </span>
        </div>
        <button
          className="ft-copy-button"
          onClick={handleCopy}
          aria-label={copied ? "Copied!" : "Copy code"}
        >
          {copied ? (
            <IconCheck
              className="ft-copy-icon ft-copy-icon-success"
              aria-hidden="true"
            />
          ) : (
            <IconCopy
              className="ft-copy-icon ft-copy-icon-default"
              aria-hidden="true"
            />
          )}
        </button>
      </div>
      {/* Content section with CSS variables control */}
      <div className="ft-code-content rsh-container">
        <SyntaxHighlighter
          useInlineStyles={false} // Critical: Use CSS classes instead of inline styles
          language={language}
          renderer={customCodeRenderer({
            animation,
            animationDuration,
            animationTimingFunction,
          })}
          customStyle={{
            margin: 0,
            padding: "1rem",
            background: "transparent",
            fontSize: "0.775rem",
            overflow: "auto",
            borderRadius: "0 0 0.75rem 0.75rem",
          }}
        >
          {String(children)}
        </SyntaxHighlighter>
      </div>
    </div>
  );
};

export default DefaultCode;
