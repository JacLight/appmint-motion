import React from 'react';
interface AnimationProviderProps {
    children: React.ReactNode;
    animationType?: 'fade' | 'slide' | 'scale';
    duration?: number;
}
declare const AnimatePresence: React.FC<AnimationProviderProps>;
export default AnimatePresence;
