import { Dispatch, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setConfirmationDeleteJobVision,
  setCurrentJob,
  setFoundJobs,
  setHasMoreJobs,
  setIsSearchingJobs,
  setJobFiltersVision,
  setJobs,
  setPageNumber,
  setPageNumberChanges,
  setScrollYbefore,
} from "../../redux/slices/appSlice";
import { IJob, language } from "../Navbar/Navbar";
import { AnyAction } from "@reduxjs/toolkit";
import { bearerString } from "../FormAddJob/FormAddJob";

export const getJobs = async (
  apiUrl: string,
  pageNumber: number,
  isSearchingJobs: boolean,
  pageNumberChanges: boolean,
  jobs: IJob[],
  dispatch: Dispatch<AnyAction>,
  search: string = "",
  salaryLevelFilter: number = 0,
  createdAtFilter: string = ""
) => {
  const requestOptions = {
    method: "GET",
    headers: {
      Authorization: bearerString,
    },
  };
  const response = await fetch(
    `${apiUrl}/jobs?page=${pageNumber}&search=${search}&salaryLevelFilter=${salaryLevelFilter}&createdAtFilter=${createdAtFilter}`,
    requestOptions
  );
  const parseRes = await response.json();
  if (response.ok) {
    isSearchingJobs
      ? dispatch(setFoundJobs(parseRes.result.jobs))
      : dispatch(
          setJobs(
            pageNumberChanges
              ? [...jobs, ...parseRes.result.jobs]
              : parseRes.result.jobs
          )
        );
    dispatch(setHasMoreJobs(parseRes.result.hasMoreJobs));
  } else {
    console.log(parseRes);
  }
};

export const handleJobCreatedAt = (time: Date) => {
  const now = new Date();
  const yesterday = new Date(now);
  const beforeYesterday = new Date(now);
  const beforeBeforeYesterday = new Date(now);
  yesterday.setDate(now.getDate() - 1);
  beforeYesterday.setDate(now.getDate() - 2);
  beforeBeforeYesterday.setDate(now.getDate() - 3);
  const jobCreatedAt = new Date(time).toLocaleDateString();
  if (now.toLocaleDateString() === jobCreatedAt) {
    return "Сьогодні";
  } else if (yesterday.toLocaleDateString() === jobCreatedAt) {
    return "Вчора";
  } else {
    return jobCreatedAt;
  }
};

const Jobs = (): React.JSX.Element => {
  const dispatch = useDispatch();
  const isSearchingJobs = useSelector(
    (state: any) => state.app.isSearchingJobs
  );
  const jobs = useSelector((state: any) => state.app.jobs);
  const pageNumber = useSelector((state: any) => state.app.pageNumber);
  const pageNumberChanges = useSelector(
    (state: any) => state.app.pageNumberChanges
  );
  const apiUrl = useSelector((state: any) => state.app.apiUrl);
  const foundJobs = useSelector((state: any) => state.app.foundJobs);
  const renderJobs = isSearchingJobs ? foundJobs : jobs;
  const currentJob = useSelector((state: any) => state.app.currentJob);
  const scrollY = useSelector((state: any) => state.app.scrollY);
  const screenWidth = useSelector((state: any) => state.app.screenWidth);
  const hasMoreJobs = useSelector((state: any) => state.app.hasMoreJobs);
  const currentUser = useSelector((state: any) => state.app.currentUser);
  const [bottomReached, setBottomReached] = useState(false);

  window.addEventListener("scroll", () => {
    // Check if the user has reached the bottom of the page
    if (
      window.innerHeight + window.scrollY >=
      document.body.offsetHeight - 130
    ) {
      // Trigger your desired event or function here
      setBottomReached(true);
    } else {
      setBottomReached(false);
    }
  });

  useEffect(() => {
    return () => {
      // Clear the Redux value when the component is unmounted
      dispatch(setPageNumber(0));
    };
  }, [dispatch]);

  useEffect(() => {
    getJobs(apiUrl, pageNumber, false, pageNumberChanges, jobs, dispatch);
    dispatch(setIsSearchingJobs(false));
    dispatch(setPageNumberChanges(false));
  }, [pageNumber]);

  const showJob = (job: any): void => {
    dispatch(setCurrentJob(job));
  };

  return (
    <div className="w-full sm:w-1/2">
      {/* <p className="text-neutral-500 m-3">
    Кількість вакансій - {jobs.length}
  </p> */}
      <div
        onClick={() => dispatch(setJobFiltersVision(true))}
        className="font-light w-fit text-lg m-4 border-b-2 border-gray-200 transition duration-500 hover:border-gray-400"
      >
        {language === "uk" ? "Фільтри" : "Filters"}
      </div>
      {jobs.length === 0 ? (
        <div className="m-52" role="status">
          <svg
            aria-hidden="true"
            className="w-16 h-16 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-green-600"
            viewBox="0 0 100 101"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
              fill="currentColor"
            />
            <path
              d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
              fill="currentFill"
            />
          </svg>
          <span className="sr-only">Loading...</span>
        </div>
      ) : null}
      <ul>
        {renderJobs.map((job: IJob) => {
          return (
            <li
              key={job._id}
              className={`m-2 my-6 rounded-lg shadow-[0px_5px_7px_0px_#4a5568] bg-white transition duration-300 ${
                currentJob._id === job._id ? "transform rotate-2" : null
              }`}
            >
              <div className="flex flex-col space-y-4 m-2 p-5">
                <div className="flex justify-between items-center">
                  <div className="flex w-4/6 space-x-3 items-center">
                    <div className="font-medium text-xl transition items-center">
                      {job.name}
                    </div>
                    {job.hot ? (
                      <i
                        className="fa-solid fa-fire fa-lg"
                        style={{ color: "red", opacity: 0.75 }}
                      ></i>
                    ) : null}
                  </div>
                  <div
                    onClick={() => {
                      dispatch(setCurrentJob({ job_id: job._id }));
                      dispatch(setConfirmationDeleteJobVision(true));
                    }}
                    className={`mr-3 hover:opacity-50 ${
                      currentUser.admin
                        ? "opacity-100"
                        : "opacity-0 pointer-events-none"
                    }`}
                  >
                    <i className="fa-solid fa-trash fa-lg"></i>
                  </div>
                </div>
                <div className="flex flex-col">
                  <div className="font-extrabold flex space-x-1 text-green-900">
                    <div>{job.salary}</div>
                    <div>
                      <i className="fa-solid fa-dollar-sign"></i> / год
                    </div>
                  </div>
                  <div className="my-2 text-sm">
                    {job.description.slice(0, 200)}...
                  </div>
                </div>

                <div className="w-full flex flex-grow space-x-5 text-sm text-gray-500">
                  {job.hot && (
                    <div className="p-1 flex space-x-1 items-center">
                      <i className="fa-solid fa-fire fa-sm"></i>
                      <div>{language === "uk" ? "Гаряча" : "Hot"}</div>
                    </div>
                  )}
                  {job.withLivingHouse && (
                    <div className="p-1 flex space-x-1 items-center">
                      <i className="fa-solid fa-house fa-sm"></i>
                      <div>
                        {language === "uk" ? "З житлом" : "With a living house"}
                      </div>
                    </div>
                  )}
                  {job.withoutLanguage && (
                    <div className="p-1 flex space-x-1 items-center">
                      <i className="fa-solid fa-earth-americas fa-sm"></i>
                      <div>
                        {language === "uk" ? "Без мови" : "Without a language"}
                      </div>
                    </div>
                  )}
                  {job.withoutExp && (
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

                <hr />
                <div className="w-full my-2 flex justify-between">
                  <div className="italic opacity-70">
                    {handleJobCreatedAt(job.createdAt)}
                  </div>
                  <button
                    onClick={() => {
                      showJob(job);
                      dispatch(setScrollYbefore(scrollY));
                      screenWidth <= 650 ? window.scrollTo(0, 0) : null;
                      scrollY < 150
                        ? window.scrollTo({ top: 150, behavior: "smooth" })
                        : null;
                    }}
                    className="flex items-center space-x-2 px-5 py-2 text-sm transition-all bg-green-300 hover:bg-green-400 rounded shadow"
                  >
                    <div>
                      {language === "uk" ? "Дізнатись більше" : "Learn more"}
                    </div>
                    <i className="fa-solid fa-arrow-right"></i>
                  </button>
                </div>
              </div>
            </li>
          );
        })}
      </ul>

      <div
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        className={`fixed left-1/2 ${
          bottomReached ? "bottom-36" : "bottom-12"
        } sm:bottom-16 sm:left-2 p-4 bg-green-400 ${
          scrollY > 150 ? "opacity-100" : "opacity-0 pointer-events-none"
        } transition duration-700 hover:bg-green-500 rounded-3xl`}
      >
        <i className="fa-solid fa-arrow-up fa-2xl"></i>
      </div>

      <div
        onClick={() => {
          dispatch(setPageNumber(pageNumber + 1));
          dispatch(setPageNumberChanges(true));
        }}
        className={`mx-auto my-4 ${
          isSearchingJobs || !hasMoreJobs
            ? "opacity-0 pointer-events-none"
            : "opacity-100"
        } border-2 hover:bg-green-200 border-gray-400 rounded w-fit p-4 font-light text-lg`}
      >
        Наступні вакансії{language === "uk" ? "Наступні вакансії" : "Next jobs"}
      </div>
    </div>
  );
};

export default Jobs;
