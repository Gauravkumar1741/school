import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, BookOpen, User, Bell } from 'lucide-react';
import { useNavigation } from '../../context/NavigationContext';

const Header: React.FC = () => {
  const { isMenuOpen, toggleMenu, closeMenu } = useNavigation();
  const location = useLocation();

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <header className="bg-white border-b border-slate-200 sticky top-0 z-30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0 flex items-center" onClick={closeMenu}>
              <BookOpen className="h-8 w-8 text-primary-600" />
              <span className="ml-2 text-xl font-heading font-bold text-slate-900">Springdale Public School</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-4">
            <Link 
              to="/" 
              className={`nav-link ${isActive('/') ? 'nav-link-active' : ''}`}
            >
              Dashboard
            </Link>
            <Link 
              to="/students" 
              className={`nav-link ${isActive('/students') ? 'nav-link-active' : ''}`}
            >
              Students
            </Link>
            <Link 
              to="/teachers" 
              className={`nav-link ${isActive('/teachers') ? 'nav-link-active' : ''}`}
            >
              Teachers
            </Link>
            <Link 
              to="/marks" 
              className={`nav-link ${isActive('/marks') ? 'nav-link-active' : ''}`}
            >
              Mark Entry
            </Link>
            <div className="relative ml-4">
              <button className="p-1 rounded-full text-slate-500 hover:text-primary-600 focus:outline-none focus:ring-2 focus:ring-primary-500">
                <span className="sr-only">View notifications</span>
                <Bell className="h-6 w-6" />
              </button>
              <span className="absolute top-0 right-0 block h-2 w-2 rounded-full bg-primary-600 ring-2 ring-white"></span>
            </div>
            <div className="ml-3 relative">
              <button className="flex text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-primary-500">
                <div className="h-8 w-8 rounded-full bg-primary-100 flex items-center justify-center text-primary-700">
                  <User className="h-5 w-5" />
                </div>
              </button>
            </div>
          </nav>

          {/* Mobile menu button */}
          <div className="flex items-center md:hidden">
            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-slate-600 hover:text-primary-600 hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-primary-500"
            >
              <span className="sr-only">{isMenuOpen ? 'Close main menu' : 'Open main menu'}</span>
              {isMenuOpen ? (
                <X className="block h-6 w-6" aria-hidden="true" />
              ) : (
                <Menu className="block h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white shadow-lg">
          <div className="px-2 pt-2 pb-3 space-y-1">
            <Link
              to="/"
              className={`block ${
                isActive('/') ? 'bg-primary-50 text-primary-600' : 'text-slate-600 hover:bg-slate-100'
              } px-3 py-2 rounded-md text-base font-medium`}
              onClick={closeMenu}
            >
              Dashboard
            </Link>
            <Link
              to="/students"
              className={`block ${
                isActive('/students') ? 'bg-primary-50 text-primary-600' : 'text-slate-600 hover:bg-slate-100'
              } px-3 py-2 rounded-md text-base font-medium`}
              onClick={closeMenu}
            >
              Students
            </Link>
            <Link
              to="/teachers"
              className={`block ${
                isActive('/teachers') ? 'bg-primary-50 text-primary-600' : 'text-slate-600 hover:bg-slate-100'
              } px-3 py-2 rounded-md text-base font-medium`}
              onClick={closeMenu}
            >
              Teachers
            </Link>
            <Link
              to="/marks"
              className={`block ${
                isActive('/marks') ? 'bg-primary-50 text-primary-600' : 'text-slate-600 hover:bg-slate-100'
              } px-3 py-2 rounded-md text-base font-medium`}
              onClick={closeMenu}
            >
              Mark Entry
            </Link>
          </div>
          <div className="pt-4 pb-3 border-t border-slate-200">
            <div className="flex items-center px-4">
              <div className="flex-shrink-0">
                <div className="h-10 w-10 rounded-full bg-primary-100 flex items-center justify-center text-primary-700">
                  <User className="h-6 w-6" />
                </div>
              </div>
              <div className="ml-3">
                <div className="text-base font-medium text-slate-900">Admin User</div>
                <div className="text-sm font-medium text-slate-500">admin@springdaleschool.edu</div>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;