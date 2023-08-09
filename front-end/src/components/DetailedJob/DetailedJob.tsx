import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setCurrentJob,
  setFormApplyVision,
  setMainPageScrollVision,
} from "../../redux/slices/appSlice";
import { language } from "../Navbar/Navbar";

const DetailedJob = ({
  divRefDetailedJob,
}: {
  divRefDetailedJob: any;
}): React.JSX.Element => {
  const currentJob = useSelector((state: any) => state.app.currentJob);
  const dispatch = useDispatch();
  const scrollY = useSelector((state: any) => state.app.scrollY);
  const scrollYbefore = useSelector((state: any) => state.app.scrollYbefore);
  const screenWidth = useSelector((state: any) => state.app.screenWidth);
  const jobs = useSelector((state: any) => state.app.jobs);

  useEffect(() => {
    if (divRefDetailedJob.current !== null) {
      divRefDetailedJob.current.scrollTo(0, 0);
    }
  }, [currentJob]);

  return (
    <div
      className={`w-full lg:w-1/2 transition duration-700 ${
        currentJob.name
          ? "max-lg:flex lg:opacity-100"
          : "max-lg:hidden lg:opacity-0 lg:pointer-events-none"
      }`}
    >
      <div
        onMouseEnter={(e) => {
          e.preventDefault();
          dispatch(setMainPageScrollVision(false));
        }}
        onMouseLeave={() => dispatch(setMainPageScrollVision(true))}
        ref={divRefDetailedJob}
        className={`p-8 mx-1 lg:mx-4 my-2 flex flex-col space-y-4 lg:fixed ${
          scrollY < 150 && jobs.length > 2 ? "lg:relative lg:w-full" : ""
        } lg:max-h-screen transition-all duration-300 ease-in-out top-0 bottom-1 overflow-scroll rounded-lg shadow-[0px_5px_7px_0px_#4a5568] bg-white`}
      >
        <div className="flex w-full justify-between">
          <div className="font-medium text-xl transition items-center">
            {currentJob.name}
          </div>
          <div
            onClick={() => {
              dispatch(setCurrentJob({}));
              screenWidth <= 640 ? window.scrollTo(0, scrollYbefore) : null;
            }}
            className="hover:opacity-50"
          >
            <i className="fa-solid fa-xmark fa-2xl"></i>
          </div>
        </div>
        <div className="flex flex-col space-y-4">
          <div className="font-extrabold">
            {currentJob.salary}$ / {language === "uk" ? "год" : "hour"}
          </div>
          {/* <div className="flex space-x-1 text-gray-700 items-center">
            <i className="fa-solid fa-location-dot"></i>
            <div>Брюссель</div>
          </div> */}
          <div className="w-full flex flex-col lg:flex-row flex-grow space-x-5 text-sm text-gray-500">
            <div className="p-1 flex space-x-1 items-center opacity-0 pointer-events-none">
              <i className="fa-solid fa-fire fa-xs"></i>
              {/* <div>{language === "uk" ? "Гаряча" : "Hot"}</div> */}
            </div>

            {currentJob.withLivingHouse && (
              <div className="p-1 flex space-x-1 items-center">
                <i className="fa-solid fa-house fa-sm"></i>
                <div>
                  {language === "uk" ? "З житлом" : "With a living house"}
                </div>
              </div>
            )}
            {currentJob.withoutLanguage && (
              <div className="p-1 flex space-x-1 items-center">
                <i className="fa-solid fa-earth-americas fa-sm"></i>
                <div>
                  {language === "uk" ? "Без мови" : "Without a language"}
                </div>
              </div>
            )}
            {currentJob.withoutExp && (
              <div className="p-1 flex space-x-1 items-center">
                <i className="fa-solid fa-briefcase fa-sm"></i>
                <div>
                  {language === "uk"
                    ? "Без досвіду"
                    : "Without work experience"}
                </div>
              </div>
            )}
          </div>
          <hr className="border-1 border-gray-400" />
          <div className="my-2 text-base">{currentJob.description}</div>
          <hr className="border-1 border-gray-400" />
          <div className="flex space-x-2">
            <div className="italic text-blue-900 opacity-70">+380671904107</div>
            <div>Ludmyla</div>
          </div>
        </div>

        <div className="w-full my-2 flex justify-between">
          <button
            onClick={() => dispatch(setFormApplyVision(true))}
            className="flex items-center m-auto px-16 py-2 text-lg bg-green-500 rounded shadow"
          >
            {language === "uk" ? "Відгукнутися" : "Apply"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default DetailedJob;
