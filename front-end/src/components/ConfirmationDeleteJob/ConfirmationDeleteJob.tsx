import { useDispatch, useSelector } from "react-redux";
import {
  setConfirmationDeleteJobVision,
  setCurrentJob,
  setJobs,
} from "../../redux/slices/appSlice";
import { IJob } from "../Navbar/Navbar";
import Cookies from "js-cookie";

const ConfirmationDeleteJob = (): React.JSX.Element => {
  const ConfirmationDeleteJobVision = useSelector(
    (state: any) => state.app.ConfirmationDeleteJobVision
  );
  const apiUrl = useSelector((state: any) => state.app.apiUrl);
  const currentJob = useSelector((state: any) => state.app.currentJob);
  const jobs = useSelector((state: any) => state.app.jobs);
  const dispatch = useDispatch();

  const deleteJob = async (currentJob: { job_id: string }): Promise<void> => {
    try {
      const { job_id } = currentJob;
      const requestOptions = {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${Cookies.get("jwtToken")}`,
        },
      };
      const response = await fetch(
        `${apiUrl}/jobs/delete/${job_id}`,
        requestOptions
      );
      const parseRes = response.json();
      console.log(parseRes);
      const jobsWithoutDeletedJob = jobs.filter((job: IJob) => {
        return job._id !== job_id;
      });

      if (response.ok) {
        dispatch(setJobs(jobsWithoutDeletedJob));
        dispatch(setConfirmationDeleteJobVision(false));
        dispatch(setCurrentJob({}));
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div
      className={`flex flex-col transition duration-500 ${
        ConfirmationDeleteJobVision
          ? "opacity-100"
          : "opacity-0 pointer-events-none"
      } bg-white absolute w-4/6 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-lg shadow-[0px_5px_10px_-3px_#4a5568]`}
    >
      <div className="p-10 text-2xl mx-auto">
        Підтвердіть видалення вакансії
      </div>
      <hr />
      <div className="flex flex-col p-10 space-y-6 sm:w-1/2 sm:mx-auto">
        <button
          onClick={() => deleteJob(currentJob)}
          className="shadow-[0px_5px_10px_-3px_#4a5568] transition bg-red-300 hover:bg-gray-50 rounded-lg w-5/6 m-auto text-lg px-7 py-2"
        >
          Видалити
        </button>
        <button
          onClick={() => {
            dispatch(setConfirmationDeleteJobVision(false));
            dispatch(setCurrentJob({}));
          }}
          className="shadow-[0px_5px_10px_-3px_#4a5568] transition hover:bg-gray-50 rounded-lg w-5/6 m-auto text-lg px-7 py-2"
        >
          Повернутися
        </button>
      </div>
    </div>
  );
};

export default ConfirmationDeleteJob;
