import { BrowserRouter, Route, Routes } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";

// theme
import ThemeProvider from "./theme";
// components
import { StyledChart } from "./components/chart";
import ScrollToTop from "./components/scroll-to-top";

// layouts
import DashboardLayout from "./layouts/dashboard";

import { AuthContextProvider } from "./context/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
import LoginPage from "./pages/LoginPage";
import DashboardAppPage from "./pages/DashboardAppPage";
import Conductores from "./pages/Conductores";
import Page404 from "./pages/Page404";
import AddStudents from "./pages/AddStudents";
import Students from "./pages/Students";
import Students1 from "./pages/Students1";
import UserAccount from "./pages/UserAccount";
import Publicaciones from "./pages/tablanueva";
import Subscription from "./pages/Subscription";
import Animals from "./pages/Animals";
import AddDrivers from "./pages/AddDrivers";
import AnimalsAdd from "./components/forms/students/AnimalsAdd";

// import Subscription from "./pages/Subscription";
// ----------------------------------------------------------------------

export default function App() {
  return (
    <HelmetProvider>
      <BrowserRouter>
        <ThemeProvider>
          <ScrollToTop />
          <StyledChart />
          <AuthContextProvider>
            <Routes>
              <Route path="/login" element={<LoginPage />} />
              <Route
                path="/"
                element={
                  <ProtectedRoute>
                    {" "}
                    <DashboardLayout />
                  </ProtectedRoute>
                }
              >
              
              <Route path="/" element={ <DashboardAppPage />} />
              <Route path="/dashboard" element={ <DashboardAppPage />} />
              <Route path="/students" element={ <Students />} />
              <Route path="/subscription" element={ <Subscription/>} />
              <Route path="/add-students" element={ <AddStudents />}/>
              <Route path="/account" element={ <UserAccount />} />
              <Route path="/animals" element={ <Animals />} />
              <Route path="/driver-routes" element={ <AddDrivers /> } />
              <Route path="/animal-add" element={ < AnimalsAdd />} />
             {/* <Route path="/" element={ <DashboardAppPage />} />
                <Route path="/dashboard" element={ <DashboardAppPage />}
                <Route path="/students" element={ <Students />} />
                <Route path="/drivers" element={ <Conductores />} />
                <Route path="/add-students" element={ <AddStudents />} />
                <Route path="/account" element={ <UserAccount />} /> */}   
                
              
              </Route>
              <Route path="*" element={<Page404 />} />
            </Routes>
          </AuthContextProvider>
        </ThemeProvider>
      </BrowserRouter>
    </HelmetProvider>
  );
}
