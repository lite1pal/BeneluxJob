import { CredentialResponse, GoogleLogin } from "@react-oauth/google";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setIsAuth } from "../../redux/slices/appSlice";
import bg_signin from "../../assets/dan-meyers-IQVFVH0ajag-unsplash 1.png";

const SignIn = (): React.JSX.Element => {
  const redirect = useNavigate();
  const dispatch = useDispatch();
  const apiUrl = useSelector((state: any) => state.app.apiUrl);

  const signinUserGoogle = async (
    credentials: CredentialResponse
  ): Promise<void> => {
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
        redirect("/");
      }
      console.log(parseRes);
    } catch (err) {
      console.error(err);
    }
  };
  return (
    <div className="flex flex-col sm:flex-row w-screen min-h-screen bg-green-100">
      <div className="w-8/12 hidden sm:flex">
        <img className="w-full" src={bg_signin} alt="field" />
        <div className="italic font-thin text-3xl absolute w-4/6 top-1/3 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <div>Розкрийте свій потенціал:</div>
          <div>де пристрасть зустрічається з метою!</div>
        </div>
      </div>
      <div className="w-full m-auto sm:w-1/3 ">
        <div>
          <form className="flex flex-col space-y-8">
            <div className="text-3xl font-light mx-auto">
              <h3>Вхід</h3>
            </div>
            <div className="flex flex-col w-5/6 mx-auto space-y-4">
              <input
                className="px-8 text-lg py-2 bg-transparent border-2 border-gray-400 rounded-lg"
                type="email"
                placeholder="E-mail"
              />
              <input
                className="px-8 text-lg py-2 bg-transparent border-2 border-gray-400 rounded-lg"
                type="password"
                placeholder="Пароль"
              />
              <input
                className="border-2 border-gray-400 px-5 font-normal transition hover:bg-green-200 text-2xl py-4 w-1/2 mx-auto rounded-lg"
                type="submit"
                value="Увійти"
              />
            </div>
            <div className="flex flex-col mx-auto space-y-4">
              <div className="text-xl mx-auto">Або увійти за допомогою:</div>
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
                <i className="fa-brands fa-facebook fa-2xl"></i>
              </div>
              <div className="flex items-center space-x-3">
                <div className="text-xl">Не маєш аккаунту?</div>
                <a href="" className="text-xl underline">
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
