import { useDispatch, useSelector } from "react-redux";
import { setAfterApplyingVision } from "../../redux/slices/appSlice";

const AfterApplying = (): React.JSX.Element => {
  const AfterApplyingVision = useSelector(
    (state: any) => state.app.AfterApplyingVision
  );
  const dispatch = useDispatch();
  return (
    <div
      className={`flex flex-col transition duration-500 ${
        AfterApplyingVision ? "opacity-100" : "opacity-0 pointer-events-none"
      } bg-white absolute w-4/6 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-lg shadow-[0px_5px_10px_-3px_#4a5568]`}
    >
      <div className="p-10 text-2xl mx-auto">
        Відгук відправлений, очікуйте будь ласка звінок або повідомлення на ваш
        email
      </div>
      <hr />
      {/* <div className="flex flex-col p-10 space-y-6 sm:w-1/2 sm:mx-auto">
        <button
          // onClick={() => deleteJob(currentJob)}
          className="shadow-[0px_5px_10px_-3px_#4a5568] transition bg-red-300 hover:bg-gray-50 rounded-lg w-5/6 m-auto text-lg px-7 py-2"
        >
          Видалити
        </button>
        <button
          onClick={() => {
            dispatch(setAfterApplyingVision(false));
            // dispatch(setCurrentJob({}));
          }}
          className="shadow-[0px_5px_10px_-3px_#4a5568] transition hover:bg-gray-50 rounded-lg w-5/6 m-auto text-lg px-7 py-2"
        >
          Повернутися
        </button>
      </div> */}
    </div>
  );
};

export default AfterApplying;
