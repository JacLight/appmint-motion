import React from 'react';
interface AnimatePresenceDOMProps {
    targetSelector: string;
    onElementRemoved?: (removedElement: HTMLElement) => void;
    onElementAdded?: (addedElement: HTMLElement) => void;
    animationType?: 'fade' | 'slide' | 'scale';
    duration?: number;
}
declare const AnimatePresenceDOM: React.FC<AnimatePresenceDOMProps>;
export default AnimatePresenceDOM;
