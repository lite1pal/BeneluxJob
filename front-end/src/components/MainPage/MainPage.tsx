import React, { useRef } from "react";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";
import Jobs from "../Jobs/Jobs";
import DetailedJob from "../DetailedJob/DetailedJob";
import { useSelector } from "react-redux";

const MainPage = (): React.JSX.Element => {
  const currentJob = useSelector((state: any) => state.app.currentJob);
  const screenWidth = useSelector((state: any) => state.app.screenWidth);
  const divRefDetailedJob = useRef(null);

  return (
    <div className="flex flex-col w-screen min-h-screen bg-green-100">
      <Navbar />
      <div className="flex flex-grow w-11/12 mx-auto">
        {currentJob.name && screenWidth <= 640 ? null : (
          <Jobs divRefDetailedJob={divRefDetailedJob} />
        )}
        {currentJob.name ? (
          <DetailedJob divRefDetailedJob={divRefDetailedJob} />
        ) : null}
      </div>
      <Footer />
    </div>
  );
};

export default MainPage;
