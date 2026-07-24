import { forwardRef } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/cn';

/**
 * SHAPE SYSTEM (the documented rule, followed site-wide):
 *   interactive controls -> full pill   (buttons, chips, icon buttons)
 *   surfaces / media     -> rounded-lg  (22px), rounded-xl (30px) when large
 *   inputs               -> rounded-sm  (10px)
 *
 * PRESS: every pressable element scales to 0.97 on :active over 120ms, so the
 * feedback lands on pointer-down rather than on release. Waiting for the click
 * to respond is the single thing that makes an interface feel dead.
 */
const buttonVariants = cva(
  [
    'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full',
    'font-medium transition-[background-color,color,border-color,transform,box-shadow]',
    'duration-quick ease-out active:scale-[0.97] active:duration-press',
    'focus-visible:outline-none disabled:pointer-events-none disabled:opacity-45',
  ],
  {
    variants: {
      variant: {
        primary: 'bg-accent text-on-accent shadow-sm hover:bg-accent-hover',
        secondary: 'border border-border-strong bg-surface text-text hover:bg-surface-2',
        ghost: 'text-text-muted hover:bg-surface-2 hover:text-text',
        link: 'px-0 text-accent underline-offset-4 hover:underline',
      },
      size: {
        sm: 'h-9 px-4 text-sm',
        md: 'h-11 px-5 text-sm',
        lg: 'h-[3.1rem] px-7 text-base',
        icon: 'h-10 w-10',
      },
    },
    defaultVariants: { variant: 'primary', size: 'md' },
  },
);

export interface ButtonProps
  extends
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

/** Token-driven button. No raw colours — `bg-accent` etc. resolve per theme. */
export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, type = 'button', ...props }, ref) => (
    <button
      ref={ref}
      type={type}
      className={cn(buttonVariants({ variant, size }), className)}
      {...props}
    />
  ),
);
Button.displayName = 'Button';

export { buttonVariants };
