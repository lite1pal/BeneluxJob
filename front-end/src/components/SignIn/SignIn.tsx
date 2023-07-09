import { CredentialResponse, GoogleLogin } from "@react-oauth/google";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setIsAuth, setIsLoading } from "../../redux/slices/appSlice";
import bg_signin from "../../assets/dan-meyers-IQVFVH0ajag-unsplash 1.png";
import { useState } from "react";
import Loading from "../Loading/Loading";

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
      console.log(parseRes);
      if (response.ok) {
        setTimeout(() => {
          dispatch(setIsLoading(false));
          localStorage.setItem("sessionID", parseRes.result.sessionID);
          localStorage.setItem("email", parseRes.result.user.email);
          dispatch(setIsAuth(true));
          redirect("/");
        }, 1000);
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
        localStorage.setItem("sessionID", parseRes.result.sessionID);
        localStorage.setItem("email", parseRes.result.user.email);
        dispatch(setIsAuth(true));
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
      <div className="w-8/12 hidden sm:flex">
        <img className="w-full h-screen" src={bg_signin} alt="field" />
        <div className="italic font-thin text-3xl absolute top-1/4 translate-x-1/2">
          <div>Розкрийте свій потенціал:</div>
          <div>де пристрасть зустрічається з метою!</div>
        </div>
      </div>
      <div className="w-full my-auto sm:w-1/3">
        <div>
          <form onSubmit={signinUser} className="flex flex-col space-y-8">
            <div className="text-3xl sm:text-2xl font-light mx-auto">
              <h3>Вхід</h3>
            </div>
            <div
              onClick={(e) => console.log(e.target)}
              className="flex flex-col w-5/6 sm:w-4/6 mx-auto space-y-4"
            >
              <input
                onChange={onChangeSetInputs}
                className="px-8 text-lg py-2 sm:text-sm bg-transparent border-2 border-gray-400 rounded-lg"
                type="email"
                placeholder="E-mail"
                name="email"
              />
              <input
                onChange={onChangeSetInputs}
                className="px-8 text-lg py-2 sm:text-sm bg-transparent border-2 border-gray-400 rounded-lg"
                type="password"
                placeholder="Пароль"
                name="password"
              />
              <input
                className="border-2 border-gray-500 px-5 sm:text-lg sm:w-1/3 sm:py-2 font-normal transition hover:bg-green-200 text-2xl py-4 w-1/2 mx-auto rounded-lg"
                type="submit"
                value="Увійти"
              />
            </div>
            <div className="flex flex-col mx-auto space-y-4">
              <div className="text-xl mx-auto sm:text-lg">
                Або увійти за допомогою:
              </div>
              <div className="flex items-center space-x-4 mx-auto">
                <GoogleLogin
                  onSuccess={(credentials) => signinUserGoogle(credentials)}
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
              <div className="flex items-center space-x-3">
                <div className="text-xl sm:text-lg">Не маєш аккаунту?</div>
                <a
                  href="/signup"
                  className="text-xl text-blue-500 sm:text-lg underline"
                >
                  Зареєструйся
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
