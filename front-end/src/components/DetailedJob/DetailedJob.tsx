import React, { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentJob } from "../../redux/slices/appSlice";

const DetailedJob = ({
  divRefDetailedJob,
}: {
  divRefDetailedJob: React.MutableRefObject<null>;
}): React.JSX.Element => {
  const currentJob = useSelector((state: any) => state.app.currentJob);
  const dispatch = useDispatch();

  return (
    <div className="w-full sm:w-1/2">
      <div
        ref={divRefDetailedJob}
        className="p-6 m-6 flex flex-col space-y-4 rounded-lg shadow-[0px_5px_7px_0px_#4a5568] bg-white"
      >
        <div className="flex w-full justify-between">
          <div className="font-medium text-xl transition items-center">
            {currentJob.name}
          </div>
          <div
            onClick={() => dispatch(setCurrentJob({}))}
            className="hover:opacity-50"
          >
            <i className="fa-solid fa-xmark fa-2xl"></i>
          </div>
          {/* <div className="flex items-center space-x-2 font-medium text-lg text-red-500 transition">
                  <i className="fa-solid fa-fire"></i>
                  <div>Гаряча</div>
                </div> */}
        </div>
        <div className="flex flex-col">
          <div className="font-extrabold">{currentJob.salary}$ / год</div>
          <div>Брюссель</div>
          <hr className="border-1 border-gray-400" />
          <div className="my-2">
            {currentJob.description}
            {/* Робота садівника в Брюсселі є важливим заняттям, оскільки місто
            славиться своїми красивими садами, парками та зеленими насадженнями.
            Садівники виконують різноманітні завдання, пов'язані з доглядом та
            обслуговуванням рослин, а також створенням та дизайном садових
            просторів. Основні вимоги до садівника включають: 1. Знання рослин:
            Садівник повинен мати глибокі знання про різні види рослин, їх
            особливості, потреби в годуванні, поливі та догляді. Вони повинні
            бути ознайомлені з різними методами посадки, трансплантації та
            розмноження рослин. 2. Обслуговування та догляд: Садівник повинен
            володіти навичками зрізування, підстригання та формування рослин.
            Вони мають вміти виявляти та лікувати хвороби рослин, а також
            боротися зі шкідниками. Догляд за газонами, поливом та регулярна
            очистка від сміття також належать до обов'язків садівника. 3.
            Ландшафтний дизайн: Садівники можуть брати участь у розробці та
            впровадженні ландшафтних проектів. Вони повинні мати здатність
            працювати з різними матеріалами, такими як камінь, дерево, вода та
            інші елементи, щоб створити привабливі та функціональні садові
            простори. 4. Фізична витривалість: Робота садівника може бути
            фізично вимогливою, тому необхідно мати добру фізичну форму та
            здатність до виконання різних робіт, таких як підйом важких
            предметів, копання та інше. Обов'язки садівника в Брюсселі можуть
            включати: 1. Посадка та догляд за рослинами, включаючи полив,
            розпушування ґрунту, додавання добрив і контроль за шкідниками. 2.
            Підстригання, зрізування та формування рослин, включаючи дерева,
            кущі та живі плоти. 3. Встановлення та обслуговування систем поливу,
            освітлення та дренажу. 4. Очищення садових просторів від листя,
            сміття та інших непотрібних матеріалів. 5. Утримання газонів,
            включаючи косіння, внесення добрив та здоров'я газону. 6. Взаємодія
            з клієнтами та надання консультацій щодо вибору та догляду за
            рослинами. 7. Виконання ландшафтних проектів та робота з іншими
            спеціалістами, такими як архітектори та дизайнери. Робота садівника
            в Брюсселі може бути цікавою та задовільною для людей, які цінують
            природу та мають талант до створення привабливих садів та зелених
            просторів. */}
          </div>
          <hr className="border-1 border-gray-400" />
        </div>
        {/* <div className="opacity-50">
                Without experience, with a living house
              </div> */}
        <div className="w-full my-2 flex justify-between">
          {/* <div className="italic opacity-70">11.05.2023</div> */}
          <button className="flex items-center m-auto px-16 py-2 text-lg bg-green-500 rounded shadow">
            Відгукнутися
          </button>
        </div>
      </div>
      {/* <div>
    <form>
      <p>Subscribe to email notifications</p>
     
      <input type="submit" value="Subscribe" />
    </form>
  </div>  */}
      {/* <figure className="mb-4 inline-block max-w-sm">
    <img
      src="https://tecdn.b-cdn.net/img/new/standard/city/041.webp"
      className="mb-4 h-auto max-w-full rounded-lg align-middle leading-none shadow-2xl transition-transform duration-500 transform translate-x-6 hover:translate-x-14"
      alt="Hollywood Sign on The Hill"
    />
    <figcaption className="text-right text-sm text-neutral-600 dark:text-neutral-600">
      A caption for the above image.
    </figcaption>
  </figure> */}
    </div>
  );
};

export default DetailedJob;
