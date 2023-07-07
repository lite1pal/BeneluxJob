import { useSelector } from "react-redux";
import AfterCreatedJob from "../AfterCreatedJob/AfterCreatedJob";
import Footer from "../Footer/Footer";
import FormAddJob from "../FormAddJob/FormAddJob";
import Navbar from "../Navbar/Navbar";

const AddJobPage = () => {
  const AfterCreatedJobVision = useSelector(
    (state: any) => state.app.AfterCreatedJobVision
  );

  return (
    <div className="flex flex-col w-screen min-h-screen bg-green-100">
      <Navbar />
      <FormAddJob />
      {AfterCreatedJobVision ? <AfterCreatedJob /> : null}
      <Footer />
    </div>
  );
};

export default AddJobPage;
