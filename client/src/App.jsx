import { Routes , Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import LoginRegister from './pages/LoginRegister';
import About from './pages/about';
import PhotoDetails from './pages/PhotoDetail';
import Gallery from './pages/Gallery';
import './index.css'





function App(){
  return (
    <>
      <Navbar/>
      <main className='mainSection'>
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/gallery" element={<Gallery/>} />
          <Route path="/about" element={<About/>} />
          <Route path="/photos/:id" element={<PhotoDetails/>} />
          <Route path="/login" element={<LoginRegister/>} />
          <Route path="*" element={ <h1>Page Not Found</h1> } />
        </Routes>
      </main>
    </>
  )

}

export default App;
