// import { Testimonial } from "@/types/testimonial";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import OfferList from "./OfferList";

const starIcon = (
  <svg width="18" height="16" viewBox="0 0 18 16" className="fill-current">
    <path d="M9.09815 0.361679L11.1054 6.06601H17.601L12.3459 9.59149L14.3532 15.2958L9.09815 11.7703L3.84309 15.2958L5.85035 9.59149L0.595291 6.06601H7.0909L9.09815 0.361679Z" />
  </svg>
);

const SingleTestimonial = ({ testimonial }) => {
  const { title, description, id, href_url  } = testimonial;


  const {push} = useRouter()
  return (
    <div className="w-full max-w-2xl md:p-5">
      <div className={`${id == 1 ? ' ':''} rounded-box   p-8 shadow-two duration-300 hover:shadow-one dark:bg-dark dark:shadow-three dark:hover:shadow-gray-dark lg:px-5 xl:px-8 text-white border-2 border-white bg-gradient-to-r from-black via-[#333] to-black inline-block text-transparent`}>
        <div className="mb-5 flex items-center space-x-1">
            <h1 className=" border-b border-body-color border-opacity-10 pb-8  leading-relaxed text-body-color dark:border-white dark:border-opacity-10 dark:text-white text-2xl font-bold">
          {title}
        </h1>
        </div>
<div id="getstart"></div>
         
        <p className="mb-8  border-body-color border-opacity-10 pb-8 text-base leading-relaxed text-body-color dark:border-white dark:border-opacity-10 dark:text-white">
          “{description}
        </p>

        {id == 1 ? (
         <>
          <OfferList text="Best Chatting Experience" status="active" />
            <OfferList text="Support Image Upload" status="active" />
            <OfferList text="Support Answer Summarization" status="active" />
         </>
        ): id == 3 ? (
          <>
          <OfferList text="Summarize the whole chapter" status="active" />
            <OfferList text="Support PDF Upload" status="active" />
          </>
        ): id == 2 ? (
          <>
            <OfferList text="Support PDF Upload" status="active" />
            <OfferList text="Support True/False" status="active" />
            <OfferList text="Support Multiple Choose" status="active" />
            <OfferList text="Support 1-20 Questions per exam" status="active" />

          </>
        ):null}
        

      </div>
    </div>
  );
};

export default SingleTestimonial;
