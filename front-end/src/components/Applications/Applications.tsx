import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setApplications } from "../../redux/slices/appSlice";
import { handleJobCreatedAt } from "../Jobs/Jobs";
import Cookies from "js-cookie";

export interface IApplication {
  _id: string;
  first_name: string;
  last_name: string;
  age: number;
  phone_number: number;
  email: string;
  additional_list: string;
  job_id: string;
  createdAt: Date;
  updatedAt: Date;
}

const Applications = (): React.JSX.Element => {
  const apiUrl = useSelector((state: any) => state.app.apiUrl);
  const applications = useSelector((state: any) => state.app.applications);
  // const [applicationJob, setApplicationJob] = useState<IJob>({
  //   _id: "",
  //   name: "",
  //   description: "",
  //   salary: 0,
  //   hot: false,
  //   withLivingHouse: false,
  //   withoutLanguage: false,
  //   withoutExp: false,
  //   createdAt: new Date(),
  //   updatedAt: new Date(),
  // });
  const dispatch = useDispatch();

  const getApplications = async () => {
    const requestOptions = {
      method: "GET",
      headers: {
        Authorization: `Bearer ${Cookies.get("jwtToken")}`,
      },
    };
    const response = await fetch(`${apiUrl}/applications`, requestOptions);
    const parseRes = await response.json();
    if (response.ok) {
      dispatch(setApplications(parseRes.result));
    }
  };

  useEffect(() => {
    getApplications();
  }, []);

  // const getApplicationJob = async (application: IApplication) => {
  //   const requestOptions = {
  //     method: "GET",
  //     headers: {
  //       Authorization: `Bearer ${localStorage.getItem(
  //         "sessionID"
  //       )} ${localStorage.getItem("email")}`,
  //     },
  //   };
  //   const response = await fetch(
  //     `${apiUrl}/jobs/${application.job_id}`,
  //     requestOptions
  //   );
  //   const parseRes = await response.json();
  //   console.log(parseRes);
  //   if (response.ok) {
  //     setApplicationJob(parseRes.result);
  //   }
  // };

  return (
    <div className="w-11/12 mx-auto">
      <ul>
        {applications.map((application: IApplication) => {
          // getApplicationJob(application);
          return (
            <li
              key={application._id}
              className={`mx-auto p-5 my-6 sm:w-1/3 border rounded-lg shadow-[0px_5px_7px_0px_#4a5568] bg-white transition duration-300`}
            >
              <div className="">
                <div>Ім`я: {application.first_name}</div>
                <div className="flex sm:w-4/12 border justify-between">
                  <div className="transition items-center">
                    Email: {application.email}
                  </div>
                </div>
                <div className="flex flex-col">
                  <div className="font-extrabold">{application.age}$ / год</div>
                  <div className="my-2 text-sm">
                    {application.additional_list}
                  </div>
                </div>

                <div className="w-full my-2 flex justify-between">
                  <div className="italic opacity-70">
                    {handleJobCreatedAt(application.createdAt)}
                  </div>
                  {/* <button className="flex items-center space-x-2 px-5 py-2 text-sm transition-all bg-green-300 hover:bg-green-400 rounded shadow">
                    <div>Дізнатись більше</div>
                    <i className="fa-solid fa-arrow-right"></i>
                  </button> */}
                </div>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Applications;
