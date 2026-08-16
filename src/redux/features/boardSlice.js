import { createSlice } from "@reduxjs/toolkit";

const defaultBoard = {
    id: 'default',
    name: 'Saved',
    items: []
};

// Migrate old collection to a 'Saved' board if necessary
const loadInitialState = () => {
    try {
        const storedBoards = localStorage.getItem('boards');
        if (storedBoards) {
            return JSON.parse(storedBoards);
        }
        
        // Handle migration from old collection structure
        const oldCollection = localStorage.getItem('collection');
        if (oldCollection) {
            const parsedOld = JSON.parse(oldCollection);
            if (Array.isArray(parsedOld) && parsedOld.length > 0) {
                return [{ ...defaultBoard, items: parsedOld }];
            }
        }
        
        return [defaultBoard];
    } catch {
        return [defaultBoard];
    }
};

const initialState = {
    boards: loadInitialState()
};

const saveToLocal = (boards) => {
    localStorage.setItem('boards', JSON.stringify(boards));
};

const boardSlice = createSlice({
    name: 'boards',
    initialState,
    reducers: {
        createBoard: (state, action) => {
            const newBoard = {
                id: Date.now().toString(),
                name: action.payload,
                items: []
            };
            state.boards.push(newBoard);
            saveToLocal(state.boards);
        },
        renameBoard: (state, action) => {
            const { id, name } = action.payload;
            const board = state.boards.find(b => b.id === id);
            if (board) {
                board.name = name;
                saveToLocal(state.boards);
            }
        },
        deleteBoard: (state, action) => {
            const id = action.payload;
            state.boards = state.boards.filter(b => b.id !== id);
            saveToLocal(state.boards);
        },
        saveToBoard: (state, action) => {
            const { boardId, item } = action.payload;
            const board = state.boards.find(b => b.id === boardId);
            if (board) {
                const alreadyExists = board.items.some(i => i.id === item.id);
                if (!alreadyExists) {
                    board.items.push(item);
                    saveToLocal(state.boards);
                }
            }
        },
        removeFromBoard: (state, action) => {
            const { boardId, itemId } = action.payload;
            const board = state.boards.find(b => b.id === boardId);
            if (board) {
                board.items = board.items.filter(i => i.id !== itemId);
                saveToLocal(state.boards);
            }
        }
    }
});

export const {
    createBoard,
    renameBoard,
    deleteBoard,
    saveToBoard,
    removeFromBoard
} = boardSlice.actions;

export default boardSlice.reducer;
