import React from 'react'

function Alert({ category }) {
    return (
        <div className='absolute h-full w-full top-0 bg-slate-200/75 flex justify-center items-center'>
            <div className="flex items-center p-4 mb-4 rounded-xl text-sm  bg-amber-50 w-[60%]" role="alert">
                <div className="mr-3 w-9 h-9 p-2 bg-amber-200 rounded-full">
                    <svg className="flex-shrink-0 w-5 h-5" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M10.0048 13.3333V9.16663M10.0003 6.66663H10.0078M10.0003 18.3333C5.39795 18.3333 1.66699 14.6023 1.66699 9.99996C1.66699 5.39759 5.39795 1.66663 10.0003 1.66663C14.6027 1.66663 18.3337 5.39759 18.3337 9.99996C18.3337 14.6023 14.6027 18.3333 10.0003 18.3333Z" stroke="#F59E0B" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                    </svg>
                </div>
                <div className="w-full">
                    <h3 className="text-amber-500 font-normal mb-1">
                        <span className="font-semibold mr-1">Warning</span>
                    </h3>
                    <p className="text-gray-600 text-sm">Are you sure you want to delete "{category || "hi"}"</p>
                    <div className='flex justify-between p-4'>
                        <button type='button' className='py-2.5 px-6 text-sm rounded-full border border-solid border-emerald-200 text-emerald-600 cursor-pointer font-semibold text-center shadow-xs transition-all duration-500 hover:bg-emerald-600 hover:text-white'>Cancel</button>
                        <button type='button' className='py-2.5 px-6 text-sm rounded-full border border-solid border-red-200 text-red-600 cursor-pointer font-semibold text-center shadow-xs transition-all duration-500 hover:bg-red-600 hover:text-white'>Delete</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Alert