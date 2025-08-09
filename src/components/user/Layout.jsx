import React from 'react'
import { ArrowDown, ArrowDownUp, HousePlus, LayoutDashboardIcon, LogOut, ShieldCheck, SquareStack, UserPen, Wallet, Waypoints } from 'lucide-react'
import { useLocation } from 'react-router-dom'
import { logout } from '../../services/api'
function Layout({ children }) {
    const location = useLocation()
    return (
        < div className='flex relative' >
            <div className='w-[50px] md:w-[80px] h-screen bg-black flex flex-col justify-center items-center gap-y-4 fixed'>
                <a href='/'><LayoutDashboardIcon className={`text-violet-700 hover:bg-slate-400 size-[45px] p-2 rounded-md ${location.pathname == "/" && "bg-slate-200"}`} /></a>
                <a href='/categories'><SquareStack className={`text-violet-700 hover:bg-slate-400 size-[45px] p-2 rounded-md ${location.pathname == "/categories" && "bg-slate-200"}`} /></a>
                <a href='/expenses'><ArrowDownUp className={`text-violet-700 hover:bg-slate-400 size-[45px] p-2 rounded-md ${location.pathname == "/expenses" && "bg-slate-200"}`} /></a>
                <a href='/profile'><UserPen className={`text-violet-700 hover:bg-slate-400 size-[45px] p-2 rounded-md ${location.pathname == "/profile" && "bg-slate-200"}`} /></a>
                <a href='/security'><ShieldCheck className={`text-violet-700 hover:bg-slate-400 size-[45px] p-2 rounded-md ${location.pathname == "/security" && "bg-slate-200"}`} /></a>
                <a href='/login'><LogOut onClick={() => { logout() }} className={`text-red-700 hover:text-white size-[45px] p-2 rounded-md hover:bg-red-700  ${location.pathname == "/logout" && "bg-slate-200"}`} /></a>
            </div>
            <div className='w-full h-full pl-10 md:pl-20'>
                {children}
            </div>
        </div>
    )
}

export default Layout