# Appmint Motion

Appmint Motion is a lightweight, flexible animation library powered by [anime.js](https://animejs.com/) that provides features similar to modern motion frameworks like GSAP. With Appmint Motion, you can create fluid, powerful animations for your web projects effortlessly. From scroll-based animations to complex SVG morphing, Appmint Motion has you covered.

## Features

- **Animate Presence**: Seamlessly animate elements as they enter or exit the DOM.
- **Scroll Animations**: Trigger animations when elements scroll into view.
- **Parallax Effects**: Easily create parallax scrolling effects.
- **Transforms**: Animate transforms like rotate, scale, and translate.
- **Springs**: Use spring-based easing for smooth animations.
- **Exit Animations**: Customize how elements leave the DOM.
- **Layout Animations**: Handle layout changes with animations.
- **Gestures**: Add gesture-based animations.
- **Timelines**: Coordinate multiple animations with timelines.
- **Staggering**: Add delays for staggered animations.
- **Easing & Springs**: Use predefined easings or customize with springs.
- **Morphing (SVG)**: Animate smooth morphing effects for SVGs.

## Installation

```bash
npm install appmint-motion
```

or

```bash
yarn add appmint-motion
```

## Usage

### Animate Presence

```javascript
import { animatePresence } from 'appmint-motion';

animatePresence({
  target: '.my-element',
  enter: {
    opacity: [0, 1],
    translateY: [20, 0],
    duration: 500,
  },
  exit: {
    opacity: [1, 0],
    translateY: [0, 20],
    duration: 500,
  },
});
```

### Scroll Animations

```javascript
import { animateOnScroll } from 'appmint-motion';

animateOnScroll({
  target: '.my-scroll-element',
  animation: {
    opacity: [0, 1],
    scale: [0.8, 1],
    duration: 700,
  },
});
```

### Parallax Effects

```javascript
import { parallaxEffect } from 'appmint-motion';

parallaxEffect({
  target: '.parallax-element',
  speed: 0.5, // Speed multiplier for the parallax effect
});
```

### Transforms

```javascript
import { animate } from 'appmint-motion';

animate({
  target: '.transform-element',
  translateX: [0, 100],
  rotate: [0, 360],
  duration: 1000,
});
```

### Springs

```javascript
import { springAnimation } from 'appmint-motion';

springAnimation({
  target: '.spring-element',
  to: { scale: 1.2 },
  stiffness: 100,
  damping: 20,
});
```

### Exit Animations

```javascript
import { exitAnimation } from 'appmint-motion';

exitAnimation({
  target: '.exit-element',
  animation: {
    opacity: [1, 0],
    scale: [1, 0.5],
    duration: 500,
  },
});
```

### Layout Animations

```javascript
import { layoutAnimation } from 'appmint-motion';

layoutAnimation({
  target: '.layout-container',
  duration: 500,
});
```

### Gestures

```javascript
import { gestureAnimation } from 'appmint-motion';

gestureAnimation({
  target: '.gesture-element',
  onDrag: {
    translateX: (distance) => distance,
  },
});
```

### Timelines

```javascript
import { createTimeline } from 'appmint-motion';

const timeline = createTimeline();

timeline
  .add({
    target: '.step1',
    opacity: [0, 1],
    duration: 500,
  })
  .add({
    target: '.step2',
    translateX: [0, 100],
    duration: 500,
  });
```

### Staggering

```javascript
import { staggerAnimation } from 'appmint-motion';

staggerAnimation({
  target: '.stagger-elements',
  animation: {
    translateY: [20, 0],
    opacity: [0, 1],
    duration: 500,
  },
  delay: 100, // Delay between each element
});
```

### Easing & Springs

```javascript
import { animate } from 'appmint-motion';

animate({
  target: '.easing-element',
  translateX: [0, 100],
  easing: 'spring(1, 100, 10, 0)',
});
```

### Morphing (SVG)

```javascript
import { morphSVG } from 'appmint-motion';

morphSVG({
  target: '.svg-path',
  from: 'M10 80 C 40 10, 65 10, 95 80 S 150 150, 180 80',
  to: 'M10 80 C 40 120, 65 120, 95 80 S 150 10, 180 80',
  duration: 1000,
});
```

## API Documentation

Explore the detailed API documentation in the official guide here.

## Dependencies

- anime.js

## License

This project is licensed under the MIT License.
