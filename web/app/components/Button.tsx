import React from 'react';
import Link from 'next/link';
import { tw } from '../theme';

type ButtonVariant = 'primary' | 'secondary' | 'outline';
type ButtonSize = 'sm' | 'md' | 'lg';

interface BaseButtonProps {
  children: React.ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
  fullWidth?: boolean;
  className?: string;
}

interface ButtonAsButtonProps extends BaseButtonProps {
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
}

interface ButtonAsLinkProps extends BaseButtonProps {
  href: string;
  external?: boolean;
}

type ButtonProps = ButtonAsButtonProps | ButtonAsLinkProps;

const sizeClasses = {
  sm: 'px-4 py-2 text-sm',
  md: 'px-6 py-3 text-base',
  lg: 'px-8 py-4 text-lg',
};

const variantClasses = {
  primary: tw.button.primary,
  secondary: tw.button.secondary,
  outline: tw.button.outline,
};

function isLinkProps(props: ButtonProps): props is ButtonAsLinkProps {
  return 'href' in props;
}

/**
 * Button component with Deep Ocean theme
 * 
 * @example
 * ```tsx
 * // As a button
 * <Button variant="primary" onClick={handleClick}>Click me</Button>
 * 
 * // As a link
 * <Button variant="outline" href="/about">Learn More</Button>
 * 
 * // External link
 * <Button variant="secondary" href="https://example.com" external>Visit</Button>
 * ```
 */
export function Button(props: ButtonProps) {
  const {
    children,
    variant = 'primary',
    size = 'md',
    fullWidth = false,
    className = '',
  } = props;

  const baseClasses = `
    ${variantClasses[variant]}
    ${sizeClasses[size]}
    ${fullWidth ? 'w-full' : ''}
    rounded-lg font-semibold transition-all transform hover:scale-105 shadow-lg
    inline-block text-center
    ${className}
  `.trim().replace(/\s+/g, ' ');

  if (isLinkProps(props)) {
    const { href, external } = props;
    
    if (external) {
      return (
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className={baseClasses}
        >
          {children}
        </a>
      );
    }

    return (
      <Link href={href} className={baseClasses}>
        {children}
      </Link>
    );
  }

  const { onClick, type = 'button', disabled } = props;

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${baseClasses} ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
    >
      {children}
    </button>
  );
}

