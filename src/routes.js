import { Navigate, useRoutes } from 'react-router-dom';
import DashboardLayout from './layouts/dashboard';
// import SimpleLayout from './layouts/simple';
// import BlogPage from './pages/BlogPage';
// import UserPage from './pages/UserPage';
// import LoginPage from './pages/LoginPage';
// import Page404 from './pages/Page404';
// import ProductsPage from './pages/ProductsPage';
// import DashboardAppPage from './pages/DashboardAppPage';
// import DashboardLayoutUser from './layouts/dashboard/nav/DashboardLayoutUser';
// import DashboardAppPageUser from './pages/DashboardAppPageUser';
import HomePage from "./components/HomePage";
// import ProfessorForm from "./components/ProfessorForm";
// import ListProfessors from "./components/ListProfessors";
import RateProfessor from "./components/RateProfessor";
import ListRateProfessor from "./components/ListRateProfessor";
// import ListRateUniversity from "./components/ListRateUniversity";
// import ProfessorList from "./components/ProfessorList";
// import UniversityList from "./components/UniversityList";
// import ListUniversities from "./components/ListUniversities";
// import ListDepartments from "./components/ListDepartments";
// import DetailsUniversity from "./components/Universities/DetailsUniversity";
// import DetailsUni from "./components/Universities/DetailsUni";
// import CreateUniversity from './components/Universities/CreateUniversity';
// import DetailsDepartament from "./components/Departaments/DetailsDepartament";
// import CreateDepartament from './components/Departaments/CreateDepartment';
// import DepartmentByUniversity from "./components/Departaments/DepartmentByUniversity";
// import DepartmentByUniversityUser from "./components/Departaments/DepartmentByUniversityUser";
// import DepartmentByUniversityVisitor from "./components/Departaments/DepartmentByUniversityVisitor";
import DetailsCourse from "./components/Courses/DetailsCourse";
import CreateCourse from './components/Courses/CreateCourse';
import CourseByDepartment from "./components/Courses/CourseByDepartment";
import CourseByDepartmentVisitor from "./components/Courses/CourseByDepartmentVisitor";
// import ListUsers from "./components/Users/ListUsers";
import DetailsProfessor from "./components/Professors/DetailsProfessor";
import CreateProfessor from "./components/Professors/CreateProfessor"
// import CreateAdmin from "./components/admin/CreateAdmin"
import DetailsProfessorUser from "./components/Professors/DetailsProfessorUser";
import DetProfessorUser from "./components/Professors/DetProfessorUser";
// import DetailsUniversityUser from "./components/Universities/DetailsUniversityUser";
// import DetailsUniversityVisitor from "./components/Universities/DetailsUniversityVisitor";
// import DetailsUniUser from "./components/Universities/DetailsUniUser";
// import DetailsUniVisitor from "./components/Universities/DetailsUniVisitor";
// import UserProfile from "./components/Users/UserProfile";
// import Login from "./components/Log in & Sign up/Login";
// import Signup from "./components/Log in & Sign up/Signup";
// import CreateNews from "./components/News/CreateNews";
// import ListAllNews from "./components/News/ListAllNews";
// import ListAllNewsAdmin from "./components/News/ListAllNewsAdmin";
// import GetNewsById from "./components/News/GetNewsById";
// import EditNews from "./components/News/EditNews";
import GetOverallRatingProfessor from "./components/Professors/GetOverallRatingProfessor";
import CreateRateProfessor from "./components/RateProfessor/CreateRateProfessor";
// import ListAdmins from './components/admin/ListAdmins';
// import AdminProfile from './components/admin/AdminProfile';


export default function Router() {

  const token = localStorage.getItem('token');
  const privateRoute = (path, element) => {
    return token ? { path, element } : { element: <Navigate to="/login" /> };
  };

  const routes = useRoutes([
    {
      path: '/dashboard',
      element: <DashboardLayout />,
      children: [
        { element: <Navigate to="/dashboard/app" />, index: true },
        // { path: 'adminProfile', element: <AdminProfile /> },
        // privateRoute('app', <DashboardAppPage />),
        // privateRoute('user', <ListUsers />),
        // privateRoute('admin', <ListAdmins />),
        // privateRoute('universities', <DetailsUniversity />),
        // { path: 'createUniversity', element: <CreateUniversity /> },
        // { path: 'departments', element: <DetailsDepartament/> },
        // { path: 'createDepartment', element: <CreateDepartament /> },
        { path: 'courses', element: <DetailsCourse/> },
        { path: 'createCourse', element: <CreateCourse /> },
        { path: 'professors', element: <DetailsProfessor /> },
        { path: 'createProfessor', element: <CreateProfessor /> },
        // { path: 'createAdmin', element: <CreateAdmin /> },
        // { path: 'products', element: <ProductsPage /> },
        // { path: 'blog', element: <BlogPage /> },
        // { path: 'universities/depUni/:universityId', element: <DepartmentByUniversity /> },
        { path: 'departments/courseDep/:departmentId', element: <CourseByDepartment /> },
        // { path: 'universities/detailsUni/:universityId', element: <DetailsUni /> },
        { path: 'professors/listRateProfessorD/:professorId', element: <ListRateProfessor /> },
        // { path: 'news', element: <ListAllNewsAdmin /> },
        // { path: 'createNews', element: <CreateNews /> },
        // { path: 'news/editNews/:id', element: <EditNews /> },
      ],
    },
    {
      path: '/dashboardUser',
      // element: <DashboardLayoutUser />,
      children: [
        { element: <Navigate to="/dashboardUser/appUser" />, index: true },
        // { path: 'appUser', element: <DashboardAppPageUser /> },
        // { path: 'professorsUser', element: <DetailsProfessorUser /> },
        { path: 'professorsUser/listRateProfessorS/:professorId', element: <ListRateProfessor /> },
        // { path: 'professorsUser/detProfessorUser/:professorId', element: <DetProfessorUser /> },
        // { path: 'universitiesUser', element: <DetailsUniversityUser /> },
        // { path: 'universitiesUser/depUniUser/:universityId', element: <DepartmentByUniversityUser /> },
        // { path: 'universitiesUser/detailsUniUser/:universityId', element: <DetailsUniUser /> },
        { path: 'departmentsUser/courseDepUser/:departmentId', element: <CourseByDepartment /> },
        { path: 'professorsUser/createRate/:professorId', element: <CreateRateProfessor /> },
        // { path: 'userProfile', element: <UserProfile /> },

      ],
    },

    {
      path: '/home',
      element: <HomePage />,
    },
    // {
    //   path: '/login', 
    //   element: <Login />,
    // },
    // {
    //   path: '/signup', 
    //   element: <Signup />,
    // },
    // {
    //   path: '/allNews',
    //   element: <ListAllNews />,
    // },
    // {
    //   path: '/news/:id',
    //   element: <GetNewsById />,
    // },
    // {
    //   path: '/list', 
    //   element: <ListProfessors />,
    // },
    {
      path: '/rate-professor', 
      element: <RateProfessor />,
    },
    {
      path: '/listRateProfessor/:professorId', 
      element: <ListRateProfessor />,
    },
    // {
    //   path: '/listRateUniversity/:universityId', 
    //   element: <ListRateUniversity />,
    // },
    // {
    //   path: '/professorList', 
    //   element: <ProfessorList />,
    // },
    {
      path: '/getOverallRatingProfessor/:professorId', 
      element: <GetOverallRatingProfessor />,
    },
    // {
    //   path: '/universityList', 
    //   element: <UniversityList />,
    // },
    // {
    //   path: '/listUniversities', 
    //   element: <ListUniversities />,
    // },
    // {
    //   path: '/list-departments', 
    //   element: <ListDepartments />,
    // },
    // {
    //   path: '/404', 
    //   element: <Page404 />,
    // },
    {
      path: '/', 
      element: <Navigate to="/home" />,
    },
    {
      path: '*', 
      element: <Navigate to="/404" replace />,
    },
    // {
    //   path: '/detailsUni', 
    //   element: <DetailsUniversity />,
    // },
    // {
    //   path: '/createUni', 
    //   element: <CreateUniversity />,
    // },
    // {
    //   path: '/detailsUni', 
    //   element: <DetailsDepartament />,
    // },
    // {
    //   path: '/createDep', 
    //   element: <CreateDepartament />,
    // },
    {
      path: '/detailsProf', 
      element: <DetailsProfessor />,
    },
    // {
    //   path: '/DetailsUniversityVisitor', 
    //   element: <DetailsUniversityVisitor />,
    // },//DetailsUniVisitor
    // {
    //   path: '/detailsUniVisitor/:universityId', 
    //   element: <DetailsUniVisitor />,
    // },
    // {
    //   path: '/departmentByUniversityVisitor/:universityId', 
    //   element: <DepartmentByUniversityVisitor />,
    // },
    // {
    //   path: '/coursesByDepartmentVisitor/:departmentId', 
    //   element: <CourseByDepartmentVisitor />,
    // },

  ]);

  return routes;
}
