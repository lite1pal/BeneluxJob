import SignIn from "./components/SignIn/SignIn";
import { Routes, Route, Navigate } from "react-router-dom";
import MainPage from "./components/MainPage/MainPage";
import AddJobPage from "./components/AddJobPage/AddJobPage";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setIsAuth, setScreenWidth } from "./redux/slices/appSlice";
import CompanyInfoPage from "./components/CompanyInfoPage/CompanyInfoPage";

export const App = () => {
  const isAuth = useSelector((state: any) => state.app.isAuth);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setScreenWidth(window.innerWidth));
    if (localStorage.getItem("sessionID")) {
      dispatch(setIsAuth(true));
    } else {
      dispatch(setIsAuth(false));
    }
  }, []);

  const handleResize = () => {
    dispatch(setScreenWidth(window.innerWidth));
  };

  // Attach event listener for window resize
  window.addEventListener("resize", handleResize);

  return (
    <Routes>
      <Route
        path="/"
        element={isAuth ? <MainPage /> : <Navigate to="/signin" />}
      />
      <Route path="/company_info" element={<CompanyInfoPage />} />
      <Route
        path="/add_job"
        element={isAuth ? <AddJobPage /> : <Navigate to="/signin" />}
      />
      <Route path="/signin" element={<SignIn />} />
    </Routes>
  );
};

export default App;
