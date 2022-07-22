import './App.css';
import Navbar from './components/navbar'
import Banner from './components/banner'
import Trend from './components/Trend'
import Favourite from './components/favourite';
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path='/' element={<><Banner/><Trend/></>}/>
        <Route path="/favourites" element={<Favourite />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
