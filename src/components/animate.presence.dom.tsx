import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import anime from 'animejs';

interface AnimatePresenceDOMProps {
    targetSelector: string; // Selector for the container
    onElementRemoved?: (removedElement: HTMLElement) => void;
    onElementAdded?: (addedElement: HTMLElement) => void;
    animationType?: 'fade' | 'slide' | 'scale';
    duration?: number;
}

const AnimatePresenceDOM: React.FC<AnimatePresenceDOMProps> = ({
    targetSelector, onElementRemoved, onElementAdded,
    animationType = 'fade',
    duration = 500,
}) => {
    const observerRef = useRef<MutationObserver | null>(null);
    const [prevChildren, setPrevChildren] = useState([]);
    const parentRef = useRef(null);

    // useLayoutEffect(() => {
    //     // Compare prevChildren and current children
    //     const currentKeys = React.Children.map(children, child => child.key);
    //     const prevKeys = prevChildren.map(child => child.key);

    //     // Find which keys are gone
    //     const removedKeys = prevKeys.filter(key => !currentKeys.includes(key));

    //     removedKeys.forEach(key => {
    //         // Find old index of the removed element
    //         const oldIndex = prevKeys.indexOf(key);

    //         // Retrieve information about where to insert clone
    //         const parentElement = parentRef.current;
    //         if (!parentElement) return;

    //         const clone = createCloneForKey(key);
    //         if (oldIndex >= parentElement.children.length) {
    //             parentElement.appendChild(clone);
    //         } else {
    //             parentElement.insertBefore(clone, parentElement.children[oldIndex]);
    //         }

    //         // Animate clone out, then remove it
    //         animateExit(clone).then(() => clone.remove());
    //     });

    //     setPrevChildren(React.Children.toArray(children));
    // }, [targetSelector]);

    useEffect(() => {
        const container = document.querySelector(targetSelector);
        if (!container) return;

        const observer = new MutationObserver((mutations) => {
            mutations.forEach((mutation) => {
                if (mutation.type === 'childList') {
                    // Handle added nodes
                    if (mutation.addedNodes.length > 0) {
                        mutation.addedNodes.forEach((node) => {
                            if (node instanceof HTMLElement && onElementAdded) {
                                if (node.id === 'removed-node') return;
                                animateEnter(node)
                                onElementAdded(node);
                            }
                        });
                    }

                    // Handle removed nodes
                    if (mutation.removedNodes.length > 0) {

                        const removedNodes = Array.from(mutation.removedNodes).filter(
                            (node) => node instanceof HTMLElement
                        ) as HTMLElement[];

                        removedNodes.forEach(async (node) => {
                            if (node instanceof HTMLElement && onElementRemoved) {
                                //we need to wait for the exit animation to finish before removing the element
                                if (node.id === 'removed-node') return;
                                const clone = node.cloneNode(true) as HTMLElement;
                                clone.id = 'removed-node'
                                container.appendChild(clone);
                                // node.parentElement?.insertBefore(clone, node);
                                onElementRemoved(node);
                                await animateExit(clone);
                                container.removeChild(clone); // Remove the element from the DOM
                            }
                        });
                    }
                }
            });
        });

        observer.observe(container, { childList: true, subtree: false });
        observerRef.current = observer;

        return () => {
            // Disconnect observer on cleanup
            observer.disconnect();
        };
    }, [targetSelector, onElementRemoved]);


    const animateEnter = (element: HTMLElement) => {
        // Run the enter animation
        anime({
            targets: element,
            ...getAnimationProps(animationType, 'enter'),
            duration: duration,
            easing: 'easeInOutQuad',
        });


    };

    const animateExit = (element: HTMLElement, duration = 500): Promise<void> => {
        return new Promise((resolve) => {
            let resolved = false;

            // Timeout for fail-safe handling
            const timeout = setTimeout(() => {
                if (!resolved) {
                    console.warn('Animation timeout, resolving fail-safe.');
                    resolved = true;
                    resolve(); // Resolve if animation doesn't complete in time
                }
            }, duration); // Add a small buffer to the duration

            anime({
                targets: element,
                ...getAnimationProps(animationType, 'exit'),
                duration: duration * 0.5,
                easing: 'easeOutQuad',
                complete: () => {
                    if (!resolved) {
                        clearTimeout(timeout); // Clear timeout if animation finishes
                        resolved = true;
                        resolve(); // Resolve the promise
                    }
                },
            });
        });
    };

    return null; // This component does not render anything
};


const getAnimationProps = (types: string | string[], phase: 'enter' | 'exit') => {
    const animations: any = {
        fade: {
            enter: { opacity: [0, 1], },
            exit: { opacity: [1, 0] },
        },
        slide: {
            enter: { translateY: [20, 0], opacity: [0, 1] },
            exit: { translateY: [0, 20], opacity: [1, 0] },
        },
        scale: {
            enter: { scale: [0.8, 1], opacity: [0, 1] },
            exit: { scale: [1, 0.8], opacity: [1, 0] },
        },
        rotate: {
            enter: { rotate: [0, '1turn'], opacity: [0, 1] },
            exit: { rotate: ['1turn', 0], opacity: [1, 0] },
        }
    };

    types = Array.isArray(types) ? types : [types];
    let animation = {};
    types.forEach(type => {
        const thisAnimation = animations[type]?.[phase] || animations.fade[phase];
        animation = { ...animation, ...thisAnimation };
    });
    return animation
};



export default AnimatePresenceDOM;

