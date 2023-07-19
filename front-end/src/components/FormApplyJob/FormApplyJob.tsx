import { useDispatch, useSelector } from "react-redux";
import {
  setAfterApplyingVision,
  setApplications,
  setFormApplyVision,
} from "../../redux/slices/appSlice";
import { useState } from "react";
import { language } from "../Navbar/Navbar";
import Cookies from "js-cookie";

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
          Authorization: `Bearer ${Cookies.get("jwtToken")}`,
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
                {language === "uk"
                  ? "Будь ласка, заповніть форму, щоб подати заявку на вакансію"
                  : "Please, fulfill the form to apply for a job"}
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
                  {language === "uk" ? "Ваше ім`я" : "Your first name"}
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
                  {language === "uk" ? "Ваше прізвище" : "Your last name"}
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
                  {language === "uk" ? "Ваш вік" : "Your age"}
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
                  {language === "uk"
                    ? "Ваш номер телефону"
                    : "Your phone number"}
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
                    {language === "uk"
                      ? "Номер повинен починатися з +380, 380 або 0"
                      : "Phone number must be started with +380, 380 or 0"}
                  </div>
                )}
              </div>
              <div className="flex flex-col font-normal text-xs">
                <label htmlFor="email">
                  {language === "uk" ? "Ваш email" : "Your email"}
                </label>
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
                    {language === "uk"
                      ? "Email повинен містити @"
                      : "Email must include @"}
                  </div>
                )}
              </div>
              <div className="flex flex-col">
                <label
                  className="font-normal text-xs"
                  htmlFor="additional_list"
                >
                  {language === "uk"
                    ? "Супровідний лист (по бажанню)"
                    : "Additional list (optional)"}
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
            value={language === "uk" ? "Підтвердити" : "Submit"}
          />
        </div>
      </form>
    </div>
  );
};

export default FormApplyJob;
