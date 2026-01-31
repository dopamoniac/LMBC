import { motion } from 'framer-motion';

interface SpotlightProps {
  className?: string;
  fill?: string;
}

export const Spotlight = ({ className = '', fill = 'white' }: SpotlightProps) => {
  return (
    <motion.div
      className={`pointer-events-none absolute z-[1] ${className}`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <svg
        className="animate-spotlight"
        width="600"
        height="600"
        viewBox="0 0 600 600"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g filter="url(#filter)">
          <ellipse
            cx="300"
            cy="300"
            rx="250"
            ry="250"
            fill={fill}
            fillOpacity="0.2"
          />
        </g>
        <defs>
          <filter
            id="filter"
            x="0"
            y="0"
            width="600"
            height="600"
            filterUnits="userSpaceOnUse"
            colorInterpolationFilters="sRGB"
          >
            <feFlood floodOpacity="0" result="BackgroundImageFix" />
            <feBlend
              mode="normal"
              in="SourceGraphic"
              in2="BackgroundImageFix"
              result="shape"
            />
            <feGaussianBlur
              stdDeviation="50"
              result="effect1_foregroundBlur"
            />
          </filter>
        </defs>
      </svg>
    </motion.div>
  );
};
