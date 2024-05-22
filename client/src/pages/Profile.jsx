import React, { useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from "firebase/storage"
import { app } from "../../firebase"
const Profile = () => {
  const {currentUser} = useSelector((st)=>st.user)
  const fileRef = useRef(null)
  const [file, setFile] = useState(undefined)
  const [progPerc, setProgPerc] = useState(0)
  const [fileUploadError, setFileUploadError] = useState(false)
  const [formData,setFormData] = useState({})
  useEffect(()=>{
    if(file){
      handleFileUpload(file)
    }
  },[file])
 
  const handleFileUpload = (file)=>{
    const storage = getStorage(app)
    const fileName = new Date().getTime() +  file.name
    const storageRef  = ref(storage,fileName)
    const uploadTask = uploadBytesResumable(storageRef,file)
    setFileUploadError(false)

    uploadTask.on('state_changed',
      (snapshot)=>{
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        setProgPerc(Math.round(progress))
      },
      (err)=>{
        setFileUploadError(true)
      },
      ()=>{
        getDownloadURL(uploadTask.snapshot.ref).then((downloadUrl)=>setFormData({...formData,avatar: downloadUrl}))
      }
    )
  }
  return (
    <div className='p-3 max-w-lg mx-auto'>
    <h1 className='text-3xl my-7 font-semibold text-center'>Profile</h1>
    <form className='flex flex-col gap-4'>
      <input hidden accept='image/.*' type="file"  ref={fileRef} onChange={(e)=>setFile(e.target.files[0])}/>
      <img onClick={()=>fileRef.current.click()} src={formData.avatar || currentUser.avatar} alt={currentUser.username} className='mt-2 rounded-full w-24 h-24 self-center object-cover cursor-pointer' />
      <p className='text-center text-sm'>
        {fileUploadError ? <span className='text-red-700'>Error Image Upload (Image Must be Less than 2 mb)</span> :progPerc > 0 && progPerc<100 ? <span className='text-slate-700'>{`Uploading ${progPerc}%`}</span> : progPerc==100 ? <span className='text-green-700'>Image Uploaded Successfully</span>: ""
        }
      </p>
      <input type="text" placeholder='username' id="username" className='border p-3 rounded-lg'/>
        <input type="email" placeholder='email' id="email" className='border p-3 rounded-lg'/>
        <input type="password" placeholder='password' id="password" className='border p-3 rounded-lg'/>
        <button className='bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80'>{false ? "Loading..." : "update"}</button>

    </form>
    <div className="flex justify-between mt-5">
      <span className='text-red-700 cursor-pointer'>Delete account</span>
      <span className='text-red-700 cursor-pointer'>Sign out</span>
    </div>
    </div>
    
  )
}

export default Profile