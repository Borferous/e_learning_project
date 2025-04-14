import './App.css';
import { BrowserRouter as Router, Route, Routes, Navigate, useNavigate } from 'react-router-dom';
import { LoginPage } from './pages/login';
import { UserCreatePage } from './pages/create';
import { About } from './pages/About';

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
import { ErrorPage } from './pages/error';
import { CourseManage } from './pages/admin/coursemanage';
import SubjectManage from './pages/admin/subject_manage';
import AssessmentSubmissions from './pages/admin/assessment_submissions';
import { SharedAssessmentSubmissions } from './pages/shared/assessment_submissions';
import { SharedEvents } from './pages/shared/events';

import SubjectPage from './pages/subject_page';

import '@mantine/core/styles.css'
import '@mantine/notifications/styles.css';

import { MantineProvider } from '@mantine/core';
import { Notifications } from '@mantine/notifications';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ProfileProvider } from './contexts/ProfileContext';
import { SharedSubjectManage } from './pages/shared/subject_manage';

import { UserRole } from './types';
import { Sidebar } from './components/sidebar';
import React from 'react';

const queryClient = new QueryClient()

function App() {
  const TeacherRoute = ({ element: Element }: { element: JSX.Element }) => {
    const teacherData = localStorage.getItem('teacherData');
    const navigate = useNavigate();
    
    React.useEffect(() => {
      if (!teacherData) {
        navigate('/login', { replace: true });
        return;
      }

      const teacher = JSON.parse(teacherData);
      if (teacher.user_role !== 'teacher') {
        navigate('/error-page', { replace: true });
      }
    }, [teacherData, navigate]);

    if (!teacherData) return null;
    const teacher = JSON.parse(teacherData);

    return (
      <div className="flex min-h-screen">
        <Sidebar role={UserRole.Teacher} />
        <div className="flex-1 bg-gray-50">
          {React.cloneElement(Element, { currentUser: teacher })}
        </div>
      </div>
    );
  };

  return (
    <ProfileProvider>
      <MantineProvider>
        <Notifications position='top-right' autoClose={3000} limit={3} />
        <QueryClientProvider client={queryClient}>
          <Router>
            <Routes>
              <Route path="/" element={<HomePage/>}/>
              <Route path="/login" element={<LoginPage/>}/>
              <Route path='/usercreate' element={<UserCreatePage/>}/>
              <Route path='/homepage' element={<HomePage />}/>
              <Route path='/instructorcreatecourse' element={<InstructorCreateCourse />}/>
              <Route path='/admin/usermanage' element={<ManageUsers />}/>
              <Route path='/admin/hostevents' element={<HostEvents />}/>
              <Route path='/admin/coursemanage' element={<CourseManage />}/>
              <Route path='/admin/subjectmanage' element={<SubjectManage />}/>
              <Route path='/admin/assessment-submissions' element={<AssessmentSubmissions />}/> 
              <Route path='/courselist' element={<CourseListPage />}/>
              <Route path='/courseoverview/:majorId' element={<CourseOverview />}/>
              <Route path='/payment-information/:majorId' element={<PaymentInformation />}/>
              <Route path='/terms-and-conditions' element={<TermsAndCondition />}/>
              <Route path='/subjectlist' element={<SubjectListPage />}/>
              <Route path='/subjectpage' element={<SubjectPage />}/>
              <Route path='/events' element={<EventsPage />}/>
              <Route path='/event/:eventId' element={<EventLivePage />}/>
              <Route path='/error-page' element={<ErrorPage />}/>
              <Route path='/profile' element={<ProfilePage />}/>
              <Route path='/about' element={<About />}/>
              <Route 
                path="/shared-events" 
                element={
                  <TeacherRoute 
                    element={<SharedEvents currentUser={JSON.parse(localStorage.getItem('teacherData') || '{}')} />} 
                  />
                } 
              />
              <Route 
                path="/assessment-submissions" 
                element={
                  <TeacherRoute 
                    element={<SharedAssessmentSubmissions currentUser={JSON.parse(localStorage.getItem('teacherData') || '{}')} />} 
                  />
                } 
              />
              <Route 
                path="/subjects" 
                element={
                  <TeacherRoute 
                    element={<SharedSubjectManage currentUser={JSON.parse(localStorage.getItem('teacherData') || '{}')} />} 
                  />
                } 
              />
            </Routes>
          </Router>
        </QueryClientProvider>
      </MantineProvider>
    </ProfileProvider>
  );
}

export default App;
