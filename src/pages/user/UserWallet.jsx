import React from 'react'
import Layout from '../../components/user/Layout'
import Lottie from "lottie-react";
import animationData from './../../data/check.json'
import loading from './../../data/loding.json'
import phone from './../../data/phone.json'
function UserWallet() {
    return (
        <Layout>
            <div className='p-4'>
                User Wallet
                <Lottie animationData={animationData} className='size-72' />
                <Lottie animationData={phone} className='size-72' />
                <Lottie animationData={loading} className='size-72' />
            </div>
        </Layout>
    )
}

export default UserWallet