import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createBoard, saveToBoard, removeFromBoard } from '../redux/features/boardSlice';
import { toast, Zoom } from 'react-toastify';

const SaveToBoardModal = ({ item, onClose }) => {
    const dispatch = useDispatch();
    const boards = useSelector(state => state.boards.boards);
    const [newBoardName, setNewBoardName] = useState('');
    const [isCreating, setIsCreating] = useState(false);

    const handleCreateBoard = (e) => {
        e.preventDefault();
        if (newBoardName.trim()) {
            dispatch(createBoard(newBoardName.trim()));
            setNewBoardName('');
            setIsCreating(false);
            toast.success('Board created', { theme: 'dark', autoClose: 1500, transition: Zoom });
        }
    };

    const toggleSave = (boardId, isSaved) => {
        if (isSaved) {
            dispatch(removeFromBoard({ boardId, itemId: item.id }));
            toast.info('Removed from board', { theme: 'dark', autoClose: 1500, transition: Zoom });
        } else {
            dispatch(saveToBoard({ boardId, item }));
            toast.success('Saved to board', { theme: 'dark', autoClose: 1500, transition: Zoom });
        }
    };

    return (
        <div 
            className="fixed inset-0 z-[60] flex items-center justify-center bg-black/70 backdrop-blur-sm p-4"
            onClick={onClose}
        >
            <div 
                className="w-full max-w-sm bg-white dark:bg-gray-900 rounded-3xl overflow-hidden shadow-2xl flex flex-col max-h-[80vh]"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="p-6 border-b border-gray-200 dark:border-gray-800 flex justify-between items-center">
                    <h2 className="text-xl font-bold text-gray-900 dark:text-white">Save to board</h2>
                    <button onClick={onClose} className="p-2 bg-gray-100 dark:bg-gray-800 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition text-gray-600 dark:text-gray-300">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                <div className="p-4 overflow-y-auto flex-1">
                    {boards.map(board => {
                        const isSaved = board.items.some(i => i.id === item.id);
                        return (
                            <div key={board.id} className="flex justify-between items-center p-3 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-xl transition cursor-pointer" onClick={() => toggleSave(board.id, isSaved)}>
                                <div className="flex items-center gap-3">
                                    <div className="w-12 h-12 bg-gray-200 dark:bg-gray-700 rounded-lg overflow-hidden">
                                        {board.items.length > 0 ? (
                                            <img src={board.items[0].thumbnail || board.items[0].src} className="w-full h-full object-cover" alt="" />
                                        ) : (
                                            <div className="w-full h-full flex items-center justify-center text-gray-400">
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" /></svg>
                                            </div>
                                        )}
                                    </div>
                                    <span className="font-semibold text-gray-900 dark:text-white">{board.name}</span>
                                </div>
                                <button 
                                    className={`px-4 py-2 rounded-full font-semibold text-sm transition ${isSaved ? 'bg-black text-white dark:bg-white dark:text-black' : 'bg-red-600 text-white hover:bg-red-700'}`}
                                >
                                    {isSaved ? 'Saved' : 'Save'}
                                </button>
                            </div>
                        );
                    })}
                </div>

                <div className="p-4 border-t border-gray-200 dark:border-gray-800">
                    {!isCreating ? (
                        <button 
                            onClick={() => setIsCreating(true)}
                            className="flex items-center gap-3 w-full p-3 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-xl transition text-gray-900 dark:text-white font-semibold"
                        >
                            <div className="w-10 h-10 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center text-red-600">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" /></svg>
                            </div>
                            Create board
                        </button>
                    ) : (
                        <form onSubmit={handleCreateBoard} className="flex flex-col gap-3">
                            <input 
                                type="text"
                                value={newBoardName}
                                onChange={(e) => setNewBoardName(e.target.value)}
                                placeholder="Board name"
                                className="w-full px-4 py-3 bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white rounded-xl outline-none focus:ring-2 focus:ring-blue-500"
                                autoFocus
                            />
                            <div className="flex gap-2 justify-end">
                                <button type="button" onClick={() => setIsCreating(false)} className="px-4 py-2 font-semibold text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full">Cancel</button>
                                <button type="submit" disabled={!newBoardName.trim()} className="px-4 py-2 font-semibold bg-red-600 text-white rounded-full disabled:opacity-50">Create</button>
                            </div>
                        </form>
                    )}
                </div>
            </div>
        </div>
    );
};

export default SaveToBoardModal;
