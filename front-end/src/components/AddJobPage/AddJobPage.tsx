import { useState } from "react";
import AfterCreatedJob from "../AfterCreatedJob/AfterCreatedJob";
import Footer from "../Footer/Footer";
import FormAddJob from "../FormAddJob/FormAddJob";
import Navbar from "../Navbar/Navbar";
import Applications from "../Applications/Applications";

const AddJobPage = () => {
  const [addJobVision, setAddJobVision] = useState(true);
  const [applicationsVision, setApplicationsVision] = useState(false);

  return (
    <div className="flex flex-col w-screen min-h-screen bg-green-100">
      <Navbar />
      <div className="flex flex-col">
        <div className="flex">
          <div className="h-1/3 flex justify-evenly mx-auto items-center font-light text-sm space-x-8 sm:text-base sm:space-x-16 p-6">
            <div
              onClick={() => {
                setAddJobVision(true);
                setApplicationsVision(false);
              }}
              className={`border-b-2 border-gray-400 hover:border-opacity-100 transition duration-300 ${
                addJobVision ? "border-opacity-100" : "border-opacity-0"
              }`}
            >
              Додати вакансію
            </div>
            <div
              onClick={() => {
                setApplicationsVision(true);
                setAddJobVision(false);
              }}
              className={`border-b-2 border-gray-400 hover:border-opacity-100 transition duration-300 ${
                applicationsVision ? "border-opacity-100" : "border-opacity-0"
              }`}
            >
              Проглянути відгуки
            </div>
          </div>
        </div>
        {addJobVision ? <FormAddJob /> : <Applications />}
      </div>
      <AfterCreatedJob />
      <Footer />
    </div>
  );
};

export default AddJobPage;
