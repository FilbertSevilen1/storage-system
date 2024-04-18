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
import ListPinjaman from './pages/Pinjaman/List/index.jsx';
import PinjamanSaya from './pages/Pinjaman/PinjamanSaya/index.jsx';
import PeralatanDetail from './pages/Peralatan/Detail/index.jsx';
import CreatePinjaman from './pages/Pinjaman/Create/index.jsx';
import DetailPinjaman from './pages/Pinjaman/Details/index.jsx';
import Merek from './pages/Merek/index.jsx';
import LaporanKerusakan from './pages/LaporanKerusakan/index.jsx';
import BuatLaporan from './pages/LaporanKerusakan/create/index.jsx';
import LaporanKerusakanDetail from './pages/LaporanKerusakan/detail/index.jsx';
import PengajuanPeralatan from './pages/Peralatan/Request/index.jsx';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

function App() {
  const dispatch = useDispatch();

  useEffect(()=>{
    if(localStorage.getItem('ss_token')){
      dispatch({
        type: "USER_LOGIN",
        payload: JSON.parse(localStorage.getItem('ss_token')) ,
      });
    }
  },[])

  return (
    <BrowserRouter>
      <Navbar>

      </Navbar>
      <div className='pt-16 bg-gray-200'>
      <Routes>
        <Route path="/" element={<Login />}></Route>

        <Route path="/home" element={<Dashboard />}></Route>
        <Route path="/peralatan" element={<Peralatan />}></Route>
        <Route path="/peralatan/request" element={<PengajuanPeralatan />}></Route>
        <Route path="/peralatan/:id" element={<PeralatanDetail/>}></Route>
        <Route path="/kategori" element={<Kategori />}></Route>
        <Route path="/merek" element={<Merek />}></Route>

        <Route path="/buatpinjaman" element={<CreatePinjaman />}></Route>
        <Route path="/pinjaman/:id" element={<DetailPinjaman />}></Route>
        <Route path="/pinjaman" element={<ListPinjaman/>}></Route>
        <Route path="/pinjamansaya" element={<PinjamanSaya/>}></Route>

        <Route path="/laporan" element={<LaporanKerusakan/>}></Route>
        <Route path="/laporan/:id" element={<LaporanKerusakanDetail/>}></Route>
        <Route path="/buatlaporan" element={<BuatLaporan/>}></Route>

        <Route path="/user" element={<User />}></Route>
      </Routes>
      </div>
      
      <Footer>
        
      </Footer>
    </BrowserRouter>
  );
}

export default App;
