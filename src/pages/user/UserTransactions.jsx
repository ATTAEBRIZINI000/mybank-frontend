import { useRef, useState } from 'react'
import Layout from '../../components/user/Layout'
import { Edit, Trash2 } from 'lucide-react'
import { useGetUserCategoriesQuery, useGetUserOperationsQuery } from '../../redux/api/users'
import { useAddOperationMutation, useDeleteOperationMutation, useUpdateOperationMutation } from '../../redux/api/operatins'
import MyLoader from '../../components/MyLoader'


function UserTransactions() {
    const { data: uOperations, error: UOError, isLoading: UOLoading, refetch } = useGetUserOperationsQuery()
    const { data: uCategories, error: UCError, isLoading: UCLoading } = useGetUserCategoriesQuery()
    const userInfos = JSON.parse(localStorage.getItem('user'))

    const [updateOperation, { isLoading: isUpdating }] = useUpdateOperationMutation()
    const [addOperation, { isLoading: isAdding }] = useAddOperationMutation()
    const [showAdd, setShowAdd] = useState(false)
    const handelShow = () => {
        setShowUpdate(false)
        setShowAdd(e => { setShowAdd(!e) })
    }
    const handleNewOperation = () => {
        const data = {
            label: labelRef.current.value,
            emoji: emoji || "✨",
            category_id: caegoryRef.current.value,
            user_id: userInfos.id,
            amount: parseFloat(amountRef.current.value),
            action: actionRef.current.value,
            date: new Date().toISOString()
        }
        console.log('data to add', data)
        addOperation(data).unwrap().then(() => {
            refetch()
        }).catch((err) => {
            console.log("err", err)
        }
        ).finally(() => {
            setShowAdd(false)
            refetch()
        })
    }
    // update form
    const labelRef = useRef()
    const [emoji, setEmoji] = useState('');
    const amountRef = useRef()
    const actionRef = useRef()
    const caegoryRef = useRef()
    const [currentOperation, setCurrentOperation] = useState(null)
    const [showUpdate, setShowUpdate] = useState(false)
    const handelCurrentOperation = (index) => {
        setShowUpdate(true)
        setCurrentOperation(uOperations[index])
    }

    const handleupdateOperation = () => {
        const data = {
            id: currentOperation.id,
            label: labelRef.current.value,
            amount: parseFloat(amountRef.current.value),
            action: actionRef.current.value
        }
        console.log('data to update', data)
        updateOperation(data).unwrap().then(() => {
            refetch()
        }).catch((err) => {
            console.log("err", err)
        }).finally(() => {
            setShowUpdate(false)
            refetch()
        })
    }


    // delete form
    const [deleteOperation, setOperation] = useState(null)

    const [deleteOp] = useDeleteOperationMutation();

    const handleDeleteCategory = () => {
        deleteOp(deleteOperation).unwrap().then(() => {
            console.log('deleted')
        }).catch((err) => {
            console.log("err", err)
        }).finally(() => {
            setOperation(null)
            refetch()
        })
    }
    return (
        <Layout>

            <div className='p-4'>
                <h1 className='text-3xl font-semibold'>Expenses</h1>
                <p className='text-slate-600 mt-2'>All the expenses that you have and manage</p>
            </div>
            <div className="overflow-x-auto bg-white p-4 w-[80%] mx-auto relative">
                {
                    showAdd ?
                        <form onSubmit={(e) => { e.preventDefault() }}>
                            <div className="relative mb-6">
                                <label className="flex  items-center mb-2 text-gray-600 text-sm font-medium">Title</label>
                                <input ref={labelRef} type="text" id="default-search" className="block w-full h-11 px-5 py-2.5 leading-7 text-base font-normal shadow-xs text-gray-900 bg-transparent border border-gray-300 rounded-full placeholder-gray-400 focus:outline-none " />
                            </div>
                            <div className="relative mb-6">
                                <label className="flex  items-center mb-2 text-gray-600 text-sm font-medium">Emoji</label>
                                <input onChange={(e) => setEmoji(e.target.value)} placeholder='emoji picker : Win + . (Windows) or Ctrl + Cmd + Space (Mac) ' maxLength={3} type="text" id="default-search" className="block w-full h-11 px-5 py-2.5 leading-7 text-base font-normal shadow-xs text-gray-900 bg-transparent border border-gray-300 rounded-full placeholder-gray-400 focus:outline-none " />
                            </div>
                            <div className="relative mb-6">
                                <label className="flex  items-center mb-2 text-gray-600 text-sm font-medium">Category</label>
                                <select ref={caegoryRef} className="block w-full h-11 px-8 py-2.5 leading-7 text-base font-normal shadow-xs text-gray-900 bg-transparent border border-gray-300 rounded-full placeholder-gray-400 focus:outline-none pl-2">
                                    {uCategories && uCategories?.map((category) => (
                                        <option key={category.id} value={category.id}>{category.title}</option>
                                    ))}
                                </select>
                            </div>
                            <div className="relative mb-6">
                                <label className="flex  items-center mb-2 text-gray-600 text-sm font-medium">Type</label>
                                <select ref={actionRef} className="block w-full h-11 px-8 py-2.5 leading-7 text-base font-normal shadow-xs text-gray-900 bg-transparent border border-gray-300 rounded-full placeholder-gray-400 focus:outline-none pl-2">
                                    <option key="+" value="+">+ Gained</option>
                                    <option key="-" value="-">- Lost</option>
                                </select>
                            </div>
                            <div className="relative mb-6">
                                <label className="flex  items-center mb-2 text-gray-600 text-sm font-medium">Amount</label>
                                <input ref={amountRef} type="text" id="default-search" className="block w-full h-11 px-5 py-2.5 leading-7 text-base font-normal shadow-xs text-gray-900 bg-transparent border border-gray-300 rounded-full placeholder-gray-400 focus:outline-none " />
                            </div>
                            <div className='flex justify-between'>
                                <button onClick={handelShow} className="w-30 h-10 text-red-500 hover:bg-red-800 hover:text-amber-50 transition-all duration-700 rounded-full shadow-xs text-base font-semibold leading-6 mb-6">Cancel</button>
                                <button onClick={handleNewOperation} className="w-30 h-10 bg-indigo-600 hover:bg-indigo-800 transition-all duration-700 rounded-full shadow-xs text-white text-base font-semibold leading-6 mb-6">{isAdding ? "Wait ..." : "Add"}</button>
                            </div>
                        </form>
                        :
                        <div className='text-right'>
                            <button onClick={handelShow} className='w-30 h-10 bg-indigo-600 hover:bg-indigo-800 transition-all duration-700 rounded-full shadow-xs text-white text-base font-semibold leading-6 mb-6'>New Expense</button>
                        </div>
                }

                {
                    showUpdate ?
                        <form onSubmit={(e) => { e.preventDefault() }}>
                            <div className="relative mb-6">
                                <label className="flex  items-center mb-2 text-gray-600 text-sm font-medium">ID</label>
                                <input type="text" readOnly id="default-search" className="block w-full h-11 px-5 py-2.5 leading-7 text-base font-normal shadow-xs text-gray-900 bg-transparent border border-gray-300 rounded-full placeholder-gray-400 focus:outline-none " defaultValue={currentOperation?.id} />
                            </div>
                            <div className="relative mb-6">
                                <label className="flex  items-center mb-2 text-gray-600 text-sm font-medium">Title</label>
                                <input ref={labelRef} type="text" id="default-search" className="block w-full h-11 px-5 py-2.5 leading-7 text-base font-normal shadow-xs text-gray-900 bg-transparent border border-gray-300 rounded-full placeholder-gray-400 focus:outline-none " defaultValue={currentOperation?.title} />
                            </div>
                            <div className="relative mb-6">
                                <label className="flex  items-center mb-2 text-gray-600 text-sm font-medium">Action</label>
                                <input ref={actionRef} defaultValue={currentOperation?.type} type="text" id="default-search" className="block w-full h-11 px-5 py-2.5 leading-7 text-base font-normal shadow-xs text-gray-900 bg-transparent border border-gray-300 rounded-full placeholder-gray-400 focus:outline-none " />
                            </div>
                            <div className="relative mb-6">
                                <label className="flex  items-center mb-2 text-gray-600 text-sm font-medium">Amount</label>
                                <input ref={amountRef} defaultValue={currentOperation?.amount} type="text" id="default-search" className="block w-full h-11 px-5 py-2.5 leading-7 text-base font-normal shadow-xs text-gray-900 bg-transparent border border-gray-300 rounded-full placeholder-gray-400 focus:outline-none " />
                            </div>
                            <div className='flex justify-between'>
                                <button className="w-30 h-10 text-red-500 hover:bg-red-800 hover:text-amber-50 transition-all duration-700 rounded-full shadow-xs text-base font-semibold leading-6 mb-6" onClick={() => { setShowUpdate(false) }}>Cancel</button>
                                <button onClick={handleupdateOperation} className="w-30 h-10 bg-indigo-600 hover:bg-indigo-800 transition-all duration-700 rounded-full shadow-xs text-white text-base font-semibold leading-6 mb-6">{isUpdating ? "Wait ..." : "Update"}</button>
                            </div>
                        </form>
                        :
                        <table className="w-full text-left text-sm whitespace-nowrap ">
                            {
                                deleteOperation &&
                                <div className='absolute h-full w-full top-0 flex justify-center items-center'>
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
                                            <p className="text-gray-600 text-sm">Are you sure you want to delete "{/*category*/}"</p>
                                            <div className='flex justify-between p-4'>
                                                <button type='button' className='py-2.5 px-6 text-sm rounded-full border border-solid border-emerald-200 text-emerald-600 cursor-pointer font-semibold text-center shadow-xs transition-all duration-500 hover:bg-emerald-600 hover:text-white' onClick={() => { setOperation(null) }}>Cancel</button>
                                                <button type='button' className='py-2.5 px-6 text-sm rounded-full border border-solid border-red-200 text-red-600 cursor-pointer font-semibold text-center shadow-xs transition-all duration-500 hover:bg-red-600 hover:text-white' onClick={handleDeleteCategory}>Delete</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            }
                            <thead className="uppercase tracking-wider border-b-2 ">
                                <tr>
                                    <th scope="col" className="px-6 py-4">
                                        ID
                                    </th>
                                    <th scope="col" className="px-6 py-4">
                                        TITLE
                                    </th><th scope="col" className="px-6 py-4">
                                        AMOUNT
                                    </th><th scope="col" className="px-6 py-4">
                                        DATE
                                    </th><th scope="col" className="px-6 py-4">
                                        ACTIONS
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {UOLoading ? <MyLoader /> :uOperations && uOperations.map((operation, index) => (
                                    <tr key={operation.id} className="border-b ">
                                        <td scope="row" className="px-6 py-4">{operation.id}</td>
                                        <td className="px-6 py-4">{operation?.emoji + " " + operation.title}</td>
                                        <td className="px-6 py-4">{operation.type + " " + operation.amount}</td>
                                        <td className="px-6 py-4">{operation.date}</td>
                                        <td className="px-6 py-4">
                                            <button className='text-green-500 rounded-lg mr-3' onClick={() => { handelCurrentOperation(index) }}><Edit size={25} /></button>
                                            <button className='text-red-500 rounded-lg' onClick={() => { setOperation(operation.id) }}><Trash2 size={25} /></button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>

                        </table>
                }
            </div>
        </Layout>
    )
}

export default UserTransactions