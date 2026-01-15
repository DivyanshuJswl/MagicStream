import { cn } from '@/utils/helpers';

export default function Input({ 
  label, 
  error, 
  className,
  ...props 
}) {
  return (
    <div className="w-full">
      {label && (
        <label className="block text-sm font-medium mb-2 text-gray-300">
          {label}
        </label>
      )}
      <input
        className={cn(
          'input',
          error && 'ring-2 ring-red-500',
          className
        )}
        {...props}
      />
      {error && (
        <p className="mt-1 text-sm text-red-400">{error}</p>
      )}
    </div>
  );
}
