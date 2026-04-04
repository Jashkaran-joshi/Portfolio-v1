import { memo } from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';

/**
 * Breadcrumb — slim hierarchy indicator below the navbar.
 * Suggestion 1.2: improves location context and SEO microdata potential.
 *
 * @param {Array} crumbs - Array of { label, to } objects. Last item is current page.
 */
const Breadcrumb = ({ crumbs = [] }) => {
  if (!crumbs || crumbs.length < 2) return null;

  return (
    <nav
      aria-label="Breadcrumb"
      className="flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-widest text-white/30 mb-8 flex-wrap"
    >
      {crumbs.map((crumb, i) => {
        const isLast = i === crumbs.length - 1;
        return (
          <span key={i} className="flex items-center gap-1.5">
            {isLast ? (
              <span
                className="text-white/60 truncate max-w-[260px]"
                aria-current="page"
              >
                {crumb.label}
              </span>
            ) : (
              <Link
                to={crumb.to}
                className="hover:text-neon transition-colors duration-200"
              >
                {crumb.label}
              </Link>
            )}
            {!isLast && (
              <ChevronRight size={10} className="text-white/20 shrink-0" />
            )}
          </span>
        );
      })}
    </nav>
  );
};

export default memo(Breadcrumb);
