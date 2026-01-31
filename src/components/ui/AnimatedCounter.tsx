import { useEffect, useRef, useState } from 'react';
import { useInView, useSpring, useTransform } from 'framer-motion';

interface AnimatedCounterProps {
  value: number;
  suffix?: string;
  prefix?: string;
  duration?: number;
  className?: string;
}

export const AnimatedCounter = ({
  value,
  suffix = '',
  prefix = '',
  duration = 2,
  className = '',
}: AnimatedCounterProps) => {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [hasAnimated, setHasAnimated] = useState(false);

  const springValue = useSpring(0, {
    duration: duration * 1000,
    bounce: 0,
  });

  const displayValue = useTransform(springValue, (latest) =>
    Math.floor(latest)
  );

  const [displayNumber, setDisplayNumber] = useState(0);

  useEffect(() => {
    if (isInView && !hasAnimated) {
      springValue.set(value);
      setHasAnimated(true);
    }
  }, [isInView, hasAnimated, springValue, value]);

  useEffect(() => {
    const unsubscribe = displayValue.on('change', (latest) => {
      setDisplayNumber(latest);
    });
    return unsubscribe;
  }, [displayValue]);

  return (
    <span ref={ref} className={className}>
      {prefix}
      {displayNumber}
      {suffix}
    </span>
  );
};
