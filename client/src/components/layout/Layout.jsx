import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';
import CyberBackground from '../common/CyberBackground';
import ErrorBoundary from '../common/ErrorBoundary';

export default function Layout() {
    return (
        <div className="min-h-screen text-white selection:bg-neon/30 selection:text-neon">
            <ErrorBoundary>
                <CyberBackground />
                <Navbar />
                <main className="relative z-10 pt-20"> {/* Added padding-top for fixed navbar */}
                    <Outlet />
                </main>
                <Footer />
            </ErrorBoundary>
        </div>
    );
}
