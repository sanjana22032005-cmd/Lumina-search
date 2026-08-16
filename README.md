# Lumina Search

A modern, **Pinterest-inspired visual discovery platform** built with **React + Vite + Redux Toolkit**. Lumina Search allows users to endlessly explore **Photos, Videos, and GIFs** from multiple APIs, curate personal boards, and deep-dive into media with a rich, premium aesthetic.

**🌟 Live Demo:** [https://lumina-search.vercel.app/](https://lumina-search.vercel.app/)

---

## ✨ Features

- **Pinterest-Style Masonry Grid**: Endless, aesthetic browsing of responsive media cards.
- **Unified Media Search**: Seamlessly search across Photos (Unsplash), Videos (Pexels), and GIFs (Giphy).
- **Infinite Discovery**: "More Like This" endless feeds generated automatically based on media keywords.
- **Custom Boards**: Create, rename, and manage multiple boards to categorize your saved media.
- **Dedicated Media Detail Pages**: Share, Download, Like, and Save media in a focused, deep-linked view.
- **Interactive UI**: Hover states, micro-animations, glassmorphism, and responsive design (Tailwind CSS).
- **Persistent State**: Redux Toolkit integrated with Local Storage to keep your likes and boards across sessions.
- **Dark/Light Mode Ready**: Automatic theme adaptation based on system preferences.

---

## 🛠️ Tech Stack

- **Frontend**: React.js, Vite
- **State Management**: Redux Toolkit, React Redux
- **Routing**: React Router DOM
- **Data Fetching**: Axios
- **Styling**: Tailwind CSS
- **Notifications**: React Toastify
- **APIs**: Unsplash (Photos), Pexels (Videos), Giphy (GIFs)

---

## 📁 Project Structure

```text
src
│
├── api
│   └── mediaApi.js               # API configurations and fetch logic
│
├── components
│   ├── CategoryNav.jsx           # Tab and category navigation
│   ├── InfiniteScrollObserver.jsx# Logic for endless scrolling
│   ├── MasonryGrid.jsx           # Pinterest-style grid layout
│   ├── Navbar.jsx                # Responsive top navigation
│   ├── PinCard.jsx               # Individual media display card
│   ├── RelatedMediaGrid.jsx      # 'More Like This' grid
│   ├── SaveToBoardModal.jsx      # Board selection modal
│   ├── SearchBar.jsx             # Global search input
│   ├── SkeletonCard.jsx          # Loading placeholders
│   └── Tabs.jsx                  # Media type switcher
│
├── pages
│   ├── BoardDetailPage.jsx       # View and manage a specific board
│   ├── BoardsPage.jsx            # List of all user boards
│   ├── ExplorePage.jsx           # Discovery entrypoint
│   ├── HomePage.jsx              # Main infinite feed
│   └── MediaDetailPage.jsx       # Isolated view for a single media item
│
├── redux
│   ├── store.js                  # Redux store configuration
│   └── features
│       ├── boardSlice.js         # Board & saved media state
│       ├── searchSlice.js        # Search queries and results state
│       └── userSlice.js          # User interactions (e.g., Likes) state
│
├── App.jsx                       # Application router
├── main.jsx                      # React entrypoint
└── index.css                     # Global styles & Tailwind directives
```

---

## 🚀 Installation

### 1. Clone the repository

```bash
git clone https://github.com/sanjana22032005-cmd/Media-Search-Application.git
```

### 2. Navigate to the project directory

```bash
cd Media-Search-Application
```

### 3. Install dependencies

```bash
npm install
```

---

## 🔑 Environment Variables

Create a `.env` file in the project root and add your API keys:

```env
VITE_UNSPLASH_KEY=YOUR_UNSPLASH_API_KEY
VITE_PEXELS_KEY=YOUR_PEXELS_API_KEY
VITE_GIPHY_KEY=YOUR_GIPHY_API_KEY
```

---

## 💻 Running the Application

Start the development server:

```bash
npm run dev
```

Open your browser and visit `http://localhost:5173`

---

## 👤 Author

**Sanjana Kumari**

Third-year B.Tech Computer Science and Engineering student at IIIT Guwahati with an interest in Full Stack Development, Data Structures & Algorithms, and building scalable web applications. Passionate about learning modern technologies and developing impactful software projects.

- **GitHub**: [sanjana22032005-cmd](https://github.com/sanjana22032005-cmd)
- **LinkedIn**: [Sanjana Kumari](https://www.linkedin.com/in/sanjana-kumari-5585b4340/)

---

## 📄 License

This project is developed for educational and learning purposes.
