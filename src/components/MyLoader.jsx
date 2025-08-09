import Lottie from 'lottie-react'
import loading from './../data/loding.json'

function MyLoader() {
    return (
        <div className="flex h-full justify-center items-center"><Lottie animationData={loading} className='size-72' /></div>
    )
}

export default MyLoader