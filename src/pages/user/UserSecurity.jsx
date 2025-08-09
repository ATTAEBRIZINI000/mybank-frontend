import React, { useRef, useState } from 'react'
import Layout from '../../components/user/Layout'
import { useUpdatePasswordMutation } from '../../redux/api/users'
import { CheckCheckIcon, X } from 'lucide-react'
function UserSecurity() {
    const [showAllert, setShowAlert] = useState({ success: false, error: false })
    const [updatePassword] = useUpdatePasswordMutation()
    const oldPasswordRef = useRef()
    const newPasswordRef = useRef()
    const confirmPasswordRef = useRef()
    const handelUpdatePassword = () => {
        if (newPasswordRef.current.value !== confirmPasswordRef.current.value) {
            alert('Password does not match')
            return
        }
        const data = {
            currentPassword: oldPasswordRef.current.value,
            newPassword: newPasswordRef.current.value
        }
        updatePassword(data).then((res) => {
            if (res?.data.message) {
                setShowAlert({ success: true, error: false })
            }
        }).catch((err) => {
            setShowAlert({ success: false, error: true })
        })
    }
    return (
        <Layout>
            <div className='min-w-[300px] w-[40%] mx-auto'>
                <form onSubmit={(e) => { e.preventDefault() }} className='flex flex-col gap-3 mt-36'>
                    {showAllert.success &&
                        <div className='flex justify-center items-center gap-2 mb-4 text-green-400 px-4 py-2 border rounded-2xl border-green-400'>
                            <CheckCheckIcon /> <span className='text-lg font-semibold'>Update Password</span>
                        </div>}
                    {showAllert.error &&
                        <div className='flex justify-center items-center gap-2 mb-4 text-red-400 px-4 py-2 border rounded-2xl border-red-400'>
                            <X /> <span className='text-lg font-semibold'>The current password is incorrect</span>
                        </div>}
                    <div>
                        <label className='flex  items-center mb-2 text-gray-600 text-sm font-medium' htmlFor="old_password">Old Password</label>
                        <input type="text" ref={oldPasswordRef} onClick={() => { setShowAlert({ success: false, error: false }) }} id='old_password' placeholder='Old_password' className='block w-full h-11 px-5 py-2.5 leading-7 text-base font-normal shadow-xs text-gray-900 bg-transparent border border-gray-300 rounded-full placeholder-gray-400 focus:outline-none ' />
                    </div>
                    <div>
                        <label className='flex  items-center mb-2 text-gray-600 text-sm font-medium' htmlFor="new_password">New Password</label>
                        <input type="password" ref={newPasswordRef} onClick={() => { setShowAlert({ success: false, error: false }) }} id='new_password' placeholder='New_password' className='block w-full h-11 px-5 py-2.5 leading-7 text-base font-normal shadow-xs text-gray-900 bg-transparent border border-gray-300 rounded-full placeholder-gray-400 focus:outline-none ' />
                    </div>
                    <div>
                        <label className='flex  items-center mb-2 text-gray-600 text-sm font-medium' htmlFor="confirm_password">Confirm Password</label>
                        <input type="password" ref={confirmPasswordRef} onClick={() => { setShowAlert({ success: false, error: false }) }} id='confirm_password' placeholder='Confirm_password' className='block w-full h-11 px-5 py-2.5 leading-7 text-base font-normal shadow-xs text-gray-900 bg-transparent border border-gray-300 rounded-full placeholder-gray-400 focus:outline-none ' />
                    </div>
                    <div>
                        <button onClick={handelUpdatePassword} className='w-30 h-10 bg-indigo-600 hover:bg-indigo-800 transition-all duration-700 rounded-full shadow-xs text-white text-base font-semibold leading-6 mb-6'>Update</button>
                    </div>
                </form>
            </div>
        </Layout>
    )
}

export default UserSecurity