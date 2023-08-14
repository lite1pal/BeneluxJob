import Footer from "../Footer/Footer";
import Navbar, { language } from "../Navbar/Navbar";

const CompanyInfoPage = (): React.JSX.Element => {
  return (
    <div className="flex flex-col w-screen font-raleway min-h-screen bg-green-100">
      <Navbar />
      <div className="w-full flex flex-grow">
        <div className="w-10/12 m-10 mx-auto bg-white">
          {language === "uk" ? (
            <div className="flex flex-col space-y-6 m-10">
              <div className="font-semibold text-lg">Benelux JOB</div>
              <div>
                Компанія Benelux Job є провідним рекрутинговим агентством, що
                спеціалізується на зв'язку кваліфікованих працівників з
                відмінними можливостями у сільському господарстві по всій
                Бельгії. Завдяки нашій обширній мережі аграрних підприємств та
                ферм, ми прагнемо зменшити розрив між кандидатами та
                роботодавцями у цій важливій галузі.
              </div>
              <hr />
              <div className="font-semibold">
                Наша місія: Вирощування можливостей, надання підтримки
              </div>
              <div>
                Центральною місією нашої компанії є створення можливостей як для
                кандидатів, так і для аграрних роботодавців. Ми впевнені, що
                успіх сільськогосподарського сектору залежить від кваліфікованої
                та відданої робочої сили, і ми пишаємося тим, що допомагаємо
                людям знаходити задоволення в роботі в цій важливій галузі.
              </div>
              <hr />
              <div className="font-semibold">Чому обрати Benelux Job:</div>
              <ol className="flex flex-col space-y-5">
                <li>
                  <div className="font-semibold">1. Експертиза</div>
                  <div>
                    Наша команда досвідчених рекрутерів має глибокі знання
                    сільського господарства, що дозволяє нам знаходити ідеальних
                    кандидатів для кожної вакансії.
                  </div>
                </li>
                <li>
                  <div className="font-semibold">2. Обширна мережа</div>
                  <div>
                    За роки діяльності, ми побудували міцні відносини з
                    численними аграрними підприємствами та фермами по всій
                    Бельгії, що дає нам доступ до широкого спектру вакансій.
                  </div>
                </li>
                <li>
                  <div className="font-semibold">3. Індивідуальний підхід</div>
                  <div>
                    Ми розуміємо, що кожен кандидат і роботодавець є унікальним.
                    Тому ми пристосовуємо наші послуги до конкретних навичок,
                    кваліфікацій та потреб, забезпечуючи успішне співставлення.
                  </div>
                </li>
                <li>
                  <div className="font-semibold">
                    4. Підтримка на кожному етапі
                  </div>
                  <div>
                    Від першої заявки до вступу на роботу, ми надаємо постійну
                    підтримку, допомогу та консультування, зробивши перехід на
                    нову посаду максимально гладким.
                  </div>
                </li>
                <li>
                  <div className="font-semibold">5. Чесність та прозорість</div>
                  <div>
                    Ми дотримуємо найвищих стандартів чесності та підтримуємо
                    відкриту комунікацію як з кандидатами, так і з
                    роботодавцями.
                  </div>
                </li>
              </ol>
              <hr />
              <div className="font-semibold">
                Знайдіть свою сільськогосподарську кар'єру з Benelux Job:
              </div>
              <div>
                Чи ви досвідчений аграрний фахівець, який шукає нових викликів,
                чи молодий випускник, що прагне допомагати розвитку сільського
                господарства, Benelux Job - ваш шлях до захоплюючих можливостей.
                Приєднуйтесь до нас вже зараз.
              </div>
            </div>
          ) : (
            <div className="flex flex-col space-y-6 m-10">
              <div className="font-semibold text-lg">Benelux JOB</div>
              <div>
                At Benelux Job, we are a leading recruitment agency specializing
                in connecting skilled individuals with excellent opportunities
                in the agricultural sector across Belgium. With our extensive
                network of agricultural businesses and farms, we strive to
                bridge the gap between job seekers and employers in the
                industry.
              </div>
              <hr />
              <div className="font-semibold">
                Our Mission: Cultivating Opportunities, Empowering Lives
              </div>
              <div>
                At the core of our mission lies the commitment to cultivate
                opportunities for both job seekers and agricultural employers.
                We believe that the success of the agricultural sector relies on
                a skilled and dedicated workforce, and we take pride in
                empowering lives by helping individuals find fulfilling careers
                in this vital industry.
              </div>
              <hr />
              <div className="font-semibold">Why Choose Benelux Job:</div>
              <ol className="flex flex-col space-y-5">
                <li>
                  <div className="font-semibold">1. Expertise</div>
                  <div>
                    Our team of experienced recruiters possesses in-depth
                    knowledge of the agricultural sector, enabling us to
                    identify the perfect match for each job opening.
                  </div>
                </li>
                <li>
                  <div className="font-semibold">2. Extensive Network</div>
                  <div>
                    Over the years, we have built strong relationships with
                    numerous agricultural businesses and farms throughout
                    Belgium, giving us access to a wide range of job
                    opportunities.
                  </div>
                </li>
                <li>
                  <div className="font-semibold">
                    3. Individualized Approach
                  </div>
                  <div>
                    We understand that each candidate and employer is unique.
                    Therefore, we tailor our services to match specific skills,
                    qualifications, and requirements, ensuring a successful
                    placement.
                  </div>
                </li>
                <li>
                  <div className="font-semibold">
                    4. Support Throughout the Process
                  </div>
                  <div>
                    From initial application to onboarding, we offer continuous
                    support, guidance, and assistance, making the transition
                    into a new role as smooth as possible.
                  </div>
                </li>
                <li>
                  <div className="font-semibold">
                    5. Integrity and Transparency
                  </div>
                  <div>
                    We uphold the highest standards of integrity and maintain
                    transparent communication with both job seekers and
                    employers.
                  </div>
                </li>
              </ol>
              <hr />
              <div className="font-semibold">
                Find Your Agricultural Career with Benelux Job:
              </div>
              <div>
                Whether you are an experienced agricultural professional seeking
                new challenges or a fresh graduate passionate about contributing
                to the agricultural sector, Benelux Job is your gateway to
                exciting opportunities. Join us today and let's grow together.
              </div>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default CompanyInfoPage;
