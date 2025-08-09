import { useRef, useState } from 'react'
import Layout from '../../components/user/Layout'
import { Edit, Trash2 } from 'lucide-react'
import { useGetUserCategoriesQuery } from '../../redux/api/users'
import { useAddCategoryMutation, useDeleteCategoryMutation, useUpdateCategoryMutation } from '../../redux/api/categories'
import MyLoader from '../../components/MyLoader'


function UserCategories() {
    const { data: uCategories, error: UCError, isLoading: UCLoading, refetch } = useGetUserCategoriesQuery()
    console.log("uCategories", uCategories)
    const [updateCategory, { isLoading: isUpdating }] = useUpdateCategoryMutation()
    // New category form
    const [addCategory, { isLoading: isAdding, error: addError }] = useAddCategoryMutation()
    const [showAdd, setShowAdd] = useState(false)
    const newTitleRef = useRef()
    const handelShow = () => {
        setShowAdd(e => { setShowAdd(!e) })
    }
    const handelAddCategory = () => {
        const data = { title: newTitleRef.current.value }
        addCategory(data).unwrap().then(data => { console.log("category was just added") }).catch(err => { console.log("err", err) }).finally(() => {
            setShowAdd(false)
            refetch()
        })
    }
    // update form
    const titleRef = useRef()
    const [currentCategory, setCurrentCategory] = useState(null)
    const [showUpdate, setShowUpdate] = useState(false)
    const handelCurrentCategory = (index) => {
        setShowUpdate(true)
        setCurrentCategory(uCategories[index])
    }

    const handleUpdateCategory = () => {
        const data = {
            id: currentCategory.id,
            title: titleRef.current.value
        }
        updateCategory(data).unwrap().then(() => {
        }).catch((err) => {
            console.log("err", err)
        }).finally(() => {
            setShowUpdate(false)
            refetch()
        })
    }


    // delete form
    const [deletCategory, setDeletCategory] = useState(null)

    const [deleteCategory] = useDeleteCategoryMutation();

    const handleDeleteCategory = () => {
        deleteCategory(deletCategory).unwrap().then(() => {
            console.log('deleted')
            // refetch();
        }).catch((err) => {
            console.log("err", err)
        }).finally(() => {
            setDeletCategory(null)
            refetch()
        })
    }
    return (
        <Layout>

            <div className='p-4'>
                <h1 className='text-3xl font-semibold'>Categories</h1>
                <p className='text-slate-600 mt-2'>All the categories that you have and manage</p>
            </div>
            <div className="overflow-x-auto bg-white p-4 w-[80%] mx-auto relative ">
                {
                    showAdd ?
                        <form onSubmit={(e) => { e.preventDefault() }}>
                            <div className="relative mb-6">
                                <label className="flex  items-center mb-2 text-gray-600 text-sm font-medium">Title</label>
                                <input ref={newTitleRef} type="text" id="default-search" className="block w-full h-11 px-5 py-2.5 leading-7 text-base font-normal shadow-xs text-gray-900 bg-transparent border border-gray-300 rounded-full placeholder-gray-400 focus:outline-none " />
                            </div>
                            <div className='flex justify-between'>
                                <button onClick={handelShow} className="w-30 h-10 text-red-500 hover:bg-red-800 hover:text-amber-50 transition-all duration-700 rounded-full shadow-xs text-base font-semibold leading-6 mb-6">Cancel</button>
                                <button onClick={handelAddCategory} className="w-30 h-10 bg-indigo-600 hover:bg-indigo-800 transition-all duration-700 rounded-full shadow-xs text-white text-base font-semibold leading-6 mb-6">{isAdding ? "Wait ... " : "Add"}</button>
                            </div>
                        </form>
                        :
                        <div className='text-right'>
                            <button onClick={handelShow} className='w-30 h-10 bg-indigo-600 hover:bg-indigo-800 transition-all duration-700 rounded-full shadow-xs text-white text-base font-semibold leading-6 mb-6'>New Category</button>
                        </div>
                }

                {
                    showUpdate ?
                        <form onSubmit={(e) => { e.preventDefault() }}>
                            <div className="relative mb-6">
                                <label className="flex  items-center mb-2 text-gray-600 text-sm font-medium">ID</label>
                                <input type="text" readOnly id="default-search" className="block w-full h-11 px-5 py-2.5 leading-7 text-base font-normal shadow-xs text-gray-900 bg-transparent border border-gray-300 rounded-full placeholder-gray-400 focus:outline-none " value={currentCategory?.id} />
                            </div>
                            <div className="relative mb-6">
                                <label className="flex  items-center mb-2 text-gray-600 text-sm font-medium">Title</label>
                                <input ref={titleRef} type="text" id="default-search" className="block w-full h-11 px-5 py-2.5 leading-7 text-base font-normal shadow-xs text-gray-900 bg-transparent border border-gray-300 rounded-full placeholder-gray-400 focus:outline-none " placeholder={currentCategory?.title} />
                            </div>
                            <div className='flex justify-between'>
                                <button className="w-30 h-10 text-red-500 hover:bg-red-800 hover:text-amber-50 transition-all duration-700 rounded-full shadow-xs text-base font-semibold leading-6 mb-6" onClick={() => { setShowUpdate(false) }}>Cancel</button>
                                <button onClick={handleUpdateCategory} className="w-30 h-10 bg-indigo-600 hover:bg-indigo-800 transition-all duration-700 rounded-full shadow-xs text-white text-base font-semibold leading-6 mb-6">{isUpdating ? "Wait ... " : "Update"}</button>
                            </div>
                        </form>
                        :
                        <table className="w-full text-left text-sm whitespace-nowrap ">
                            {
                                deletCategory &&
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
                                                <button type='button' className='py-2.5 px-6 text-sm rounded-full border border-solid border-emerald-200 text-emerald-600 cursor-pointer font-semibold text-center shadow-xs transition-all duration-500 hover:bg-emerald-600 hover:text-white' onClick={() => { setDeletCategory(null) }}>Cancel</button>
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
                                    </th>
                                    <th scope="col" className="px-6 py-4">
                                        DATE
                                    </th>
                                    <th scope="col" className="px-6 py-4">
                                        ACTIONS
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {UCLoading ? <MyLoader /> : uCategories.map((category, index) => (
                                    <tr key={category.id} className="border-b ">
                                        <td className="px-6 py-4">{category.id}</td>
                                        <td className="px-6 py-4">{category.title}</td>
                                        <td className="px-6 py-4">{category?.date ?? '12-02-2024'}</td>
                                        <td className="px-6 py-4">
                                            <button className='text-green-500 rounded-lg mr-3' onClick={() => { handelCurrentCategory(index) }}><Edit size={25} /></button>
                                            <button className='text-red-500 rounded-lg' onClick={() => { setDeletCategory(category.id) }}><Trash2 size={25} /></button>
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

export default UserCategories