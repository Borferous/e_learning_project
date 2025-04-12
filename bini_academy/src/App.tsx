import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { LoginPage } from './pages/login';
import { UserCreatePage } from './pages/create';

import { HomePage } from './pages/homepage';
import { CourseListPage } from './pages/course_list_page';
import { CourseOverview } from './pages/course_overview';
import { InstructorCreateCourse } from './pages/instructor/instructorcreatecourse';
import { ManageUsers } from './pages/admin/manageusers';
import { HostEvents } from './pages/admin/hostevents';
import { PaymentInformation } from './pages/payment_information';
import { TermsAndCondition } from './pages/terms_and_conditions';
import { SubjectListPage } from './pages/subject_list_page';
import { EventsPage } from './pages/events_page';
import { EventLivePage } from './pages/event_live';
import { ProfilePage } from './pages/profile_page';

import SubjectPage from './pages/subject_page';

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
        <Notifications position='top-right' autoClose={3000} limit={3} />
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
              <Route path='/courselist' element={<CourseListPage />}/>
              <Route path='/courseoverview' element={<CourseOverview />}/>
              <Route path='/payment-information' element={<PaymentInformation />}/>
              <Route path='/terms-and-conditions' element={<TermsAndCondition />}/>
              <Route path='/subjectlist' element={<SubjectListPage />}/>
              <Route path='/subjectpage' element={<SubjectPage />}/>
              <Route path='/events' element={<EventsPage />}/>
              <Route path='/event/:eventId' element={<EventLivePage />}/>
              <Route path='/profile' element={<ProfilePage />}/>
            </Routes>
          </Router>
        </QueryClientProvider>
      </MantineProvider>
    </>
  );
}

export default App;
