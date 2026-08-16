import React from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setQuery } from '../redux/features/searchSlice';

const trendingTopics = [
    { title: 'Cyberpunk Cityscapes', image: 'https://images.unsplash.com/photo-1515630278258-407f66498911?w=500&q=80', query: 'cyberpunk city' },
    { title: 'Minimalist Architecture', image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=500&q=80', query: 'minimalist architecture' },
    { title: 'Vintage Photography', image: 'https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?w=500&q=80', query: 'vintage photography' },
    { title: 'Abstract Art', image: 'https://images.unsplash.com/photo-1541701494587-cb58502866ab?w=500&q=80', query: 'abstract art' },
];

const ExplorePage = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleTopicClick = (query) => {
        dispatch(setQuery(query));
        navigate('/');
    };

    return (
        <div className="min-h-screen bg-gray-950 text-white px-6 md:px-12 py-10">
            <h1 className="text-4xl font-bold mb-10 text-center tracking-tight">Explore the best of visual discovery</h1>
            
            <section className="mb-16 max-w-6xl mx-auto">
                <h2 className="text-2xl font-semibold mb-6">Trending right now</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {trendingTopics.map((topic, idx) => (
                        <div 
                            key={idx} 
                            onClick={() => handleTopicClick(topic.query)}
                            className="relative h-64 rounded-2xl overflow-hidden cursor-pointer group shadow-lg"
                        >
                            <img 
                                src={topic.image} 
                                alt={topic.title} 
                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex items-end p-6">
                                <h3 className="text-xl font-bold text-white group-hover:text-blue-200 transition-colors">{topic.title}</h3>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            <section className="max-w-6xl mx-auto text-center py-12 bg-gray-900 rounded-3xl">
                <h2 className="text-3xl font-bold mb-4">Looking for something specific?</h2>
                <p className="text-gray-400 mb-8 max-w-xl mx-auto">Search across millions of high-quality photos, videos, and GIFs from Unsplash, Pexels, and Giphy.</p>
                <div className="flex flex-wrap justify-center gap-4">
                    {['Nature', 'Technology', 'Cars', 'Animals', 'Space'].map(cat => (
                        <button 
                            key={cat}
                            onClick={() => handleTopicClick(cat)}
                            className="bg-gray-800 hover:bg-gray-700 px-6 py-3 rounded-full font-medium transition"
                        >
                            Explore {cat}
                        </button>
                    ))}
                </div>
            </section>
        </div>
    );
};

export default ExplorePage;
