import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { LoginPage } from './pages/login';
import { UserCreatePage } from './pages/create';
// import { HomePage} from './pages/homepage';
import { HomePage } from './pages/homepage';

import '@mantine/core/styles.css'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import { MantineProvider } from '@mantine/core';
import { Notifications } from '@mantine/notifications';
import '@mantine/notifications/styles.css';

export const queryClient = new QueryClient();

function App() {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <MantineProvider>
        <Notifications position='top-right' autoClose={1500} limit={3}/>
          <Router>
            <Routes>
              <Route path="/" element={<HomePage/>} /> 
              <Route path="/login" element={<LoginPage />} />
              <Route path='/usercreate' element={<UserCreatePage />}></Route>
            </Routes>
          </Router>
        </MantineProvider>
      </QueryClientProvider>
    </>
  );
}

export default App;
