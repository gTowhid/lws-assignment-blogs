import Navbar from './components/Navbar';
import Home from "./pages/Home";
import Post from "./pages/Post";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/posts/:postId' element={<Post />} />
      </Routes>
    </Router>
  );
}

export default App;
