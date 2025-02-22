import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { LoginPage } from './pages/login';
import { UserCreatePage} from './pages/create';
// import { HomePage} from './pages/homepage';

import '@mantine/core/styles.css'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import { MantineProvider } from '@mantine/core';
import { MainTest } from './test/main';

export const queryClient = new QueryClient();

function App() {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <MantineProvider>
          <Router>
            <Routes>
              {/* <Route path="/" element={<HomePage/>} /> */}
              <Route path="/" element={<LoginPage/>} />
              <Route path='/test' element={<MainTest/>}></Route>
              <Route path='/usercreate' element={<UserCreatePage/>}></Route>
            </Routes>
          </Router>
        </MantineProvider>
      </QueryClientProvider>
    </>
  );
}

export default App;
