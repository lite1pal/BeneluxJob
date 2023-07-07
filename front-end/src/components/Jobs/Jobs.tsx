import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentJob, setJobs } from "../../redux/slices/appSlice";

const Jobs = ({
  divRefDetailedJob,
}: {
  divRefDetailedJob: React.MutableRefObject<null>;
}): React.JSX.Element => {
  const dispatch = useDispatch();
  const jobs = useSelector((state: any) => state.app.jobs);
  const apiUrl = useSelector((state: any) => state.app.apiUrl);
  const currentJob = useSelector((state: any) => state.app.currentJob);

  useEffect(() => {
    const getJobs = async () => {
      const response = await fetch(`${apiUrl}/jobs`);
      const parseRes = await response.json();
      if (response.ok) {
        dispatch(setJobs(parseRes.result));
      } else {
        console.log(parseRes);
      }
    };
    getJobs();
  }, []);

  const handleButtonClick = () => {
    console.log(document);
  };

  const showJob = (job: any): void => {
    dispatch(setCurrentJob(job));
    // setTimeout(() => {
    //   divRefDetailedJob.current.scrollIntoView({
    //     behavior: "smooth",
    //     block: "center",
    //   });
    // }, 100);
  };

  return (
    <div className="w-full sm:w-1/2 overflow-scroll">
      {/* <p className="text-neutral-500 m-3">
    Кількість вакансій - {jobs.length}
  </p> */}

      <ul>
        {jobs.map((job: any) => {
          return (
            <>
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
                    {/* <div className="flex items-center space-x-2 font-medium text-lg text-red-500 transition">
                  <i className="fa-solid fa-fire"></i>
                  <div>Гаряча</div>
                </div> */}
                  </div>
                  <div className="flex flex-col">
                    <div className="font-extrabold">{job.salary}$ / год</div>
                    <div className="my-2 text-sm">{job.description}</div>
                  </div>
                  {/* <div className="opacity-50">
                Without experience, with a living house
              </div> */}
                  <div className="w-full my-2 flex justify-between">
                    <div className="italic opacity-70">
                      {new Date(job.createdAt).toLocaleDateString()}
                    </div>
                    <button
                      onClick={() => showJob(job)}
                      className="flex items-center space-x-2 px-5 py-2 text-sm transition-all bg-green-300 hover:bg-green-400 rounded shadow"
                    >
                      <div>Дізнатись більше</div>
                      <i className="fa-solid fa-arrow-right"></i>
                    </button>
                  </div>
                </div>
              </li>
            </>
          );
        })}
      </ul>
    </div>
  );
};

export default Jobs;
