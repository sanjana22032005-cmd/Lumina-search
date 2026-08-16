import React, { useEffect } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { toast, Zoom } from 'react-toastify';
import RelatedMediaGrid from '../components/RelatedMediaGrid';
import SaveToBoardModal from '../components/SaveToBoardModal';
import { toggleLike } from '../redux/features/userSlice';

const MediaDetailPage = () => {
    const { id } = useParams();
    const location = useLocation();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    
    // We expect the item to be passed via router state to remain 100% frontend
    const item = location.state?.item;
    
    const boards = useSelector(state => state.boards.boards);
    const likes = useSelector(state => state.user.likes);
    const isSaved = item ? boards.some(board => board.items.some(i => i.id === item.id)) : false;
    const isLiked = item ? likes.includes(item.id) : false;
    const [showSaveModal, setShowSaveModal] = React.useState(false);

    // Scroll to top when a new pin is loaded
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [id]);

    if (!item) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center bg-white dark:bg-gray-950 text-black dark:text-white pt-20">
                <h1 className="text-3xl font-bold mb-4">Unable to load this media</h1>
                <p className="text-gray-500 mb-8">The media could not be found or you accessed this link directly without an active session.</p>
                <button 
                    onClick={() => navigate('/')}
                    className="px-6 py-3 bg-gray-200 dark:bg-gray-800 hover:bg-gray-300 dark:hover:bg-gray-700 rounded-full font-semibold transition"
                >
                    Go Back Home
                </button>
            </div>
        );
    }

    const handleSaveToggle = () => {
        setShowSaveModal(true);
    };

    const handleDownload = () => {
        window.open(item.src, '_blank');
    };

    const handleShare = async () => {
        if (navigator.share) {
            try {
                await navigator.share({
                    title: item.title || 'Media',
                    url: item.url
                });
            } catch (err) {
                console.error("Error sharing", err);
            }
        } else {
            navigator.clipboard.writeText(item.url);
            toast.info('Link copied!', { theme: 'light', autoClose: 1000, transition: Zoom });
        }
    };

    return (
        <div className="min-h-screen bg-white dark:bg-gray-950 text-gray-900 dark:text-white pt-24 pb-12 transition-colors duration-300">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                
                {/* Back Button */}
                <button 
                    onClick={() => navigate(-1)} 
                    className="mb-6 p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition flex items-center justify-center w-10 h-10"
                    title="Go Back"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
                    </svg>
                </button>

                {/* Main Card */}
                <div className="bg-white dark:bg-gray-900 rounded-[32px] shadow-2xl overflow-hidden flex flex-col md:flex-row">
                    
                    {/* Left: Media Preview */}
                    <div className="w-full md:w-1/2 flex items-center justify-center bg-gray-100 dark:bg-gray-950 min-h-[50vh] p-4">
                        {item.type === 'photo' || item.type === 'gif' ? (
                            <img 
                                className="w-full h-auto max-h-[75vh] object-contain rounded-2xl" 
                                src={item.src} 
                                alt={item.title || 'Media'} 
                            />
                        ) : (
                            <video 
                                className="w-full h-auto max-h-[75vh] object-contain rounded-2xl" 
                                autoPlay 
                                controls 
                                loop 
                                src={item.src} 
                            />
                        )}
                    </div>

                    {/* Right: Info & Actions */}
                    <div className="w-full md:w-1/2 p-8 md:p-10 flex flex-col">
                        
                        <div className="flex justify-between items-center mb-8">
                            <div className="flex gap-4">
                                <button 
                                    onClick={() => dispatch(toggleLike(item.id))}
                                    className="p-3 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-full transition"
                                    title={isLiked ? "Unlike" : "Like"}
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill={isLiked ? "red" : "none"} stroke={isLiked ? "red" : "currentColor"} strokeWidth={2} className="w-6 h-6">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
                                    </svg>
                                </button>
                                <button 
                                    onClick={handleShare}
                                    className="p-3 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-full transition"
                                    title="Share"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M7.217 10.907a2.25 2.25 0 100 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186l9.566-5.314m-9.566 7.5l9.566 5.314m0 0a2.25 2.25 0 103.935 2.186 2.25 2.25 0 00-3.935-2.186zm0-12.814a2.25 2.25 0 103.933-2.185 2.25 2.25 0 00-3.933 2.185z" />
                                    </svg>
                                </button>
                                <button 
                                    onClick={handleDownload}
                                    className="p-3 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-full transition"
                                    title="Download"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
                                    </svg>
                                </button>
                            </div>
                            <button 
                                onClick={handleSaveToggle}
                                className={`px-6 py-3 rounded-full font-semibold text-lg transition-colors ${isSaved ? 'bg-black dark:bg-white text-white dark:text-black hover:opacity-80' : 'bg-red-600 text-white hover:bg-red-700'}`}
                            >
                                {isSaved ? 'Saved' : 'Save'}
                            </button>
                        </div>

                        <h1 className="text-3xl md:text-4xl font-bold mb-4 capitalize leading-tight">
                            {item.title || 'Untitled Media'}
                        </h1>
                        
                        <p className="text-gray-500 dark:text-gray-400 mb-8">
                            Source:{' '}
                            <a href={item.url} target="_blank" rel="noreferrer" className="underline hover:text-black dark:hover:text-white font-medium">
                                {item.type === 'photo' ? 'Unsplash' : item.type === 'video' ? 'Pexels' : 'Giphy'} ↗
                            </a>
                        </p>

                    </div>
                </div>

                {/* Related Media Section */}
                <RelatedMediaGrid currentItem={item} />
            </div>

            {showSaveModal && (
                <SaveToBoardModal 
                    item={item} 
                    onClose={() => setShowSaveModal(false)} 
                />
            )}
        </div>
    );
};

export default MediaDetailPage;
