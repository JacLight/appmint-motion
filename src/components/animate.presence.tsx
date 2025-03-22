import React, { useEffect, useRef } from 'react';
import anime from 'animejs';

interface AnimationProviderProps {
    children: React.ReactNode;
    animationType?: 'fade' | 'slide' | 'scale'; // Supported animation types
    duration?: number; // Optional: Duration of the animation
}

const AnimatePresence: React.FC<AnimationProviderProps> = ({
    children,
    animationType = 'fade',
    duration = 500,
}) => {
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const container = containerRef.current;

        if (!container) {
            console.error('Container not found. Ensure the ref is correctly assigned.');
            return;
        }

        console.log('Observing container:', container);

        const observer = new MutationObserver((mutations) => {
            console.log('Mutation detected:', mutations); // Log the mutations

            mutations.forEach((mutation) => {
                if (mutation.type === 'childList') {
                    console.log('Child list mutation:', mutation);

                    mutation.addedNodes.forEach((node) => {
                        console.log('Node added:', node);
                    });

                    mutation.removedNodes.forEach((node) => {
                        console.log('Node removed:', node);
                    });
                }
            });
        });

        observer.observe(container, { childList: true });

        return () => {
            console.log('Disconnecting MutationObserver.');
            observer.disconnect();
        };
    }, []);

    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        console.log('Observing container:', container);
        const observer = new MutationObserver((mutations) => {
            console.log('Mutations detected:', mutations); // Log mutations

            mutations.forEach((mutation) => {
                if (mutation.type === 'childList') {
                    console.log('ChildList mutation:', mutation); // Log specific child list changes

                    // Handle added nodes
                    mutation.addedNodes.forEach((node) => {
                        console.log('Node added:', node); // Log added node
                        if (node instanceof HTMLElement) {
                            anime({
                                targets: node,
                                ...getAnimationProps(animationType, 'enter'),
                                duration,
                                easing: 'easeOutQuad',
                                update: function (anim) {
                                    console.log('progress : ' + anim.progress);
                                },
                                begin: function (anim) {
                                    console.log('begin : ' + anim.began);
                                },
                                complete: function (anim) {
                                    console.log('complete : ' + anim.completed);
                                }
                            });
                        }
                    });

                    // Handle removed nodes
                    mutation.removedNodes.forEach((node) => {
                        console.log('Node removed:', node); // Log removed node
                        if (node instanceof HTMLElement) {
                            anime({
                                targets: node,
                                ...getAnimationProps(animationType, 'exit'),
                                duration,
                                easing: 'easeInQuad',
                                update: function (anim) {
                                    console.log('progress : ' + anim.progress);
                                },
                                begin: function (anim) {
                                    console.log('begin : ' + anim.began);
                                },
                                complete: function (anim) {
                                    console.log('complete : ' + anim.completed);
                                }
                            });
                        }
                    });
                }
            });
        });

        // Observe child changes in the container
        observer.observe(container, { childList: true });

        return () => {
            observer.disconnect();
        };
    }, [animationType, duration]);

    return <div ref={containerRef}>{children}</div>;
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

    return animations[type]?.[phase] || animations.fade[phase]; // Default to fade
};

export default AnimatePresence;
