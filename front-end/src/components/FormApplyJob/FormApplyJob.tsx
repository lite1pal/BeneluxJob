import { useDispatch, useSelector } from "react-redux";
import {
  setAfterApplyingVision,
  setApplications,
  setFormApplyVision,
} from "../../redux/slices/appSlice";
import { useState } from "react";
import { bearerString } from "../FormAddJob/FormAddJob";

const FormApplyJob = (): React.JSX.Element => {
  const dispatch = useDispatch();
  const FormApplyVision = useSelector(
    (state: any) => state.app.FormApplyVision
  );
  const apiUrl = useSelector((state: any) => state.app.apiUrl);
  const applications = useSelector((state: any) => state.app.applications);
  const currentJob = useSelector((state: any) => state.app.currentJob);
  const [inputs, setInputs] = useState({
    first_name: "",
    last_name: "",
    age: 0,
    phone_number: 0,
    email: "",
    additional_list: "",
  });

  const [emailCorrect, setEmailCorrect] = useState(true);
  const [phoneCorrect, setPhoneCorrect] = useState(true);

  const validateInputValue = (e: any): void => {
    // validates email
    if (
      e.target.name === "email" &&
      e.target.value.length > 0 &&
      !e.target.value.includes("@")
    ) {
      setEmailCorrect(false);
    } else {
      setEmailCorrect(true);
    }

    // validates phone number
    if (
      e.target.name === "phone_number" &&
      e.target.value.length > 0 &&
      e.target.value[0] !== "0" &&
      e.target.value.slice(0, 3) !== "380" &&
      e.target.value.slice(0, 4) !== "+380"
    ) {
      setPhoneCorrect(false);
    } else {
      setPhoneCorrect(true);
    }
  };

  const onChangeSetInputs = (e: any) => {
    validateInputValue(e);
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  };

  const createApplication = async (e: any) => {
    e.preventDefault();
    try {
      const requestOptions = {
        method: "POST",
        headers: {
          "Content-type": "application/json",
          Authorization: bearerString,
        },
        body: JSON.stringify(inputs),
      };
      const response = await fetch(
        `${apiUrl}/applications/create?job_id=${currentJob._id}`,
        requestOptions
      );
      const parseRes = await response.json();
      console.log(parseRes);
      if (response.ok) {
        dispatch(setApplications([...applications, parseRes.result]));
        setInputs({
          first_name: "",
          last_name: "",
          age: 0,
          phone_number: 0,
          email: "",
          additional_list: "",
        });
        dispatch(setAfterApplyingVision(true));
        setTimeout(() => {
          dispatch(setFormApplyVision(false));
          dispatch(setAfterApplyingVision(false));
        }, 2000);
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div
      className={`w-full ${
        FormApplyVision
          ? "max-sm:block sm:opacity-100"
          : "max-sm:hidden sm:opacity-0 pointer-events-none"
      } sm:fixed sm:w-1/2 sm:translate-x-1/2 sm:top-0 sm:left-0 sm:right-0 transition duration-500`}
    >
      <form
        onSubmit={createApplication}
        autoComplete="off"
        className="w-full flex flex-col space-y-4 rounded-lg shadow-[0px_5px_7px_0px_#4a5568] mx-auto my-4 bg-white"
      >
        <div className="flex flex-col sm:flex-row">
          <div className="w-full px-6 py-4 sm:w-1/2 flex flex-col space-y-6 sm:mx-auto">
            <div className="flex">
              <div className="font-medium text-sm">
                Будь ласка, заповніть форму, щоб подати заявку на вакансію!
              </div>
              <div
                onClick={() => dispatch(setFormApplyVision(false))}
                className="hover:opacity-50"
              >
                <i className="fa-solid fa-xmark fa-xl"></i>
              </div>
            </div>
            <div className="flex flex-col space-y-5 sm:space-y-4">
              <div className="flex flex-col">
                <label className="font-normal text-xs" htmlFor="first_name">
                  Ваше ім`я
                </label>
                <input
                  onChange={onChangeSetInputs}
                  type="text"
                  name="first_name"
                  id="first_name"
                  value={inputs.first_name}
                  className="rounded-lg p-1 border shadow-[0px_5px_10px_-3px_#4a5568]"
                />
              </div>
              <div className="flex flex-col">
                <label className="font-normal text-xs" htmlFor="last_name">
                  Ваше прізвище
                </label>
                <input
                  onChange={onChangeSetInputs}
                  type="text"
                  name="last_name"
                  id="last_name"
                  value={inputs.last_name}
                  className="rounded-lg p-1 border shadow-[0px_5px_10px_-3px_#4a5568]"
                />
              </div>
              <div className="flex flex-col">
                <label className="font-normal text-xs" htmlFor="age">
                  Ваш вік
                </label>
                <input
                  onChange={onChangeSetInputs}
                  type="number"
                  name="age"
                  id="age"
                  value={inputs.age}
                  className="rounded-lg p-1 border shadow-[0px_5px_10px_-3px_#4a5568]"
                />
              </div>

              <div className="flex flex-col">
                <label className="font-normal text-xs" htmlFor="phone_number">
                  Ваш номер телефону
                </label>
                <input
                  onChange={onChangeSetInputs}
                  type="text"
                  name="phone_number"
                  id="phone_number"
                  value={inputs.phone_number}
                  className={`rounded-lg p-1 border shadow-[0px_5px_10px_-3px_#4a5568] ${
                    !phoneCorrect
                      ? "border-2 border-red-400 outline-none"
                      : null
                  }`}
                />
                {!phoneCorrect && (
                  <div className="mt-2 text-base font-light">
                    Номер повинен починатися з +380, 380 або 0
                  </div>
                )}
              </div>
              <div className="flex flex-col font-normal text-xs">
                <label htmlFor="email">Ваш email</label>
                <input
                  onChange={onChangeSetInputs}
                  type="email"
                  name="email"
                  id="email"
                  value={inputs.email}
                  className={`rounded-lg p-1 border shadow-[0px_5px_10px_-3px_#4a5568] ${
                    !emailCorrect
                      ? "border-2 border-red-400 outline-none"
                      : null
                  }`}
                />
                {!emailCorrect && (
                  <div className="mt-2 text-base font-light">
                    Email повинен містити @
                  </div>
                )}
              </div>
              <div className="flex flex-col">
                <label
                  className="font-normal text-xs"
                  htmlFor="additional_list"
                >
                  Супровідний лист (по бажанню)
                </label>
                <textarea
                  onChange={onChangeSetInputs}
                  name="additional_list"
                  id="additional_list"
                  rows={3}
                  cols={10}
                  value={inputs.additional_list}
                  className="rounded-lg p-1 border shadow-[0px_5px_10px_-3px_#4a5568]"
                ></textarea>
              </div>
              {/* <div className="flex space-x-2 items-center text-sm w-fit mx-auto px-3 rounded-2xl bg-purple-200 py-3 border">
                <i className="fa-solid fa-upload"></i>
                <button>Прикріпити резюме</button>
              </div> */}
            </div>
          </div>
        </div>
        <div className="flex p-5">
          <input
            className="shadow-[0px_5px_10px_-3px_#4a5568] rounded-lg w-5/6 m-auto text-base bg-teal-500 px-7 py-2 sm:w-2/6"
            type="submit"
            value="Підтвердити"
          />
        </div>
      </form>
    </div>
  );
};

export default FormApplyJob;
