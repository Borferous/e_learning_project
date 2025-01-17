import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { PageA } from './pages/page_a';
import { PageB } from './pages/page_b';
import { PageC } from './pages/page_c';

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<PageA />} />
          <Route path="/pageb" element={<PageB />} />
          <Route path="/pagec" element={<PageC />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
