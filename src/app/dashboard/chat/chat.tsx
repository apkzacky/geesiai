'use client'
import React, { useEffect, useRef, useState } from 'react'
import { Button } from 'reactstrap'
import { UserAuth } from '../../context/AuthContext';
import Image from 'next/image'
import axios from 'axios';
import {  FaImage,  FaUserAstronaut } from 'react-icons/fa';
import Markdown from 'react-markdown'

function ChatComponent(props) {
    const chatEndRef = useRef(null)
    const { usage,Token,tokenLoading, setusage,usagErrorMessage, authToken, user,aboutq, sumarizationText, chatData, setChatData,question, message, setMessage,lastAnswer, setLastAnswer }:any = UserAuth();
    const [copied, setCopied] = useState(false)
    // let user:any = true
    const [loading, setLoading] = useState(false);
    const [Usage, setUsage] = useState(usage)
    const [token, setToken] = useState(Token)
    const [imageType, setImageType] = useState()
    const [inputType, setInputType] = useState('text')
    const [imageBase64, setImageBase64] = useState('')
    let [answer, setAnswer] = useState(null)
   
      const imageInputRef: any = useRef(null);







      // from image

  const [file, setFile] = useState(null)




  //end from image

    // let data = []




      const openBrowse = async () => {
    await imageInputRef.current.click();
  };


const speek = () => {      
 //   say.speak('Hi', 'Alex', 1.0);
}

    // useEffect(() => loadAnswer(), [])
    const loadAnswer = async (activeMessage:string) => {
     
        setLoading(true)
        axios.post('/dashboard/chat/ask', { 'message': message,'authToken':authToken, 'inputType':inputType, 'imageBase64':imageBase64, 'imageType':imageType,'aboutq':aboutq
        })
            .then((response) => {
                setToken(response.data.token)
                // set the answer on the state
                setAnswer(response.data.result.response)
                setLastAnswer(response.data.result.response)
                console.log(response.data.result.response)
                setUsage(response.data.result.usage)
                setChatData([...chatData, question, { ans: response.data.result.response }])
                
                if(response.data.result.response !== "[Connection-Error], Please check your internet connection and try again."){

                    setusage(usage >=1 ? usage- 1:response.data.result.usage)
                }

            })
            .catch((error) => {
                // alert(authToken)
              
                // set the answer on the state
                setAnswer('Pls Check you internet connection and try again.')
                // scroll up the answer
                setChatData([...chatData, question, { ans: `${error.message}, Refresh for the first time :)` }])

            })
            .finally(() => {
                setLoading(false)
                setInputType('text')
            })
    }


    const sendMessage = () => {



        // let data3 = { ans: "this is the answer" }
        // let data3

        setChatData([...chatData, { qa: `${message}` }])

        // scrollY()
     
        loadAnswer(message)
    }


    const handleChange = (e) => {
        const { name, value } = e.target
        const message1 = { ...message, [name]: value }

        setMessage(message1.message)
     
    }


    const checkUsage = () => {
      

    }

    useEffect(() => {
        const checkAuthentication = async () => {
            await new Promise((resolve) => setTimeout(resolve, 50));
            setLoading(false);
        };
        checkAuthentication();
    }, [user]);


    const scrollToBottom = () => {
        chatEndRef.current?.scrollIntoView(
            {
                behavior: 'smooth'
            }
        )
    }

    useEffect(() => {
        scrollToBottom()
    },[chatData])





















    
  

  const handleFileChange = (event) => {
     event.preventDefault();
    let url: string = URL.createObjectURL(event.target.files?.[0]!);
    const file = event.target.files[0]
    const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg', 'image/webp']
    const reader = new FileReader()
    reader.onloadend = (e) => {
      // setFile(reader.result)
      const imageData:any = e.target.result;
      let last = imageData.split(';')
      let second = last[1].split(',')
      setImageType(file.type)
      setImageBase64(second[1]); // Store the Base64-encoded image data
      console.log(imageData)
    }
    if (file && allowedTypes.includes(file.type)) {
      reader.readAsDataURL(file)
    } else {
      alert('Por favor selecciona un archivo de imagen válido')
      event.target.value = null;
    }
        setChatData([...chatData, { image: `${url}` }])
        setInputType('vision')
        // setImageBase64(file)

  }



 
 


  




    return (
        <>
            <div className='max-w-3xl items-center justify-end flex bg-black  ' style={{ flexDirection: 'column',}}>





                {
                    tokenLoading ? (
                               <div className='items-center justify-center flex  flex-wrap ml-2 ' style={{ flexDirection: 'column', }}>
                           <span className="loading loading-ring loading- text-white size-12"></span>
                           Loading...
                                        </div>
                    ) : user ? (
                        <>
                           <div className='items-center justify-center flex mt-26 flex-wrap px-3  pb-3  rounded z-50 sticky top-10' style={{ flexDirection: 'column', }}>
           

               </div >
                        <div className=' items-center justify-center flex' >


             

                            <div
                                // onSubmit={() => { }}
                                className="rounded-xl   px-2"
                                style={{}}
                            >


                                {/* chat bubbles */}

                                {chatData.map((item) => (
                                    <div>
                                        {item.ans && (
                                            <div className="chat chat-start mb-3">
                                                <div className="chat-image  avatar">
                                                    <div className="w-10 rounded-full">
                                                        <Image src={'/icon-black.png'} width={50}  height={50} alt='maxanswer' />
                                                    </div>
                                                </div>
                                                <div className="chat-header pb-3 flex items-center justify-between" style={{flexDirection:'row'}}>
                                                    Geesi AI 
                                                    <p className='mx-3 px-1.5 py-0.5 bg-[#fff] cursor-pointer text-black rounded-box' onClick={() => {
                                                      setCopied(true)
                                                      navigator.clipboard.writeText(item.ans)
                                                      setTimeout(() => {
                                                        setCopied(false)
                                                      }, 4000);
                                                    }}>copy</p>

                                                </div>
                                                <div className="chat-bubble text-white bg-[#000]" 
                                                
                                                style={{
                                                    backgroundColor:'#333'
                                                    }}>
                                                       {/* <MarkdownPreview

                                                       className=' text-dark'
                                                    
                                                       source={item.ans} style={{ padding: 16,}} /> */}
                                                       <Markdown>{item.ans}</Markdown>
                                                      {/* <p>{`${item.ans}`.replace('.', '\n')}</p> */}
                                                      </div>
                                         
                                            </div>

                                        )}


                                      {item.image && (
                                        <Image
                                        className='mx-6 m-8 rounded-box border-2 border-primary/60'
                                        src={item.image}
                                        alt='Selected'
                                        width={300}
                                        height={200}
                                        />
                                      )}
                                      
                                        {item.qa && (
                                            <div className="chat chat-end">
                                                <div className="chat-image avatar">
                                                     {user.photoURL == undefined ? (
                                                      <div className='w-10 mt-5'>
                                                           <FaUserAstronaut size={25} className='text-primary/60' />
                                                        </div>
                                                     ):(
                                                    <div className="w-10 rounded-full">
                                                           <Image
                                                         src={user.photoURL}

                                                      
                                                            width={100}
                                                            alt='profile'
                                                            height={24}
                                                        />
                                                        </div>
                                                     )}
                                                </div>
                                                <div className="chat-header pb-3">
                                                    {user.diplayName}
                                                    <time className="text-xs opacity-50">
                                                        {user.displayName}
                                                    </time>
                                                </div>
                                                <div  style={{color:'#fff'}} className="chat-bubble bg-primary/60 " >
                                                  <Markdown>{item.qa}</Markdown>
                                                </div>

                                            </div>

                                        )}

                                    </div>
                                ))}

                                {/* end */}


                            <div className="flex w-full items-center justify-between gap-1 z-50 sticky top-0 m-5 mb-4">

                                <input
                                onChange={handleFileChange}
                                ref={imageInputRef}
                                type="file"
                                hidden
                                required
                            />
                            <div
                              onClick={() => {
                                    openBrowse();
                                }}
                                
                            onDragOver={(e: any) => {
                                  alert(e)
                                }}
                                onDrop={(e: any) => {
                                   alert(e)
                                }}
                            >
                                    <FaImage size={50} className='pr-3'
                                
                                        />
                            </div>

                                <input
                                  
                                    // multiple={true}
                                    // type={''}
                                    className=" 
                flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed "

                                    autoFocus
                                    name="message"
                                    placeholder="Type question.."

                                    // value={'Heloo '}
                                    onChange={handleChange}
                                />






                                
                                {loading ? (
                                       <div className='items-center justify-center flex  flex-wrap ml-2 ' style={{ flexDirection: 'column', }}>
                           <span className="loading loading-ring loading- text-white size-12"></span>
                                        </div>
                                ):(
                                        <Button type="button" onClick={() =>{
                                          // alert(sumarizationText)
                                            // console.log(Token)
                                            if( message != "" && message != null)
                                                 sendMessage()
                                           
                                        }} className='bg-black text-white px-5 hover:bg-black hover:border-black hover:text-primary/60 border-black   py-3'>
                                    Answer
                                </Button>
                                )}


                            



                            </div>





                            </div>
                        </div>
                        </>


                    ):null
                }

<div ref={chatEndRef} />
            </div>













{/* counter
<div className="grid grid-flow-col gap-5 text-center auto-cols-max">
  <div className="flex flex-col p-2 bg-neutral rounded-box text-neutral-content">
    <span className="countdown font-mono text-5xl">
      <span style="--value:15;"></span>
    </span>
    days
  </div> 
  <div className="flex flex-col p-2 bg-neutral rounded-box text-neutral-content">
    <span className="countdown font-mono text-5xl">
      <span style="--value:10;"></span>
    </span>
    hours
  </div> 
  <div className="flex flex-col p-2 bg-neutral rounded-box text-neutral-content">
    <span className="countdown font-mono text-5xl">
      <span style="--value:24;"></span>
    </span>
    min
  </div> 
  <div className="flex flex-col p-2 bg-neutral rounded-box text-neutral-content">
    <span className="countdown font-mono text-5xl">
      <span style="--value:25;"></span>
    </span>
    sec
  </div>
</div> */}


        </>
    )
}

export default ChatComponent