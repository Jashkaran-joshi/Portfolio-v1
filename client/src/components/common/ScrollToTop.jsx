import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export default function ScrollToTop() {
    const { pathname } = useLocation();

    useEffect(() => {
        // Only scroll to top if not resolving a hash link and not already at top
        if (!window.location.hash) {
            window.scrollTo({
                top: 0,
                behavior: 'instant'
            });
        }
    }, [pathname]);

    return null;
}
