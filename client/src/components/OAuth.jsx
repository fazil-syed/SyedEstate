import {GoogleAuthProvider,getAuth, signInWithPopup} from "firebase/auth"
import { app } from "../../firebase"
import { useDispatch } from "react-redux"
import { signInSuccess } from "../redux/user/userSlice";
import { useNavigate } from "react-router-dom";

const OAuth = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate()
    const handleGoogleClick =async ()=>{
        try {
            const provider = new GoogleAuthProvider()
            const auth = getAuth(app)
            const result = await signInWithPopup(auth,provider)
            
            const res = await fetch("/api/auth/google",{
                method :"POST",
                headers:{
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({name: result.user.displayName, email: result.user.email, photo: result.user.photoURL})

            })
            const data = await res.json();
            dispatch(signInSuccess(data))
            navigate("/")
        } catch (error) {
            console.log("could not sign in to google",error);
        }
    }
  return (
    <button onClick={handleGoogleClick} type='button' className='bg-red-700 uppercase p-3 text-white rounded-lg hover:opacity-95'>continue with google</button>
  )
}

export default OAuth