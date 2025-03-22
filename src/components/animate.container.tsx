import React, { useEffect, useRef } from 'react';
import anime from 'animejs';

interface AnimationProviderProps {
    children: React.ReactNode;
    animationType?: 'fade' | 'slide' | 'scale'; // Supported animation types
    duration?: number; // Optional: Duration of the animation
}

const AnimateDIV: React.FC<AnimationProviderProps> = ({
    children,
    animationType = 'fade',
    duration = 3000,
}) => {
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (containerRef.current) {
            // Run the enter animation based on the animation type
            anime({
                targets: containerRef.current,
                ...getAnimationProps(animationType, 'enter'),
                duration,
                easing: 'easeOutQuad',
            });
        }

        return () => {
            if (containerRef.current) {
                // Run the exit animation before unmounting
                anime({
                    targets: containerRef.current,
                    ...getAnimationProps(animationType, 'exit'),
                    duration,
                    easing: 'easeInQuad',
                });
            }
        };
    }, [animationType, duration]);

    return (
        <div ref={containerRef} style={{ opacity: 0 }}>
            {children}
        </div>
    );
};

// Helper function to define animation properties
const getAnimationProps = (type: string, phase: 'enter' | 'exit') => {
    const animations: any = {
        fade: {
            enter: { opacity: [0, 1] },
            exit: { opacity: [1, 0] },
        },
        slide: {
            enter: { translateY: [20, 0], opacity: [0, 1] },
            exit: { translateY: [0, -20], opacity: [1, 0] },
        },
        scale: {
            enter: { scale: [0.8, 1], opacity: [0, 1] },
            exit: { scale: [1, 0.8], opacity: [1, 0] },
        },
    };

    return animations[type]?.[phase] || animations.fade[phase];
};

export default AnimateDIV;
