import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import {
  Menu,
  X,
  Zap,
  User,
  LogOut,
  ChevronDown,
  Sparkles,
  Star,
} from "lucide-react";
import { useAuth } from "../contexts/AuthContext";

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogout = () => {
    logout();
    navigate("/");
    setShowUserMenu(false);
  };

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    { name: "Portfolio", path: "/portfolio" },
    { name: "Services", path: "/services" },
    { name: "Contact", path: "/contact" },
  ];

  const isActivePath = (path: string) => location.pathname === path;

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-500 ${
        scrolled
          ? "bg-white/80 backdrop-blur-xl shadow-2xl border-b border-purple-100/50"
          : "bg-gradient-to-r from-white/90 via-blue-50/80 to-purple-50/90 backdrop-blur-lg shadow-xl"
      }`}
    >
      {/* Animated background gradient */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-600/5 via-purple-600/5 to-emerald-600/5 animate-gradient-x"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="flex justify-between h-20">
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-4 group">
              <div className="relative">
                {/* Main logo container with multiple effects */}
                <div className="relative p-4 bg-gradient-to-br from-blue-600 via-purple-600 to-emerald-600 rounded-2xl group-hover:from-blue-700 group-hover:via-purple-700 group-hover:to-emerald-700 transition-all duration-500 transform group-hover:scale-110 group-hover:rotate-6 shadow-2xl group-hover:shadow-purple-500/25">
                  <Zap className="h-8 w-8 text-white animate-pulse" />

                  {/* Floating sparkles */}
                  <div className="absolute -top-1 -right-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <Sparkles className="h-4 w-4 text-yellow-400 animate-spin" />
                  </div>
                  <div className="absolute -bottom-1 -left-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100">
                    <Star className="h-3 w-3 text-emerald-400 animate-bounce" />
                  </div>
                </div>

                {/* Animated ring around logo */}
                <div className="absolute inset-0 rounded-2xl border-2 border-transparent bg-gradient-to-r from-blue-500 via-purple-500 to-emerald-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300 animate-spin-slow"></div>

                {/* Pulse indicator */}
                <div className="absolute -top-2 -right-2 w-4 h-4 bg-gradient-to-r from-emerald-400 to-blue-400 rounded-full animate-pulse shadow-lg">
                  <div className="absolute inset-0 bg-gradient-to-r from-emerald-400 to-blue-400 rounded-full animate-ping"></div>
                </div>
              </div>

              <div className="relative">
                <span className="text-3xl font-black bg-gradient-to-r from-blue-600 via-purple-600 to-emerald-600 bg-clip-text text-transparent group-hover:from-blue-700 group-hover:via-purple-700 group-hover:to-emerald-700 transition-all duration-300">
                  DigitalFlow
                </span>
                <div className="text-xs text-gray-600 font-semibold tracking-wider uppercase opacity-80 group-hover:opacity-100 transition-opacity duration-300">
                  Marketing Excellence
                </div>

                {/* Animated underline */}
                <div className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-600 to-purple-600 group-hover:w-full transition-all duration-500"></div>
              </div>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            {navLinks.map((link, index) => (
              <Link
                key={link.name}
                to={link.path}
                className={`relative text-sm font-semibold transition-all duration-300 group ${
                  isActivePath(link.path)
                    ? "text-red-600"
                    : "text-gray-700 hover:text-red-600"
                }`}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                {link.name}

                {/* Underline animation */}
                <span
                  className={`absolute left-0 -bottom-1 h-[2px] bg-red-600 rounded-full transition-all duration-300 ${
                    isActivePath(link.path)
                      ? "w-full scale-110"
                      : "w-0 group-hover:w-full"
                  }`}
                ></span>
              </Link>
            ))}
          </div>

          {/* User Menu / Auth Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            {user ? (
              <div className="relative">
                <button
                  onClick={() => setShowUserMenu(!showUserMenu)}
                  className="flex items-center space-x-3 px-6 py-3 rounded-2xl bg-gradient-to-r from-gray-50/80 to-white/80 hover:from-white hover:to-gray-50 transition-all duration-300 border border-gray-200/50 hover:border-purple-200 hover:shadow-xl backdrop-blur-sm group"
                >
                  <div className="relative">
                    <div className="w-10 h-10 bg-gradient-to-br from-blue-500 via-purple-600 to-emerald-500 rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-purple-500/25 transition-shadow duration-300">
                      <User className="h-5 w-5 text-white" />
                    </div>
                    <div className="absolute -top-1 -right-1 w-3 h-3 bg-emerald-400 rounded-full animate-pulse"></div>
                  </div>
                  <div className="text-left">
                    <div className="text-sm font-bold text-gray-900 group-hover:text-purple-700 transition-colors duration-300">
                      {user.name}
                    </div>
                    <div className="text-xs text-gray-500 font-medium">
                      Premium Member
                    </div>
                  </div>
                  <ChevronDown
                    className={`h-4 w-4 text-gray-500 transition-all duration-300 ${
                      showUserMenu
                        ? "rotate-180 text-purple-600"
                        : "group-hover:text-purple-600"
                    }`}
                  />
                </button>

                {showUserMenu && (
                  <div className="absolute right-0 mt-3 w-64 bg-white/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-gray-100/50 py-3 z-50 animate-in slide-in-from-top-2 duration-300">
                    {/* User info header */}
                    <div className="px-6 py-4 border-b border-gray-100/50 bg-gradient-to-r from-blue-50/50 to-purple-50/50">
                      <div className="flex items-center space-x-3">
                        <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
                          <User className="h-6 w-6 text-white" />
                        </div>
                        <div>
                          <div className="text-sm font-bold text-gray-900">
                            {user.name}
                          </div>
                          <div className="text-xs text-gray-500">
                            {user.email}
                          </div>
                        </div>
                      </div>
                    </div>

                    <Link
                      to="/dashboard"
                      className="flex items-center px-6 py-4 text-sm font-medium text-gray-700 hover:text-purple-700 hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 transition-all duration-200 group"
                      onClick={() => setShowUserMenu(false)}
                    >
                      <User className="h-5 w-5 mr-3 text-gray-400 group-hover:text-purple-500 transition-colors duration-200" />
                      Dashboard
                      <div className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                        <ChevronDown className="h-4 w-4 -rotate-90" />
                      </div>
                    </Link>

                    <button
                      onClick={handleLogout}
                      className="w-full flex items-center px-6 py-4 text-sm font-medium text-red-600 hover:text-red-700 hover:bg-red-50 transition-all duration-200 group"
                    >
                      <LogOut className="h-5 w-5 mr-3 group-hover:scale-110 transition-transform duration-200" />
                      Sign Out
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center space-x-3">
                <Link
                  to="/login"
                  className="text-gray-700 hover:text-purple-700 px-6 py-3 rounded-xl text-sm font-semibold transition-all duration-300 hover:bg-gradient-to-r hover:from-gray-50 hover:to-purple-50 hover:shadow-lg"
                >
                  Sign In
                </Link>
                <Link
                  to="/register"
                  className="relative bg-gradient-to-r from-blue-600 via-purple-600 to-emerald-600 hover:from-blue-700 hover:via-purple-700 hover:to-emerald-700 text-white px-8 py-3 rounded-xl text-sm font-bold transition-all duration-300 transform hover:scale-105 hover:shadow-2xl overflow-hidden group"
                >
                  {/* Animated background */}
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-400 via-purple-400 to-emerald-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                  {/* Shimmer effect */}
                  <div className="absolute inset-0 -skew-x-12 bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 group-hover:animate-shimmer"></div>

                  <span className="relative z-10 flex items-center">
                    Get Started
                    <Sparkles className="ml-2 h-4 w-4 animate-pulse" />
                  </span>
                </Link>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-3 rounded-xl text-gray-700 hover:text-purple-700 hover:bg-gradient-to-r hover:from-gray-50 hover:to-purple-50 transition-all duration-300 hover:shadow-lg"
            >
              {isOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-white/95 backdrop-blur-xl border-b border-gray-200/50 shadow-2xl">
          <div className="px-4 pt-4 pb-6 space-y-3">
            {navLinks.map((link, index) => (
              <Link
                key={link.name}
                to={link.path}
                className={`relative block text-base font-semibold transition-all duration-300 ${
                  isActivePath(link.path)
                    ? "text-red-600"
                    : "text-gray-700 hover:text-red-600"
                }`}
                onClick={() => setIsOpen(false)}
                style={{ animationDelay: `${index * 50}ms` }}
              >
                {link.name}

                {/* Underline animation for mobile */}
                <span
                  className={`absolute left-0 -bottom-1 h-[2px] bg-red-600 rounded-full transition-all duration-300 ${
                    isActivePath(link.path)
                      ? "w-full scale-110"
                      : "w-0 group-hover:w-full"
                  }`}
                ></span>
              </Link>
            ))}

            {user ? (
              <div className="border-t border-gray-200/50 pt-4 mt-4 space-y-3">
                <div className="px-6 py-3 text-sm text-gray-500 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl">
                  Signed in as{" "}
                  <span className="font-bold text-gray-900">{user.name}</span>
                </div>
                <Link
                  to="/dashboard"
                  className="block text-base font-semibold text-gray-700 hover:text-red-600 transition-all duration-300"
                  onClick={() => setIsOpen(false)}
                >
                  Dashboard
                </Link>
                <button
                  onClick={() => {
                    handleLogout();
                    setIsOpen(false);
                  }}
                  className="w-full text-left text-base font-semibold text-red-600 hover:text-white hover:bg-red-500 transition-all duration-300 px-4 py-2 rounded-xl"
                >
                  Sign Out
                </button>
              </div>
            ) : (
              <div className="border-t border-gray-200/50 pt-4 mt-4 space-y-3">
                <Link
                  to="/login"
                  className="block text-base font-semibold text-gray-700 hover:text-red-600 transition-all duration-300"
                  onClick={() => setIsOpen(false)}
                >
                  Sign In
                </Link>
                <Link
                  to="/register"
                  className="block mx-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-6 py-4 rounded-xl text-base font-bold transition-all duration-300 text-center shadow-lg"
                  onClick={() => setIsOpen(false)}
                >
                  Get Started
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
