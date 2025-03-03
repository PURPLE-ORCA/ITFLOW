import React from 'react'
import { Link } from "@inertiajs/react";
import ApplicationLogo from './ApplicationLogo';

const Header = (auth) => {
  return (
      <header className="fixed inset-x-0 top-0 z-50  backdrop-blur-sm bg-opacity-90">
          <nav className="mx-3 flex justify-between items-center py-3">
              {/* Logo Section */}
              <div className="transform hover:scale-105 transition-transform duration-300">
                  <ApplicationLogo />
              </div>

              {/* Navigation Links */}
              <div className="hidden lg:flex gap-x-12">
                  {["Features", "About", "Contact"].map((item) => (
                      <a
                          key={item}
                          href={`#${item.toLowerCase()}`}
                          className="group relative text-sm font-medium text-gray-100 hover:text-white transition-colors duration-300"
                      >
                          {item}
                          <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-400 to-yellow-500 transition-all duration-300 group-hover:w-full" />
                      </a>
                  ))}
              </div>

              {/* Auth Section */}
              <div className="relative">
                  {auth.user ? (
                      <Link
                          href={route("dashboard")}
                          className="relative px-6 py-3 text-sm font-medium text-white overflow-hidden group"
                      >
                          <span className="absolute inset-0 w-full h-full transition duration-300 ease-out transform translate-x-0 -skew-x-12 bg-gradient-to-r from-purple-700 to-indigo-600 group-hover:bg-gradient-to-r group-hover:from-indigo-600 group-hover:to-purple-700"></span>
                          <span className="absolute inset-0 w-full h-full transition duration-300 ease-out transform skew-x-12 bg-gradient-to-r from-indigo-600 to-purple-700 group-hover:bg-gradient-to-r group-hover:from-purple-700 group-hover:to-indigo-600 opacity-0 group-hover:opacity-100"></span>
                          <span className="relative">Dashboard</span>
                      </Link>
                  ) : (
                      <Link
                          href={route("login")}
                          className="relative inline-flex items-center px-6 py-2 text-sm font-medium text-white bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full overflow-hidden transition-all duration-300 hover:from-blue-500 hover:to-cyan-500 hover:shadow-lg hover:shadow-cyan-500/50 "
                      >
                          <span className="relative z-10">Log in</span>
                          <div className="absolute inset-0 -z-10 bg-gradient-to-r from-cyan-400 to-blue-400 opacity-0 transition-opacity duration-300 hover:opacity-100" />
                      </Link>
                  )}
              </div>
          </nav>
      </header>
  );
}

export default Header
