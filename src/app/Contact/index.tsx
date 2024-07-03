'use client'
import { useState } from "react";
import NewsLatterBox from "./NewsLatterBox";
import axios from "axios";
import { UserAuth } from "../context/AuthContext";
import Image from "next/image";

const Contact = () => {
  const {user}:any = UserAuth()
  const EndPoint = '/'

  const [fields, setFields] = useState(null)
  const [responsemessage, setResponseMessage] = useState('Send Feedback')
  const [laoding, setLoading] = useState(false)


const handleChange = (e) => {
        const { name, value } = e.target
        
        setFields({ ...fields, [name]: value })
      
    }


    const sendFeedBack = () => {
      setLoading(true)
      let email = user.email
      let name = user.displayName
      let message = fields.message
      axios.post(`${EndPoint}/api/feedback`, {email, name, message})
                        .then((response) => {
                           setResponseMessage(response.data.response)
    
                        })
                        .catch((error) => {
                            setResponseMessage(`Unable to send feadback`)
                        } )
                        .finally(() => {
                          setTimeout(() => {
                            setLoading(false)
                            setResponseMessage('Send Feedback')
                          }, 9000);



                        })
    }




   
  return (
    <section id="contact" className="overflow-hidden py-16 md:py-20 lg:py-28">
      <div className="container">
        <div className="-mx-4 flex flex-wrap">
          <div className="w-full px-4 lg:w-7/12 xl:w-8/12">
            <div
              className="mb-12 rounded-sm bg-[#000] px-8 py-11 shadow-three dark:bg-gray-dark sm:p-[55px] lg:mb-5 lg:px-8 xl:p-[55px]"
              data-wow-delay=".15s
              "
            >
              <h2 className="mb-3 text-2xl font-bold text-dark sm:text-3xl lg:text-2xl xl:text-3xl">
            Feadback!
              </h2>
              <p className="mb-10 text-base font-medium text-body-color">
                Our support team will get back to you ASAP via email.
              </p>
               <p className="mb-10 text-success text-3xl font-medium text-body-color">
              {responsemessage === 'Send Feedback' ? '':responsemessage}
              </p>
              <div>
                <div className="-mx-4 flex flex-wrap">
               
                
                  <div className="w-full px-4">
                    <div className="mb-8">
                      <label
                        htmlFor="message"
                        className="mb-3 block text-sm font-medium text-dark dark:text-white"
                      >
                        Your Message
                      </label>
                      <textarea
                         name='message'
                        onChange={handleChange} 

                        rows={5}
                        placeholder="Enter your Message"
                        className="border-stroke w-full resize-none border  rounded-box px-6 py-3 text-base text-body-color outline-none  dark:border-transparent dark:text-body-color-dark dark:shadow-two  dark:focus:shadow-none textarea textarea-bordered"
                      ></textarea>
                    </div>
                  </div>
                  <div className="w-full px-4">
                    <button type="button" disabled={laoding}
                    onClick={() => sendFeedBack()}
                    className="mb-5 rounded-box flex w-full cursor-pointer items-center justify-center border border-white  px-12 py-4 text-base font-medium text-white shadow-submit duration-300 hover:bg-primary/90 dark:shadow-submit-dark bg-primary/60">
                      {laoding ? 'Loading...':responsemessage}
                    </button>


                    
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="w-full px-4 lg:w-5/12 xl:w-4/12">
            <NewsLatterBox  />
          </div>
        </div>
      </div>




      
 <footer className="footer footer-center p-10  text-white mt-24">

            <aside>


               <p className="font-bold">
                &copy; GeesiAI
              </p>
              <p className="">
                Built with Gemini (Google AI)
              </p>
              <p className="">
                Developed by ApkZacky
              </p>
              <p>Copyright © 2024 - All right reserved</p>
            </aside>
            <nav>
              <div className="grid grid-flow-col gap-4">
                <a href="https://x.com/@zackyjamel"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" className="fill-current"><path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"></path></svg></a>
                <a href="https://youtube.com/@stickorder"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" className="fill-current"><path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"></path></svg></a>
                <a href="https://facebook.com/@stickorder"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" className="fill-current"><path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"></path></svg></a>
              </div>
            </nav>
          </footer>

    </section>
  );
};

export default Contact;
