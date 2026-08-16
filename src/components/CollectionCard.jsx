/* eslint-disable react/prop-types */

import { useDispatch } from 'react-redux';
<<<<<<< HEAD
import { removeCollection } from '../redux/features/collectionSlice';
import { toast, Zoom } from 'react-toastify';
=======
import { removeCollection, removeToast } from '../redux/features/collectionSlice';
>>>>>>> d52f16b2d67d4f1ce8208ddcbbe38e691ca6ded3

const CollectionCard = ({item}) => {

    const dispatch = useDispatch()

    const removeFromCollection = (item)=>{
        dispatch(removeCollection(item.id))
<<<<<<< HEAD
        toast.error('Removed from Collection', {
            position: "top-center",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
            transition: Zoom,
        });
=======
        dispatch(removeToast())
>>>>>>> d52f16b2d67d4f1ce8208ddcbbe38e691ca6ded3
    }
    return (
        <div className='w-[18vw] relative h-80 bg-white rounded-xl overflow-hidden'>
            <a target='_blank' className='h-full' href={item.url}>
                {item.type == 'photo' ? <img className='h-full w-full object-cover object-center' src={item.src} alt="" /> : ''}
                {item.type == 'video' ? <video className='h-full w-full object-cover object-center' autoPlay loop muted src={item.src}></video> : ''}
                {item.type == 'gif' ? <img className='h-full w-full object-cover object-center' src={item.src} alt="" /> : ''}
            </a>
            <div id='bottom' className='flex justify-between gap-3 items-center w-full px-4 py-6 absolute bottom-0 text-white'>
                <h2 className='text-lg font-semibold capitalize h-14 overflow-hidden'>{item.title}</h2>
                <button
                    onClick={() => {
                        removeFromCollection(item)
                    }}
                    className='bg-indigo-600 active:scale-95 text-white rounded px-3 py-1 cursor-pointer font-medium'
                >
                    Remove
                </button>
            </div>
        </div>
    )
}

export default CollectionCard