import { createSlice } from '@reduxjs/toolkit'

const searchSlice = createSlice({
    name: "search",
    initialState: {
        query: '',
        activeTab: 'photos',
        results: [],
        loading: false,
        error: null,
        recentSearches: JSON.parse(localStorage.getItem('recentSearches')) || []
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
        appendResults(state, action) {
            // Prevent duplicates
            const existingIds = new Set(state.results.map(i => i.id));
            const newItems = action.payload.filter(i => !existingIds.has(i.id));
            state.results = [...state.results, ...newItems];
            state.loading = false;
        },
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
        }
    }
})


export const {
    setQuery,
    setActiveTabs,
    setError,
    setLoading,
    setResults,
    appendResults,
    clearResults,
    addRecentSearch,
    removeRecentSearch,
    clearRecentSearches
} = searchSlice.actions


export default searchSlice.reducer;