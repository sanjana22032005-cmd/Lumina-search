import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toggleLike } from '../redux/features/userSlice';
import { toast, Zoom } from 'react-toastify';
import SaveToBoardModal from './SaveToBoardModal';

const PinCard = ({ item }) => {
    const dispatch = useDispatch();
    const likes = useSelector(state => state.user.likes);
    const boards = useSelector(state => state.boards.boards);
    
    const [isHovered, setIsHovered] = useState(false);
    const [showSaveModal, setShowSaveModal] = useState(false);

    const isLiked = likes.includes(item.id);
    const isSaved = boards.some(board => board.items.some(i => i.id === item.id));

    const handleLike = (e) => {
        e.stopPropagation();
        dispatch(toggleLike(item.id));
    };

    const handleShare = async (e) => {
        e.stopPropagation();
        if (navigator.share) {
            try {
                await navigator.share({
                    title: item.title || 'Media',
                    url: item.url
                });
            } catch {
                // User cancelled or share failed
            }
        } else {
            navigator.clipboard.writeText(item.url);
            toast.info('Link copied!', { theme: 'dark', autoClose: 1000, transition: Zoom });
        }
    };

    const handleDownload = (e) => {
        e.stopPropagation();
        window.open(item.src, '_blank');
    };

    return (
        <>
            <div 
                className="relative w-full rounded-2xl overflow-hidden group mb-4 cursor-pointer"
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
            >
                {item.type === 'photo' || item.type === 'gif' ? (
                    <img 
                        className="w-full h-auto object-cover rounded-2xl" 
                        src={item.type === 'gif' ? item.thumbnail : item.src} 
                        alt={item.title || 'Media'} 
                        loading="lazy"
                    />
                ) : (
                    <video 
                        className="w-full h-auto object-cover rounded-2xl" 
                        autoPlay 
                        loop 
                        muted 
                        src={item.src} 
                    />
                )}

                {/* Hover Overlay */}
                <div className={`absolute inset-0 bg-black/40 transition-opacity duration-300 ${isHovered ? 'opacity-100' : 'opacity-0'} flex flex-col justify-between p-4`}>
                    <div className="flex justify-end">
                        <button 
                            onClick={(e) => { e.stopPropagation(); setShowSaveModal(true); }}
                            className={`px-4 py-3 rounded-full font-semibold text-sm transition-colors ${isSaved ? 'bg-black text-white hover:bg-gray-900' : 'bg-red-600 text-white hover:bg-red-700'}`}
                        >
                            {isSaved ? 'Saved' : 'Save'}
                        </button>
                    </div>

                    <div className="flex justify-between items-end gap-2">
                        <a 
                            href={item.url} 
                            target="_blank" 
                            rel="noreferrer"
                            onClick={(e) => e.stopPropagation()}
                            className="flex items-center gap-2 bg-white/80 hover:bg-white text-black backdrop-blur-sm px-3 py-2 rounded-full text-xs font-semibold truncate max-w-[50%] transition-colors"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-3 h-3 flex-shrink-0">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M13.19 8.688a4.5 4.5 0 011.242 7.244l-4.5 4.5a4.5 4.5 0 01-6.364-6.364l1.757-1.757m13.35-.622l1.757-1.757a4.5 4.5 0 00-6.364-6.364l-4.5 4.5a4.5 4.5 0 001.242 7.244" />
                            </svg>
                            <span className="truncate">{new URL(item.url || 'https://example.com').hostname.replace('www.', '')}</span>
                        </a>

                        <div className="flex gap-2">
                            {/* Share */}
                            <button 
                                onClick={handleShare}
                                aria-label="Share"
                                className="bg-white/80 hover:bg-white text-black p-2 rounded-full transition-colors"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M7.217 10.907a2.25 2.25 0 100 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186l9.566-5.314m-9.566 7.5l9.566 5.314m0 0a2.25 2.25 0 103.935 2.186 2.25 2.25 0 00-3.935-2.186zm0-12.814a2.25 2.25 0 103.933-2.185 2.25 2.25 0 00-3.933 2.185z" />
                                </svg>
                            </button>
                            {/* Like */}
                            <button 
                                onClick={handleLike}
                                aria-label="Like"
                                className="bg-white/80 hover:bg-white text-black p-2 rounded-full transition-colors"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill={isLiked ? "red" : "none"} stroke={isLiked ? "red" : "currentColor"} strokeWidth={2} className="w-4 h-4">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
                                </svg>
                            </button>
                            {/* Download / Open */}
                            <button 
                                onClick={handleDownload}
                                aria-label="Download"
                                className="bg-white/80 hover:bg-white text-black p-2 rounded-full transition-colors"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {showSaveModal && (
                <SaveToBoardModal 
                    item={item} 
                    onClose={() => setShowSaveModal(false)} 
                />
            )}
        </>
    );
};

export default PinCard;
