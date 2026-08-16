<<<<<<< HEAD
import React, { useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { clearCollection } from '../redux/features/collectionSlice';
import MasonryGrid from '../components/MasonryGrid';
import MediaModal from '../components/MediaModal';
import { toast, Zoom } from 'react-toastify';

const CollectionPage = () => {
    const collection = useSelector(state => state.collection.items);
    const dispatch = useDispatch();
    const [selectedMedia, setSelectedMedia] = useState(null);

    const clearAll = () => {
        if (window.confirm("Are you sure you want to clear all saved items?")) {
            dispatch(clearCollection());
            toast.success('Collection cleared', { theme: 'dark', transition: Zoom });
        }
    };

    return (
        <div className="min-h-screen bg-gray-950 text-white px-4 md:px-8 py-8">
            <div className="flex justify-between items-center mb-8 max-w-[1600px] mx-auto">
                <h2 className="text-3xl font-bold tracking-tight">Saved for later</h2>
                {collection.length > 0 && (
                    <button 
                        onClick={clearAll} 
                        className="active:scale-95 transition-transform bg-gray-800 hover:bg-gray-700 px-6 py-2.5 text-sm font-semibold rounded-full"
                    >
                        Clear All
                    </button>
                )}
            </div>

            {collection.length > 0 ? (
                <div className="-mx-4 md:-mx-8">
                    <MasonryGrid 
                        items={collection} 
                        loading={false} 
                        error={null} 
                        onPinClick={(item) => setSelectedMedia(item)} 
                    />
                </div>
            ) : (
                <div className="flex flex-col items-center justify-center py-32 text-center h-[60vh]">
                    <div className="w-24 h-24 mb-6 text-gray-700">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1} stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0111.186 0z" />
                        </svg>
                    </div>
                    <h2 className="text-4xl py-4 text-gray-400 font-bold">Nothing saved yet</h2>
                    <p className="text-gray-500 max-w-md">Items you save will appear here. Start exploring and build your collection!</p>
                </div>
            )}

            {selectedMedia && (
                <MediaModal 
                    item={selectedMedia} 
                    onClose={() => setSelectedMedia(null)} 
                />
            )}
        </div>
    );
};

export default CollectionPage;
=======
import { useDispatch, useSelector } from "react-redux"
import CollectionCard from "../components/CollectionCard"
import { clearCollection } from '../redux/features/collectionSlice'


const CollectionPage = () => {

  const collection = useSelector(state => state.collection.items)

  const dispatch = useDispatch()

  const clearAll = () => {

    dispatch(clearCollection())
  }

  return (
    <div className=" overflow-auto px-10 py-6">

      {collection.length > 0 ? <div className="flex justify-between mb-6">
        <h2 className="text-3xl font-medium">
          Your Collection
        </h2>
        <button onClick={() => {
          clearAll()
        }} className="active:scale-95 transition cursor-pointer bg-red-600 px-8 py-3 text-lg font-medium rounded">Clear Collection</button>
      </div> : <h2 className="text-5xl py-10 text-gray-300 text-center font-medium">
        Collection is Empty
      </h2>}

      <div className='flex justify-start w-full flex-wrap gap-6'>
        {collection.map((item, idx) => {
          return <div key={idx}>
            <CollectionCard item={item} />
          </div>
        })}
      </div>
    </div>
  )
}

export default CollectionPage
>>>>>>> d52f16b2d67d4f1ce8208ddcbbe38e691ca6ded3
