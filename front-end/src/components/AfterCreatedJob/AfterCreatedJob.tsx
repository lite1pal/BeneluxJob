import React from "react";
import { setAfterCreatedJobVision } from "../../redux/slices/appSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const AfterCreatedJob = (): React.JSX.Element => {
  const dispatch = useDispatch();
  const redirect = useNavigate();
  return (
    <div className="flex flex-col bg-white absolute w-4/6 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-lg shadow-[0px_5px_10px_-3px_#4a5568]">
      <div className="p-10 text-2xl mx-auto">Вакансія створена</div>
      <hr />
      <div className="flex flex-col p-10 space-y-6 sm:w-1/2 sm:mx-auto">
        <button
          onClick={() => dispatch(setAfterCreatedJobVision(false))}
          className="shadow-[0px_5px_10px_-3px_#4a5568] transition hover:bg-gray-50 rounded-lg w-5/6 m-auto text-lg px-7 py-2"
        >
          Створити ще одну?
        </button>
        <button
          onClick={() => {
            dispatch(setAfterCreatedJobVision(false));
            redirect("/");
          }}
          className="shadow-[0px_5px_10px_-3px_#4a5568] transition hover:bg-gray-50 rounded-lg w-5/6 m-auto text-lg px-7 py-2"
        >
          Вийти на головну сторінку
        </button>
      </div>
    </div>
  );
};

export default AfterCreatedJob;
