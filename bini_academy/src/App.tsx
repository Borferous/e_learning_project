import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { LoginPage } from './pages/login';
import '@mantine/core/styles.css'

import { MantineProvider } from '@mantine/core';

function App() {
  return (
    <>
      <MantineProvider>
        <Router>
          <Routes>
            <Route path="/" element={<LoginPage/>} />
            {/* Add more routes here */}
          </Routes>
        </Router>
      </MantineProvider>
    </>
  );
}

export default App;
