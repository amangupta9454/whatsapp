import { useState } from 'react';
import { Link } from 'react-router-dom';
import { FiMenu, FiX } from 'react-icons/fi';

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => setMenuOpen(!menuOpen);

  const navLinks = [
    { name: 'Home', to: '/' },
    { name: 'Career Path', to: '/career' },
    {name: 'Technical Assesment', to:'/assesment'},
    { name: 'Skill Analyzer', to: '/skillanalyzer' },
    // {name: 'Interview Review', to:'/interview-rev'},
    { name: 'Resume Builder', to: '/resume' },
    { name: 'Contact', to: '/contact' },
    { name: 'Login', to: '/login' },

  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 transition-all duration-700 ease-out transform animate-nav-slide-in">
      <div className="backdrop-blur-xl bg-[#020617]/90 shadow-[0_8px_30px_rgba(0,0,0,0.6)] border-b border-[#1e293b]">
        <div className="max-w-7xl mx-auto px-6 sm:px-10 py-4 flex items-center justify-between">
          <div
            className="text-3xl font-bold tracking-wide bg-gradient-to-r from-fuchsia-500 via-blue-500 to-cyan-400 text-transparent bg-clip-text"
            style={{ fontFamily: "'Rowdies', sans-serif", fontWeight: '500' }}
          >
            AI_Career
          </div>

          {/* Desktop Links */}
          <div className="hidden md:flex space-x-10">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.to}
                className="relative text-gray-300 hover:text-white font-medium group transition duration-300 ease-in-out"
              >
                {link.name}
                <span className="absolute left-0 -bottom-1 h-0.5 w-0 bg-gradient-to-r from-fuchsia-500 via-blue-500 to-cyan-400 transition-all duration-300 group-hover:w-full rounded-full"></span>
              </Link>
            ))}
          </div>

          {/* Mobile Button */}
          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className="text-3xl text-gray-300 hover:text-white transition-transform duration-300 ease-in-out transform hover:scale-110"
            >
              {menuOpen ? <FiX /> : <FiMenu />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <div className="md:hidden bg-[#0f172a]/90 backdrop-blur-md border-t border-gray-700 px-6 py-4 space-y-3 animate-slide-down">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.to}
                onClick={() => setMenuOpen(false)}
                className="block text-gray-200 hover:text-white text-lg font-medium tracking-wide transition-all duration-200 hover:pl-2"
              >
                {link.name}
              </Link>
            ))}
          </div>
        )}
      </div>
      <style>{`
        @keyframes nav-slide-in {
          from {
            opacity: 0;
            transform: translateY(-20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes slide-down {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-nav-slide-in {
          animation: nav-slide-in 0.7s ease-out forwards;
        }

        .animate-slide-down {
          animation: slide-down 0.3s ease-out forwards;
        }
      `}</style>
    </nav>
  );
};

export default Navbar;