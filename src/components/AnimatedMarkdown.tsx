"use client";
import React from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
// Removed react-syntax-highlighter style import as we now use Shiki
import TokenizedText from "./SplitText";
import AnimatedImage from "./AnimatedImage";
import { animations } from "../utils/animations";
import DefaultCode from "./DefaultCode";

interface MarkdownAnimateTextProps {
  content: string;
  sep?: string;
  animation?: string;
  animationDuration?: string;
  animationTimingFunction?: string;
  // theme is now handled automatically by dual themes
  customComponents?: Record<string, any>;
  imgHeight?: string;
}

// Function to create animation style object - extracted outside of component
const createAnimationStyle = (
  animation: string | null,
  animationDuration: string,
  animationTimingFunction: string
) => ({
  animation: animation
    ? `${animation} ${animationDuration} ${animationTimingFunction}`
    : "none",
});

// Memoized component for text elements to avoid creating many instances
const MemoizedText = React.memo(
  ({
    children,
    animation,
    animationDuration,
    animationTimingFunction,
    sep,
  }: any) => (
    <TokenizedText
      input={children}
      sep={sep}
      animation={animation}
      animationDuration={animationDuration}
      animationTimingFunction={animationTimingFunction}
      animationIterationCount={1}
    />
  )
);

// Optimize rendering for lists to reduce memory usage
const MemoizedList = React.memo(
  ({
    children,
    style,
  }: {
    children: React.ReactNode;
    style: React.CSSProperties;
  }) => (
    <li className="ft-custom-li" style={style}>
      {children}
    </li>
  )
);

const MarkdownAnimateText: React.FC<MarkdownAnimateTextProps> = ({
  content,
  sep = "diff",
  animation: animationName = "fadeIn",
  animationDuration = "1s",
  animationTimingFunction = "ease-in-out",
  // theme removed - using dual themes
  customComponents = {},
  imgHeight = "20rem",
}) => {
  const animation =
    animations[animationName as keyof typeof animations] || animationName;

  // Memoize the animation style to avoid recreating it on every render
  const animationStyle = React.useMemo(
    () =>
      createAnimationStyle(
        animation,
        animationDuration,
        animationTimingFunction
      ),
    [animation, animationDuration, animationTimingFunction]
  );

  // Enhanced hidePartialCustomComponents function that also handles tag attributes
  const hidePartialCustomComponents = React.useCallback(
    (input: string): React.ReactNode => {
      if (!input || Object.keys(customComponents).length === 0) return input;

      // Check for any opening tag without a closing '>'
      const lastOpeningBracketIndex = input.lastIndexOf("<");
      if (lastOpeningBracketIndex !== -1) {
        const textAfterLastOpeningBracket = input.substring(
          lastOpeningBracketIndex
        );

        // If there's no closing bracket, then it's potentially a partial tag
        if (!textAfterLastOpeningBracket.includes(">")) {
          // Check if it starts with any of our custom component names
          for (const tag of Object.keys(customComponents)) {
            // Check if the text starts with the tag name (allowing for partial tag name)
            // For example, '<Cus' would match a component named 'CustomTag'
            if (
              textAfterLastOpeningBracket
                .substring(1)
                .startsWith(
                  tag.substring(0, textAfterLastOpeningBracket.length - 1)
                ) ||
              // Or it's a complete tag name followed by attributes
              textAfterLastOpeningBracket.match(new RegExp(`^<${tag}(\\s|$)`))
            ) {
              // Remove the partial tag
              return input.substring(0, lastOpeningBracketIndex);
            }
          }
        }
      }

      return input;
    },
    [customComponents]
  );

  // Memoize animateText function to prevent recreations
  const animateText = React.useCallback(
    (text: string | Array<any>) => {
      text = Array.isArray(text) ? text : [text];

      if (!animation) return text;

      return text.map((item, index) => {
        if (typeof item === "string") {
          return (
            <MemoizedText
              key={`text-${index}`}
              children={hidePartialCustomComponents(item)}
              animation={animation}
              animationDuration={animationDuration}
              animationTimingFunction={animationTimingFunction}
              sep={sep}
            />
          );
        } else if (React.isValidElement(item)) {
          // Check if the React element is one of the types we don't want to animate
          const noAnimateElementTypes: Array<React.ElementType> = [
            "br",
            "ul",
            "ol",
            "td",
            "th",
          ];
          let typeName = item.type;
          if (typeof typeName === "function") {
            typeName = typeName.name;
          }
          if (
            typeof typeName === "string" &&
            noAnimateElementTypes.includes(typeName as React.ElementType)
          ) {
            return item;
          }
          return (
            <span
              key={`other-element-${index}`}
              style={{
                animationName: animation,
                animationDuration,
                animationTimingFunction,
                animationIterationCount: 1,
                whiteSpace: "pre-wrap",
                display: "inline-block",
              }}
            >
              {item}
            </span>
          );
        }
        return (
          <span
            key={`other-${index}`}
            style={{
              animationName: animation,
              animationDuration,
              animationTimingFunction,
              animationIterationCount: 1,
              whiteSpace: "pre-wrap",
              display: "inline-block",
            }}
          >
            {item}
          </span>
        );
      });
    },
    [
      animation,
      animationDuration,
      animationTimingFunction,
      sep,
      hidePartialCustomComponents,
    ]
  );

  // Memoize components object to avoid redefining components unnecessarily
  const components: any = React.useMemo(
    () => ({
      text: ({ node, ...props }: any) => animateText(props.children),
      h1: ({ node, ...props }: any) => (
        <h1 {...props}>{animateText(props.children)}</h1>
      ),
      h2: ({ node, ...props }: any) => (
        <h2 {...props}>{animateText(props.children)}</h2>
      ),
      h3: ({ node, ...props }: any) => (
        <h3 {...props}>{animateText(props.children)}</h3>
      ),
      h4: ({ node, ...props }: any) => (
        <h4 {...props}>{animateText(props.children)}</h4>
      ),
      h5: ({ node, ...props }: any) => (
        <h5 {...props}>{animateText(props.children)}</h5>
      ),
      h6: ({ node, ...props }: any) => (
        <h6 {...props}>{animateText(props.children)}</h6>
      ),
      p: ({ node, ...props }: any) => (
        <p {...props}>{animateText(props.children)}</p>
      ),
      //
      li: ({ node, ...props }: any) => <li {...props}>{props.children}</li>,
      a: ({ node, ...props }: any) => (
        <a
          {...props}
          href={props.href}
          target="_blank"
          rel="noopener noreferrer"
        >
          {animateText(props.children)}
        </a>
      ),
      strong: ({ node, ...props }: any) => (
        <strong {...props}>{animateText(props.children)}</strong>
      ),
      em: ({ node, ...props }: any) => (
        <em {...props}>{animateText(props.children)}</em>
      ),
      code: ({ node, className, children, ...props }: any) => {
        return (
          <DefaultCode
            node={node}
            className={className}
            style={animationStyle}
            // theme now handled by dual themes
            animateText={animateText}
            animation={animation as string}
            animationDuration={animationDuration}
            animationTimingFunction={animationTimingFunction}
            {...props}
          >
            {children}
          </DefaultCode>
        );
      },
      hr: ({ node, ...props }: any) => (
        <hr
          {...props}
          style={{
            animationName: animation,
            animationDuration,
            animationTimingFunction,
            animationIterationCount: 1,
            whiteSpace: "pre-wrap",
          }}
        />
      ),
      img: ({ node, ...props }: any) => (
        <AnimatedImage
          src={props.src}
          height={imgHeight}
          alt={props.alt}
          animation={animation || ""}
          animationDuration={animationDuration}
          animationTimingFunction={animationTimingFunction}
          animationIterationCount={1}
        />
      ),
      table: ({ node, ...props }: any) => (
        <table {...props} style={animationStyle}>
          {props.children}
        </table>
      ),
      thead: ({ node, ...props }: any) => (
        <thead {...props}>{props.children}</thead>
      ),
      tbody: ({ node, ...props }: any) => (
        <tbody {...props}>{props.children}</tbody>
      ),
      tr: ({ node, ...props }: any) => <tr {...props}>{props.children}</tr>,
      th: ({ node, ...props }: any) => (
        <th {...props}>{animateText(props.children)}</th>
      ),
      td: ({ node, ...props }: any) => (
        <td {...props}>{animateText(props.children)}</td>
      ),
      ...Object.entries(customComponents).reduce(
        (acc: any, [key, value]: any) => {
          acc[key] = (elements: any) => value({ ...elements, animateText });
          return acc;
        },
        {} as Record<string, (elements: any) => React.ReactNode>
      ),
    }),
    [
      animateText,
      customComponents,
      animation,
      animationDuration,
      animationTimingFunction,
    ]
  );

  return (
    <ReactMarkdown
      components={components}
      remarkPlugins={[remarkGfm]}
      rehypePlugins={[rehypeRaw]}
    >
      {content}
    </ReactMarkdown>
  );
};

export default React.memo(MarkdownAnimateText);
