import React, { useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setQuery } from '../redux/features/searchSlice';

const categories = [
    'All', 'Travel', 'Nature', 'Photography', 'Fashion', 
    'Food', 'Art', 'Architecture', 'Technology', 'Cars', 
    'Gaming', 'Wallpapers', 'Minimalism'
];

const CategoryNav = () => {
    const dispatch = useDispatch();
    const currentQuery = useSelector(state => state.search.query);
    const scrollRef = useRef(null);

    const scroll = (direction) => {
        if (scrollRef.current) {
            const { current } = scrollRef;
            if (direction === 'left') {
                current.scrollBy({ left: -200, behavior: 'smooth' });
            } else {
                current.scrollBy({ left: 200, behavior: 'smooth' });
            }
        }
    };

    const handleCategoryClick = (category) => {
        const query = category === 'All' ? 'popular' : category.toLowerCase();
        dispatch(setQuery(query));
    };

    return (
        <div className="relative w-full flex items-center px-4 py-4 bg-gray-950">
            <button 
                onClick={() => scroll('left')}
                className="hidden md:flex absolute left-2 z-10 p-2 bg-gray-900 rounded-full shadow-md text-white hover:bg-gray-800 transition"
            >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                </svg>
            </button>
            
            <div 
                ref={scrollRef}
                className="flex overflow-x-auto gap-3 scrollbar-hide px-2 md:px-8 w-full snap-x"
                style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
                {categories.map((cat, idx) => (
                    <button
                        key={idx}
                        onClick={() => handleCategoryClick(cat)}
                        className={`whitespace-nowrap px-5 py-2 rounded-full text-sm font-semibold transition-colors snap-center ${
                            (currentQuery === cat.toLowerCase() || (cat === 'All' && currentQuery === 'popular')) 
                                ? 'bg-white text-black' 
                                : 'bg-gray-800 text-white hover:bg-gray-700'
                        }`}
                    >
                        {cat}
                    </button>
                ))}
            </div>

            <button 
                onClick={() => scroll('right')}
                className="hidden md:flex absolute right-2 z-10 p-2 bg-gray-900 rounded-full shadow-md text-white hover:bg-gray-800 transition"
            >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                </svg>
            </button>
        </div>
    );
};

export default CategoryNav;
