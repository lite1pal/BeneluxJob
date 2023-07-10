import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setCurrentJob,
  setFormApplyVision,
  setMainPageScrollVision,
} from "../../redux/slices/appSlice";

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

  useEffect(() => {
    if (divRefDetailedJob.current !== null) {
      divRefDetailedJob.current.scrollTo(0, 0);
    }
  }, [currentJob]);

  return (
    <div
      className={`w-full sm:w-1/2 transition duration-700 ${
        currentJob.name
          ? "max-sm:block sm:opacity-100"
          : "max-sm:hidden sm:opacity-0 sm:pointer-events-none"
      }`}
    >
      <div
        onMouseEnter={(e) => {
          e.preventDefault();
          dispatch(setMainPageScrollVision(false));
        }}
        onMouseLeave={() => dispatch(setMainPageScrollVision(true))}
        ref={divRefDetailedJob}
        className={`p-8 mx-1 border-2 border-black sm:mx-4 my-2 flex flex-col space-y-4 sm:fixed ${
          scrollY < 150 ? "sm:relative sm:w-full" : ""
        } sm:max-h-screen transition-all duration-300 ease-in-out top-0 bottom-1 overflow-scroll rounded-lg shadow-[0px_5px_7px_0px_#4a5568] bg-white`}
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
        <div className="flex flex-col">
          <div className="font-extrabold">{currentJob.salary}$ / год</div>
          <div>Брюссель</div>
          <hr className="border-1 border-gray-400" />
          <div className="my-2 text-sm p-6">
            {currentJob.description}While flexbox is a great tool for building
            responsive layouts, it's worth noting that there are other CSS
            modules and techniques available, such as CSS Grid and media
            queries, which can also be used to create responsive designs.
            Depending on the complexity of your website's layout, you may find
            it beneficial to combine flexbox with these other techniques to
            achieve your desired responsiveness.While flexbox is a great tool
            for building responsive layouts, it's worth noting that there are
            other CSS modules and techniques available, such as CSS Grid and
            media queries, which can also be used to create responsive designs.
            Depending on the complexity of your website's layout, you may find
            it beneficial to combine flexbox with these other techniques to
            achieve your desired responsiveness.While flexbox is a great tool
            for building responsive layouts, it's worth noting that there are
            other CSS modules and techniques available, such as CSS Grid and
            media queries, which can also be used to create responsive designs.
            Depending on the complexity of your website's layout, you may find
            it beneficial to combine flexbox with these other techniques to
            achieve your desired responsiveness.While flexbox is a great tool
            for building responsive layouts, it's worth noting that there are
            other CSS modules and techniques available, such as CSS Grid and
            media queries, which can also be used to create responsive designs.
            Depending on the complexity of your website's layout, you may find
            it beneficial to combine flexbox with these other techniques to
            achieve your desired responsiveness.While flexbox is a great tool
            for building responsive layouts, it's worth noting that there are
            other CSS modules and techniques available, such as CSS Grid and
            media queries, which can also be used to create responsive designs.
            Depending on the complexity of your website's layout, you may find
            it beneficial to combine flexbox with these other techniques to
            achieve your desired responsiveness.While flexbox is a great tool
            for building responsive layouts, it's worth noting that there are
            other CSS modules and techniques available, such as CSS Grid and
            media queries, which can also be used to create responsive designs.
            Depending on the complexity of your website's layout, you may find
            it beneficial to combine flexbox with these other techniques to
            achieve your desired responsiveness.
          </div>
          <hr className="border-1 border-gray-400" />
        </div>

        <div className="w-full my-2 flex justify-between">
          <button
            onClick={() => dispatch(setFormApplyVision(true))}
            className="flex items-center m-auto px-16 py-2 text-lg bg-green-500 rounded shadow"
          >
            Відгукнутися
          </button>
        </div>
      </div>
    </div>
  );
};

export default DetailedJob;
