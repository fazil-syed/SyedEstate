import React from 'react'
import { useSelector } from 'react-redux'

const Profile = () => {
  const {currentUser} = useSelector((st)=>st.user)
  return (
    <div className='p-3 max-w-lg mx-auto'>
    <h1 className='text-3xl my-7 font-semibold text-center'>Profile</h1>
    <form className='flex flex-col gap-4'>
      <img src={currentUser.avatar} alt={currentUser.username} className='mt-2 rounded-full w-24 h-24 self-center object-cover cursor-pointer' />
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