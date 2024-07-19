import React, { useState } from 'react'
import ROLE from '../common/role'
import { CgCloseR } from "react-icons/cg";
import SummaryApi from "../common";
import { toast } from 'react-toastify';

const ChangeUserRole = ({
  name,
  email,
  role,
  userId,
  onClose,
  callFunc,
}) => {
  const [userRole,setUserRole] = useState(role)

  const handleOnChangeSelect = (e) => {
         setUserRole(e.target.value)
  }
  const updateUserRole = async() =>{
      const fetchResponse = await fetch(SummaryApi.updateUser.url,{
        method: SummaryApi.signIn.method,
        credentials : 'include',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          userId : userId,
          role : userRole
        })
      })

      const responseData = await fetchResponse.json()

      if(responseData.success){
        toast.success(responseData.message)
        onClose()
        callFunc()
      }

      console.log("Role Updated:",responseData)
  }
   return (
    <div className='top-0 bottom-0 left-0 right-0 w-full h-full z-10 flex justify-between items-center fixed bg-slate-200 bg-opacity-80'>
      <div className='shadow-md mx-auto bg-white p-4 w-full max-w-sm'>
       <button className='block ml-auto' onClick={onClose}>
       <CgCloseR />
       </button>

      <h1 className='pb-4 text-lg font-medium'>Change User Role</h1>
      <p>Name : {name}</p>
      <p>Email: {email}</p>
      
      <div className='flex items-center justify-between'>    
      <p className ='pr-1 mx-0'>Role:</p>
      <select className='w-full mt-1 p-1 border rounded' value={userRole} onChange={handleOnChangeSelect}>
          {Object.values(ROLE).map((el, index) => (
            <option key={index} value={el}>{el}</option>
          ))}
        </select>
      </div>
      <button className='w-fit mx-auto mt-4 block border py-1 px-3 rounded-full bg-blue-500 text-white hover:bg-blue-700' onClick={updateUserRole}>Change Role</button>
      </div>
      </div>
  )
}

export default ChangeUserRole