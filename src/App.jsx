import React, { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import { useSelector } from 'react-redux';
import HomePage from './pages/HomePage';
import BoardsPage from './pages/BoardsPage';
import BoardDetailPage from './pages/BoardDetailPage';
import ExplorePage from './pages/ExplorePage';
import MediaDetailPage from './pages/MediaDetailPage';
import Navbar from './components/Navbar';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const App = () => {
  const theme = useSelector(state => state.user.theme);

  useEffect(() => {
    console.log("VITE_UNSPLASH_KEY:", import.meta.env.VITE_UNSPLASH_KEY);
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  return (
    <div className="min-h-screen text-gray-900 bg-white dark:text-white dark:bg-gray-950 w-full font-sans transition-colors duration-300">
      <Navbar />
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/explore' element={<ExplorePage />} />
        <Route path='/collection' element={<BoardsPage />} />
        <Route path='/board/:id' element={<BoardDetailPage />} />
        <Route path='/pin/:id' element={<MediaDetailPage />} />
      </Routes>
      <ToastContainer theme={theme} />
    </div>
  );
};

export default App;
