'use client'
import { useRouter } from "next/navigation";
import {FaEye, FaFilePdf } from "react-icons/fa";
import { useState, useRef } from "react";
import pdfToText from 'react-pdftotext'


import axios from "axios";
import AuthComponent from "../../auth/page";
import { UserAuth } from "../../context/AuthContext";
import Link from "next/link";

const Simulation = () => {
  // about gemini
const {tokenLoading, user}:any = UserAuth()
const [scanning, setScanning] = useState(false)






  // from file upload
  const {push} = useRouter()
  const [processing, setProcessing] = useState<boolean>(false);
  const [solved, setSolved] = useState(false)
  const csvInputRef: any = useRef(null);
  const [loading, setLoading] = useState(false)
  const [data, setData]:any = useState([])
  const [usermessage,setMessage] = useState(null)
  const [lesson, setLesson] = useState(null)

  // default true
  const [showFileUpload, setShowFileUpload] = useState(true)
  const [pageTitle, setPageTitle] = useState(null)
  // default false
  const [showExamPage, setShowExamPage] = useState(false)
const [response_pdf, setResponse_pdf] = useState(null)
const [noquestion, setNoQuestions] = useState(1)
  const [questionSelected, setQuestionSelected] = useState(false)
const [activeAnswer, setActiveAnswer] = useState('')
const [examType, setExamType] = useState('Multiple Choose')
const [response_simulation, setResponse_Simulation] = useState('')
const [fileName, setFileName] = useState(null)
const [examOptions, setExamOptions] = useState(['Multiple Choose','True/False'])
const [activeQuestion, setActiveQuestion] = useState(0)

const [showExam, setShowExam] = useState(false)

const [showExam2, setShowExam2] = useState(null)







  const openBrowsecsv = async () => {
    await csvInputRef.current.click();
  };



    const handleChange = (e, id) => {
      setActiveQuestion(id)
        setQuestionSelected(true)
        const { name, value } = e.target
        const message1 = { ...usermessage, [name]: value }

        setExamType(message1.examtype == undefined ? examType:message1.examtype)
        setMessage(message1.message)
        setActiveAnswer(message1.activechoosedanswer)
        setPageTitle(`${message1.subjectname == undefined ? pageTitle:message1.subjectname}`)
        setNoQuestions(message1.noquestion == undefined ? noquestion:message1.noquestion)
    //  console.log(message1.message)
    }




const handleSimulation = async (lesson) => {
  
  console.log('exam name: '+pageTitle)
  console.log('Exam Type: '+examType)
console.log('No questions: '+noquestion)
  setLoading(true)
  // console.log(message)
  // let user_object = data
  axios.post('/dashboard/simulate/ask/',{lesson, examType,noquestion})
  .then((response) => {
    let result:any = response.data.result
    if(result === "Error"){
      setResponse_Simulation("[Connection - Error], Please check your internet connection and try again.")
    }else{
    
     setShowExam2(result)
      setShowExamPage(true)

    }
  setSolved(true)
   }).catch((error) => setResponse_Simulation(error.message))
   .finally(() => {
    setLoading(false)
  }
  
)



}

const showExamF = () => {
   let results = JSON.parse(showExam2)
  return results.map((item) => (
       <div className="my-5 leading-tight text-black ">
                     <p className="text-2xl ">{item.id}. {item.question}</p>
                     <div className="items-start justify-center mt-5 flex" style={{flexDirection:'column'}}>
                   
                   
                      <div className="items-center justify-center flex" style={{flexDirection:'row'}}>
                        <input type='radio' className="mx-3 size-6 radio radio-primary " value={item.A} name="activechoosedanswer"  onChange={(e) => {
                          let id = item.id
                          handleChange(e, id)
                        }} />
                        <p className="text-black text-2xl font-medium" onClick={() => null}>{item.A}</p>
                      </div>

                        <div className="items-center justify-center flex" style={{flexDirection:'row'}}>
                        <input type='radio' className="mx-3 size-6 radio radio-primary" value={item.B} name="activechoosedanswer"  onChange={(e) => {
                          let id = item.id
                          handleChange(e, id)
                        }} />
                        <p className="text-black text-2xl font-medium">{item.B}</p>
                      </div>


                       {item.C && (
                         <div className="items-center justify-center flex" style={{flexDirection:'row'}}>
                        <input type='radio' className="mx-3 size-6 radio radio-primary" value={item.C} name="activechoosedanswer"  onChange={(e) => {
                          let id = item.id
                          handleChange(e, id)
                        }} />
                        <p className="text-black text-2xl font-medium">{item.C}</p>
                      </div>
                       )}



                      {item.D && (
                          <div className="items-center justify-center flex" style={{flexDirection:'row'}}>
                        <input type='radio' className="mx-3 size-6 radio radio-primary" value={item.D} name="activechoosedanswer"  onChange={(e) => {
                          let id = item.id
                          handleChange(e, id)
                        }} />
                        <p className="text-black text-2xl font-medium">{item.D}</p>
                      </div>
                      )}
                     
                        {activeQuestion == item.id ?   <p className="text-primary text-1xl my-4 bg-white px-4 py-2">Answer: {item.Answer}</p>:null}

                     </div>
  </div>
   ))
}


const getPdfData = (file) => {
    setLoading(true)
    setProcessing(true)
   try{
      pdfToText(file)
        .then((text) => {
          setLesson(text)
          if(text === '' || text == null){
               setResponse_pdf('Failed uploading pdf..')
         }else if(text !== '' || text != null){
             setResponse_pdf('pdf uploaded.')
          
         }else {
           if(text === '' || text == null){
             setResponse_pdf('No active lesson.')
           }
         }
          
         setShowFileUpload(false)
        })
        .catch((error) => setResponse_pdf('error'))
        .finally(() => {
          setLoading(false)
          setProcessing(false)

        })
   }catch(err){
    setResponse_pdf('Erro')
   }
      
}






  const convert = async (url: string) => {
    if (url.length) {
      setProcessing(true);
    
      setTimeout(() => {
       
        console.log(url)
       
       
        setProcessing(false);
       setShowFileUpload(false)
      }, 2000);
    }
  };
// end file upload 




  return tokenLoading ? (
          
<div className="items-center justify-center flex">
  <h3 className="my-5 text-2xl font-bold leading-tight text-white dark:text-white">
        Loading...
      </h3>
</div>
  ):!user ? (
     <AuthComponent  />
  ): showFileUpload ? (
      <div className="min-h-[90vh] mt-10">
      
      <input
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          e.preventDefault();
          const file = e.target.files?.[0]
          setFileName(file.name)
   
          getPdfData(file)
          
        }}
        ref={csvInputRef}
        type="file"
        hidden
        required
      />
      <div className="relative md:bottom-10 w-full flex flex-col gap-10 items-center justify-center mt-0 pt-0 p-5 md:p-52 md:pt-20 ">
        <div
          onClick={() => {
            openBrowsecsv();
          }}
          onDragOver={(e: any) => {
               e.preventDefault();
          const file = e.target.files?.[0]
          setFileName(file.name)
   
          getPdfData(file.name)
          }}
          onDrop={(e: any) => {
                e.preventDefault();
          const file = e.target.files?.[0]
          setFileName(file.name)
   
          getPdfData(file)
          }}
          className="w-full min-h-[30vh] md:min-h-[50vh] p-5 bg-[#000] cursor-pointer rounded-xl flex items-center justify-center border-dashed  border-[grey] border"
        >
          <div className="w-full flex items-center justify-center flex-col gap-3">
            <p>{response_pdf}</p>
            <p className="text-2xl md:text-3xl text-center text-[#707070] font-[800]">
              {processing
                ? "Processing file..."
                : " Upload PDF Module here"}
            </p>
            <span className="text-8xl md:text-[150px] block  text-[#5f5f5f]">
              <FaFilePdf className={processing ? "animate-pulse" : ""} />
            </span>
          </div>
        </div>
    
      </div>
    </div>
  ):showExamPage ? (
    <>
    {/* <h1 className="pl-5 py-3"><Link href={"/"}>Home</Link> {'>'} <Link href={"/dashbouard"}>Dashboard</Link> / {'>'} Simulate</h1> */}

    <section id="contact" className="items-start justify-center flex flex-row flex-wrap">
      


      <div className="container bg-white px-5 flex items-center justify-center max-w-2xl" style={{flexDirection:'column'}}>
       
  <h3 className=" text-2xl text-center border-b font-bold leading-tight text-white bg-black px-3 rounded ">Exam Type: {examType}</h3>
  <h3 className=" text-1xl mb-5 text-center border-b font-bold leading-tight text-black dark:text-black pt-3 ">
                                       Exam Name: {pageTitle}

                </h3>

      {/* exam component */}
{showExam  ? null: showExamF()}


             
      </div>


    </section>
</>
  ):(
    <section id="contact" className="overflow-hidden pb-16 md:pb-20 lg:pb-28">
      
     


      <div className="container  flex items-center justify-center " style={{flexDirection:'column'}}>
        

                <h3 className="mb-5 text-1xl text-center border-b font-bold leading-tight text-white dark:text-white pt-5 ">
                                       File: {fileName}

                </h3>
                <p className="text-red-500">{response_simulation}</p>


 <div className=" flex-wrap items-center justify-center flex pt-6 px-10 shadow-xl shadow-[#111]" style={{flexDirection:'column'}}>
              <input  className="input input-bordered my-3 w-full" onChange={(e) => {
                          handleChange(e, 0)
                        }} name="subjectname" placeholder="Exam Name"/>
                  <ul className="items-center justify-center flex flex-wrap px-5">



   <div className="items-center justify-between flex flex-wrap mx-3" style={{flexDirection:'row'}}>
                <div className="items-center justify-center flex my-3 flex-wrap" style={{flexDirection:'row'}}>
                  
              <h3 className="my-5 text-base font-bold leading-tight text-white dark:text-white">
                     EXAM TYPE
                </h3>

                   <select
                   onChange={(e) => {
                         
                            handleChange(e, 0)

                     }}
                     name="examtype"
                   className=" select-info  mx-5 max-w-xs select select-bordered  border-0  text-center">
                   {examOptions.map((item) => (
                     <option className="bg-white text-black " value={item}  >{item}</option>
                   ))}
                  </select>
                </div>
              </div>

              
                  </ul>


              <div className="items-center justify-between flex flex-wrap mx-3" style={{flexDirection:'row'}}>
                <div className="items-center justify-center flex mb-3" style={{flexDirection:'row'}}>
                  <h3 className="font-bold">NUMBER OF QUESTIONS</h3>
                  <input type="number" max={10} min={1} defaultValue={1} name="noquestion"
                  onChange={(e) => handleChange(e,0)}
                  className="mx-5 input input-bordered text-center" />
                </div>
              </div>

            <button
              // href="/about"
              onClick={() => {
                // console.log('__'+lesson)
                if(pageTitle != null && pageTitle !== ''){
                  handleSimulation(lesson)
                }else{
                  setResponse_Simulation("Exam Name is required.")
                }
                // setShowExamPage(true)
              }}
              disabled={loading}
              type="button"
              className="rounded-box w-full inline-block  bg-[#fff] px-5 my-6 text-base font-semibold text-#000 duration-300 border-#000 border text-black  ease-in-out hover:bg-[#fff]/90 dark:bg-#000/10 dark:text-#000 dark:hover:bg-#000/5 btn disabled:text-white disabled:border-white"
            >
              {loading ? 'Loading...':'Simulate Exam'}
            </button>
                </div>





      </div>
    </section>
  );
};

export default Simulation;
