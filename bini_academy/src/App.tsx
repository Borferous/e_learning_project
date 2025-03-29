import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { LoginPage } from './pages/login';
import { UserCreatePage } from './pages/create';

// import { HomePage} from './pages/homepage';
import { HomePage } from './pages/homepage';
import { InstructorCreateCourse } from './pages/instructor/instructorcreatecourse';
import { ManageUsers } from './pages/admin/manageusers';
import { HostEvents } from './pages/admin/hostevents';
import '@mantine/core/styles.css'
import '@mantine/notifications/styles.css';

import { MantineProvider } from '@mantine/core';
import { Notifications } from '@mantine/notifications';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient()

function App() {
  return (
    <>
      <MantineProvider >
        <Notifications position='top-right' autoClose={1500} limit={3} />
        <QueryClientProvider client={queryClient}>
          <Router>
            <Routes>
              <Route path="/" element={<HomePage/>}/>
              <Route path="/login" element={<LoginPage/>}/>
              <Route path='/usercreate' element={<UserCreatePage/>}/>
              <Route path='/homepage' element={<HomePage />}/>
              <Route path='/instructorcreatecourse' element={<InstructorCreateCourse />}/>
              <Route path='/usermanage' element={<ManageUsers />}/>
              <Route path='/hostevents' element={<HostEvents />}/>
            </Routes>
          </Router>
        </QueryClientProvider>
      </MantineProvider>
    </>
  );
}

export default App;
