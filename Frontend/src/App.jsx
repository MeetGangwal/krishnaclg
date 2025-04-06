import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Suspense, lazy } from "react";
import AuditionVideos from "./components/Director/AuditionVideos";
import AdminPanel from "./components/AdminPanel";//added for admin panel

// Lazy load pages
const Login = lazy(() => import("./components/Auth/Login"));
const SignUp = lazy(() => import("./components/Auth/SignUp"));
const Home = lazy(() => import("./components/Home"));
const Jobs = lazy(() => import("./components/Actor/Jobs"));
const News = lazy(() => import("./components/Actor/News"));
const Profile = lazy(() => import("./components/Actor/Profile"));
const JobDescription = lazy(() => import("./components/Actor/JobDescripion"));
const Browse = lazy(() => import("./components/Actor/Browse"));
const Companies = lazy(() => import("./components/Director/Companies"));
const CompanySetup = lazy(() => import("./components/Director/CompanySetup"));
const AdminJobs = lazy(() => import("./components/Director/AdminJobs"));
const PostJob = lazy(() => import("./components/Director/PostJob"));
const Applicants = lazy(() => import("./components/Director/Applicants"));
const CompaniesCreate = lazy(() =>import("./components/Director/CompaniesCreate"));
const ProtectedRoute = lazy(() =>import("./components/Director/ProtectedRoute"));
const CDhome = lazy(() => import("./components/CDhome"));
const CDprofile = lazy(() => import("./components/Director/CDprofile"));
const PersonalProfile = lazy(() =>import("./components/Actor/PersonalProfile"));
const Talent = lazy(() => import("./components/Director/FindTalent"));
const Director = lazy(() => import("./components/Actor/FindDirector"));
const CDPersonalProfile = lazy(() =>import("./components/Director/CDPersonalProfile"));
const EmailCode = lazy(() => import("./components/Auth/EmailCode"));
const LISTACTOR = lazy(() => import("./components/Actor/ActorList"));
const MAINPAGE = lazy(() => import("./components/Shared/LandingPage"));
const DirectorJobs = lazy(() => import("./components/Actor/DirectorJob"));//added for view personal director jobs



const appRouter = createBrowserRouter([
  { path: "/", element: <MAINPAGE /> },
  { path: "/Home", element: <Home /> },
  { path: "/login", element: <Login /> },
  { path: "/signup", element: <SignUp /> },
  { path: "/jobs", element: <Jobs /> },
  { path: "/description/:id", element: <JobDescription /> },
  { path: "/news", element: <News /> },
  { path: "/browse", element: <Browse /> },
  { path: "/director-jobs/:id", element: <DirectorJobs /> },//added for view personal director jobs
  { path: "/profile/", element: <Profile /> },
  { path: "/Director", element: <Director /> },
  { path: "/Director/profile/:id", element: <CDPersonalProfile /> },
  { path: "/otp", element: <EmailCode /> },
  // talents on actors page
  { path: "/Actors", element: <LISTACTOR /> },

  // adminpanel
  {
    path: "/adminpanel",
    element: (
      <ProtectedRoute role="Admin">
        {" "}
        {/* Ensure role-based protection */}
        <AdminPanel />
      </ProtectedRoute>
    ),
  },
  // Admin Routes
  {
    path: "/admin",
    element: (
      <ProtectedRoute>
        <CDhome />
      </ProtectedRoute>
    ),
  },
  {
    path: "/actor/profile/:id",
    element: (
      // <ProtectedRoute>
      <PersonalProfile />
      // </ProtectedRoute>
    ),
  },

  {
    path: "/admin/companies",
    element: (
      <ProtectedRoute>
        <Companies />
      </ProtectedRoute>
    ),
  },
  {
    path: "/admin/companies/create",
    element: (
      <ProtectedRoute>
        <CompaniesCreate />
      </ProtectedRoute>
    ),
  },
  {
    path: "/admin/companies/:id",
    element: (
      <ProtectedRoute>
        <CompanySetup />
      </ProtectedRoute>
    ),
  },
  {
    path: "/admin/jobs",
    element: (
      <ProtectedRoute>
        <AdminJobs />
      </ProtectedRoute>
    ),
  },
  {
    path: "/admin/jobs/create/:id?",
    element: (
      <ProtectedRoute>
        <PostJob />
      </ProtectedRoute>
    ),
  },
  {
    path: "/admin/jobs/:id/applicants",
    element: (
      <ProtectedRoute>
        <Applicants />
      </ProtectedRoute>
    ),
  },
  {
    path: "/admin/CDprofile/:id",
    element: (
      <ProtectedRoute>
        <CDprofile />
      </ProtectedRoute>
    ),
  },
  {
    path: "/admin/Talent",
    element: (
      <ProtectedRoute>
        <Talent />
      </ProtectedRoute>
    ),
  },
  {
    path: `/Director/auditions/:JobId`,
    element: (
      <ProtectedRoute>
        <AuditionVideos />
      </ProtectedRoute>
    ),
  },
]);

function App() {
  return (
    <Suspense
      fallback={
        <div className="flex justify-center items-center h-screen">
          Loading...
        </div>
      }
    >
      <RouterProvider router={appRouter} />
    </Suspense>
  );
}

export default App;
