'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { cn } from '@/lib/utils';

type LogoVariant = 'icon' | 'icon-bitvault' | 'icon-full';
type LogoSize = 'sm' | 'md' | 'lg' | 'xl';

interface LogoProps {
  variant?: LogoVariant;
  size?: LogoSize;
  className?: string;
  animated?: boolean;
  priority?: boolean;
}

const sizeMap = {
  sm: { width: 24, height: 24 },
  md: { width: 32, height: 32 },
  lg: { width: 48, height: 48 },
  xl: { width: 64, height: 64 },
};

const logoFiles = {
  icon: '/icon.png',
  'icon-bitvault': '/icon-bitvault.png',
  'icon-full': '/icon-full.png',
};

const logoAlts = {
  icon: 'BitVault Icon',
  'icon-bitvault': 'BitVault Logo',
  'icon-full': 'BitVault Full Logo',
};

export default function Logo({
  variant = 'icon',
  size = 'md',
  className,
  animated = false,
  priority = false,
}: LogoProps) {
  const { width, height } = sizeMap[size];
  const src = logoFiles[variant];
  const alt = logoAlts[variant];

  const logoElement = (
    <Image
      src={src}
      alt={alt}
      width={width}
      height={height}
      priority={priority}
      className={cn('object-contain', className)}
    />
  );

  if (animated) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3, ease: 'easeOut' }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        {logoElement}
      </motion.div>
    );
  }

  return logoElement;
}

// Convenience components for specific use cases
export function LogoIcon({ size = 'md', className, animated = false }: Omit<LogoProps, 'variant'>) {
  return <Logo variant="icon" size={size} className={className} animated={animated} />;
}

export function LogoBitVault({ size = 'md', className, animated = false }: Omit<LogoProps, 'variant'>) {
  return <Logo variant="icon-bitvault" size={size} className={className} animated={animated} />;
}

export function LogoFull({ size = 'lg', className, animated = false }: Omit<LogoProps, 'variant'>) {
  return <Logo variant="icon-full" size={size} className={className} animated={animated} />;
}