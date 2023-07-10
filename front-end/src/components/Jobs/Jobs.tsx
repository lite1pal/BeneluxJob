import { Dispatch, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setCurrentJob,
  setFoundJobs,
  setJobs,
  setPageNumber,
  setScrollYbefore,
} from "../../redux/slices/appSlice";
import { IJob } from "../Navbar/Navbar";
import { AnyAction } from "@reduxjs/toolkit";

export const getJobs = async (
  apiUrl: string,
  pageNumber: number,
  dispatch: Dispatch<AnyAction>,
  jobs: IJob[],
  isSearchingJobs: boolean,
  pageNumberChanges: boolean = false,
  search: string = ""
) => {
  const response = await fetch(
    `${apiUrl}/jobs?page=${pageNumber}&search=${search}`
  );
  const parseRes = await response.json();
  if (response.ok) {
    isSearchingJobs
      ? dispatch(setFoundJobs(parseRes.result))
      : dispatch(
          setJobs(
            pageNumberChanges ? [...jobs, ...parseRes.result] : parseRes.result
          )
        );
  } else {
    console.log(parseRes);
  }
};

const Jobs = (): React.JSX.Element => {
  const dispatch = useDispatch();
  const jobs = useSelector((state: any) => state.app.jobs);
  const isSearchingJobs = useSelector(
    (state: any) => state.app.isSearchingJobs
  );
  const foundJobs = useSelector((state: any) => state.app.foundJobs);
  const renderJobs = isSearchingJobs ? foundJobs : jobs;
  const pageNumber = useSelector((state: any) => state.app.pageNumber);
  const [pageNumberChanges, setPageNumberChanges] = useState(false);
  const apiUrl = useSelector((state: any) => state.app.apiUrl);
  const currentJob = useSelector((state: any) => state.app.currentJob);
  const scrollY = useSelector((state: any) => state.app.scrollY);
  const screenWidth = useSelector((state: any) => state.app.screenWidth);
  const scrollYbefore = useSelector((state: any) => state.app.scrollYbefore);

  useEffect(() => {
    return () => {
      // Clear the Redux value when the component is unmounted
      dispatch(setPageNumber(0));
    };
  }, [dispatch]);

  useEffect(() => {
    getJobs(
      apiUrl,
      pageNumber,
      dispatch,
      jobs,
      isSearchingJobs,
      pageNumberChanges
    );
    setPageNumberChanges(false);
  }, [pageNumber]);

  const showJob = (job: any): void => {
    dispatch(setCurrentJob(job));
  };

  return (
    <div className="w-full sm:w-1/2 overflow-scroll">
      {/* <p className="text-neutral-500 m-3">
    Кількість вакансій - {jobs.length}
  </p> */}
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
              <div className="m-2 p-4">
                <div className="flex w-4/12 justify-between">
                  <div className="font-medium text-xl transition items-center">
                    {job.name}
                  </div>
                </div>
                <div className="flex flex-col">
                  <div className="font-extrabold">{job.salary}$ / год</div>
                  <div className="my-2 text-sm">{job.description}</div>
                </div>

                <div className="w-full my-2 flex justify-between">
                  <div className="italic opacity-70">
                    {new Date(job.createdAt).toLocaleDateString()}
                  </div>
                  <button
                    onClick={() => {
                      showJob(job);
                      dispatch(setScrollYbefore(scrollY));
                      console.log(scrollYbefore);
                      screenWidth <= 650 ? window.scrollTo(0, 0) : null;
                      scrollY < 150
                        ? window.scrollTo({ top: 150, behavior: "smooth" })
                        : null;
                    }}
                    className="flex items-center space-x-2 px-5 py-2 text-sm transition-all bg-green-300 hover:bg-green-400 rounded shadow"
                  >
                    <div>Дізнатись більше</div>
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
        className={`fixed left-1/2 bottom-12 sm:bottom-16 sm:left-2 p-4 sm:p-4 bg-green-400 ${
          scrollY > 150 ? "opacity-100" : "opacity-0 pointer-events-none"
        } transition duration-700 hover:bg-green-500 rounded-3xl`}
      >
        <i className="fa-solid fa-arrow-up fa-2xl"></i>
      </div>

      <div
        onClick={() => {
          dispatch(setPageNumber(pageNumber + 1));
          setPageNumberChanges(true);
        }}
        className={`mx-auto my-4 ${
          isSearchingJobs || jobs.length === 0
            ? "opacity-0 pointer-events-none"
            : "opacity-100"
        } border-2 hover:bg-green-200 border-gray-400 rounded w-fit p-4 font-light text-lg`}
      >
        Наступні вакансії
      </div>
    </div>
  );
};

export default Jobs;
