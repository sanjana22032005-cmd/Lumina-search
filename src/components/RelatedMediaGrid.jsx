import React, { useState, useEffect, useRef } from 'react';
import { fetchPhotos, fetchVideos, fetchGIF } from '../api/mediaApi';
import MasonryGrid from './MasonryGrid';
import InfiniteScrollObserver from './InfiniteScrollObserver';
import { useNavigate } from 'react-router-dom';

const generateQueryFromItem = (item) => {
    let query = '';
    if (item.title) {
        // Simple extraction: remove common stop words and grab a few significant words
        const stopWords = ['a', 'an', 'and', 'the', 'of', 'in', 'on', 'with', 'for', 'is', 'to', 'at', 'by'];
        const words = item.title.split(/[\s,-]+/).filter(w => w.trim().length > 2 && !stopWords.includes(w.toLowerCase()));
        if (words.length > 0) {
            query = words.slice(0, 3).join(' '); // use up to 3 words
        }
    }
    
    // Fallback if no valid keywords extracted
    if (!query) {
        query = item.type === 'photo' ? 'landscape' : item.type === 'video' ? 'nature' : 'funny';
    }
    return query;
};

const RelatedMediaGrid = ({ currentItem }) => {
    const navigate = useNavigate();
    const [results, setResults] = useState([]);
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const isFetchingRef = useRef(false);
    const currentQuery = useRef('');
    
    useEffect(() => {
        if (!currentItem) return;
        
        currentQuery.current = generateQueryFromItem(currentItem);
        
        // Reset state for new item
        setResults([]);
        setPage(1);
        setHasMore(true);
        setError(null);
    }, [currentItem]);

    useEffect(() => {
        if (!currentQuery.current || !hasMore) return;

        const getData = async () => {
            if (isFetchingRef.current) return;
            isFetchingRef.current = true;

            try {
                if (page === 1) setLoading(true);
                setError(null);
                
                let data = [];
                const type = currentItem?.type || 'photo';
                
                if (type === 'photo') {
                    let response = await fetchPhotos(currentQuery.current, page);                    
                    data = response.results.map((item) => ({
                        id: item.id,
                        type: 'photo',
                        title: item.alt_description,
                        thumbnail: item.urls.small,
                        src: item.urls.full,
                        url: item.links.html
                    }));
                    if (data.length === 0 || page >= response.total_pages) setHasMore(false);
                } else if (type === 'video') {
                    let response = await fetchVideos(currentQuery.current, page);
                    data = response.videos.map((item) => ({
                        id: item.id,
                        type: 'video',
                        title: item.user.name || 'video',
                        thumbnail: item.image,
                        src: item.video_files[0].link,
                        url: item.url
                    }));
                    if (data.length === 0 || !response.next_page) setHasMore(false);
                } else if (type === 'gif') {
                    let response = await fetchGIF(currentQuery.current, page);
                    data = response.data.map((item) => ({
                        id: item.id,
                        title: item.title || 'GIF',
                        type: 'gif',
                        thumbnail: item.images.fixed_height_small.url,
                        src: item.images.original.url,
                        url: item.url
                    }));
                    if (data.length === 0 || response.pagination.offset + response.pagination.count >= response.pagination.total_count) setHasMore(false);
                }
                
                if (page === 1) {
                    setResults(data);
                } else {
                    // Prevent duplicates
                    setResults(prev => {
                        const existingIds = new Set(prev.map(i => i.id));
                        const newItems = data.filter(i => !existingIds.has(i.id));
                        return [...prev, ...newItems];
                    });
                }
            } catch (err) {
                setError("Unable to load related content");
                setHasMore(false);
            } finally {
                setLoading(false);
                isFetchingRef.current = false;
            }
        };

        const timer = setTimeout(() => {
            getData();
        }, 300);

        return () => clearTimeout(timer);
    }, [page, currentItem]);

    const handleLoadMore = React.useCallback(() => {
        setPage(p => p + 1);
    }, []);

    const handlePinClick = (item) => {
        // Navigate to new pin, which pushes to history!
        navigate(`/pin/${item.id}`, { state: { item } });
    };

    if (!currentItem) return null;

    return (
        <div className="mt-16 w-full">
            <div className="flex justify-center mb-6">
                <h2 className="text-2xl font-bold">More Like This</h2>
            </div>
            
            <MasonryGrid 
                items={results} 
                loading={loading && page === 1} 
                error={error} 
                onPinClick={handlePinClick} 
            />
            
            <InfiniteScrollObserver 
                onLoadMore={handleLoadMore} 
                hasMore={hasMore} 
                loading={loading || isFetchingRef.current} 
            />
        </div>
    );
};

export default RelatedMediaGrid;
