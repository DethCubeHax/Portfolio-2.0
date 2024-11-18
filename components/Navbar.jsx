"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { HiHome, HiFolder, HiBriefcase, HiAcademicCap, HiNewspaper, HiDocument, HiMail } from 'react-icons/hi';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isTextVisible, setIsTextVisible] = useState(false);
  const pathname = usePathname();

  const routes = [
    { path: '/', name: 'Home', icon: HiHome },
    { path: '/projects', name: 'Projects', icon: HiFolder },
    { path: '/work', name: 'Work', icon: HiBriefcase },
    { path: '/research', name: 'Research', icon: HiAcademicCap },
    { path: '/blog', name: 'Blog', icon: HiNewspaper },
    { path: '/resume', name: 'Resume', icon: HiDocument },
    { path: '/contact', name: 'Contact', icon: HiMail }
  ];

  const handleMouseEnter = () => {
    setIsHovered(true);
    setIsTextVisible(true);
  };

  const handleMouseLeave = () => {
    setIsTextVisible(false);
    // Wait for text collapse animation to complete before shrinking navbar
    setTimeout(() => {
      setIsHovered(false);
    }, 500);
  };

  const currentPage = routes.find(route => route.path === pathname)?.name || 'Home';

  return (
    <nav 
      className={`bg-navbar text-text fixed bottom-4 left-1/2 transform -translate-x-1/2 
        flex justify-center items-center rounded-full shadow-lg font-montserrat
        transition-[padding] duration-300 ease-in-out
        ${isHovered ? 'w-auto px-12' : 'w-auto px-6'}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Desktop Navigation */}
      <ul className="hidden lg:flex items-center overflow-hidden">
        {routes.map((route, index) => {
          const Icon = route.icon;
          const isActive = pathname === route.path;
          const delay = index * 50;

          return (
            <React.Fragment key={route.path}>
              <li className="px-3">
                <Link 
                  href={route.path} 
                  className={`whitespace-nowrap text-xl py-4 block flex items-center gap-3
                    ${isActive 
                      ? 'text-highlight' 
                      : 'hover:text-highlight'
                    }
                    transition-colors duration-300
                  `}
                >
                  <Icon className={`text-2xl transition-transform duration-300
                    ${(!isHovered && !isActive) ? 'scale-100' : 'scale-105'}
                  `} />
                  <span 
                    className={`transition-all duration-300 ease-in-out origin-left
                      ${(!isTextVisible && !isActive) 
                        ? 'scale-x-0 w-0 opacity-0' 
                        : 'scale-x-100 w-auto opacity-100'}
                    `}
                    style={{
                      transitionDelay: isTextVisible ? `${delay}ms` : '0ms',
                    }}
                  >
                    {route.name}
                  </span>
                </Link>
              </li>
              {index < routes.length - 1 && 
                <li className={`text-lg transition-all duration-300 ease-in-out
                  ${isTextVisible ? 'opacity-100 w-4' : 'opacity-0 w-0'}`}
                  style={{
                    transitionDelay: isTextVisible ? `${delay}ms` : '0ms',
                  }}
                >
                  |
                </li>
              }
            </React.Fragment>
          );
        })}
      </ul>

      {/* Mobile Navigation */}
      <div className="lg:hidden relative w-40">
        <button 
          className="w-full py-2 px-6 text-center flex items-center justify-center gap-2"
          onClick={() => setIsOpen(!isOpen)}
        >
          {routes.find(route => route.path === pathname)?.icon({ className: "text-2xl" })}
          {currentPage}
        </button>

        {/* Mobile Menu Dropdown */}
        {isOpen && (
          <div className="absolute bottom-12 left-1/2 transform -translate-x-1/2 w-40 bg-navbar rounded-lg shadow-lg py-2">
            {routes.map((route) => {
              const Icon = route.icon;
              return (
                <Link
                  key={route.path}
                  href={route.path}
                  className="block py-2 px-4 text-center hover:text-highlight flex items-center justify-center gap-2"
                  onClick={() => setIsOpen(false)}
                >
                  <Icon className="text-2xl" />
                  {route.name}
                </Link>
              );
            })}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;