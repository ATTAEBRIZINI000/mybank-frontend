import React, { useRef } from 'react'
import Layout from '@/components/user/Layout'
import { useUpdateUserMutation } from '../../redux/api/users';



function UserProfile() {
    const userInfos = JSON.parse(localStorage.getItem('user'))
    const [updateUser, { data, error, isLoading }] = useUpdateUserMutation();
    // usr update
    const full_nameRef = useRef()
    const emailRef = useRef()
    const addressRef = useRef()
    const professionRef = useRef()
    const avatarRef = useRef()

    const handelUpdate = () => {
        const data = {
            id: userInfos.id,
            full_name: full_nameRef.current.value,
            email: emailRef.current.value,
            address: addressRef.current.value,
            avatar: avatarRef.current.value,
            profession: professionRef.current.value
        }
        updateUser(data).unwrap().then(res => {
            console.log(res)
            localStorage.setItem('user', JSON.stringify(res))
        }).catch(err => {
            console.log(err)
        })
    }


    return (
        <Layout>
            <div className='p-4 flex gap-2'>
                <div id='profile' className='w-full'>
                    <div className='flex justify-center mt-12'>
                        <img src={userInfos.avatar} alt="avatar" className='size-40 rounded-full object-cover p-2 relative' />
                    </div>
                    <div className='min-w-[300px] w-[40%] mx-auto'>
                        <form onSubmit={(e) => { e.preventDefault() }} className='flex flex-col gap-3'>
                            <div>
                                <label htmlFor="avatar" className='flex  items-center mb-2 text-gray-600 text-sm font-medium'>Avatar url</label>
                                <input type="text" ref={avatarRef} defaultValue={userInfos.avatar} id='avatar' placeholder='avatar url' className='block w-full h-11 px-5 py-2.5 leading-7 text-base font-normal shadow-xs text-gray-900 bg-transparent border border-gray-300 rounded-full placeholder-gray-400 focus:outline-none ' />
                            </div>
                            <div>
                                <label htmlFor="name" className='flex  items-center mb-2 text-gray-600 text-sm font-medium'>Full Name</label>
                                <input type="text" ref={full_nameRef} defaultValue={userInfos.full_name} id='name' placeholder='full_name' className='block w-full h-11 px-5 py-2.5 leading-7 text-base font-normal shadow-xs text-gray-900 bg-transparent border border-gray-300 rounded-full placeholder-gray-400 focus:outline-none ' />
                            </div>
                            <div>
                                <label htmlFor="email" className='flex  items-center mb-2 text-gray-600 text-sm font-medium'>Email</label>
                                <input type="text" ref={emailRef} defaultValue={userInfos.email} id='email' placeholder='Email' className='block w-full h-11 px-5 py-2.5 leading-7 text-base font-normal shadow-xs text-gray-900 bg-transparent border border-gray-300 rounded-full placeholder-gray-400 focus:outline-none ' />
                            </div>
                            <div>
                                <label htmlFor="address" className='flex  items-center mb-2 text-gray-600 text-sm font-medium'>Address</label>
                                <input type="text" ref={addressRef} defaultValue={userInfos.address} id='address' placeholder='Address' className='block w-full h-11 px-5 py-2.5 leading-7 text-base font-normal shadow-xs text-gray-900 bg-transparent border border-gray-300 rounded-full placeholder-gray-400 focus:outline-none ' />
                            </div>
                            <div>
                                <label htmlFor="profession" className='flex  items-center mb-2 text-gray-600 text-sm font-medium'>Profession</label>
                                <input type="text" ref={professionRef} defaultValue={userInfos.profession} id='profession' placeholder='Profession' className='block w-full h-11 px-5 py-2.5 leading-7 text-base font-normal shadow-xs text-gray-900 bg-transparent border border-gray-300 rounded-full placeholder-gray-400 focus:outline-none ' />
                            </div>
                            <div>
                                <button className='w-30 h-10 bg-indigo-600 hover:bg-indigo-800 transition-all duration-700 rounded-full shadow-xs text-white text-base font-semibold leading-6 mb-6' onClick={handelUpdate} >{isLoading ? "Wait ... " : "Update"}</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default UserProfile