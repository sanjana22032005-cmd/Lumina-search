import React, { useEffect, useRef } from 'react';

const InfiniteScrollObserver = ({ onLoadMore, hasMore, loading }) => {
    const observerRef = useRef(null);

    useEffect(() => {
        const currentRef = observerRef.current;
        const observer = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting && hasMore && !loading) {
                onLoadMore();
            }
        }, { threshold: 0.1 });

        if (currentRef) {
            observer.observe(currentRef);
        }

        return () => {
            if (currentRef) {
                observer.unobserve(currentRef);
            }
        };
    }, [onLoadMore, hasMore, loading]);

    return (
        <div ref={observerRef} className="w-full py-8 flex justify-center">
            {loading && (
                <div className="w-8 h-8 border-4 border-gray-300 border-t-blue-500 rounded-full animate-spin"></div>
            )}
            {!hasMore && !loading && (
                <p className="text-gray-500 dark:text-gray-400 font-semibold">You've reached the end!</p>
            )}
        </div>
    );
};

export default InfiniteScrollObserver;
