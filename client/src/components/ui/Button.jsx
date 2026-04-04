import { memo, forwardRef } from 'react';
import { Loader2, Check } from 'lucide-react';

/**
 * Standardized button system for the portfolio.
 *
 * Variants (use intentionally):
 * - primary: Main CTAs (submit, “View projects”, “Live demo”, hero actions).
 * - secondary: Supporting actions (resume, “Discuss”, “Send another”, ghost-style links).
 * - outline: Tertiary / alternate emphasis (source code, bordered actions).
 * - icon: Icon-only controls (pagination arrows, dismiss, toolbar) — pair with aria-label.
 *
 * Legacy NeonButton mapping: filled → primary, ghost → secondary, outline → outline.
 */
const Button = forwardRef(function Button(
  {
    children,
    onClick,
    href,
    className = '',
    icon: Icon,
    iconPosition = 'right',
    variant = 'outline',
    size = 'md',
    loading = false,
    success = false,
    disabled = false,
    type = 'button',
    iconClassName = '',
    download,
    rel,
    target,
    /** Text-style back navigation (chevron + label), no box */
    navLink = false,
    /** Filter / tag pills; use with `selected` */
    pill = false,
    selected = false,
    /** Destructive / error actions (overrides variant colors) */
    tone = 'default',
    'aria-label': ariaLabel,
    ...rest
  },
  ref
) {
  const legacyMap = { filled: 'primary', ghost: 'secondary' };
  const resolvedVariant = legacyMap[variant] || variant;

  const isPrimary = resolvedVariant === 'primary' && !navLink;
  const isSecondary = resolvedVariant === 'secondary' && !navLink;
  const isOutline = resolvedVariant === 'outline' && !navLink;
  const isIcon = resolvedVariant === 'icon';

  const sizeClasses = {
    sm: isIcon ? 'min-h-[40px] min-w-[40px] p-2.5' : 'px-4 py-2.5 text-xs',
    md: isIcon ? 'min-h-[44px] min-w-[44px] p-3' : 'px-6 py-3 text-sm',
    lg: isIcon ? 'min-h-[48px] min-w-[48px] p-3.5' : 'px-8 py-3.5 text-sm md:text-base',
  };

  const navLinkClasses =
    'group inline-flex items-center gap-2 bg-transparent border-0 shadow-none p-0 h-auto min-h-0 rounded-none ' +
    'text-white/60 hover:text-white font-mono text-xs uppercase tracking-widest ' +
    'focus-visible:ring-2 focus-visible:ring-neon/80 focus-visible:ring-offset-2 focus-visible:ring-offset-dark ' +
    'transition-colors duration-300 btn-premium-interact';

  const pillBase =
    'px-4 py-1.5 rounded-full font-mono text-xs uppercase tracking-widest border transition-all duration-300 ' +
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neon/60 focus-visible:ring-offset-2 focus-visible:ring-offset-dark ' +
    'btn-premium-interact';

  const pillInactive = 'bg-white/5 border-white/10 text-white/50 hover:border-white/30 hover:text-white/80';
  const pillActive =
    'bg-neon/15 border-neon/50 text-neon shadow-[0_0_12px_rgba(0,243,255,0.22)]';

  const dangerTone =
    tone === 'danger'
      ? 'border-red-500/60 text-red-400 hover:bg-red-500/10 hover:border-red-500 hover:shadow-[0_0_20px_-6px_rgba(239,68,68,0.45)]'
      : '';

  const primaryClasses =
    'relative overflow-hidden border border-neon/55 text-neon font-semibold ' +
    'bg-gradient-to-br from-neon/25 via-neon/12 to-cyan-950/30 ' +
    'shadow-[0_0_24px_-6px_rgba(0,243,255,0.45),inset_0_1px_0_rgba(255,255,255,0.08)] ' +
    'hover:border-neon hover:shadow-[0_0_32px_-4px_rgba(0,243,255,0.55)] ' +
    'before:absolute before:inset-0 before:pointer-events-none before:opacity-0 hover:before:opacity-100 ' +
    'before:bg-gradient-to-r before:from-transparent before:via-white/12 before:to-transparent ' +
    'before:translate-x-[-100%] hover:before:translate-x-[100%] before:transition-transform before:duration-700';

  const secondaryClasses =
    'border border-white/12 text-white/90 bg-white/[0.07] ' +
    'shadow-[0_6px_28px_-8px_rgba(0,0,0,0.55),inset_0_1px_0_rgba(255,255,255,0.06)] ' +
    'hover:bg-white/[0.11] hover:border-white/22 ' +
    'hover:shadow-[0_8px_32px_-6px_rgba(0,243,255,0.12)]';

  const outlineClasses =
    'bg-transparent border border-neon/45 text-neon ' +
    'hover:bg-neon/10 hover:border-neon hover:shadow-[0_0_22px_-8px_rgba(0,243,255,0.4)]';

  const iconVariantClasses =
    'rounded-lg border border-white/12 bg-white/[0.05] text-white/65 ' +
    'shadow-[inset_0_1px_0_rgba(255,255,255,0.06),0_4px_16px_-8px_rgba(0,0,0,0.4)] ' +
    'hover:text-neon hover:border-neon/35 hover:bg-neon/[0.07] ' +
    'disabled:opacity-35';

  let variantClasses = outlineClasses;
  if (isPrimary) variantClasses = primaryClasses;
  else if (isSecondary) variantClasses = secondaryClasses;
  else if (isOutline) variantClasses = outlineClasses;
  else if (isIcon) variantClasses = iconVariantClasses;

  if (tone === 'danger' && !navLink && !pill) {
    variantClasses = `${outlineClasses} ${dangerTone}`;
  }

  const baseInteractive = isIcon
    ? 'group relative inline-flex items-center justify-center gap-0 text-center font-sans normal-case tracking-normal ' +
      'transition-all duration-300 ease-out ' +
      'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neon/80 focus-visible:ring-offset-2 focus-visible:ring-offset-dark ' +
      'btn-premium-interact disabled:opacity-55 disabled:cursor-not-allowed disabled:pointer-events-none'
    : 'font-mono uppercase tracking-widest group relative overflow-hidden ' +
      'inline-flex items-center justify-center gap-2 text-center ' +
      'transition-all duration-300 ease-out rounded-lg ' +
      'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neon/80 focus-visible:ring-offset-2 focus-visible:ring-offset-dark ' +
      'btn-premium-interact disabled:opacity-55 disabled:cursor-not-allowed disabled:pointer-events-none';

  const Component = href ? 'a' : 'button';
  const activeDisabled = loading || success || disabled;

  const handleClick = (e) => {
    if (!activeDisabled && onClick) onClick(e);
  };

  const content = (
    <span className="relative z-10 flex items-center justify-center gap-2 btn-premium-state">
      {loading ? (
        <>
          <Loader2 className={`animate-spin shrink-0 ${iconClassName}`} size={18} aria-hidden />
          <span>Sending...</span>
        </>
      ) : success ? (
        <>
          <Check size={18} className="shrink-0" aria-hidden />
          <span>Sent Successfully</span>
        </>
      ) : isIcon ? (
        children
      ) : (
        <>
          {Icon && iconPosition === 'left' && <Icon size={18} className={`shrink-0 ${iconClassName}`} aria-hidden />}
          {children}
          {Icon && iconPosition === 'right' && <Icon size={18} className={`shrink-0 ${iconClassName}`} aria-hidden />}
        </>
      )}
    </span>
  );

  if (navLink) {
    return (
      <button
        ref={ref}
        type={type}
        onClick={handleClick}
        disabled={activeDisabled}
        className={`${navLinkClasses} ${className}`}
        aria-label={ariaLabel}
        {...rest}
      >
        {children}
      </button>
    );
  }

  if (pill) {
    return (
      <button
        ref={ref}
        type="button"
        onClick={handleClick}
        className={`${pillBase} ${selected ? pillActive : pillInactive} ${className}`}
        aria-pressed={selected}
        {...rest}
      >
        {children}
      </button>
    );
  }

  const successClasses =
    success && tone !== 'danger'
      ? 'border-emerald-500/60 text-emerald-400 bg-emerald-500/10 hover:bg-emerald-500/15'
      : '';

  const combinedVariant = `${baseInteractive} ${sizeClasses[size] || sizeClasses.md} ${variantClasses} ${successClasses} ${
    activeDisabled && !loading && !success ? 'opacity-75' : ''
  } ${className}`;

  return (
    <Component
      ref={ref}
      href={href}
      download={download}
      rel={rel}
      target={target}
      onClick={handleClick}
      type={!href ? type : undefined}
      className={combinedVariant}
      disabled={!href ? activeDisabled : undefined}
      aria-label={ariaLabel}
      aria-busy={loading || undefined}
      {...rest}
    >
      {isPrimary && !activeDisabled && (
        <span
          className="btn-shimmer-layer pointer-events-none absolute inset-0 opacity-40 mix-blend-overlay"
          aria-hidden
        />
      )}
      {content}
    </Component>
  );
});

Button.displayName = 'Button';

/** Icon-only toolbar / pagination control (square, 44px min on md). */
export const IconButton = memo(function IconButton({
  children,
  className = '',
  disabled,
  ...props
}) {
  return (
    <Button variant="icon" className={className} disabled={disabled} {...props}>
      {children}
    </Button>
  );
});

export default memo(Button);
