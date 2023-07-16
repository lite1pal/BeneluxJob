import ukraine_png from "../../assets/ukraine(1).png";
import english_png from "../../assets/united-kingdom.png";

const Footer = (): React.JSX.Element => {
  return (
    <footer className="w-full py-6 space-y-2 bg-black bg-opacity-30 flex flex-col border items-center rounded-lg">
      <div className="w-full flex justify-evenly">
        <div className="p-4 flex space-x-4">
          <img className="w-6 h-6" src={ukraine_png} alt="Ukraine image" />
          <img className="w-6 h-6" src={english_png} alt="English image" />
          {/* <select className="bg-transparent text-sm">
          <option value="Українська">Українська</option>
          <option value="English">English</option>
        </select> */}
        </div>
        <div>
          <div className="font-light mx-4 my-4">
            <a href="">More about company</a>
          </div>
          {/* <ul>
          <li>What is BeneluxJob?</li>
          <li>Contacts</li>
        </ul> */}
        </div>
      </div>
      <div className="font-extralight text-xs ">
        <p>&copy; 2023 Benelux Job. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
