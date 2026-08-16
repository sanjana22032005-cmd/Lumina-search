<<<<<<< HEAD
import React, { useState, useRef, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setQuery, addRecentSearch, clearRecentSearches, removeRecentSearch } from '../redux/features/searchSlice';

const suggestions = [
    'mountain wallpaper', 'sunset landscape', 'minimalist desk', 
    'neon cyberpunk', 'vintage fashion', 'coffee aesthetic'
];

const SearchBar = () => {
    const [text, setText] = useState('');
    const [showDropdown, setShowDropdown] = useState(false);
    const dispatch = useDispatch();
    const dropdownRef = useRef(null);
    const { recentSearches } = useSelector(state => state.search);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setShowDropdown(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const submitHandler = (e, explicitQuery = null) => {
        if (e) e.preventDefault();
        const finalQuery = explicitQuery || text;
        if (finalQuery.trim()) {
            dispatch(setQuery(finalQuery));
            dispatch(addRecentSearch(finalQuery));
            setText('');
            setShowDropdown(false);
        }
    };

    const handleRemoveRecent = (e, item) => {
        e.stopPropagation();
        dispatch(removeRecentSearch(item));
    };

    return (
        <div className="relative w-full max-w-4xl" ref={dropdownRef}>
            <form onSubmit={submitHandler} className="relative w-full flex items-center">
                <div className="absolute left-4 text-gray-400">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-5 h-5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                    </svg>
                </div>
                <input
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    onFocus={() => setShowDropdown(true)}
                    required
                    className="w-full bg-gray-100 hover:bg-gray-200 focus:bg-white dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:bg-gray-900 text-gray-900 dark:text-white pl-12 pr-6 py-3 rounded-full outline-none transition-colors duration-200"
                    type="text"
                    placeholder="Search..."
                />
            </form>

            {showDropdown && (
                <div className="absolute top-full left-0 right-0 mt-2 bg-white dark:bg-gray-900 rounded-2xl shadow-xl p-4 z-50 text-gray-900 dark:text-gray-100 max-h-[60vh] overflow-y-auto border border-gray-100 dark:border-gray-800">
                    {recentSearches.length > 0 && (
                        <div className="mb-4">
                            <div className="flex justify-between items-center mb-2 px-2">
                                <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400">Recent</h3>
                                <button 
                                    onClick={() => dispatch(clearRecentSearches())}
                                    className="text-xs text-blue-600 dark:text-blue-400 hover:underline"
                                >
                                    Clear all
                                </button>
                            </div>
                            <div className="flex flex-col gap-1">
                                {recentSearches.map((item, idx) => (
                                    <div key={idx} className="flex justify-between items-center w-full hover:bg-gray-100 dark:hover:bg-gray-800 rounded-xl px-2 py-1 transition">
                                        <button
                                            onClick={() => submitHandler(null, item)}
                                            className="flex items-center gap-3 flex-grow text-left py-1"
                                        >
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4 text-gray-400"><path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                                            <span className="font-medium text-sm">{item}</span>
                                        </button>
                                        <button 
                                            onClick={(e) => handleRemoveRecent(e, item)}
                                            className="p-2 text-gray-400 hover:text-red-500 rounded-full transition"
                                            aria-label="Remove"
                                        >
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4"><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                    
                    <div>
                        <h3 className="text-sm font-semibold text-gray-500 mb-2 px-2">Ideas for you</h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                            {suggestions.filter(s => s.toLowerCase().includes(text.toLowerCase())).map((item, idx) => (
                                <button
                                    key={idx}
                                    onClick={() => submitHandler(null, item)}
                                    className="flex items-center gap-3 w-full text-left bg-transparent hover:bg-gray-100 px-3 py-2 rounded-xl transition"
                                >
                                    <div className="bg-gray-200 p-2 rounded-full text-gray-500">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                                        </svg>
                                    </div>
                                    <span className="font-semibold text-gray-800">{item}</span>
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default SearchBar;
=======
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { setQuery } from '../redux/features/searchSlice'

const SearchBar = () => {

    const [text, setText] = useState('')

    const dispatch = useDispatch()

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(setQuery(text))
        setText('')
    }

    return (
        <div>
            <form onSubmit={(e) => {
                submitHandler(e)
            }} className='flex  bg-(--c1) gap-5 py-10 px-10'>

                <input
                    value={text}
                    onChange={(e) => {
                        setText(e.target.value)
                    }}
                    required
                    className='w-full border-2 px-6 py-3 text-xl rounded outline-none'
                    type="text"
                    placeholder='Search anything...' />

                <button className='active:scale-95 cursor-pointer border-2 px-6 py-3 text-xl rounded outline-none'>Search</button>
            </form>
        </div>
    )
}

export default SearchBar
>>>>>>> d52f16b2d67d4f1ce8208ddcbbe38e691ca6ded3
