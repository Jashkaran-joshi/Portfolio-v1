/**
 * Performance utilities for smooth animations and optimized rendering
 */

/**
 * Creates a throttled function that only invokes at most once per wait period
 * @param {Function} func - Function to throttle
 * @param {number} wait - Milliseconds to wait between invocations
 * @returns {Function} Throttled function
 */
export function throttle(func, wait = 16) {
    let lastTime = 0;
    let timeoutId = null;

    return function throttled(...args) {
        const now = Date.now();
        const remaining = wait - (now - lastTime);

        if (remaining <= 0) {
            if (timeoutId) {
                clearTimeout(timeoutId);
                timeoutId = null;
            }
            lastTime = now;
            func.apply(this, args);
        } else if (!timeoutId) {
            timeoutId = setTimeout(() => {
                lastTime = Date.now();
                timeoutId = null;
                func.apply(this, args);
            }, remaining);
        }
    };
}

/**
 * Check if user prefers reduced motion
 * @returns {boolean} True if reduced motion is preferred
 */
export function prefersReducedMotion() {
    if (typeof window === 'undefined') return false;
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

/**
 * Hook-compatible reduced motion checker with live updates
 * @returns {boolean} Current reduced motion preference
 */
export function getReducedMotionQuery() {
    if (typeof window === 'undefined') return null;
    return window.matchMedia('(prefers-reduced-motion: reduce)');
}

/**
 * Get optimal particle count based on device capabilities
 * @returns {number} Recommended particle count
 */
export function getOptimalParticleCount() {
    if (typeof window === 'undefined') return 30;

    const width = window.innerWidth;
    const isMobile = width < 768;
    const isTablet = width >= 768 && width < 1024;

    // Reduce particles on smaller screens
    if (isMobile) return 20;
    if (isTablet) return 35;
    return Math.min(Math.floor(width * 0.05), 50);
}

/**
 * Debounce function for resize handlers
 * @param {Function} func - Function to debounce
 * @param {number} wait - Milliseconds to wait
 * @returns {Function} Debounced function
 */
export function debounce(func, wait = 100) {
    let timeoutId = null;

    return function debounced(...args) {
        if (timeoutId) {
            clearTimeout(timeoutId);
        }
        timeoutId = setTimeout(() => {
            func.apply(this, args);
        }, wait);
    };
}
