import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setCurrentJob,
  setJobFiltersVision,
  setPageNumber,
} from "../../redux/slices/appSlice";
import { getJobs } from "../Jobs/Jobs";

const JobFilters = (): React.JSX.Element => {
  const dispatch = useDispatch();
  const [typeSalary, setTypeSalary] = useState("month");
  const JobFiltersVision = useSelector(
    (state: any) => state.app.JobFiltersVision
  );
  const apiUrl = useSelector((state: any) => state.app.apiUrl);
  const pageNumber = useSelector((state: any) => state.app.pageNumber);
  const pageNumberChanges = useSelector(
    (state: any) => state.app.pageNumberChanges
  );
  const jobs = useSelector((state: any) => state.app.jobs);
  const isSearchingJobs = useSelector(
    (state: any) => state.app.isSearchingJobs
  );
  const [radioButtons, setRadioButtons] = useState({
    salaryLevelFilter: 0,
    createdAtFilter: "",
  });

  const onChangeSetRadioButtons = (e: any): void => {
    setRadioButtons({ ...radioButtons, [e.target.name]: e.target.value });
    console.log(e.target.parentNode.children);
  };

  return (
    <div
      className={`w-2/3 sm:w-2/6 absolute flex flex-col left-0 transition ${
        JobFiltersVision ? "opacity-100" : "opacity-0 pointer-events-none"
      }`}
    >
      <div className="bg-green-100 flex flex-col h-full border-2 border-t-0 border-gray-400 border-opacity-30">
        <div className="w-full mr-auto flex items-center">
          <div className="mx-auto p-4 text-lg font-semibold">Фільтри</div>
          <div
            onClick={() => dispatch(setJobFiltersVision(false))}
            className="p-3 hover:opacity-50"
          >
            <i className="fa-solid fa-xmark fa-lg"></i>
          </div>
        </div>
        <div className="flex flex-col mx-auto space-y-6">
          <div className="flex flex-col space-y-2">
            <div className="text-base">Зарплата</div>
            <div className="flex border border-gray-400 w-fit">
              <button
                onClick={() => setTypeSalary("hour")}
                className={`border-2 p-2 border-green-600 ${
                  typeSalary === "hour"
                    ? "border-opacity-100"
                    : "border-opacity-0"
                } text-sm`}
              >
                Щогодини
              </button>
              <button
                onClick={() => setTypeSalary("month")}
                className={`border-2 p-2 border-green-600 ${
                  typeSalary === "month"
                    ? "border-opacity-100"
                    : "border-opacity-0"
                } text-sm`}
              >
                Щомісяця
              </button>
            </div>
            <div onChange={onChangeSetRadioButtons}>
              <div className="flex space-x-4">
                <input type="radio" name="salaryLevelFilter" value={20} />
                <label>Вище 1000 $</label>
              </div>
              <div className="flex space-x-4">
                <input type="radio" name="salaryLevelFilter" value={50} />
                <label>Вище 1200 $</label>
              </div>
            </div>
          </div>
          <div onChange={onChangeSetRadioButtons}>
            <div className="flex flex-col space-y-2">
              <div>Дата публікації</div>
              <div>
                <div className="flex space-x-4">
                  <input
                    type="radio"
                    name="createdAtFilter"
                    value="today"
                    id="today"
                  />
                  <label htmlFor="today">Сьогодні</label>
                </div>
                <div className="flex space-x-4">
                  <input
                    type="radio"
                    name="createdAtFilter"
                    value="last_3_days"
                    id="last_3_days"
                  />
                  <label htmlFor="last_3_days">Вчора</label>
                </div>
                <div className="flex space-x-4">
                  <input
                    type="radio"
                    name="createdAtFilter"
                    value="last_week"
                    id="last_week"
                  />
                  <label htmlFor="last_week">За останні 3 дні</label>
                </div>
                <div className="flex space-x-4">
                  <input
                    type="radio"
                    name="createdAtFilter"
                    value="any_time"
                    id="any_time"
                  />
                  <label htmlFor="any_time">Любий час</label>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div
          onClick={() => {
            dispatch(setPageNumber(0));
            dispatch(setCurrentJob({}));
            dispatch(setJobFiltersVision(false));
            getJobs(
              apiUrl,
              pageNumber,
              isSearchingJobs,
              pageNumberChanges,
              jobs,
              dispatch,
              "",
              radioButtons.salaryLevelFilter,
              radioButtons.createdAtFilter
            );
          }}
          className={`mx-auto px-6 py-3 my-4 text-lg border border-gray-400 hover:bg-green-200 ${
            radioButtons.createdAtFilter || radioButtons.salaryLevelFilter
              ? "opacity-100"
              : "opacity-0 pointer-events-none"
          }`}
        >
          <button>Застосувати</button>
        </div>
      </div>
    </div>
  );
};

export default JobFilters;
