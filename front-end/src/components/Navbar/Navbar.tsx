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
import Cookies from "js-cookie";

export interface IJob {
  _id: string;
  name: string;
  description: string;
  salary: number;
  hot: boolean;
  withLivingHouse: boolean;
  withoutLanguage: boolean;
  withoutExp: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export const language = navigator.language;

const Navbar = (): React.JSX.Element => {
  // storage
  const redirect = useNavigate();
  const dispatch = useDispatch();
  const isAuth = useSelector((state: any) => state.app.isAuth);
  const jobs = useSelector((state: any) => state.app.jobs);
  const apiUrl = useSelector((state: any) => state.app.apiUrl);
  const pageNumber = useSelector((state: any) => state.app.pageNumber);
  const isSearchingJobs = useSelector(
    (state: any) => state.app.isSearchingJobs
  );
  const pageNumberChanges = useSelector(
    (state: any) => state.app.pageNumberChanges
  );
  const currentUser = useSelector((state: any) => state.app.currentUser);
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  const [profileClicked, setProfileClicked] = useState(false);
  const [mobileNavbarSectionsVision, setMobileNavbarSectionsVision] =
    useState(false);

  const handleSetMobileNavbarSectionsVision = () => {
    if (mobileNavbarSectionsVision) {
      setMobileNavbarSectionsVision(false);
    } else {
      setMobileNavbarSectionsVision(true);
    }
  };

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
    Cookies.remove("jwtToken");
    Cookies.remove("id");

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
        pageNumber,
        isSearchingJobs,
        pageNumberChanges,
        jobs,
        dispatch,
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
      getJobs(apiUrl, pageNumber, false, pageNumberChanges, jobs, dispatch);
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
          <div
            onClick={handleSetMobileNavbarSectionsVision}
            className="hover:opacity-50"
          >
            {mobileNavbarSectionsVision ? (
              <i className="fa-solid fa-list-ul fa-rotate-180"></i>
            ) : (
              <i className="fa-solid fa-list-ul"></i>
            )}
          </div>
          <div
            className={`transition shadow-[0px_5px_7px_0px_#4a5568] ${
              mobileNavbarSectionsVision
                ? "opacity-100"
                : "opacity-0 pointer-events-none"
            } absolute top-20 bg-green-200 rounded-lg left-5`}
          >
            <div className="font-extralight space-y-2 p-5 flex flex-col">
              <div
                className={`transition-all mx-auto hover:bg-green-400 p-2 ${
                  window.location.href.includes("company_info")
                    ? "border-b-2 border-gray-400 border-opacity-70"
                    : null
                }`}
                onClick={() => redirect("/company_info")}
              >
                {language === "uk" ? "Компанія" : "Company"}
              </div>
              <div
                onClick={() => {
                  redirect("/");
                  setMobileNavbarSectionsVision(false);
                }}
                className="hover:bg-green-400 p-2"
              >
                {language === "uk" ? "Вакансії" : "Jobs"}
              </div>
              {isAuth ? <hr className="border-gray-400" /> : null}
              {isAuth && currentUser.admin ? (
                <div
                  onClick={() => redirect("/add_job")}
                  className={`transition-all p-2 hover:bg-green-400 ${
                    window.location.href.includes("add_job")
                      ? "border-b-2 border-gray-400 border-opacity-70"
                      : null
                  }`}
                >
                  {language === "uk" ? "Кабінет" : "Office"}
                </div>
              ) : null}
            </div>
          </div>
          <div className="flex flex-col space-y-4 justify-center">
            <div onClick={() => redirect("/")} className="flex">
              <img className="w-14 h-14 ml-auto" src={beneluxJobLogo1} />
              <img
                className="w-7/12 h-7/12 mr-auto"
                src={beneluxJobLogo2}
                alt="Benelux Job"
              />
            </div>
            <div className="flex justify-center items-center border-purple-200 rounded">
              <input
                onChange={onChangeSearchJobs}
                type="text"
                className="bg-transparent pb-1 w-2/4 outline-none text-sm border-b-2 border-opacity-0 border-gray-500 transition duration-300 hover:border-opacity-100 focus:border-opacity-100"
                placeholder={language === "uk" ? "Пошук..." : "Search..."}
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
                {language === "uk" ? "Вийти" : "Log out"}
              </button>
            ) : (
              <button
                className="border border-gray-500 rounded font-extralight text-sm px-4 hover:bg-black hover:bg-opacity-5 transition duration-300"
                onClick={() => redirect("/signin")}
              >
                {language === "uk" ? "Ввійти" : "Sign in"}
              </button>
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
              placeholder={language === "uk" ? "Пошук..." : "Search..."}
            />
            <i className="fa-solid fa-magnifying-glass"></i>
          </div>
          <div className="flex items-center space-x-10">
            <div className="flex flex-col space-y-2 items-center">
              <div
                onClick={() => redirect("/company_info")}
                className={`font-light text-lg border-b-2 hover:border-gray-400 hover:border-opacity-70 transition-all ${
                  window.location.href.includes("company_info")
                    ? " border-gray-400 border-opacity-70"
                    : "border-transparent"
                }`}
              >
                {language === "uk" ? "Компанія" : "Company"}
              </div>
              <div
                onClick={() => redirect("/")}
                className="font-light text-lg border-b-2 border-transparent hover:border-gray-400 hover:border-opacity-70 transition-all"
              >
                {language === "uk" ? "Вакансії" : "Jobs"}
              </div>
            </div>

            {isAuth && currentUser.admin ? (
              <div
                onClick={() => redirect("/add_job")}
                className={`font-light text-lg border-b-2 hover:border-gray-400 hover:border-opacity-70 transition-all ${
                  window.location.href.includes("add_job")
                    ? "border-gray-400 border-opacity-70"
                    : "border-transparent"
                }`}
              >
                {language === "uk" ? "Кабінет" : "Office"}
              </div>
            ) : null}
            <div className="flex space-x-10 items-center">
              {isAuth ? (
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
                      {language === "uk" ? "Вийти" : "Log out"}
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
                    {language === "uk" ? "Ввійти" : "Sign in"}
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
