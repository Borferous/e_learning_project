import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { LoginPage } from './pages/login';
import { UserCreatePage } from './pages/create';
// import { HomePage} from './pages/homepage';
import { HomePage } from './pages/homepage';
import { InstructorCreateCourse } from './pages/instructor/instructorcreatecourse';

import '@mantine/core/styles.css'

import { MantineProvider } from '@mantine/core';
import { Notifications } from '@mantine/notifications';
import '@mantine/notifications/styles.css';


function App() {
  return (
    <>
        <MantineProvider >
        <Notifications position='top-right' autoClose={1500} limit={3}/>
          <Router>
            <Routes>
              <Route path="/" element={<HomePage/>} /> 
              <Route path="/login" element={<LoginPage />} />
              <Route path='/usercreate' element={<UserCreatePage />}></Route>
              <Route path='/homepage' element={<HomePage />}></Route>
              <Route path='/instructorcreatecourse' element={<InstructorCreateCourse />}></Route>
            </Routes>
          </Router>
        </MantineProvider>      
    </>
  );
}

export default App;
