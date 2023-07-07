const Footer = (): React.JSX.Element => {
  return (
    <footer className="w-full py-6 bg-black bg-opacity-30 flex border justify-evenly items-center rounded-lg">
      <div className="p-4">
        <select className="bg-transparent text-sm">
          <option value="Українська">Українська</option>
          <option value="English">English</option>
        </select>
      </div>
      <div>
        <h4 className="font-medium mx-4 my-4 border-b-2 border-green-700">
          Additional info
        </h4>
        {/* <ul>
          <li>What is BeneluxJob?</li>
          <li>Contacts</li>
        </ul> */}
      </div>
      <div className="font-thin text-sm">
        <p>&copy; 2023 Benelux Job. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
