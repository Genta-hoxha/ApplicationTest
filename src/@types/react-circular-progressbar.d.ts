import { buildStyles } from 'react-circular-progressbar';

declare module 'react-circular-progressbar' {
    import React from 'react';
  import { CircularProgressbar, CircularProgressbar, buildStyles } from 'react-circular-progressbar';
  
  export interface CircularProgressbarStyles {
      root?: React.CSSProperties;         // Styles for the root element
      path?: React.CSSProperties;         // Styles for the path
      trail?: React.CSSProperties;        // Styles for the trail
      text?: React.CSSProperties;         // Styles for the text
      strokeLinecap?: 'butt' | 'round' | 'square'; // Specify possible values for strokeLinecap
    }
  
    export interface CircularProgressbarProps {
      value: number;                     // Required property for progress value
      text?: string;                     // Optional property for displaying text
      styles?: CircularProgressbarStyles; // Optional property for custom styles
      counterClockwise?: boolean;        // Optional property to make the progress bar counterclockwise
      onAnimationEnd?: () => void;       // Optional callback when animation ends
    }
  
    const CircularProgressbar: React.FC<CircularProgressbarProps>;
    export default CircularProgressbar;
  }
  