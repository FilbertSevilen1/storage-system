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
import Penalty from './pages/Penalty/index.jsx';
import MyPenalty from './pages/Penalty/MyPenalty/index.jsx';
import EditPinjaman from './pages/Pinjaman/Edit/index.jsx';

function App() {
  const dispatch = useDispatch();

  useEffect(()=>{
    if(localStorage.getItem('ss_token')){
      const logindata = localStorage.getItem('ss_token');
      if(logindata){
        const {user, timestamp} = JSON.parse(logindata)
        const currentTime = new Date().getTime();
        if (currentTime - timestamp <= 24 * 60 * 60 * 1000) {
          console.log(user)
          dispatch({
            type: "USER_LOGIN",
            payload: user,
          });
        } else {
            localStorage.removeItem('ss_token'); // Remove expired data
        }
      }
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
        <Route path="/category" element={<Kategori />}></Route>
        <Route path="/brand" element={<Merek />}></Route>

        <Route path="/borrow/create" element={<CreatePinjaman />}></Route>
        <Route path="/borrow/:id" element={<DetailPinjaman />}></Route>
        <Route path="/borrow/edit/:id" element={<EditPinjaman/>}></Route>
        <Route path="/borrow" element={<ListPinjaman/>}></Route>
        <Route path="/myborrow" element={<PinjamanSaya/>}></Route>

        <Route path="/report" element={<LaporanKerusakan/>}></Route>
        <Route path="/report/:id" element={<LaporanKerusakanDetail/>}></Route>
        <Route path="/report/create" element={<BuatLaporan/>}></Route>

        <Route path="/penalty" element={<Penalty/>}></Route>
        <Route path="/penalty/mypenalty" element={<MyPenalty/>}></Route>

        <Route path="/user" element={<User />}></Route>
      </Routes>
      </div>
      
      <Footer>
        
      </Footer>
    </BrowserRouter>
  );
}

export default App;
