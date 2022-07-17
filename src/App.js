import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Admin from './pages/AdminPage';
import MyPage from './pages/MyPage';
import Site from './pages/Site';

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/MyPage" element={<MyPage />} />
          <Route path="/site" element={<Site />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
