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
      <div className={`${id == 1 ? 'border-primary bg-gradient-to-r from-black via-primary/60 to-black inline-block  text-transparent ':id == 2 ? 'border-secondary bg-gradient-to-r from-black via-secondary/60 to-black inline-block  text-transparent':'border-success bg-gradient-to-r from-black via-success/60 to-black inline-block  text-transparent'} rounded-box   p-8 shadow-two duration-300 hover:shadow-one dark:bg-dark dark:shadow-three dark:hover:shadow-gray-dark lg:px-5 xl:px-8 text-white border-2 `}>
        <div className="mb-5 flex items-center space-x-1">
            <h1 className=" border-b border-body-color border-opacity-10 pb-8  leading-relaxed text-body-color dark:border-white dark:border-opacity-10 dark:text-white text-2xl font-bold">
          {title}
        </h1>
        </div>
<div id="getstart"></div>
       
        <p className="mb-8  border-body-color border-opacity-10 pb-8 text-base leading-relaxed text-body-color dark:border-white dark:border-opacity-10 dark:text-white">
          “{description}
        </p>

      
        

        <div className="flex items-center " >
        <button 

          onClick={() => push(`/${href_url}`)}
          className="my-2 btn bg-white rounded-full text-2xl btn-white w-full hover:bg-white/90   ">
          <p className="   text-black hover:text-black font-extralight" style={{letterSpacing:3}}>Go!</p>
         </button>
        </div>
      </div>
    </div>
  );
};

export default SingleTestimonial;
