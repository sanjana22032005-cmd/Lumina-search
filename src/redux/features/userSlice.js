import { createSlice } from "@reduxjs/toolkit";

const loadInitialState = () => {
    try {
        const stored = localStorage.getItem('userPreferences');
        if (stored) {
            return JSON.parse(stored);
        }
    } catch {
        // Ignore error
    }
    return { likes: [], theme: 'dark' };
};

const initialState = loadInitialState();

const saveToLocal = (state) => {
    localStorage.setItem('userPreferences', JSON.stringify(state));
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        toggleLike: (state, action) => {
            const id = action.payload;
            if (state.likes.includes(id)) {
                state.likes = state.likes.filter(item => item !== id);
            } else {
                state.likes.push(id);
            }
            saveToLocal(state);
        },
        toggleTheme: (state) => {
            state.theme = state.theme === 'dark' ? 'light' : 'dark';
            saveToLocal(state);
        },
        setTheme: (state, action) => {
            state.theme = action.payload;
            saveToLocal(state);
        }
    }
});

export const { toggleLike, toggleTheme, setTheme } = userSlice.actions;
export default userSlice.reducer;
