import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Header from './Components/Header';
import Home from './Routes/Home';
import Search from './Routes/Search';
import Tv from './Routes/Tv';
import { getPathnameFromURL } from './utils';

function App() {
  return (
    <BrowserRouter basename={getPathnameFromURL(process.env.PUBLIC_URL)}>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="movies/:id" element={<Home />} />
        <Route path="/tv" element={<Tv />} />
        <Route path="/tv/:id" element={<Tv />} />
        <Route path="/search" element={<Search />} />
        <Route path="/search/:id" element={<Search />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
