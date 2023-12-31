import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setJobs, setAfterCreatedJobVision } from "../../redux/slices/appSlice";
import Cookies from "js-cookie";

interface IInputs {
  name: string;
  salary: number;
  description: string;
  hot: boolean;
  withLivingHouse: boolean;
  withoutLanguage: boolean;
  withoutExp: boolean;
}

const FormAddJob = (): React.JSX.Element => {
  const apiUrl = useSelector((state: any) => state.app.apiUrl);
  const dispatch = useDispatch();
  const jobs = useSelector((state: any) => state.app.jobs);
  const AfterCreatedJobVision = useSelector(
    (state: any) => state.app.AfterCreatedJobVision
  );
  const [inputs, setInputs] = useState<IInputs>({
    name: "",
    salary: 0,
    description: "",
    hot: false,
    withLivingHouse: false,
    withoutLanguage: false,
    withoutExp: false,
  });

  const onChangeSetInputs = (e: any): void => {
    if (
      ["hot", "withLivingHouse", "withoutLanguage", "withoutExp"].includes(
        e.target.name
      )
    ) {
      setInputs({ ...inputs, [e.target.name]: e.target.checked });
    } else {
      setInputs({ ...inputs, [e.target.name]: e.target.value });
    }
  };

  const createJob = async (e: any): Promise<void> => {
    e.preventDefault();
    try {
      const requestOptions = {
        method: "POST",
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${Cookies.get("jwtToken")}`,
        },
        body: JSON.stringify(inputs),
      };

      const response = await fetch(`${apiUrl}/jobs/create`, requestOptions);
      const parseRes = await response.json();
      console.log("createJob log: ", parseRes);
      if (response.ok) {
        console.log(parseRes.result);
        dispatch(setJobs([...jobs, parseRes.result]));
        dispatch(setAfterCreatedJobVision(true));
        setInputs({
          name: "",
          salary: 0,
          description: "",
          hot: false,
          withLivingHouse: false,
          withoutLanguage: false,
          withoutExp: false,
        });
      } else {
      }
    } catch (err) {
      console.error(err);
    }
  };
  return (
    <div
      className={`w-full transition duration-500 ${
        AfterCreatedJobVision ? "opacity-30 pointer-events-none" : "opacity-100"
      }`}
    >
      <form
        onSubmit={createJob}
        className="w-11/12 flex flex-col space-y-4 rounded-lg shadow-[0px_5px_7px_0px_#4a5568] mx-auto mb-6 mt-2 bg-white"
      >
        <div className="flex flex-col sm:flex-row">
          <div className="w-full px-6 py-4 sm:w-1/2 flex flex-col space-y-6">
            <div className="font-medium">Додати вакансію</div>
            <div className="flex flex-col space-y-4">
              <div className="flex flex-col">
                <label className="font-normal" htmlFor="name">
                  Назва
                </label>
                <input
                  onChange={onChangeSetInputs}
                  type="text"
                  name="name"
                  id="name"
                  value={inputs.name}
                  className="rounded-lg p-2 border shadow-[0px_5px_10px_-3px_#4a5568]"
                />
              </div>
              <div className="flex flex-col">
                <label className="font-normal" htmlFor="salary">
                  Зарплата погодинно
                </label>
                <input
                  onChange={onChangeSetInputs}
                  type="number"
                  name="salary"
                  id="salary"
                  value={inputs.salary}
                  className="rounded-lg p-2 border shadow-[0px_5px_10px_-3px_#4a5568]"
                />
              </div>
              <div className="flex flex-col">
                <label className="font-normal" htmlFor="description">
                  Опис
                </label>
                <textarea
                  onChange={onChangeSetInputs}
                  name="description"
                  id="description"
                  rows={7}
                  cols={10}
                  value={inputs.description}
                  className="rounded-lg p-2 border shadow-[0px_5px_10px_-3px_#4a5568]"
                ></textarea>
              </div>
            </div>
          </div>
          <div className="w-2/3 space-y-4 mx-auto px-6 mt-4 sm:w-1/2">
            <div className="flex space-x-4">
              <input
                onChange={onChangeSetInputs}
                type="checkbox"
                name="withLivingHouse"
                id="withLivingHouse"
                checked={inputs.withLivingHouse}
                className="w-6 h-6 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
              />
              <label htmlFor="withLivingHouse">З житлом</label>
            </div>
            <div className="flex space-x-4">
              <input
                onChange={onChangeSetInputs}
                type="checkbox"
                name="withoutLanguage"
                checked={inputs.withoutLanguage}
                className="w-6 h-6 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
              />
              <label htmlFor="withoutLanguage">Без мови</label>
            </div>
            <div className="flex space-x-4">
              <input
                onChange={onChangeSetInputs}
                type="checkbox"
                name="withoutExp"
                checked={inputs.withoutExp}
                className="w-6 h-6 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
              />
              <label htmlFor="withoutExp">Без досвіду</label>
            </div>
            <div className="flex space-x-4">
              <input
                onChange={onChangeSetInputs}
                type="checkbox"
                name="hot"
                id="hot"
                checked={inputs.hot}
                className="w-6 h-6 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
              />
              <label className="flex space-x-2 items-center" htmlFor="hot">
                <div>Гаряча</div>
                <i
                  className="fa-solid fa-fire"
                  style={{ color: "red", opacity: 0.75 }}
                ></i>
              </label>
            </div>
          </div>
        </div>
        <div className="flex p-5">
          <input
            className="shadow-[0px_5px_10px_-3px_#4a5568] rounded-lg w-5/6 m-auto text-lg bg-teal-500 px-7 py-2 sm:w-2/6"
            type="submit"
            value="Підтвердити"
          />
        </div>
      </form>
    </div>
  );
};

export default FormAddJob;
