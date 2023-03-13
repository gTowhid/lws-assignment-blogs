import Navbar from './components/Navbar';
import Home from './pages/Home';
import Post from './pages/Post';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
// import { useLayoutEffect } from 'react';

function App() {
  /* useLayoutEffect(() => {
    const storeScrollPosition = () => {
      sessionStorage.setItem('scrollPosition', window.pageYOffset);
    };

    const restoreScrollPosition = () => {
      const scrollPosition = sessionStorage.getItem('scrollPosition');
      if (scrollPosition) {
        window.scrollTo(0, parseInt(scrollPosition));
        sessionStorage.removeItem('scrollPosition');
      }
    };

    restoreScrollPosition();

    window.addEventListener('beforeunload', storeScrollPosition);
    return () => {
      window.removeEventListener('beforeunload', storeScrollPosition);
    };
  }, []); */

  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/posts/:postId" element={<Post />} />
      </Routes>
    </Router>
  );
}

export default App;
