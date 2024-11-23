import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { HiFolder, HiBriefcase, HiAcademicCap, HiNewspaper, HiDocument, HiMail, HiChat } from 'react-icons/hi';
import { FaLinkedin, FaWhatsapp, FaInstagram } from 'react-icons/fa';
import ClientNavbarEffects from './ClientNavbarEffects';

const routes = [
  { path: '/', name: 'Home', icon: '/logo.png' },
  { path: '/projects', name: 'Projects', icon: HiFolder },
  { path: '/work', name: 'Work', icon: HiBriefcase },
  { path: '/research', name: 'Research', icon: HiAcademicCap },
  { path: '/blog', name: 'Blog', icon: HiNewspaper },
  { path: '/chatbot', name: 'AI Chatbot', icon: HiChat },
  { path: '/resume', name: 'Resume', icon: HiDocument, external: '/Resume.pdf' },
  { path: '/contact', name: 'Contact', icon: HiMail, external: 'mailto:nafis@nafisui.com' },
];

const Navbar = ({ isHovered, isTextVisible, isOpen, handleToggleOpen, handleSelectOption }) => {
  const pathname = usePathname();
  const currentPage = routes.find((route) => route.path === pathname)?.name || 'Home';
  const currentIcon = routes.find((route) => route.path === pathname)?.icon || '/logo.png';

  return (
    <div id="navbar" className="fixed bottom-4 left-1/2 transform -translate-x-1/2 flex justify-center items-center">
      <nav className={`bg-navbar text-text rounded-full shadow-lg font-montserrat transition-all duration-300 ease-in-out ${isHovered ? 'px-12' : 'px-6'}`}>
        <ul className="hidden lg:flex items-center overflow-hidden">
          {routes.map((route, index) => {
            const Icon = route.icon;
            const isActive = pathname === route.path;
            const delay = index * 50;

            return (
              <React.Fragment key={route.path}>
                <li className="px-3">
                  {route.external ? (
                    <a
                      href={route.external}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`whitespace-nowrap text-xl py-4 block flex items-center gap-3 ${isActive ? 'text-highlight' : 'hover:text-highlight'} transition-colors duration-300`}
                    >
                      {route.icon === '/logo.png' ? (
                        <img src={route.icon} alt="Home" className="h-8 pr-2 transition-transform duration-300" />
                      ) : (
                        <Icon className={`text-2xl transition-transform duration-300 ${(!isHovered && !isActive) ? 'scale-100' : 'scale-105'}`} />
                      )}
                      <span
                        className={`transition-all duration-300 ease-in-out origin-left pr-2 ${(!isTextVisible && !isActive) ? 'scale-x-0 w-0 opacity-0' : 'scale-x-100 w-auto opacity-100'}`}
                        style={{
                          transitionDelay: isTextVisible ? `${delay}ms` : '0ms',
                        }}
                      >
                        {route.name}
                      </span>
                    </a>
                  ) : (
                    <Link
                      href={route.path}
                      className={`whitespace-nowrap text-xl py-4 block flex items-center gap-3 ${isActive ? 'text-highlight' : 'hover:text-highlight'} transition-colors duration-300`}
                    >
                      {route.icon === '/logo.png' ? (
                        <img src={route.icon} alt="Home" className="h-8 pr-2 transition-transform duration-300" />
                      ) : (
                        <Icon className={`text-2xl transition-transform duration-300 ${(!isHovered && !isActive) ? 'scale-100' : 'scale-105'}`} />
                      )}
                      <span
                        className={`transition-all duration-300 ease-in-out origin-left pr-2 ${(!isTextVisible && !isActive) ? 'scale-x-0 w-0 opacity-0' : 'scale-x-100 w-auto opacity-100'}`}
                        style={{
                          transitionDelay: isTextVisible ? `${delay}ms` : '0ms',
                        }}
                      >
                        {route.name}
                      </span>
                    </Link>
                  )}
                </li>
                {index < routes.length - 1 &&
                  <li className={`text-lg transition-all duration-300 ease-in-out ml-2 ${isTextVisible ? 'opacity-100 w-4' : 'opacity-0 w-0'}`}
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
        <div className="lg:hidden relative w-48"> {/* Increased width on mobile */}
          <button
            className={`w-full py-2 px-6 text-center flex items-center justify-center gap-2 transition-colors duration-300 ${isOpen ? 'text-highlight' : ''}`}
            onClick={handleToggleOpen}
          >
            {currentIcon === '/logo.png' ? (
              <img src={currentIcon} alt="Home" className="w-8 h-8" />
            ) : (
              React.createElement(currentIcon, { className: "text-2xl" })
            )}
            <span>{currentPage}</span>
          </button>

          <div
            className={`absolute bottom-12 left-1/2 transform -translate-x-1/2 w-48 bg-navbar rounded-lg shadow-lg overflow-hidden transition-all duration-300 ${isOpen ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'}`}
          >
            <div className="py-2">
              {routes.filter((route) => route.path !== pathname).map((route, index, filteredArray) => {
                const Icon = route.icon;
                const delay = index * 50;

                return (
                  <div key={route.path}>
                    {route.external ? (
                      <a
                        href={route.external}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`block py-2 px-4 text-center hover:text-highlight flex items-center justify-center gap-2 transition-all duration-300 ${isOpen ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}
                        style={{
                          transitionDelay: isOpen ? `${delay}ms` : '0ms',
                        }}
                      >
                        {route.icon === '/logo.png' ? (
                          <img src={route.icon} alt="Home" className="w-8 h-8 transition-transform duration-300" />
                        ) : (
                          <Icon className="text-2xl" />
                        )}
                        <span>{route.name}</span>
                      </a>
                    ) : (
                      <Link
                        href={route.path}
                        className={`block py-2 px-4 text-center hover:text-highlight flex items-center justify-center gap-2 transition-all duration-300 ${isOpen ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}
                        onClick={() => handleSelectOption(() => {})}
                        style={{
                          transitionDelay: isOpen ? `${delay}ms` : '0ms'
                        }}
                      >
                        {route.icon === '/logo.png' ? (
                          <img src={route.icon} alt="Home" className="w-8 h-8 transition-transform duration-300" />
                        ) : (
                          <Icon className="text-2xl" />
                        )}
                        <span>{route.name}</span>
                      </Link>
                    )}
                    <div className="h-[1px] bg-text/50 mx-4" />
                  </div>
                );
              })}

              {/* Social Media Icons for Mobile */}
              <div className="flex justify-center mt-4 space-x-4">
                <a href="https://www.linkedin.com/in/nafis-ul-islam-207932230/" target="_blank" rel="noopener noreferrer" className="text-text hover:text-highlight text-2xl opacity-65">
                  <FaLinkedin />
                </a>
                <a href="https://wa.me/85260621024" target="_blank" rel="noopener noreferrer" className="text-text hover:text-highlight text-2xl opacity-65">
                  <FaWhatsapp />
                </a>
                <a href="https://www.instagram.com/pixquisitee/" target="_blank" rel="noopener noreferrer" className="text-text hover:text-highlight text-2xl opacity-65">
                  <FaInstagram />
                </a>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
};

const NavbarWrapper = () => (
  <ClientNavbarEffects>
    <Navbar />
  </ClientNavbarEffects>
);

export default NavbarWrapper;
