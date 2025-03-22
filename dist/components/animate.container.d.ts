import React from 'react';
interface AnimationProviderProps {
    children: React.ReactNode;
    animationType?: 'fade' | 'slide' | 'scale';
    duration?: number;
}
declare const AnimateDIV: React.FC<AnimationProviderProps>;
export default AnimateDIV;
