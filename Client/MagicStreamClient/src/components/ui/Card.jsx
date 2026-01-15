import { cn } from '@/utils/helpers';
import { motion } from 'framer-motion';

export default function Card({ children, className, hover = false, ...props }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={cn(
        'card',
        hover && 'glass-hover cursor-pointer',
        className
      )}
      {...props}
    >
      {children}
    </motion.div>
  );
}
