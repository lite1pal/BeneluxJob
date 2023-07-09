import Footer from "../Footer/Footer";
import Navbar from "../Navbar/Navbar";

const CompanyInfoPage = (): React.JSX.Element => {
  return (
    <div className="flex flex-col w-screen min-h-screen bg-green-100">
      <Navbar />
      <div className="w-full flex flex-grow">
        <div className="w-10/12 m-10 mx-auto bg-white">
          <div className="flex flex-col space-y-6 m-10">
            <div className="font-semibold">
              Benelux JOB - новий вимір працевлаштування.
            </div>
            <div>
              Чи виникли у вас проблеми з роботодавцем або агентством з
              працевлаштування, ви не отримали умови працевлаштування в
              письмовій формі, ви працевлаштовані нелегально або маєте проблеми
              з отриманням винагороди за свою роботу?
            </div>
            <div>
              Benelux Job Project був створений як відповідь на нові проблеми на
              ринку праці та думку працівників.
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default CompanyInfoPage;
