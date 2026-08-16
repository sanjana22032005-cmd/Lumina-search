import React from 'react';

const SkeletonCard = () => {
    // Generate a random height for the skeleton to simulate masonry loading
    const heights = ['h-48', 'h-64', 'h-80', 'h-96'];
    const randomHeight = heights[Math.floor(Math.random() * heights.length)];

    return (
        <div className={`w-full ${randomHeight} bg-gray-800 rounded-2xl overflow-hidden animate-pulse relative`}>
            <div className="absolute inset-0 bg-gradient-to-t from-gray-900/50 to-transparent"></div>
            <div className="absolute bottom-4 left-4 right-4 flex justify-between items-center opacity-50">
                <div className="h-4 bg-gray-700 rounded w-1/2"></div>
                <div className="h-8 w-8 bg-gray-700 rounded-full"></div>
            </div>
        </div>
    );
};

export default SkeletonCard;
