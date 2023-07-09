import { useDispatch, useSelector } from "react-redux";
import { setFormApplyVision } from "../../redux/slices/appSlice";

const FormApplyJob = (): React.JSX.Element => {
  const dispatch = useDispatch();
  const FormApplyVision = useSelector(
    (state: any) => state.app.FormApplyVision
  );
  const onChangeSetInputs = () => {};

  return (
    <div
      className={`w-full ${
        FormApplyVision
          ? "max-sm:block sm:opacity-100"
          : "max-sm:hidden sm:opacity-0 pointer-events-none"
      } sm:fixed sm:w-1/2 sm:translate-x-1/2 sm:top-0 sm:left-0 sm:right-0 transition duration-500`}
    >
      <form className="w-full flex flex-col space-y-4 rounded-lg shadow-[0px_5px_7px_0px_#4a5568] mx-auto my-4 bg-white">
        <div className="flex flex-col sm:flex-row">
          <div className="w-full px-6 py-4 sm:w-1/2 flex flex-col space-y-6 sm:mx-auto">
            <div className="flex">
              <div className="font-medium text-sm">
                Будь ласка, заповніть форму, щоб подати заявку на вакансію!
              </div>
              <div
                onClick={() => dispatch(setFormApplyVision(false))}
                className="hover:opacity-50"
              >
                <i className="fa-solid fa-xmark fa-xl"></i>
              </div>
            </div>
            <div className="flex flex-col space-y-5 sm:space-y-4">
              <div className="flex flex-col">
                <label className="font-normal text-xs" htmlFor="name">
                  Ваше ім`я
                </label>
                <input
                  onChange={onChangeSetInputs}
                  type="text"
                  name="name"
                  id="name"
                  className="rounded-lg p-1 border shadow-[0px_5px_10px_-3px_#4a5568]"
                />
              </div>
              <div className="flex flex-col">
                <label className="font-normal text-xs" htmlFor="salary">
                  Ваше прізвище
                </label>
                <input
                  onChange={onChangeSetInputs}
                  type="number"
                  name="salary"
                  id="salary"
                  className="rounded-lg p-1 border shadow-[0px_5px_10px_-3px_#4a5568]"
                />
              </div>
              <div className="flex flex-col">
                <label className="font-normal text-xs" htmlFor="age">
                  Ваш вік
                </label>
                <input
                  onChange={onChangeSetInputs}
                  type="number"
                  name="age"
                  id="age"
                  className="rounded-lg p-1 border shadow-[0px_5px_10px_-3px_#4a5568]"
                />
              </div>

              <div className="flex flex-col">
                <label className="font-normal text-xs" htmlFor="phone_number">
                  Ваш номер телефону
                </label>
                <input
                  onChange={onChangeSetInputs}
                  type="text"
                  name="phone_number"
                  id="phone_number"
                  className="rounded-lg p-1 border shadow-[0px_5px_10px_-3px_#4a5568]"
                />
              </div>
              <div className="flex flex-col">
                <label className="font-normal text-xs" htmlFor="email">
                  Ваш email
                </label>
                <input
                  onChange={onChangeSetInputs}
                  type="email"
                  name="email"
                  id="email"
                  className="rounded-lg p-1 border shadow-[0px_5px_10px_-3px_#4a5568]"
                />
              </div>
              <div className="flex flex-col">
                <label className="font-normal text-xs" htmlFor="description">
                  Супровідний лист
                </label>
                <textarea
                  onChange={onChangeSetInputs}
                  name="description"
                  id="description"
                  rows={3}
                  cols={10}
                  className="rounded-lg p-1 border shadow-[0px_5px_10px_-3px_#4a5568]"
                ></textarea>
              </div>
              <div className="flex space-x-2 items-center text-sm w-fit mx-auto px-3 rounded-2xl bg-purple-200 py-3 border">
                <i className="fa-solid fa-upload"></i>
                <button>Прикріпити резюме</button>
              </div>
            </div>
          </div>
        </div>
        <div className="flex p-5">
          <input
            className="shadow-[0px_5px_10px_-3px_#4a5568] rounded-lg w-5/6 m-auto text-base bg-teal-500 px-7 py-2 sm:w-2/6"
            type="submit"
            value="Підтвердити"
          />
        </div>
      </form>
    </div>
  );
};

export default FormApplyJob;
