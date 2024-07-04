'use client'
import { useContext, createContext, useState, useEffect } from "react";
import { auth } from '../firebase'
// import { signInWithPopup, signOut, onAuthStateChanged, GoogleAuthProvider, signInWithCredential} from 'firebase/auth'
import { useRouter } from 'next/navigation';
import axios from 'axios'
const AuthContext:any = createContext(null)



export const AuthContextProvider = ({ children,authTokens }) => {
  const EndPoint = '/api/users'
    
    const { push } = useRouter();
    const [user, setUser]:any = useState();
    const [authToken, setAuthToken] = useState(authTokens)
    const [userId, setUserID] = useState('665eda421d2c631388b1a06f')
    const [usage, setusage] = useState(null)
    const [about, setAbout] = useState('')
    const [sumarizationText, setSumarizationText] = useState(null)
    const [aboutq, setaboutq] = useState('')
    const [tokenLoading, setTokenLoading] = useState(true)
    const [Token, setToken] = useState(null)
    const [usagErrorMessage, setusagErrorMessage] = useState(null)
    let [lastAnswer, setLastAnswer] = useState(null)
    
    let [message, setMessage] = useState(null)
    
    let [chatData, setChatData] = useState([{ ans: 'Hi, welcome to Geesi AI, i could help you with different tasks powered by AI. you can ask me to write an essay, solve math problems and answer history quiz etc.' }, { qa: 'thanks Geesi' },{ans:`You welcome, what can i help you.`}])
    // const cookieStore = cookies()
    // const authToken = cookieStore.get('authtoken')
        let question = { qa: message }

    const savetoAltas = () => {


    }



    const googleSignIn = () => {

        // try {
        //     const provider = new GoogleAuthProvider()

        //     signInWithPopup(auth, provider)
        // } catch (error) {
        //     alert(error.message)
        // }


    };


    // googleSignIn()


    const logOut = () => {
        // signOut(auth);
    };

    useEffect(() => {
        
      
                axios.get(`/dashboard/chat/ask/?authtoken=${authToken}`)
                .then((response) => {
                    console.log(response.data)
                    setusage(response.data.usage)
                  setUser({'displayName':response.data.fullName,'email':response.data.email, 'photoURL':response.data.photoURL,'about':response.data.about});

                })
                .catch((error) => {
                    // console.log('error: ', error)
                    // setToken(token)
                    if(error.message){
                        setusagErrorMessage('Invalid UserID')
                    }
                })
                .finally(() =>  {
                    setTokenLoading(false)
                    // console.log('tokenkii' + authToken)
                })
    }, []);


    return (
        <AuthContext.Provider value={{ user, googleSignIn, logOut, authToken, usage, setusage, Token,usagErrorMessage, tokenLoading, setUser, setTokenLoading, aboutq,setaboutq, setSumarizationText, sumarizationText,chatData, setChatData,question, message, setMessage,setAuthToken, about, setAbout, lastAnswer, setLastAnswer }}>
            {children}
        </AuthContext.Provider>
    )
}

export const UserAuth = () => {
    return useContext(AuthContext)
}