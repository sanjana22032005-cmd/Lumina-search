import { createSlice } from "@reduxjs/toolkit";
<<<<<<< HEAD

=======
import { toast, Zoom } from 'react-toastify';
>>>>>>> d52f16b2d67d4f1ce8208ddcbbe38e691ca6ded3

const initialState = {
    items: JSON.parse(localStorage.getItem('collection')) || []
}

const collectionSlice = createSlice({
    name: 'collection',
    initialState,
    reducers: {
        addCollection: (state, action) => {
            const alreadyExists = state.items.find(
                item => item.id === action.payload.id
            )
            if (!alreadyExists) {
                state.items.push(action.payload);
                localStorage.setItem('collection', JSON.stringify(state.items))
            }
        },
        removeCollection: (state, action) => {
            console.log('removed');
            
            state.items = state.items.filter(
                item => item.id !== action.payload
            )
            console.log(state.items);
            
            localStorage.setItem('collection', JSON.stringify(state.items))
        },
        clearCollection: (state) => {
            state.items = []
            localStorage.removeItem('collection')
<<<<<<< HEAD
=======
        },
        addedToast: () => {
            toast.success('Added to Collection ✅', {
                position: "top-center",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: true,
                progress: undefined,
                theme: "dark",
                transition: Zoom,
            });
        },
        removeToast: () => {
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
>>>>>>> d52f16b2d67d4f1ce8208ddcbbe38e691ca6ded3
        }
    }
})


export const {
    addCollection,
    removeCollection,
<<<<<<< HEAD
    clearCollection
=======
    clearCollection,
    addedToast,
    removeToast,
>>>>>>> d52f16b2d67d4f1ce8208ddcbbe38e691ca6ded3
} = collectionSlice.actions;


export default collectionSlice.reducer;