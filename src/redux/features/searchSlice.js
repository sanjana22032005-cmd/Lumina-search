import { createSlice } from '@reduxjs/toolkit'

const searchSlice = createSlice({
    name: "search",
    initialState: {
        query: '',
        activeTab: 'photos',
        results: [],
        loading: false,
<<<<<<< HEAD
        error: null,
        recentSearches: JSON.parse(localStorage.getItem('recentSearches')) || []
=======
        error: null
>>>>>>> d52f16b2d67d4f1ce8208ddcbbe38e691ca6ded3
    },
    reducers: {
        setQuery(state, action) {
            state.query = action.payload
        },
        setActiveTabs(state, action) {
            state.activeTab = action.payload
        },
        setResults(state, action) {
            state.results = action.payload
            state.loading = false
        },
<<<<<<< HEAD
        appendResults(state, action) {
            // Prevent duplicates
            const existingIds = new Set(state.results.map(i => i.id));
            const newItems = action.payload.filter(i => !existingIds.has(i.id));
            state.results = [...state.results, ...newItems];
            state.loading = false;
        },
=======
>>>>>>> d52f16b2d67d4f1ce8208ddcbbe38e691ca6ded3
        setLoading(state) {
            state.loading = true
            state.error = null
        },
        setError(state, action) {
            state.error = action.payload
            state.loading = false
        },
        clearResults(state) {
            state.results = []
<<<<<<< HEAD
        },
        addRecentSearch(state, action) {
            const query = action.payload.trim();
            if (query) {
                state.recentSearches = [query, ...state.recentSearches.filter(q => q !== query)].slice(0, 5);
                localStorage.setItem('recentSearches', JSON.stringify(state.recentSearches));
            }
        },
        removeRecentSearch(state, action) {
            state.recentSearches = state.recentSearches.filter(q => q !== action.payload);
            localStorage.setItem('recentSearches', JSON.stringify(state.recentSearches));
        },
        clearRecentSearches(state) {
            state.recentSearches = [];
            localStorage.removeItem('recentSearches');
=======
>>>>>>> d52f16b2d67d4f1ce8208ddcbbe38e691ca6ded3
        }
    }
})


export const {
    setQuery,
    setActiveTabs,
    setError,
    setLoading,
    setResults,
<<<<<<< HEAD
    appendResults,
    clearResults,
    addRecentSearch,
    removeRecentSearch,
    clearRecentSearches
=======
    clearResults
>>>>>>> d52f16b2d67d4f1ce8208ddcbbe38e691ca6ded3
} = searchSlice.actions


export default searchSlice.reducer;