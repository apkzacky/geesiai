"use client";

import { useState } from "react";
import { FaCheck, FaDownload, FaEye } from "react-icons/fa";
import { UserAuth } from "../../context/AuthContext";
import axios from "axios";
// import { useTheme } from "next-themes";

const ValidationOutput = (props) => {
    const { usage, user, setaboutq, aboutq, setSumarizationText,setChatData, chatData, lastAnswer}:any = UserAuth();

  const theme:any  = "dark"
  const [scanning, setScanning] = useState(props.scan)
const [model, setModel] = useState(true)
const [previewDataset, setPreviewDataset] = useState(false)
const [Data, setData] = useState(null)
const [active, setActive] = useState(aboutq == '' ? '':aboutq)
const [message, setMessage] = useState(null)
const [loading, setLoading] = useState(false)
const [summarizeActiveAnswer, setsummarizeActiveAnswer] = useState(false)
    const handleChange = (e) => {
        const { name, value } = e.target
        const message1 = { ...message, [name]: value }

        setMessage(message1.message)
     
    }


    const doSumarization = () => {
    
      if(message !== '' && message != null){
          setLoading(true)
    

         axios.post('/dashboard/chat/ask/sumarize/', { 'message': message})
            .then((response) => {
            setChatData([...chatData, { ans: response.data.result}])
            })
            .catch((error) => {
            setChatData([...chatData, { ans: error.message}])
            })
            .finally(() => {
                setLoading(false)
            })
      }



    }

// const about = user.about == undefined ? [] : user.about

  return  (
    <div className="  border border-[#000] rounded-box bg-[#000] p-8 shadow-three dark:bg-gray-dark sm:p-11 lg:p-8 xl:p-11   ">
  
  {!user ? null: (

<>





      <div className="items-center justify-center flex " style={{flexDirection:'column'}}>


      

      
<h3 className="my-5 text-2xl font-bold leading-tight text-white dark:text-white">
        Answer Length
      </h3>
        <ul className="items-center justify-center flex flex-wrap">
          {user.about.map((item) => item.length <= 10 ? (
            <li className={`${active === item ? 'bg-gradient-to-r from-blue-600 via-green-500 to-indigo-400 inline-block text-transparent  rounded-box px-5 py-2 m-2 text-white':'bg-[#333] text-[#f0f0f0] rounded-box px-5 py-2 m-2'} cursor-pointer`} 
            onClick={() => {
            setActive(item)
            setaboutq(item)
          }}
            >{item}</li>
          ):null)}
          <li className={`${active === '' ? 'bg-gradient-to-r from-primary/60 via-green-500 to-primary/60 inline-block text-transparent  rounded-box px-5 py-2 m-2 text-white':'bg-[#333] text-[#f0f0f0] rounded-box px-5 py-2 m-2'} cursor-pointer`}
           onClick={() => {
            setActive('')
            setaboutq('')
          }}>Default</li>
     
        </ul>



      
<h3 className="py-5 text-2xl font-bold leading-tight text-white dark:text-white">
       Summarize Answer
      </h3>

  <textarea
                         name='message'
                        onChange={handleChange} 

                        rows={5}
                        placeholder="Enter your sumarzing answer"
                        className="border-stroke w-full resize-none border  rounded-box px-6 py-3 text-base text-body-color outline-none  dark:border-transparent dark:text-body-color-dark dark:shadow-two  dark:focus:shadow-none textarea textarea-bordered"
                      ></textarea>


<div className="form-control">
  <label className="label cursor-pointer">
    <span className="label-text px-5">Summarize last answer.</span>
    <input type="checkbox" checked={summarizeActiveAnswer} 
    onChange={(e) => {
      setMessage(lastAnswer)
        setsummarizeActiveAnswer(!summarizeActiveAnswer)
    }} 
    className="checkbox checkbox-primary" />
  </label>
</div>
                        <button
                        disabled={loading}
                        onClick={() => doSumarization()}
                    className="rounded-box inline-block my-5  bg-[#fff] px-16 py-3 text-base font-semibold text-#000 duration-300 border-#000 border text-black  ease-in-out hover:bg-black hover:text-white active:bg-black active:text-white"
                  >
                    {loading ? 'Loading...':'Summarize'}
                  </button>
     
      </div>



      
</>
  )}

              

 


     
     
      <div>

           <div>
        <span className="absolute left-2 top-7">
          <svg
            width="57"
            height="65"
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
            width="39"
            height="32"
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
            width="38"
            height="38"
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

        <span className="absolute right-0 top-0">
          <svg
            width="162"
            height="91"
            viewBox="0 0 162 91"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g opacity="0.3">
              <path
                opacity="0.45"
                d="M1 89.9999C8 77.3332 27.7 50.7999 50.5 45.9999C79 39.9999 95 41.9999 106 30.4999C117 18.9999 126 -3.50014 149 -3.50014C172 -3.50014 187 4.99986 200.5 -8.50014C214 -22.0001 210.5 -46.0001 244 -37.5001C270.8 -30.7001 307.167 -45 322 -53"
                stroke="url(#paint0_linear_1028_603)"
              />
              <path
                opacity="0.45"
                d="M43 64.9999C50 52.3332 69.7 25.7999 92.5 20.9999C121 14.9999 137 16.9999 148 5.49986C159 -6.00014 168 -28.5001 191 -28.5001C214 -28.5001 229 -20.0001 242.5 -33.5001C256 -47.0001 252.5 -71.0001 286 -62.5001C312.8 -55.7001 349.167 -70 364 -78"
                stroke="url(#paint1_linear_1028_603)"
              />
              <path
                opacity="0.45"
                d="M4 73.9999C11 61.3332 30.7 34.7999 53.5 29.9999C82 23.9999 98 25.9999 109 14.4999C120 2.99986 129 -19.5001 152 -19.5001C175 -19.5001 190 -11.0001 203.5 -24.5001C217 -38.0001 213.5 -62.0001 247 -53.5001C273.8 -46.7001 310.167 -61 325 -69"
                stroke="url(#paint2_linear_1028_603)"
              />
              <path
                opacity="0.45"
                d="M41 40.9999C48 28.3332 67.7 1.79986 90.5 -3.00014C119 -9.00014 135 -7.00014 146 -18.5001C157 -30.0001 166 -52.5001 189 -52.5001C212 -52.5001 227 -44.0001 240.5 -57.5001C254 -71.0001 250.5 -95.0001 284 -86.5001C310.8 -79.7001 347.167 -94 362 -102"
                stroke="url(#paint3_linear_1028_603)"
              />
            </g>
            <defs>
              <linearGradient
                id="paint0_linear_1028_603"
                x1="291.35"
                y1="12.1032"
                x2="179.211"
                y2="237.617"
                gradientUnits="userSpaceOnUse"
              >
                <stop
                  offset="0.328125"
                  stopColor={theme === "light" ? "#4A6CF7" : "#fff"}
                />
                <stop
                  offset="1"
                  stopColor={theme === "light" ? "#4A6CF7" : "#fff"}
                  stopOpacity="0"
                />
              </linearGradient>
              <linearGradient
                id="paint1_linear_1028_603"
                x1="333.35"
                y1="-12.8968"
                x2="221.211"
                y2="212.617"
                gradientUnits="userSpaceOnUse"
              >
                <stop
                  offset="0.328125"
                  stopColor={theme === "light" ? "#4A6CF7" : "#fff"}
                />
                <stop
                  offset="1"
                  stopColor={theme === "light" ? "#4A6CF7" : "#fff"}
                  stopOpacity="0"
                />
              </linearGradient>
              <linearGradient
                id="paint2_linear_1028_603"
                x1="294.35"
                y1="-3.89678"
                x2="182.211"
                y2="221.617"
                gradientUnits="userSpaceOnUse"
              >
                <stop
                  offset="0.328125"
                  stopColor={theme === "light" ? "#4A6CF7" : "#fff"}
                />
                <stop
                  offset="1"
                  stopColor={theme === "light" ? "#4A6CF7" : "#fff"}
                  stopOpacity="0"
                />
              </linearGradient>
              <linearGradient
                id="paint3_linear_1028_603"
                x1="331.35"
                y1="-36.8968"
                x2="219.211"
                y2="188.617"
                gradientUnits="userSpaceOnUse"
              >
                <stop
                  offset="0.328125"
                  stopColor={theme === "light" ? "#4A6CF7" : "#fff"}
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

     
    </div>
  );
};

export default ValidationOutput;
