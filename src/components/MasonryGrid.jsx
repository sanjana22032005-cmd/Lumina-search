import React from 'react';
import PinCard from './PinCard';
import SkeletonCard from './SkeletonCard';

const MasonryGrid = ({ items, loading, error, onPinClick }) => {
    if (error) {
        return (
            <div className="flex flex-col items-center justify-center py-20 text-center">
                <p className="text-2xl text-gray-400 font-medium mb-4">Oops! Something went wrong.</p>
                <p className="text-gray-500">{error}</p>
            </div>
        );
    }

    if (loading) {
        return (
            <div className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 xl:columns-5 2xl:columns-6 gap-4 space-y-4 px-4 sm:px-8 py-6 w-full">
                {Array.from({ length: 15 }).map((_, idx) => (
                    <div key={idx} className="break-inside-avoid">
                        <SkeletonCard />
                    </div>
                ))}
            </div>
        );
    }

    if (!items || items.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center py-20 text-center">
                <p className="text-2xl text-gray-400 font-medium">No results found.</p>
                <p className="text-gray-500 mt-2">Try searching for something else or explore new categories.</p>
            </div>
        );
    }

    return (
        <div className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 xl:columns-5 2xl:columns-6 gap-4 space-y-4 px-4 sm:px-8 py-6 w-full">
            {items.map((item, idx) => (
                <div key={idx} className="break-inside-avoid cursor-pointer" onClick={() => onPinClick(item)}>
                    <PinCard item={item} />
                </div>
            ))}
        </div>
    );
};

export default MasonryGrid;
