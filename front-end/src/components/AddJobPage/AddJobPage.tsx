import AfterCreatedJob from "../AfterCreatedJob/AfterCreatedJob";
import Footer from "../Footer/Footer";
import FormAddJob from "../FormAddJob/FormAddJob";
import Navbar from "../Navbar/Navbar";

const AddJobPage = () => {
  return (
    <div className="flex flex-col w-screen min-h-screen bg-green-100">
      <Navbar />
      <FormAddJob />
      <AfterCreatedJob />
      <Footer />
    </div>
  );
};

export default AddJobPage;
