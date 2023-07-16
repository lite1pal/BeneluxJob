import React, { useRef } from "react";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";
import Jobs from "../Jobs/Jobs";
import DetailedJob from "../DetailedJob/DetailedJob";
import { useSelector } from "react-redux";
import FormApplyJob from "../FormApplyJob/FormApplyJob";
import JobFilters from "../JobFilters/JobFilters";
import ConfirmationDeleteJob from "../ConfirmationDeleteJob/ConfirmationDeleteJob";
import AfterApplying from "../AfterApplying/AfterApplying";

const MainPage = (): React.JSX.Element => {
  const currentJob = useSelector((state: any) => state.app.currentJob);
  const screenWidth = useSelector((state: any) => state.app.screenWidth);

  const FormApplyVision = useSelector(
    (state: any) => state.app.FormApplyVision
  );
  // const JobFiltersVision = useSelector(
  //   (state: any) => state.app.JobFiltersVision
  // );

  // const AfterApplyingVision = useSelector(
  //   (state: any) => state.app.AfterApplyingVision
  // );
  // const ConfirmationDeleteJobVision = useSelector(
  //   (state: any) => state.app.ConfirmationDeleteJobVision
  // );

  const divRefDetailedJob = useRef<HTMLDivElement>(null);

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
        <ConfirmationDeleteJob />
        <AfterApplying />
      </div>

      <Footer />
    </div>
  );
};

export default MainPage;
