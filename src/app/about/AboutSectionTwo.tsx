import Image from "next/image";
import Video from "../Video";
import SectionTitle from "../component/Common/SectionTitle";

const AboutSectionTwo = () => {
  return (
    <section className="py-16 md:py-20 lg:py-28 w-full px-10">
      <div className="container">
          <div className="w-full   ">
            <div className=" items-center justify-center flex" style={{flexDirection:'column'}}>
              
              <SectionTitle title="Geesi AI ?" paragraph="Discover a revolutionary way to learn with our Geesi AI, Designed to make studying easier and more interactive, our app offers personalized assistance across various subjects. Whether you're tacking tough math problem, exploring history, or enhancing language skills, our app is here to guide you. Get instant explanations, detailed answers, all while enjoying a seamless, user-frienly experience. Elevate your education with cutting-edge AI technology at your fingertips! this service programmed by Zacky (apkzacky)." />
              
            </div>
          </div>
     
      </div>
    </section>
  );
};

export default AboutSectionTwo;
