import React, { useEffect, useRef, useSyncExternalStore } from "react";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";
import Jobs from "../Jobs/Jobs";
import DetailedJob from "../DetailedJob/DetailedJob";
import { useDispatch, useSelector } from "react-redux";
import FormApplyJob from "../FormApplyJob/FormApplyJob";
import JobFilters from "../JobFilters/JobFilters";
import ConfirmationDeleteJob from "../ConfirmationDeleteJob/ConfirmationDeleteJob";
import AfterApplying from "../AfterApplying/AfterApplying";
import { setCurrentUser } from "../../redux/slices/appSlice";

const MainPage = (): React.JSX.Element => {
  const dispatch = useDispatch();
  const currentJob = useSelector((state: any) => state.app.currentJob);
  const screenWidth = useSelector((state: any) => state.app.screenWidth);
  const currentUser = useSelector((state: any) => state.app.currentUser);
  const apiUrl = useSelector((state: any) => state.app.apiUrl);
  console.log(currentUser);

  const FormApplyVision = useSelector(
    (state: any) => state.app.FormApplyVision
  );

  const divRefDetailedJob = useRef<HTMLDivElement>(null);

  // useEffect(() => {
  //   const getUser = async () => {
  //     const requestOptions = {
  //       method: "GET",
  //       headers: {
  //         Authorization: `Bearer ${localStorage.getItem(
  //           "sessionID"
  //         )} ${localStorage.getItem("email")}`,
  //       },
  //     };
  //     const response = await fetch(
  //       `${apiUrl}/users/${localStorage.getItem("id")}`,
  //       requestOptions
  //     );
  //     const parseRes = await response.json();
  //     if (response.ok) {
  //       dispatch(setCurrentUser(parseRes.result));
  //     }
  //   };
  //   getUser();
  // }, []);

  return (
    <div className={`flex flex-col w-screen min-h-screen bg-green-100`}>
      <Navbar />
      <div className={`flex flex-grow w-11/12 mx-auto transition duration-500`}>
        {currentJob.name && screenWidth <= 640 ? null : <Jobs />}
        {FormApplyVision && screenWidth <= 640 ? null : (
          <DetailedJob divRefDetailedJob={divRefDetailedJob} />
        )}
        <JobFilters />
        <FormApplyJob />
        {currentUser.admin && <ConfirmationDeleteJob />}
        <AfterApplying />
      </div>

      <Footer />
    </div>
  );
};

export default MainPage;
