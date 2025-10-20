import { Navigate } from "react-router-dom";

// Layout components
import LayoutDefault from "../layout/LayoutDefault";
import LayoutAdmin from "../layout/layoutAdmin";

// Private route component
import PrivateRouter from "../Components/PrivateRoutes";

// User pages
import Home from "../pages/User/Home";
import Login from "../pages/User/Login";
import RegisterUser from "../pages/User/RegisterUser";
import Logout from "../pages/User/Logout";
import JobDetail from "../pages/User/JobDetail";
import Search from "../pages/User/Search";
import Company from "../pages/User/Company";
import CompanyDetail from "../pages/User/Company/CompanyDetail";
import InforUser from "../pages/User/InforUser";
import Templatecv from "../pages/User/CreatedCV/templatecv";
import CreateCV1 from "../pages/User/CreatedCV/cv1";
import CreateCV2 from "../pages/User/CreatedCV/cv2";
import CvListUser from "../pages/User/CvListUser";
import EditCvUser from "../pages/User/CvListUser/editCvUser";
import JobApply from "../pages/User/JobApply";

// Admin pages
import Dashboard from "../pages/Admin/Dashboard";
import InforCompany from "../pages/Admin/InfoCompany";
import JobManage from "../pages/Admin/JobManage";
import CreateJob from "../pages/Admin/JobManage/CreateJob";
import JobDetailAdmin from "../pages/Admin/JobManage/JobDetailAdmin";
import CvManage from "../pages/User/CvManage";
import CvDetail from "../pages/User/CvManage/CvDetail";
import Register from "../pages/Admin/Register";

export const routes = [
  {
    path: "/",
    element: <LayoutDefault />,
    children: [
      {
        index: true,
        element: <Home />,
      },

      {
        path: "login",
        element: <Login />,
      },
      {
        path: "registerUser",
        element: <RegisterUser />,
      },

      {
        path: "register",
        element: <Register />,
      },
      {
        path: "logout",
        element: <Logout />,
      },
      {
        path: "job/:id",
        element: <JobDetail />,
      },
      {
        path: "*",
        element: <Navigate to="/" />,
      },
      {
        path: "Search",
        element: <Search />,
      },
      {
        path: "company",
        element: <Company />,
      },
      {
        path: "company/:id",
        element: <CompanyDetail />,
      },
      {
        element: <PrivateRouter />,
        children: [
          {
            path: "/profile",
            element: <InforUser />,
          },
          //     {

          //         path:"/create-CV1",
          //         element: <CreateCV1/>

          // },
          {
            path: "/template",
            element: <Templatecv />,
          },
          {
            path: "/create-CV1",
            element: <CreateCV1 />,
          },
          {
            path: "/create-CV2",
            element: <CreateCV2 />,
          },
          {
            path: "/manager-Cv-user",
            element: <CvListUser />,
          },

          {
            path: "/editCvUser/:id",
            element: <EditCvUser />,
          },
          {
            path: "/job-apply",
            element: <JobApply />,
          },
        ],
      },
    ],
  },
  {
    element: <PrivateRouter />,
    children: [
      {
        element: <LayoutAdmin />,
        children: [
          {
            path: "admin",
            element: <Dashboard />,
          },
          {
            path: "info-company",
            element: <InforCompany />,
          },
          {
            path: "job-manage",
            element: <JobManage />,
          },
          {
            path: "create-job",
            element: <CreateJob />,
          },
          {
            path: "detail-job/:id",
            element: <JobDetailAdmin />,
          },
          {
            path: "cv-manage",
            element: <CvManage />,
          },
          {
            path: "detail-cv/:id",
            element: <CvDetail />,
          },
        ],
      },
    ],
  },
];
