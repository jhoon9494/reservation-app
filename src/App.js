import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Admin from './pages/AdminPage';
import Mypage from './pages/Mypage';
import Site from './pages/Site';
import About from './pages/About';
import Reservation from './pages/Reservation';
import FindAccount from './pages/FindAccount';
import ChangePassword from './pages/ChangePassword';
import Payment from './pages/Payment';
import Layout from './components/Layout';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/mypage" element={<Mypage />} />
          <Route path="/site" element={<Site />} />
          <Route path="/about" element={<About />} />
          <Route path="/reservation/" element={<Reservation />} />
          <Route path="/reservation/:roomID" element={<Reservation />} />
          <Route path="/findAccount" element={<FindAccount />} />
          <Route path="/payment" element={<Payment />} />
        </Route>
        <Route
          path="/changePassword/:email/:redisKey"
          element={<ChangePassword />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
