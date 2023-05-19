import { Navigate, useRoutes } from 'react-router-dom';
 
// layouts
import DashboardLayout from './layouts/DashboardLayout';
import AuthLayout from './layouts/AuthLayout';

// Require Auth
import { RequireAuth } from './components/RequireAuth';
import NewJobList from './pages/agency/auth/NewJobList';
import DeclineJobs from './pages/agency/auth/DeclineJobs';
import ArchiveJobs from './pages/agency/auth/ArchiveJobs';
// pages
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import NotFound from './pages/Page404';
import Profile from './pages/admin/Profile';
import Home from './pages/front/Home';
import HeaderFooterLayout from './layouts/HeaderFooterLayout';
import AgencyLogin from './pages/agency/auth/AgencyLogin';
import AgencyRegister from './pages/agency/auth/AgencyRegister';
import AgencyDashboard from './pages/agency/auth/AgencyDashboard';
import EmployerLogin from './pages/employer/EmployerLogin';
import EmployerRegister from './pages/employer/EmployerRegister';
import EmployerDashboard from './pages/employer/EmployerDashboard';
import EmployerJobPosting from './pages/employer/EmployerJobPosting';
import EmployerDashboardLayout from './layouts/EmployerDashboardLayout';
import EmployerJobListing from './pages/employer/EmployerJobListing';
import ForgotPassword from './pages/employer/ForgotPassword';
import ProfileUpdate from './pages/employer/ProfileUpdate';
import ChangePassword from './pages/employer/ChangePassword';
import AgencyWelcomePage from './pages/agency/auth/AgencyWelcomePage';
import AgencyForgotPassword from './pages/agency/auth/AgencyForgotPassword';
import AgencyProfileUpdate from './pages/agency/auth/AgencyProfileUpdate';
import AgencyChangePassword from './pages/agency/auth/ChangePassword';
import AgencyList from './pages/employer/AgencyList';
import JobsList from './pages/agency/auth/JobsList';
import RecruiterLogin from './pages/recruiter/RecruiterLogin';
import RecruiterDashboard from './pages/recruiter/RecruiterDashboard';
import RecruiterDashboardLayout from './layouts/RecruiterDashboardLayout';
import RecruiterList from './pages/agency/auth/RecruiterList';
import WorkingonJobsPage from './pages/agency/auth/WorkingonJobsPage';
import CandidateForm from './pages/agency/auth/CandidateForm';
import RecruiterForgotPassword from './pages/recruiter/RecruiterForgotPassword';
import RecuiterChangePassword from './pages/recruiter/RecuiterChangePassword';
import RecruiterCandidateForm from './pages/recruiter/RecruiterCandidateForm';
import RecruiterCandidateChat from './pages/recruiter/RecruiterCandidateChat';
import CandidateChat from './pages/agency/auth/CandidateChat';
import JobListing from './pages/admin/JobListing';
import AdminLogin from './pages/admin/AdminLogin';
import AdminDashboardLayout from './layouts/AdminDashboardLayout';
import AdminAgencyList from "./pages/admin/AdminAgencyList";
import JobPosting from './pages/admin/JobPosting';
import AdminAgencyDetails from './pages/admin/AdminAgencyDetails';
import AdminEmployerList from './pages/admin/AdminEmployerList';
import AdminEmpDetails from './pages/admin/AdminEmpDetails';
import CreditsList from './pages/employer/CreditsList';
import CreditsListPage from './pages/admin/CreditsListPage';
export default function Router() {
  const user = localStorage.getItem("AUTH_USER");
  // console.log('user >>>>>>>>>>>>>> ', user);

  let conditonalRoutes = [
    {
      path: '/',
      element: <HeaderFooterLayout />,
      children: [
        { path: '/', element: <Home /> },
        { path: '404', element: <NotFound /> },
        { path: '*', element: <Navigate to="/" /> }
      ]
    },
    {
      path: '/auth',
      element: <AuthLayout />,
      children: [
        { path: 'login', element: <Login /> },
        { path: 'register', element: <Register /> },
        { path: '404', element: <NotFound /> },
        // { path: '*', element: <Navigate to="/auth/login" /> }
      ]
    },
    {
      path: '/agency',
      element: <AuthLayout />,
      children: [
        { path: 'login', element: <AgencyLogin /> },
        { path: 'register', element: <AgencyRegister /> },
        { path: 'forgot-password', element: <AgencyForgotPassword /> },
        { path: '404', element: <NotFound /> },
        // { path: '*', element: <Navigate to="/agency/login" /> }
      ]
    },
    {
      path: '/admin',
      element: <AuthLayout />,
      children: [
        { path: 'login', element: <AdminLogin /> },
       
        { path: '404', element: <NotFound /> },
        // { path: '*', element: <Navigate to="/agency/login" /> }
      ]
    },
    {
      path: '/employer',
      element: <AuthLayout />,
      children: [
        { path: 'login', element: <EmployerLogin /> },
        { path: 'register', element: <EmployerRegister /> },
        { path: '404', element: <NotFound /> },
        // { path: '*', element: <Navigate to="/employer/login" /> }
      ]
    },
    {
      path: '/recruiter',
      element: <AuthLayout />,
      children: [
        { path: 'login', element: <RecruiterLogin /> },
        { path: '404', element: <NotFound /> },
        { path: '*', element: <Navigate to="/recruiter/login" /> },
        { path: 'forgot-password', element: <RecruiterForgotPassword /> },

       
      ]
    },

    {
      path: '/forgot',
      element: <AuthLayout />,
      children: [
        { path: 'password', element: <ForgotPassword /> },
        { path: '404', element: <NotFound /> },
      ]
    },
    // { path: '*', element: <Navigate to="/" replace /> }
  ]

  if(user) {
    conditonalRoutes = [
      {
        path: '/',
        element: <HeaderFooterLayout />,
        children: [
          { path: '/', element: <RequireAuth><Home /></RequireAuth> },
          { path: '404', element: <RequireAuth><NotFound /></RequireAuth> },
          // { path: '*', element: <Navigate to="/" /> }
        ]
      },
      {
        path: '/admin',
        element: <AdminDashboardLayout />,
        children: [
         
          { path: 'agency', element: <RequireAuth><AdminAgencyList /></RequireAuth> },
          { path: 'job', element: <RequireAuth><JobListing /></RequireAuth> },
          { path: 'job-post', element: <RequireAuth><JobPosting /></RequireAuth> },
          { path: 'agency-details', element: <RequireAuth><AdminAgencyDetails /></RequireAuth> },
          { path: 'employer', element: <RequireAuth><AdminEmployerList /></RequireAuth> },
          { path: 'employer-details', element: <RequireAuth><AdminEmpDetails /></RequireAuth> },
          { path: 'credits', element: <RequireAuth><CreditsListPage /></RequireAuth> },
          // { path: '*', element: <Navigate to="/admin/dashboard" /> },
        ]
      },
      {
        path: '/agency',
        element: <DashboardLayout />,
        children: [
          { path: 'dashboard', element: <RequireAuth><AgencyDashboard /></RequireAuth>  },
          { path: 'profile', element: <RequireAuth><AgencyProfileUpdate /></RequireAuth>  },
          { path: 'joblist', element: <RequireAuth><JobsList /></RequireAuth>  },
          { path: 'working-on', element: <RequireAuth><WorkingonJobsPage /></RequireAuth>  },
          { path: 'submit-candidate', element: <RequireAuth><CandidateForm /></RequireAuth>  },

          { path: 'decline-jobs', element: <RequireAuth><DeclineJobs /></RequireAuth>  },
          { path: 'archive-jobs', element: <RequireAuth><ArchiveJobs /></RequireAuth>  },
          { path: 'new-jobs', element: <RequireAuth><NewJobList /></RequireAuth>  },
          { path: 'welcome', element: <RequireAuth><AgencyWelcomePage /></RequireAuth>  },
          { path: 'recruiter-list', element: <RequireAuth><RecruiterList /></RequireAuth>  },
          { path: 'candidate-chat', element: <RequireAuth><CandidateChat /></RequireAuth>  },

          { path: 'change-password', element: <RequireAuth><AgencyChangePassword /></RequireAuth>  },
          // { path: '*', element: <Navigate to="/agency/dashboard" /> },
        ]
      },
      {
        path: '/employer',
        element: <EmployerDashboardLayout />,
        children: [
          { path: 'dashboard', element: <RequireAuth><EmployerDashboard /></RequireAuth>  },
          { path: 'profile', element: <RequireAuth><ProfileUpdate /></RequireAuth>  },
          { path: 'agency-list', element: <RequireAuth><AgencyList /></RequireAuth>  },
          { path: 'job-posting', element: <RequireAuth><EmployerJobPosting /></RequireAuth>  },
          { path: 'jobs', element: <RequireAuth><EmployerJobListing /></RequireAuth>  },
          { path: 'change-password', element: <RequireAuth><ChangePassword /></RequireAuth>  },
          { path: 'credits', element: <RequireAuth><CreditsList /></RequireAuth>  },

          // { path: '*', element: <Navigate to="/employer/dashboard" /> },
        ]
      },

      {
        path: '/recruiter',
        element: <RecruiterDashboardLayout />,
        children: [
          { path: 'dashboard', element: <RequireAuth><RecruiterDashboard /></RequireAuth>  },
          { path: 'change-password', element: <RequireAuth><RecuiterChangePassword /></RequireAuth>  },
          { path: 'candidate-form', element: <RequireAuth><RecruiterCandidateForm /></RequireAuth>  },

          { path: 'candidate-chat', element: <RequireAuth><RecruiterCandidateChat /></RequireAuth>  },        ]
      },
      // { path: '*', element: <Navigate to="/" replace /> }
    ]
  }

  return useRoutes(conditonalRoutes);
}
