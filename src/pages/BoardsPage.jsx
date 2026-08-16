import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const BoardsPage = () => {
    const boards = useSelector(state => state.boards.boards);

    return (
        <div className="min-h-screen bg-white dark:bg-gray-950 text-gray-900 dark:text-white px-4 md:px-8 py-8 transition-colors duration-300">
            <div className="flex justify-between items-center mb-10 max-w-[1600px] mx-auto">
                <h2 className="text-3xl font-bold tracking-tight">Saved Boards</h2>
            </div>

            {boards.length > 0 ? (
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6 max-w-[1600px] mx-auto">
                    {boards.map(board => (
                        <Link 
                            key={board.id} 
                            to={`/board/${board.id}`}
                            className="group flex flex-col gap-2 cursor-pointer"
                        >
                            <div className="relative aspect-[3/4] bg-gray-100 dark:bg-gray-800 rounded-3xl overflow-hidden">
                                {board.items.length > 0 ? (
                                    <div className="absolute inset-0 grid grid-cols-2 grid-rows-2 gap-1 p-1">
                                        <div className="row-span-2 overflow-hidden rounded-l-2xl">
                                            <img src={board.items[0]?.thumbnail || board.items[0]?.src} className="w-full h-full object-cover group-hover:scale-105 transition duration-500" alt="" />
                                        </div>
                                        <div className="overflow-hidden rounded-tr-2xl">
                                            {board.items[1] ? (
                                                <img src={board.items[1].thumbnail || board.items[1].src} className="w-full h-full object-cover group-hover:scale-105 transition duration-500" alt="" />
                                            ) : (
                                                <div className="w-full h-full bg-gray-200 dark:bg-gray-700"></div>
                                            )}
                                        </div>
                                        <div className="overflow-hidden rounded-br-2xl">
                                            {board.items[2] ? (
                                                <img src={board.items[2].thumbnail || board.items[2].src} className="w-full h-full object-cover group-hover:scale-105 transition duration-500" alt="" />
                                            ) : (
                                                <div className="w-full h-full bg-gray-200 dark:bg-gray-700"></div>
                                            )}
                                        </div>
                                    </div>
                                ) : (
                                    <div className="absolute inset-0 flex items-center justify-center text-gray-400 group-hover:bg-gray-200 dark:group-hover:bg-gray-700 transition">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8"><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" /></svg>
                                    </div>
                                )}
                                <div className="absolute inset-0 bg-black/10 group-hover:bg-black/20 transition-colors"></div>
                            </div>
                            <div className="px-2">
                                <h3 className="font-bold text-lg truncate">{board.name}</h3>
                                <p className="text-sm text-gray-500 dark:text-gray-400">{board.items.length} Pins</p>
                            </div>
                        </Link>
                    ))}
                </div>
            ) : (
                <div className="flex flex-col items-center justify-center py-32 text-center h-[60vh]">
                    <div className="w-24 h-24 mb-6 text-gray-700">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1} stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0111.186 0z" />
                        </svg>
                    </div>
                    <h2 className="text-4xl py-4 text-gray-400 font-bold">No boards yet</h2>
                    <p className="text-gray-500 max-w-md">Create a board and save some ideas to see them here.</p>
                </div>
            )}
        </div>
    );
};

export default BoardsPage;
