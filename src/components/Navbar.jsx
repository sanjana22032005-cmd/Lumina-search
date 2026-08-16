<<<<<<< HEAD
import React from 'react';
import { NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { toggleTheme } from '../redux/features/userSlice';
import SearchBar from './SearchBar';

const Navbar = () => {
    const dispatch = useDispatch();
    const theme = useSelector(state => state.user.theme);

    return (
        <nav className="sticky top-0 z-40 bg-white dark:bg-gray-950 text-gray-900 dark:text-white w-full shadow-sm py-4 px-6 md:px-8 flex items-center justify-between gap-4 md:gap-8 transition-colors">
            <div className="flex items-center gap-2 flex-shrink-0">
                <div className="w-10 h-10 bg-red-600 rounded-full flex items-center justify-center cursor-pointer hover:bg-red-700 transition">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 text-white">
                        <path fillRule="evenodd" d="M4.5 5.653c0-1.427 1.529-2.33 2.779-1.643l11.54 6.347c1.295.712 1.295 2.573 0 3.286L7.28 19.99c-1.25.687-2.779-.217-2.779-1.643V5.653z" clipRule="evenodd" />
                    </svg>
                </div>
                <span className="hidden md:block text-xl font-bold tracking-tight">Visionary</span>
            </div>

            <div className="hidden md:flex items-center gap-1 font-semibold text-sm flex-shrink-0">
                <NavLink 
                    to="/" 
                    className={({ isActive }) => `px-4 py-3 rounded-full transition-colors ${isActive ? 'bg-gray-900 text-white dark:bg-white dark:text-black' : 'hover:bg-gray-100 dark:hover:bg-gray-800'}`}
                >
                    Home
                </NavLink>
                <NavLink 
                    to="/explore" 
                    className={({ isActive }) => `px-4 py-3 rounded-full transition-colors ${isActive ? 'bg-gray-900 text-white dark:bg-white dark:text-black' : 'hover:bg-gray-100 dark:hover:bg-gray-800'}`}
                >
                    Explore
                </NavLink>
                <NavLink 
                    to="/collection" 
                    className={({ isActive }) => `px-4 py-3 rounded-full transition-colors ${isActive ? 'bg-gray-900 text-white dark:bg-white dark:text-black' : 'hover:bg-gray-100 dark:hover:bg-gray-800'}`}
                >
                    Saved
                </NavLink>
            </div>

            <div className="flex-grow flex justify-center max-w-4xl w-full">
                <SearchBar />
            </div>

            <div className="flex items-center gap-2 flex-shrink-0">
                <button 
                    onClick={() => dispatch(toggleTheme())}
                    className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition text-gray-700 dark:text-gray-300"
                    aria-label="Toggle theme"
                >
                    {theme === 'dark' ? (
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" /></svg>
                    ) : (
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z" /></svg>
                    )}
                </button>
                
                {/* Mobile Navigation Icons */}
                <div className="md:hidden flex items-center gap-1">
                    <NavLink to="/" className={({ isActive }) => `p-2 rounded-full ${isActive ? 'bg-gray-100 dark:bg-gray-800' : ''}`}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
                        </svg>
                    </NavLink>
                    <NavLink to="/collection" className={({ isActive }) => `p-2 rounded-full ${isActive ? 'bg-gray-100 dark:bg-gray-800' : ''}`}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0111.186 0z" />
                        </svg>
                    </NavLink>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
=======

import { Link } from 'react-router-dom'

const Navbar = () => {
  return (
    <div className='flex justify-between items-center py-6 px-10 bg-(--c2) '>
        <Link to='/' className='font-medium text-2xl'>MediaSearch</Link>
        <div className='flex gap-5 items-center'>
          <Link className='text-base font-medium active:scale-95 bg-(--c4) text-(--c1) rounded px-4 py-2' to='/'>Search</Link>
          <Link className='text-base font-medium active:scale-95 bg-(--c4) text-(--c1) rounded px-4 py-2' to='/collection'>Collection</Link>
        </div>
      </div>
  )
}

export default Navbar
>>>>>>> d52f16b2d67d4f1ce8208ddcbbe38e691ca6ded3
