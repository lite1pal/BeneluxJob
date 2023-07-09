import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  setFoundJobs,
  setIsAuth,
  setIsSearchingJobs,
  setScrollY,
} from "../../redux/slices/appSlice";
import beneluxJobLogo1 from "../../assets/Rectangle.png";
import beneluxJobLogo2 from "../../assets/Text.svg";
import { useState } from "react";
import { getJobs } from "../Jobs/Jobs";

export interface IJob {
  _id: string;
  name: string;
  description: string;
  salary: number;
  hot: boolean;
  withLivingHouse: boolean;
  withoutLanguage: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const Navbar = (): React.JSX.Element => {
  // storage
  const redirect = useNavigate();
  const dispatch = useDispatch();
  const isAuth = useSelector((state: any) => state.app.isAuth);
  const jobs = useSelector((state: any) => state.app.jobs);
  const apiUrl = useSelector((state: any) => state.app.apiUrl);
  const pageNumberChanges = useSelector(
    (state: any) => state.app.pageNumberChanges
  );
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  const [profileClicked, setProfileClicked] = useState(false);

  const handleResize = () => {
    setScreenWidth(window.innerWidth);
  };

  const handleScrollY = () => {
    dispatch(setScrollY(window.scrollY));
  };

  // Attach event listener for window resize
  window.addEventListener("resize", handleResize);

  // Attach event listener for scrollY
  window.addEventListener("scroll", handleScrollY);

  // functions
  const logOut = (): void => {
    localStorage.removeItem("sessionID");
    localStorage.removeItem("email");
    dispatch(setIsAuth(false));
    redirect("/signin");
  };

  const onClickHandleProfileClicked = (): void => {
    if (profileClicked) {
      setProfileClicked(false);
    } else {
      setProfileClicked(true);
    }
  };

  const onChangeSearchJobs = (e: any): void => {
    if (e.target.value.length > 0) {
      dispatch(setIsSearchingJobs(true));
      getJobs(
        apiUrl,
        0,
        dispatch,
        jobs,
        true,
        pageNumberChanges,
        e.target.value
      );
      const search = e.target.value;
      const filteredJobs = jobs.filter((job: IJob) => {
        return job.name.toLowerCase().includes(search.toLowerCase());
      });

      dispatch(setFoundJobs(filteredJobs));
    } else {
      dispatch(setFoundJobs([]));
      dispatch(setIsSearchingJobs(false));
    }
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
                name="search"
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
              <a href="https://www.instagram.com/ludmyla.vip/?igshid=MmU2YjMzNjRlOQ%3D%3D">
                <i className="fa-brands fa-instagram"></i>
              </a>
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
              onChange={onChangeSearchJobs}
              type="text"
              className="bg-transparent w-2/4 outline-none text-lg border-b-2 border-opacity-0 border-gray-500 transition duration-300 hover:border-opacity-100 focus:border-opacity-100"
              placeholder="Пошук..."
            />
            <i className="fa-solid fa-magnifying-glass"></i>
          </div>
          <div className="flex items-center space-x-10">
            <div
              onClick={() => redirect("/company_info")}
              className={`font-light text-lg border-b-2 hover:border-gray-400 hover:border-opacity-70 transition-all ${
                window.location.href.includes("company_info")
                  ? " border-gray-400 border-opacity-70"
                  : "border-transparent"
              }`}
            >
              Компанія
            </div>

            {isAuth ? (
              <div
                onClick={() => redirect("/add_job")}
                className={`font-light text-lg border-b-2 hover:border-gray-400 hover:border-opacity-70 transition-all ${
                  window.location.href.includes("add_job")
                    ? "border-gray-400 border-opacity-70"
                    : "border-transparent"
                }`}
              >
                Додати вакансію
              </div>
            ) : null}
            <div className="flex space-x-10 items-center">
              {isAuth ? (
                // <button
                //   className="border border-gray-500 rounded font-extralight text-lg px-6 hover:bg-black hover:bg-opacity-5 transition duration-300"
                //   onClick={logOut}
                // >
                //   Вийти
                // </button>
                <>
                  <div
                    onClick={onClickHandleProfileClicked}
                    className="transition border-b-2 border-transparent duration-300 hover:border-black pb-1"
                  >
                    <i className="fa-regular fa-user fa-xl"></i>
                  </div>

                  <div
                    className={`absolute flex flex-col transition bg-green-300 border ${
                      profileClicked
                        ? "opacity-100"
                        : "opacity-0 pointer-events-none"
                    } rounded shadow-lg`}
                  >
                    {/* Dropdown menu options */}

                    <a
                      onClick={logOut}
                      className="px-4 py-1 hover:bg-green-500"
                    >
                      Вийти
                    </a>
                  </div>
                </>
              ) : (
                <div className="flex">
                  {/* <i className="fa-solid fa-right-to-bracket px-4"></i> */}
                  <button
                    className="border border-gray-500 rounded font-extralight text-lg px-6 hover:bg-black hover:bg-opacity-5 transition duration-300"
                    onClick={() => redirect("/signin")}
                  >
                    Ввійти
                  </button>
                </div>
              )}
              <div className="space-x-3">
                <a
                  target="_blank"
                  href="https://www.instagram.com/ludmyla.vip/?igshid=MmU2YjMzNjRlOQ%3D%3D"
                >
                  <i className="fa-brands fa-instagram fa-xl"></i>
                </a>
                <i className="fa-brands fa-telegram fa-xl"></i>
                <i className="fa-brands fa-facebook fa-xl"></i>
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
