import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import ProtectedRoute from './components/ProtectedRoute';
import GuestRoute from './components/GuestRoute';
import Home from './pages/Home';
import LoginRegister from './pages/LoginRegister';
import About from './pages/About';
import PhotoDetail from './pages/PhotoDetail';
import Gallery from './pages/Gallery';
import Upload from './pages/Upload';
import NotFound from './pages/NotFound';
import './index.css';

function App() {
  return (
    <div className='Application'>
      <Navbar />
      <main className='mainContents'>
        <Routes>
          {/* pages for everyone */}
          <Route path="/" element={<Home />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/about" element={<About />} />
          <Route path="/photos/:id" element={<PhotoDetail />} />

          {/* only for visitors who are not logged in */}
          <Route path="/login" element={<GuestRoute><LoginRegister /></GuestRoute>} />
          <Route path="/register" element={<GuestRoute><LoginRegister /></GuestRoute>} />

          {/* only for logged in users */}
          <Route path="/upload" element={<ProtectedRoute><Upload /></ProtectedRoute>} />

          {/* any other url */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
