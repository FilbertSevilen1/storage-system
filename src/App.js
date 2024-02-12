import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from './pages';
import Navbar from './components/base/Navbar';
import Footer from './components/base/Footer';
import Login from './pages/Login/index.jsx';
import Peralatan from './pages/Peralatan/index.jsx';
import Kategori from './pages/Kategori/index.jsx';
import User from './pages/User/index.jsx';

function App() {
  return (
    <BrowserRouter>
      <Navbar>

      </Navbar>
      <div className='pt-16'>
      <Routes>
        <Route path="/" element={<Login />}></Route>

        <Route path="/home" element={<Dashboard />}></Route>
        <Route path="/peralatan" element={<Peralatan />}></Route>
        <Route path="/kategori" element={<Kategori />}></Route>

        <Route path="/user" element={<User />}></Route>
      </Routes>
      </div>
      
      <Footer>
        
      </Footer>
    </BrowserRouter>
  );
}

export default App;
