import React from 'react';

interface AnimatedImageProps {
    src: string;
    alt: string;
    animation: string;
    animationDuration: string;
    animationTimingFunction: string;
    animationIterationCount: number;
    height?: string;  // Optional height prop
    width?: string;   // Optional width prop
    objectFit?: 'cover' | 'contain' | 'fill' | 'none' | 'scale-down';  // Control how the image fits
}

const AnimatedImage: React.FC<AnimatedImageProps>  = ({ 
    src, 
    alt, 
    animation, 
    animationDuration, 
    animationTimingFunction, 
    animationIterationCount,
    height,
    width,
    objectFit = 'contain'  // Default to 'contain' to maintain aspect ratio
}) => {
    const [isLoaded, setIsLoaded] = React.useState(false);

    // Base styles that apply both before and after loading
    const baseStyle = {
        height: height || 'auto',
        width: width || 'auto',
        objectFit: objectFit,  // This maintains aspect ratio
        maxWidth: '100%',      // Ensure image doesn't overflow container
    };

    const imageStyle = isLoaded ? {
        ...baseStyle,
        animationName: animation,
        animationDuration: animationDuration,
        animationTimingFunction: animationTimingFunction,
        animationIterationCount: animationIterationCount,
        whiteSpace: 'pre-wrap',
    } : {
        ...baseStyle,
        opacity: 0.0,  // Slightly transparent before loading
        backgroundColor: '#f0f0f0',  // Light gray background before loading
    };

    return (
        <img
            src={src}
            alt={alt}
            onLoad={() => setIsLoaded(true)}
            style={imageStyle}
        />
    );
};

// メモ化：同じsrcの場合は再レンダリングを防ぐ
export default React.memo(AnimatedImage, (prevProps, nextProps) => {
  return prevProps.src === nextProps.src &&
         prevProps.alt === nextProps.alt &&
         prevProps.animation === nextProps.animation &&
         prevProps.animationDuration === nextProps.animationDuration &&
         prevProps.animationTimingFunction === nextProps.animationTimingFunction &&
         prevProps.height === nextProps.height &&
         prevProps.width === nextProps.width;
});
