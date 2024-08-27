'use client'
import pdfToText from 'react-pdftotext'
import { useState, useRef } from "react";
import Markdown from 'react-markdown'



import axios from "axios";
import { UserAuth } from "../../context/AuthContext";
import AuthComponent from "../../auth/page";
import { FaRegFilePdf } from "react-icons/fa";
import { redirect } from 'next/navigation';

const Simulation = () => {
  // about gemini
  const {user,tokenLoading}:any = UserAuth()
    const [message, setMessage] = useState(null)
const [loading, setLoading] = useState(false)
const [sumarizing, setsumarizing] = useState(false)
const [response_pdf, setResponse_pdf] = useState(null)
const [response, setResponse] = useState(null)
const pdfInputRef: any = useRef(null);
    const handleChange = (e) => {
        const { name, value } = e.target
        const message1 = { ...message, [name]: value }

        setMessage(message1.message)
     
    }


    const doSumarization = () => {
      
      if(message !== '' || message != null){
        setsumarizing(true)
        setResponse_pdf('Summarizing lesson...')
        setLoading(true)
         axios.post('/dashboard/chat/ask/sumarize/', { 'message': message})
            .then((response) => {
              setResponse_pdf('Lesson summarized')
            setResponse(response.data.result)

            })
            .catch((error) => {
            setResponse(error.message)
            })
            .finally(() => {
                setLoading(false)
                setResponse_pdf('')
            })
      }else setResponse_pdf('No active Lesson to read.')
    }





const getPdfData = (file) => {
    setLoading(true)
  setResponse_pdf('Uploading pdf...')
   try{
      pdfToText(file)
        .then((text) => {
          setMessage(text)
          if(text === '' || text == null){
               setResponse_pdf('Failed uploading pdf..')
         }else if(text !== '' || text != null){
             setResponse_pdf('pdf uploaded.')
          
         }else {
           if(text === '' || text == null){
             setResponse_pdf('No active lesson.')
           }
         }
          
        })
        .catch((error) => setResponse_pdf('error'))
        .finally(() => {
          setLoading(false)

        })
   }catch(err){
    setResponse_pdf('Erro')
   }
      
}





  const openBrowsecsv = async () => {
    await pdfInputRef.current.click();
  };



  return tokenLoading ? (
          
<div className="items-center justify-center flex">
  <h3 className="my-5 text-2xl font-bold leading-tight text-white dark:text-white">
        Loading...
      </h3>
</div>
  ):!user ? redirect('/auth'):(
      <div className="container items-center justify-center flex px-3" >
     
     <div className="flex  w-full max-w-2xl" style={{flexDirection:'column'}}>
      <div className="items-center justify-center flex">
         <h3 className="py-5 text-2xl font-bold leading-tight text-white dark:text-white">
                    Summarize Lesson
                    </h3>
        
         </div>

  <input
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          e.preventDefault();
          const file = e.target.files?.[0]
   
          getPdfData(file)
          
        }}
        ref={pdfInputRef}
        type="file"
        hidden
        required
      />
<div className="items-center justify-between flex flex-wrap mx-3" style={{flexDirection:'row'}}>
  <div className="items-center justify-center flex my-3" 
     onClick={() => {
            openBrowsecsv();
          }}
          onDragOver={(e: any) => {
            e.preventDefault();
          const file = e.target.files?.[0]
            getPdfData(file)
          }}
          onDrop={(e: any) => {
          e.preventDefault();
          const file = e.target.files?.[0]
          getPdfData(file)
          }}
  style={{flexDirection:'row'}}>
    <h3 className="font-bold">Read pdf</h3>
    <FaRegFilePdf color="white" className="mx-3" size={17} />
    <p className="pl-3">{response_pdf}</p>
  </div>
</div>
                    <textarea
                         name='message'
                        onChange={handleChange} 
                        value={message}
                        rows={10}
                        placeholder="Copy|Past the lesson here."
                        className="border-stroke resize-none border  rounded-box px-6 py-3 text-base text-body-color outline-none  dark:border-transparent dark:text-body-color-dark dark:shadow-two  dark:focus:shadow-none textarea textarea-bordered"
                      ></textarea>



                        <button
                        disabled={loading}
                        onClick={() => doSumarization()}
                    className="rounded-box inline-block my-5  bg-[#fff] px-16 py-3 text-base font-semibold text-#000 duration-300 border-#000 border text-black  ease-in-out hover:bg-black hover:text-white active:bg-black active:text-white"
                  >
                    {loading ? 'Loading...':'Summarize'}
                  </button>



                <div className="items-start justify-center flex" style={{flexDirection:'column'}}>
                    <h3 className="py-5 text-2xl font-bold leading-tight text-white dark:text-white">
                   Result!
                    </h3>


                    <div className="chat-bubble text-white mb-5" 
                      
                      style={{
                          backgroundColor:'#333'
                          }}>
                    <Markdown>{response}</Markdown>
                     </div>
                </div>





     </div>
      </div>
  );
};

export default Simulation;
