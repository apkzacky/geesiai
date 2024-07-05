'use client'
import Link from "next/link";
import Image from "next/image";
import {useRouter} from 'next/navigation'

const Hero = () => {
  const {push} = useRouter()
  const theme:any = "dark"

    const _onReady = (event) => { 
    event.target.pauseVideo(); 
  }

  const opts = { 
      height: "390", 
      width: "640", 
      playerVars: { 
        autoplay: 1, 
      }
    }

  return (
    <>
      <section
        id="home"
        className="relative z-10 overflow-hidden pb-16 pt-[90px] dark:bg-gray-dark md:pb-[60px] md:pt-[0px] xl:pb-[60px] xl:pt-[70px] 2xl:pb-[200px] 2xl:pt-[200px]"
      >
        <div className="container pt-0 mt-0">
          <div className="-mx-4 flex flex-wrap">
            <div className="w-full px-4">
              <div className="mx-auto max-w-[800px] text-center">

{/* <h1 className="text-[#fff] text-4xl md:text-6xl text-center px-5 pt-5 font-[800] ">
        Built With{" "}
        <span className="bg-gradient-to-r from-blue-600 via-green-500 to-indigo-400 inline-block text-transparent bg-clip-text">
          Gemini{" "}
        </span>
      </h1> */}
       
    


      <h1 className="text-[#fff] text-5xl px-10 md:text-6xl text-center  font-[700] ">
        <span className="">Introducing</span> Geesi AI
      </h1>
      <p className="text-base md:text-1xl !leading-relaxed text-body-color dark:text-body-color-dark sm:text-lg px-5 text-white mx-9 pt-4">Unlock the secrete to efficient learning with our innovative AI.</p>
                <p className="text-base md:text-1xl !leading-relaxed text-body-color dark:text-body-color-dark sm:text-lg px-5 text-white mx-9 ">Our app is designed to help you study smarter, not harder.</p>
        
               




      
                <div className="flex flex-col items-center justify-center space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0 my-5">
                  <button
                  onClick={() => push('/dashboard')}
                   
                    // href="#getstart"
                    className=" rounded-full text-white border-primary   px-5 py-4 text-base font-semibold text-#000 duration-300 ease-in-out hover:bg-primary/20 hover:text-green bg-primary/10 border cursor-pointer"
                    >
                    Get Started
                    </button>

                  <button
                  onClick={() => push('/about')}
                   
                    // href="#getstart"
                    className=" rounded-full text-white border-white   px-5 py-4 text-base font-semibold text-#000 duration-300 ease-in-out hover:bg-white/20 hover:text-green bg-white/10 border cursor-pointer"
                    >
                    Learn More
                    </button>
                </div>











{/* 
<div className="items-center justify-center flex" style={{flexDirection:"column"}}>
  
                <Image src="/welcome_stickorder.png" alt="" width={300} height={300} />
</div> */}

              </div>
            </div>
          </div>
        </div>


 <div>

           <div>
        <span className="absolute left-2 top-7">
          <svg
            width="207"
            height="205"
            viewBox="0 0 57 65"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              opacity="0.5"
              d="M0.407629 15.9573L39.1541 64.0714L56.4489 0.160793L0.407629 15.9573Z"
              fill="url(#paint0_linear_1028_600)"
            />
            <defs>
              <linearGradient
                id="paint0_linear_1028_600"
                x1="-18.3187"
                y1="55.1044"
                x2="37.161"
                y2="15.3509"
                gradientUnits="userSpaceOnUse"
              >
                <stop
                  stopColor={theme === "light" ? "#4A6CF7" : "#fff"}
                  stopOpacity="0.62"
                />
                <stop
                  offset="1"
                  stopColor={theme === "light" ? "#4A6CF7" : "#fff"}
                  stopOpacity="0"
                />
              </linearGradient>
            </defs>
          </svg>
        </span>

        <span className="absolute bottom-24 left-1.5">
          <svg
            width="109"
            height="102"
            viewBox="0 0 39 32"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              opacity="0.5"
              d="M14.7137 31.4215L38.6431 4.24115L6.96581e-07 0.624124L14.7137 31.4215Z"
              fill="url(#paint0_linear_1028_601)"
            />
            <defs>
              <linearGradient
                id="paint0_linear_1028_601"
                x1="39.1948"
                y1="38.335"
                x2="10.6982"
                y2="10.2511"
                gradientUnits="userSpaceOnUse"
              >
                <stop
                  stopColor={theme === "light" ? "#4A6CF7" : "#fff"}
                  stopOpacity="0.62"
                />
                <stop
                  offset="1"
                  stopColor={theme === "light" ? "#4A6CF7" : "#fff"}
                  stopOpacity="0"
                />
              </linearGradient>
            </defs>
          </svg>
        </span>

        <span className="absolute right-2 top-[140px]">
          <svg
            width="208"
            height="208"
            viewBox="0 0 38 38"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              opacity="0.5"
              d="M10.6763 35.3091C23.3976 41.6367 38.1681 31.7045 37.107 17.536C36.1205 4.3628 21.9407 -3.46901 10.2651 2.71063C-2.92254 9.69061 -2.68321 28.664 10.6763 35.3091Z"
              fill="url(#paint0_linear_1028_602)"
            />
            <defs>
              <linearGradient
                id="paint0_linear_1028_602"
                x1="-0.571054"
                y1="-37.1717"
                x2="28.7937"
                y2="26.7564"
                gradientUnits="userSpaceOnUse"
              >
                <stop
                  stopColor={theme === "light" ? "#4A6CF7" : "#fff"}
                  stopOpacity="0.62"
                />
                <stop
                  offset="1"
                  stopColor={theme === "light" ? "#4A6CF7" : "#fff"}
                  stopOpacity="0"
                />
              </linearGradient>
            </defs>
          </svg>
        </span>

      </div>
       
      </div>



        






     
      </section>
    </>
  );
};

export default Hero;
