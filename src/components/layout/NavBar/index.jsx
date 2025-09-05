import React, { useState } from 'react'
import { text_logo_clr } from '@/assets/Logo'
import { Link, NavLink } from 'react-router-dom'
import { LayoutGrid, X } from 'lucide-react'
import { Link as ScrollLink } from 'react-scroll';

function NavBar() {
  const [navOpen, setNavOpen] = useState(false);

  const navLinks = [
    {
      title: 'Home',
      url: '/'
    },
    {
      title: 'Score Board',
      url: 'scoreboard'
    },
    {
      title: 'Result',
      url: '/results'
    },
    {
      title: 'Captains',
      url: 'captains'
    },
  ];

  const toggleNav = () => {
    setNavOpen(!navOpen);
  }

  return (
    <div className='flex justify-between p-4 md:p-0  md:my-10 items-center'>
      <img src={text_logo_clr} alt="logo" className="w-auto h-auto max-h-[40px] md:max-h-[60px] object-cover md:px-5" />

      <nav className='hidden md:flex justify-evenly items-center p-5 gap-6 '>
        {navLinks.map((link, index) => (
          link.url.startsWith('/') ? (
            <Link key={index} to={link.url} className='text-black font-semibold text-lg link-custom'>
              {link.title}
            </Link>
          ) : (
            <ScrollLink key={index} to={link.url} smooth={true} duration={500} offset={-80} className='text-black font-semibold text-lg link-custom'>
              {link.title}
            </ScrollLink>
          )
        ))}
      </nav>

      {/* Mobile Menu Toggle */}
      <div className="md:hidden ">
        <button onClick={toggleNav} className="focus:outline-none">
          <div className=" flex items-center justify-center gap-1 rounded-lg  transition-transform duration-300">
            <div
              className={`transform transition-transform duration-300 ${navOpen ? "rotate-90" : ""
                }`}
            >
              {navOpen ? (
                <X size={24} className='text-green-900' />
              ) : (
                <LayoutGrid size={24} className='text-green-900' />
              )}
            </div>
          </div>
        </button>
      </div>

      {/* Mobile Navigation Links */}
      <div
        className={`absolute top-16 !z-50 right-10 w-36 bg-white text-black rounded-lg shadow-lg flex flex-col items-start p-4 transition-all duration-300 transform ${navOpen
          ? "scale-100 opacity-100"
          : "scale-95 opacity-0 pointer-events-none"
          }`}
      >
        {navLinks.map((link, index) => (
          link.url.startsWith('/') ? (
            <Link key={index} to={link.url} className='block p-2 !z-50 hover:text-orange-500 rounded transition-colors duration-300 text-gray-800' onClick={() => setNavOpen(false)}>
              {link.title}
            </Link>
          ) : (
            <ScrollLink key={index} to={link.url} smooth={true} duration={500} offset={-80} className='block p-2 !z-50 hover:text-orange-500 rounded transition-colors duration-300 text-gray-800' onClick={() => setNavOpen(false)}>
              {link.title}
            </ScrollLink>
          )
        ))}
      </div>
    </div>
  )
}

export default NavBar
