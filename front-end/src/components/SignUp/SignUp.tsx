import { useState } from "react";
import bg_signup from "../../assets/dan-meyers-IQVFVH0ajag-unsplash 1.png";
import { useDispatch, useSelector } from "react-redux";
import { GoogleLogin } from "@react-oauth/google";
import Loading from "../Loading/Loading";
import { setIsLoading } from "../../redux/slices/appSlice";
import { useNavigate } from "react-router-dom";

interface IInputs {
  first_name: string;
  last_name: string;
  age: number;
  phone_number: number;
  email: string;
  password: string;
}

export const hasUpperCase = (string: string): boolean => {
  const uppercaseRegex = /[A-Z\u0410-\u042F]/;

  return uppercaseRegex.test(string);
};

export const hasDigit = (string: string): boolean => {
  const numberRegex = /\d/;

  return numberRegex.test(string);
};

const SignUp = (): React.JSX.Element => {
  const [inputs, setInputs] = useState<IInputs>({
    first_name: "",
    last_name: "",
    age: 0,
    phone_number: 0,
    email: "",
    password: "",
  });
  const apiUrl = useSelector((state: any) => state.app.apiUrl);
  const [emailCorrect, setEmailCorrect] = useState(true);
  const [passwordCorrect, setPasswordCorrect] = useState(true);
  const [phoneCorrect, setPhoneCorrect] = useState(true);
  const isLoading = useSelector((state: any) => state.app.isLoading);
  const dispatch = useDispatch();
  const redirect = useNavigate();

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

    // validates password
    if (e.target.name === "password" && e.target.value.length >= 8) {
      if (!hasUpperCase(e.target.value) || !hasDigit(e.target.value)) {
        setPasswordCorrect(false);
      } else {
        setPasswordCorrect(true);
      }
    } else {
      setPasswordCorrect(true);
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

  const onChangeSetInputs = (e: any): void => {
    validateInputValue(e);
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  };

  const createUser = async (e: any): Promise<void> => {
    e.preventDefault();
    dispatch(setIsLoading(true));
    try {
      const requestOptions = {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(inputs),
      };

      const response = await fetch(`${apiUrl}/users/create`, requestOptions);
      const parseRes = await response.json();
      console.log(parseRes);
      if (response.ok) {
        setTimeout(() => {
          dispatch(setIsLoading(false));
          redirect("/signin");
        }, 1000);
      } else {
        dispatch(setIsLoading(false));
      }
    } catch (err) {
      console.error(err);
    }
  };
  return (
    <div
      className={`flex flex-col sm:flex-row w-screen min-h-screen bg-green-100 ${
        isLoading ? "opacity-50" : null
      }`}
    >
      {isLoading ? <Loading /> : null}
      <div className={`w-8/12 hidden sm:flex`}>
        <img className="w-full h-screen" src={bg_signup} alt="field" />
        <div className="italic font-thin text-3xl absolute top-1/4 translate-x-1/2">
          <div>Розкрийте свій потенціал:</div>
          <div>де пристрасть зустрічається з метою!</div>
        </div>
      </div>

      <div className="w-full my-auto sm:w-1/3">
        <div>
          <form
            onSubmit={createUser}
            autoComplete="off"
            className="flex flex-col space-y-8"
          >
            <div className="text-3xl sm:text-2xl font-light mx-auto">
              <h3>Реєстрація</h3>
            </div>
            <div className="flex flex-col w-5/6 sm:w-4/6 mx-auto space-y-4">
              <input
                onChange={onChangeSetInputs}
                className="px-8 text-lg sm:text-sm py-2 bg-transparent border-2 border-gray-400 rounded-lg"
                type="text"
                placeholder="Ім`я"
                name="first_name"
              />
              <input
                onChange={onChangeSetInputs}
                className="px-8 text-lg sm:text-sm py-2 bg-transparent border-2 border-gray-400 rounded-lg"
                type="text"
                placeholder="Прізвище"
                name="last_name"
              />
              <input
                onChange={onChangeSetInputs}
                className="px-8 text-lg sm:text-sm py-2 bg-transparent border-2 border-gray-400 rounded-lg"
                type="number"
                placeholder="Вік"
                name="age"
              />
              <div
                className={`${
                  phoneCorrect ? "hidden" : "block"
                } font-light mx-auto text-sm p-0`}
              >
                Номер повинен починатися з 0, +380 або 380
              </div>
              <input
                onChange={onChangeSetInputs}
                className={`px-8 text-lg sm:text-sm py-2 bg-transparent border-2 border-gray-400 rounded-lg ${
                  !phoneCorrect ? "border-2 border-red-400 outline-none" : null
                }`}
                type="text"
                placeholder="Номер телефону (10 цифр)"
                name="phone_number"
              />
              <div
                className={`${
                  emailCorrect ? "hidden" : "block"
                } font-light mx-auto text-sm p-0`}
              >
                E-email повинен містити @
              </div>
              <input
                onChange={onChangeSetInputs}
                className={`px-8 text-lg sm:text-sm py-2 bg-transparent border-2 border-gray-400 rounded-lg ${
                  !emailCorrect ? "border-2 border-red-400 outline-none" : ""
                }`}
                type="email"
                placeholder="E-mail (example@mail.com)"
                name="email"
                autoComplete="new-password"
              />
              <div
                className={`${
                  passwordCorrect ? "hidden" : "block"
                } font-light text-sm`}
              >
                Пароль повинен мати як найменше одну велику літеру та цифру
              </div>
              <input
                onChange={onChangeSetInputs}
                className={`px-8 text-lg sm:text-sm py-2 bg-transparent border-2 border-gray-400 rounded-lg ${
                  !passwordCorrect
                    ? "border-2 border-red-400 outline-none"
                    : null
                }`}
                type="password"
                placeholder="Пароль (мінімум 8 символів)"
                name="password"
              />
              <input
                className="border-2 sm:text-lg w-2/3 sm:w-2/3 sm:py-2 border-gray-500 px-5 font-normal transition hover:bg-green-200 text-2xl py-4 mx-auto rounded-lg"
                type="submit"
                value="Створити аккаунт"
              />
            </div>
            <div className="flex flex-col mx-auto space-y-4">
              <div className="text-xl sm:text-lg mx-auto">
                Або зареєструватись за допомогою:
              </div>
              <div className="flex items-center space-x-4 mx-auto">
                <GoogleLogin
                  onSuccess={(credentials) => console.log(credentials)}
                  onError={() => {
                    console.log("Login Failed");
                  }}
                  shape="circle"
                  type="icon"
                  useOneTap
                  auto_select
                />
                {/* <i className="fa-brands fa-facebook fa-2xl"></i> */}
              </div>
              <div className="flex items-center mx-auto space-x-3">
                <div className="text-xl sm:text-lg">Маєш аккаунт?</div>
                <a
                  href="/signin"
                  className="text-xl text-blue-500 sm:text-lg underline"
                >
                  Увійди
                </a>
              </div>
              {/* <a href="">Forgot password?</a> */}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
