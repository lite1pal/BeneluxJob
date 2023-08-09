import { CredentialResponse, GoogleLogin } from "@react-oauth/google";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  setCurrentUser,
  setIsAuth,
  setIsLoading,
} from "../../redux/slices/appSlice";
import bg_signin from "../../assets/dan-meyers-IQVFVH0ajag-unsplash 1.png";
import { useState } from "react";
import Loading from "../Loading/Loading";
import { language } from "../Navbar/Navbar";
import Cookies from "js-cookie";

interface IInputs {
  email: string;
  password: string;
}

const SignIn = (): React.JSX.Element => {
  const redirect = useNavigate();
  const dispatch = useDispatch();
  const apiUrl = useSelector((state: any) => state.app.apiUrl);
  const isLoading = useSelector((state: any) => state.app.isLoading);
  const [inputs, setInputs] = useState<IInputs>({ email: "", password: "" });
  const [errorResponse, setErrorResponse] = useState("");

  const onChangeSetInputs = (e: any): void => {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  };

  const signinUser = async (e: any): Promise<void> => {
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
      const response = await fetch(`${apiUrl}/users/signin`, requestOptions);
      const parseRes = await response.json();
      if (response.ok) {
        setTimeout(() => {
          Cookies.set("jwtToken", parseRes.result.jwtToken);
          Cookies.set("id", parseRes.result.user._id);
          dispatch(setCurrentUser(parseRes.result.user));
          dispatch(setIsAuth(true));
          dispatch(setIsLoading(false));
          redirect("/");
        }, 1000);
      } else if (
        parseRes.message === "Account with this email is not created"
      ) {
        dispatch(setIsLoading(false));
        setErrorResponse(
          language === "uk"
            ? "Аккаунт з таким email-ом не існує"
            : parseRes.message
        );
      } else if (parseRes.message === "Password is incorrect") {
        dispatch(setIsLoading(false));
        setErrorResponse(
          language === "uk" ? "Пароль не вірний" : parseRes.message
        );
      }
    } catch (err) {
      console.error(err);
    }
  };

  const signinUserGoogle = async (
    credentials: CredentialResponse
  ): Promise<void> => {
    dispatch(setIsLoading(true));
    try {
      const googleToken = credentials.credential;
      const requestOptions = {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({ googleToken }),
      };
      const response = await fetch(
        `${apiUrl}/users/signin_google`,
        requestOptions
      );
      const parseRes = await response.json();
      if (response.ok) {
        Cookies.set("jwtToken", parseRes.result.jwtToken);
        Cookies.set("id", parseRes.result.user._id);
        dispatch(setIsAuth(true));
        dispatch(setCurrentUser(parseRes.result.user));
        setTimeout(() => {
          dispatch(setIsLoading(false));
          redirect("/");
        }, 1000);
      }
      console.log(parseRes);
    } catch (err) {
      console.error(err);
    }
  };
  return (
    <div
      className={`flex flex-col sm:flex-row w-screen ${
        isLoading ? "opacity-50" : null
      } min-h-screen bg-green-100`}
    >
      {isLoading ? <Loading /> : null}
      <div className="w-8/12 hidden lg:flex">
        <img className="w-full h-screen" src={bg_signin} alt="field" />
        <div className="italic font-thin text-3xl absolute top-1/4 lg:translate-x-1/4 translate-x-1/2">
          <div>
            {language === "uk"
              ? "Розкрийте свій потенціал:"
              : "Unlock your potential"}
          </div>
          <div>
            {language === "uk"
              ? "де пристрасть зустрічається з метою!"
              : "where the passion meets the purpose!"}
          </div>
        </div>
      </div>
      <div className="w-full my-auto lg:w-1/3">
        <div>
          <form onSubmit={signinUser} className="flex flex-col space-y-8">
            <div className="text-3xl lg:text-2xl font-light mx-auto">
              <h3>{language === "uk" ? "Вхід" : "Sign in"}</h3>
            </div>
            <div
              onClick={(e) => console.log(e.target)}
              className="flex flex-col sm:w-4/6 md:w-1/2 lg:w-4/6 mx-auto space-y-4"
            >
              <input
                onChange={onChangeSetInputs}
                className="px-8 text-lg py-2 lg:text-sm bg-transparent border-2 border-gray-400 rounded-lg"
                type="email"
                placeholder="E-mail"
                name="email"
              />
              <input
                onChange={onChangeSetInputs}
                className="px-8 text-lg py-2 lg:text-sm bg-transparent border-2 border-gray-400 rounded-lg"
                type="password"
                placeholder={language === "uk" ? "Пароль" : "Password"}
                name="password"
              />
              <div className="text-red-700 text-lg">{errorResponse}</div>
              <input
                className="border-2 border-gray-500 lg:text-lg lg:w-1/3 lg:py-2 font-normal px-1 transition hover:bg-green-200 text-2xl py-4 w-1/2 mx-auto rounded-lg"
                type="submit"
                value={language === "uk" ? "Увійти" : "Sign in"}
              />
            </div>
            <div className="flex flex-col mx-auto space-y-4">
              <div className="text-xl mx-auto lg:text-lg">
                {language === "uk"
                  ? "Або увійти за допомогою:"
                  : "Or sign in with:"}
              </div>
              <div className="flex items-center space-x-4 mx-auto">
                <GoogleLogin
                  onSuccess={(credentials) => signinUserGoogle(credentials)}
                  onError={() => {
                    console.log("Login Failed");
                  }}
                  shape="circle"
                  type="icon"
                  auto_select
                  useOneTap
                />
                {/* <i className="fa-brands fa-facebook fa-2xl"></i> */}
              </div>
              <div className="flex items-center space-x-3">
                <div className="text-xl lg:text-lg">
                  {language === "uk"
                    ? "Не маєш аккаунту?"
                    : "Don't have an account?"}
                </div>
                <a
                  href="/signup"
                  className="text-xl text-blue-500 sm:text-lg underline"
                >
                  {language === "uk" ? "Зареєструйся" : "Sign up"}
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

export default SignIn;
