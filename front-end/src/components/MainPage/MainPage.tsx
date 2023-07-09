import React, { useRef } from "react";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";
import Jobs from "../Jobs/Jobs";
import DetailedJob from "../DetailedJob/DetailedJob";
import { useSelector } from "react-redux";
import FormApplyJob from "../FormApplyJob/FormApplyJob";

const MainPage = (): React.JSX.Element => {
  const currentJob = useSelector((state: any) => state.app.currentJob);
  const screenWidth = useSelector((state: any) => state.app.screenWidth);

  const FormApplyVision = useSelector(
    (state: any) => state.app.FormApplyVision
  );

  const divRefDetailedJob = useRef<HTMLDivElement>(null);

  return (
    <div className={`flex flex-col w-screen min-h-screen bg-green-100`}>
      <Navbar />
      <div className={`flex flex-grow w-11/12 mx-auto`}>
        {currentJob.name && screenWidth <= 640 ? null : <Jobs />}
        {FormApplyVision && screenWidth <= 640 ? null : (
          <DetailedJob divRefDetailedJob={divRefDetailedJob} />
        )}
        <FormApplyJob />
      </div>

      <Footer />
    </div>
  );
};

export default MainPage;
