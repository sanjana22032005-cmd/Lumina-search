<<<<<<< HEAD
import React, { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPhotos, fetchVideos, fetchGIF } from '../api/mediaApi';
import { setLoading, setError, setResults, appendResults } from '../redux/features/searchSlice';
import { useNavigate } from 'react-router-dom';
import CategoryNav from '../components/CategoryNav';
import MasonryGrid from '../components/MasonryGrid';
import InfiniteScrollObserver from '../components/InfiniteScrollObserver';

const defaultTopics = ['mountain', 'landscape', 'nature', 'travel', 'photography', 'architecture', 'neon', 'coffee'];

const HomePage = () => {
    const dispatch = useDispatch();
    const { query, activeTab, results, loading, error, recentSearches } = useSelector((store) => store.search);
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);
    const [fetchTrigger, setFetchTrigger] = useState(0);

    const isFetchingRef = useRef(false);

    // Determine what to search for
    const getPersonalizedQuery = React.useCallback(() => {
        if (query) return query;
        if (recentSearches && recentSearches.length > 0) {
            // Pick a random recent search to show variation
            return recentSearches[Math.floor(Math.random() * recentSearches.length)];
        }
        return defaultTopics[Math.floor(Math.random() * defaultTopics.length)];
    }, [query, recentSearches]);

    const currentQuery = useRef(getPersonalizedQuery());

    const handleLoadMore = React.useCallback(() => {
        setPage(p => p + 1);
    }, []);

    // Reset pagination when query or tab changes
    useEffect(() => {
        currentQuery.current = getPersonalizedQuery();
        setPage(1);
        setHasMore(true);
        window.scrollTo(0, 0);
        setFetchTrigger(t => t + 1); // Force fetch even if page is already 1
    }, [getPersonalizedQuery, activeTab]);

    useEffect(() => {
        const getData = async () => {
            if (isFetchingRef.current) return;
            isFetchingRef.current = true;

            try {
                if (page === 1) dispatch(setLoading());
                
                let data = [];
                
                if (activeTab === 'photos') {
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
                } else if (activeTab === 'videos') {
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
                } else if (activeTab === 'gif') {
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
                    dispatch(setResults(data));
                } else {
                    dispatch(appendResults(data));
                }
            } catch (err) {
                dispatch(setError(err.message));
                setHasMore(false);
            } finally {
                isFetchingRef.current = false;
            }
        };

        // Add a slight debounce to prevent strict mode double firing in dev
        const timer = setTimeout(() => {
            console.log("HomePage: calling getData for page", page, "query", currentQuery.current);
            getData();
        }, 300);

        return () => clearTimeout(timer);
    }, [page, activeTab, fetchTrigger, dispatch]); // Notice query is not a direct dependency, we track it via ref changes that reset page to 1

    const navigate = useNavigate();

    const handlePinClick = (item) => {
        navigate(`/pin/${item.id}`, { state: { item } });
    };

    return (
        <div className="min-h-screen bg-white dark:bg-gray-950 text-gray-900 dark:text-white transition-colors duration-300">
            <CategoryNav />
            <div className="pt-4 px-2 md:px-4">
                {!query && (
                    <div className="mb-4 text-center">
                        <h2 className="text-xl font-bold">For You</h2>
                        <p className="text-sm text-gray-500 dark:text-gray-400">Inspired by your interests ({currentQuery.current})</p>
                    </div>
                )}
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
        </div>
    );
};

export default HomePage;
=======

import { useSelector } from 'react-redux'
import ResultGrid from '../components/ResultGrid'
import SearchBar from '../components/SearchBar'
import Tabs from '../components/Tabs'
const HomePage = () => {

    const { query } = useSelector((store) => store.search)




    return (
        <div>

            <SearchBar />

            {query != '' ? <div><Tabs /><ResultGrid /></div> : ''}
        </div>
    )
}

export default HomePage
>>>>>>> d52f16b2d67d4f1ce8208ddcbbe38e691ca6ded3
