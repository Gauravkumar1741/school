import React from 'react';
import Header from './Header';
import Footer from './Footer';
import { useNavigation } from '../../context/NavigationContext';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { isMenuOpen, closeMenu } = useNavigation();

  // Close the mobile menu when clicking on the main content area
  const handleContentClick = () => {
    if (isMenuOpen) {
      closeMenu();
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main 
        className="flex-grow bg-slate-50"
        onClick={handleContentClick}
      >
        <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          {children}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Layout;