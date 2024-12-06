import { Outlet, ScrollRestoration } from 'react-router-dom';
import { Navbar } from '../components/common/Navbar';
import { Footer } from '../components/common/Footer';
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const RootLayout = () => {
  const location = useLocation();

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex flex-col font-jakarta">
      <Navbar />
      <div className="flex-grow pt-16">
        <Outlet />
      </div>
      <Footer />
      <ScrollRestoration />
    </div>
  );
};

export default RootLayout;