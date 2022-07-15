import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
<<<<<<< HEAD
import MyPage from './pages/MyPage';
=======
import Site from './pages/Site';
>>>>>>> f98f6988b96507b70c0c3abdc6373c66a436d2bb

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
<<<<<<< HEAD
          <Route path="/MyPage" element={<MyPage />} />
=======
          <Route path="/site" element={<Site />} />
>>>>>>> f98f6988b96507b70c0c3abdc6373c66a436d2bb
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
