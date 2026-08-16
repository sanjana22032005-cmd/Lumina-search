import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { renameBoard, deleteBoard } from '../redux/features/boardSlice';
import MasonryGrid from '../components/MasonryGrid';
import { toast, Zoom } from 'react-toastify';

const BoardDetailPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    
    const board = useSelector(state => state.boards.boards.find(b => b.id === id));
    const [isEditing, setIsEditing] = useState(false);
    const [editName, setEditName] = useState(board ? board.name : '');

    if (!board) {
        return (
            <div className="min-h-screen bg-white dark:bg-gray-950 text-gray-900 dark:text-white flex items-center justify-center">
                <h1 className="text-3xl font-bold">Board not found</h1>
            </div>
        );
    }

    const handleSaveName = () => {
        if (editName.trim() && editName.trim() !== board.name) {
            dispatch(renameBoard({ id: board.id, name: editName.trim() }));
            toast.success('Board renamed', { theme: 'dark', autoClose: 1500, transition: Zoom });
        }
        setIsEditing(false);
    };

    const handleDelete = () => {
        if (window.confirm(`Are you sure you want to delete the board "${board.name}"?`)) {
            dispatch(deleteBoard(board.id));
            toast.success('Board deleted', { theme: 'dark', autoClose: 1500, transition: Zoom });
            navigate('/collection');
        }
    };

    return (
        <div className="min-h-screen bg-white dark:bg-gray-950 text-gray-900 dark:text-white px-4 md:px-8 py-8 transition-colors duration-300">
            <div className="flex flex-col items-center mb-12 mt-4 max-w-[1600px] mx-auto text-center relative">
                {isEditing ? (
                    <div className="flex gap-2 items-center">
                        <input 
                            type="text" 
                            value={editName}
                            onChange={(e) => setEditName(e.target.value)}
                            className="text-4xl font-bold bg-gray-100 dark:bg-gray-900 text-black dark:text-white px-4 py-2 rounded-2xl outline-none"
                            autoFocus
                        />
                        <button onClick={handleSaveName} className="bg-gray-900 dark:bg-white text-white dark:text-black font-semibold px-4 py-3 rounded-full hover:opacity-80 transition">Save</button>
                    </div>
                ) : (
                    <div className="group flex items-center gap-3">
                        <h1 className="text-4xl md:text-5xl font-bold tracking-tight">{board.name}</h1>
                        <button onClick={() => setIsEditing(true)} className="p-2 bg-gray-100 dark:bg-gray-800 rounded-full opacity-0 group-hover:opacity-100 transition">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125" /></svg>
                        </button>
                    </div>
                )}

                <p className="mt-4 text-gray-500 dark:text-gray-400 font-medium">{board.items.length} Pins</p>

                <div className="absolute right-0 top-0">
                    <button onClick={handleDelete} className="p-3 bg-red-50 hover:bg-red-100 dark:bg-red-900/20 dark:hover:bg-red-900/40 text-red-600 rounded-full transition">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" /></svg>
                    </button>
                </div>
            </div>

            {board.items.length > 0 ? (
                <div className="-mx-4 md:-mx-8">
                    <MasonryGrid 
                        items={board.items} 
                        loading={false} 
                        error={null} 
                        onPinClick={(item) => navigate(`/pin/${item.id}`, { state: { item } })} 
                    />
                </div>
            ) : (
                <div className="flex flex-col items-center justify-center py-20 text-center">
                    <h2 className="text-2xl py-4 text-gray-500 font-bold">There aren't any Pins on this board yet</h2>
                </div>
            )}
        </div>
    );
};

export default BoardDetailPage;
