import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setIsAuth } from "../../redux/slices/appSlice";
import beneluxJobLogo1 from "../../assets/Rectangle.png";
import beneluxJobLogo2 from "../../assets/Text.svg";
import { useState } from "react";

const Navbar = (): React.JSX.Element => {
  // storage
  const redirect = useNavigate();
  const dispatch = useDispatch();
  const isAuth = useSelector((state: any) => state.app.isAuth);
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);

  const handleResize = () => {
    setScreenWidth(window.innerWidth);
    console.log(screenWidth + " pixels");
  };

  // Attach event listener for window resize
  window.addEventListener("resize", handleResize);

  // functions
  const logOut = (): void => {
    localStorage.removeItem("sessionID");
    localStorage.removeItem("email");
    dispatch(setIsAuth(false));
    redirect("/signin");
  };

  // html and css
  return (
    <nav className="w-screen rounded-lg">
      {screenWidth <= 640 ? (
        <div className="flex items-center justify-between p-4">
          {/* 
          
          

        Mobile


          
          */}
          <div className="font-extralight flex flex-col space-y-3">
            <div
              className={`transition-all ${
                window.location.href.includes("company_info")
                  ? "border-b-2 border-gray-400 border-opacity-70"
                  : null
              }`}
              onClick={() => redirect("/company_info")}
            >
              Компанія
            </div>
            {isAuth ? (
              <div
                onClick={() => redirect("/add_job")}
                className={`transition-all ${
                  window.location.href.includes("add_job")
                    ? "border-b-2 border-gray-400 border-opacity-70"
                    : null
                }`}
              >
                Додати вакансію
              </div>
            ) : null}
          </div>
          <div className="flex flex-col space-y-4 justify-center">
            <div onClick={() => redirect("/")} className="flex">
              <img className="w-12 h-12 ml-auto" src={beneluxJobLogo1} />
              <img
                className="w-6/12 h-6/12 mr-auto"
                src={beneluxJobLogo2}
                alt="Benelux Job"
              />
            </div>
            <div className="flex justify-center items-center border-purple-200 rounded">
              <input
                type="text"
                className="bg-transparent pb-1 w-2/4 outline-none text-sm border-b-2 border-opacity-0 border-gray-500 transition duration-300 hover:border-opacity-100 focus:border-opacity-100"
                placeholder="Пошук..."
              />
              <i className="fa-solid fa-magnifying-glass"></i>
            </div>
          </div>
          <div className="flex flex-col space-y-2">
            {isAuth ? (
              <button
                className="border border-gray-500 rounded font-extralight text-sm px-4 hover:bg-black hover:bg-opacity-5 transition duration-300"
                onClick={logOut}
              >
                Вийти
              </button>
            ) : (
              <>
                <i className="fa-solid fa-right-to-bracket px-4"></i>
                <button
                  className="text-2xl font-light transition duration-500 hover:-translate-x-2"
                  onClick={() => redirect("/signin")}
                >
                  Ввійти
                </button>
              </>
            )}
            <div className="space-x-3">
              <i className="fa-brands fa-instagram"></i>
              <i className="fa-brands fa-telegram"></i>
              <i className="fa-brands fa-facebook"></i>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex items-center justify-evenly">
          {/* 
        


        Desktop
        


        */}
          <div onClick={() => redirect("/")} className="flex my-10">
            <img src={beneluxJobLogo1} />
            <img src={beneluxJobLogo2} alt="Benelux Job" />
          </div>
          <div className="flex justify-center w-1/3 items-center border-purple-200 rounded">
            <input
              type="text"
              className="bg-transparent w-2/4 outline-none text-lg border-b-2 border-opacity-0 border-gray-500 transition duration-300 hover:border-opacity-100 focus:border-opacity-100"
              placeholder="Пошук..."
            />
            <i className="fa-solid fa-magnifying-glass"></i>
          </div>
          <div className="flex items-center space-x-10">
            <div
              onClick={() => redirect("/company_info")}
              className={`font-light text-lg transition-all ${
                window.location.href.includes("company_info")
                  ? "border-b-2 border-gray-400 border-opacity-70"
                  : null
              }`}
            >
              Компанія
            </div>

            {isAuth ? (
              <div
                onClick={() => redirect("/add_job")}
                className={`font-light text-lg transition-all ${
                  window.location.href.includes("add_job")
                    ? "border-b-2 border-gray-400 border-opacity-70"
                    : null
                }`}
              >
                Додати вакансію
              </div>
            ) : null}
            <div className="flex space-x-10 items-center">
              {isAuth ? (
                <button
                  className="border border-gray-500 rounded font-extralight text-lg px-6 hover:bg-black hover:bg-opacity-5 transition duration-300"
                  onClick={logOut}
                >
                  Вийти
                </button>
              ) : (
                <div className="flex">
                  <i className="fa-solid fa-right-to-bracket px-4"></i>
                  <button
                    className="text-2xl font-light transition duration-500 hover:-translate-x-2"
                    onClick={() => redirect("/signin")}
                  >
                    Ввійти
                  </button>
                </div>
              )}
              <div className="space-x-3">
                <i className="fa-brands fa-instagram fa-2xl"></i>
                <i className="fa-brands fa-telegram fa-2xl"></i>
                <i className="fa-brands fa-facebook fa-2xl"></i>
              </div>
            </div>
          </div>
        </div>
      )}
      <hr className="border-gray-400" />
    </nav>
  );
};

export default Navbar;
