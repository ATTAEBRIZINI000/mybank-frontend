import { useGetUserCategoriesQuery, useGetUserExpensesQuery, useGetUserOperationsQuery } from '../../redux/api/users';
import Layout from '../../components/user/Layout'
import { CircleArrowOutDownLeft, CircleArrowOutUpRightIcon, Facebook, Landmark } from 'lucide-react';
import CategoriesChart from '../../components/charts/CategoriesChart';
import ExpensesChart from '../../components/charts/ExpensesChart';
import MyLoader from '../../components/MyLoader';
import formattedDate from '../../services/currentDate';


function UserHome() {
    const userInfos = JSON.parse(localStorage.getItem('user'))
    const { data: categories, error: CError, isLoading: CLoading } = useGetUserCategoriesQuery()
    const { data: operations, error: OError, isLoading: OLoading } = useGetUserOperationsQuery()
    const result = operations && operations.reduce((acc, operation) => {
        if (operation.type == '+') {
            acc.gains += operation.amount;
        } else if (operation.type == '-') {
            acc.losses += operation.amount;
        }
        return acc;
    }, { gains: 0, losses: 0 });
    // user expenses
    const { data: expenses, error: Error, isLoading: ELoading } = useGetUserExpensesQuery()
    return (
        <Layout>
            <div className='p-4'>
                <div className='md:px-10'>
                    <div className='flex justify-between'>
                        <div >
                            <p className='text-xl md:text-3xl font-semibold my-2 '> Home</p>
                            <p className='text-[12px] md:text-[16px] text-slate-400'>{formattedDate}</p>
                        </div>
                        <div className='flex gap-x-4 items-center'>
                            <a href="/profile">
                                <img src={userInfos.avatar} alt="logo" className='size-10 md:size-16 object-cover rounded-full' />
                            </a>
                            <div>
                                <p className='md:text-lg font-medium'>{userInfos.full_name}</p>
                                <p className='text-[12px] md:text-[16px] text-[#14213D]'>{userInfos.profession}</p>
                            </div>
                        </div>
                    </div>
                    <main className='min-h-screen md:min-h-full flex flex-col lg:flex-row'>
                        <div id="left" className='lg:w-[75%] overflow-x-hidden overflow-y-auto'>
                            {/* counters */}
                            <div className='flex gap-x-1 md:gap-4 justify-between px-1 py-4 md:p-8'>
                                <div className='flex items-center gap-2 md:gap-6 bg-slate-100/90 md:py-6 md:px-8 rounded-2xl md:shadow-sm'>
                                    <div className='bg-[#59E5A9] p-2 rounded-full'>
                                        <CircleArrowOutDownLeft className='text-white size-3 md:size-8' />
                                    </div>
                                    <div>
                                        <p className='text-[14px] md:text-xl font-medium '>
                                            {OLoading ? <span>Loading ... </span> : `+ $${result?.gains.toFixed(2)}`}
                                        </p>
                                        <p className='text-slate-400 text-[8px] md:text-[16px]'>Gains</p>
                                    </div>
                                </div>
                                <div className='flex items-center gap-2 md:gap-6 bg-slate-100/90 md:py-6 md:px-8 rounded-2xl md:shadow-sm'>
                                    <div className='bg-[#EC0B43] p-2 rounded-full'>
                                        <CircleArrowOutUpRightIcon className='text-white size-3 md:size-8' />
                                    </div>
                                    <div>
                                        <p className='text-[14px] md:text-xl font-medium '>
                                            {OLoading ? <span>Loading ... </span> : `- $${result?.losses.toFixed(2)}`}
                                        </p>
                                        <p className='text-slate-400 text-[8px] md:text-[16px]'>Losses</p>
                                    </div>
                                </div>
                                <div className='flex items-center gap-2 md:gap-6 bg-slate-100/90 md:py-6 md:px-8 rounded-2xl md:shadow-sm'>
                                    <div className='bg-[#FCA311] p-2 rounded-full'>
                                        <Landmark className='text-white size-3 md:size-8' />
                                    </div>
                                    <div>
                                        <p className='text-[14px] md:text-xl font-medium '>{`${result?.gains > result?.losses ? "+" : "-"} $ ` + Math.abs(result?.gains - result?.losses).toFixed(2)}</p>
                                        <p className='text-slate-400 text-[8px] md:text-[16px]'>Saved</p>
                                    </div>
                                </div>
                            </div>
                            <div className='py-[190px] px-5 md:pb-[40px] md:pt-0 h-[600px] gap-y-15 md:p-1 md:gap-1 md:h-[400px] flex justify-center items-center flex-col md:flex-row'>
                                <>
                                    {CLoading ? <MyLoader /> :
                                        <CategoriesChart data={categories} />}
                                </>
                                <>
                                    {ELoading ? <MyLoader /> :
                                        <ExpensesChart data={expenses} />}
                                </>

                            </div>
                        </div>
                        <div id="right" className='bg-slate-100/50 rounded-2xl lg:w-[25%] p-4 mt-16 md:mt-8'>
                            <div className='flex justify-between items-end'>
                                <p className=' text-2xl'>Expenses</p>
                                <a href="/expenses" className=' text-sm text-blue-400'>View All</a>
                            </div>
                            <div className="flex">
                                {/* cards */}
                                <div className="p-4 w-full">
                                    {/* card */}
                                    {
                                        ELoading ? <MyLoader /> :
                                            expenses?.slice(0, 8).map((expense, index) => {
                                                return (
                                                    <div key={index} className="flex justify-between w-full my-2">
                                                        <div className='flex gap-4'>
                                                            <div className='rounded-full flex justify-center items-center p-1 text-3xl'>
                                                                {/* <Facebook className='text-white' /> */}
                                                                {expense.emoji}
                                                            </div>
                                                            <div>
                                                                <p className='text-lg'>{expense.title}</p>
                                                                <p className='text-slate-400'>2025-02-13</p>
                                                            </div>
                                                        </div>
                                                        <p className={expense.type == "-" ? "text-red-700" : "text-green-700"}>{expense.action}${expense.amount}</p>
                                                    </div>
                                                )
                                            })
                                    }
                                </div>
                            </div>
                        </div>
                    </main>
                </div>
            </div >
        </Layout >
    )
}

export default UserHome