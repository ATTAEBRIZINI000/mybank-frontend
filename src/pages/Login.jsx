import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../services/api";

export default function MyForm() {
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const emailRef = useRef();
    const passwordRef = useRef();


    const handelSubmit = () => {
        setLoading(true);
        const values = {
            email: emailRef.current.value,
            password: passwordRef.current.value
        };

        api.post('/api/login', values)
            .then((res) => {
                localStorage.setItem('token', res.data.token);
                localStorage.setItem('user', JSON.stringify(res.data.user));
                window.location.href = "/profile";
            })
            .catch((err) => {
                if (err.response?.data?.message) {
                    setError(err.response.data.message);
                } else {
                    setError("Please fill all the fields");
                }
                setLoading(false);
            })
    };

    return (
        <div className="flex justify-center items-center h-screen p-6">
            <form onSubmit={(e) => { e.preventDefault() }} className="w-full md:w-[500px]">
                <h1 className="text-2xl font-bold mb-12">Login to your account</h1>
                <div className="relative mb-6">
                    <label htmlFor="email" className="flex  items-center mb-2 text-gray-600 text-sm font-medium">Email <svg width="7" height="7" className="ml-1" viewBox="0 0 7 7" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M3.11222 6.04545L3.20668 3.94744L1.43679 5.08594L0.894886 4.14134L2.77415 3.18182L0.894886 2.2223L1.43679 1.2777L3.20668 2.41619L3.11222 0.318182H4.19105L4.09659 2.41619L5.86648 1.2777L6.40838 2.2223L4.52912 3.18182L6.40838 4.14134L5.86648 5.08594L4.09659 3.94744L4.19105 6.04545H3.11222Z" fill="#EF4444" />
                    </svg>
                    </label>
                    <input ref={emailRef} onClick={() => { setError(null) }} type="email" name="email" id="email" className="block w-full h-11 px-5 py-2.5 bg-white leading-7 text-base font-normal shadow-xs text-gray-900 bg-transparent border border-gray-300 rounded-full placeholder-gray-400 focus:outline-none " placeholder="" required="" />
                    {error && <p className="text-red-500 text-sm pl-6">{error}</p>}
                </div>
                <div className="relative mb-6">
                    <label htmlFor="password" className="flex  items-center mb-2 text-gray-600 text-sm font-medium">Password <svg width="7" height="7" className="ml-1" viewBox="0 0 7 7" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M3.11222 6.04545L3.20668 3.94744L1.43679 5.08594L0.894886 4.14134L2.77415 3.18182L0.894886 2.2223L1.43679 1.2777L3.20668 2.41619L3.11222 0.318182H4.19105L4.09659 2.41619L5.86648 1.2777L6.40838 2.2223L4.52912 3.18182L6.40838 4.14134L5.86648 5.08594L4.09659 3.94744L4.19105 6.04545H3.11222Z" fill="#EF4444" />
                    </svg>
                    </label>
                    <input ref={passwordRef} type="password" name="password" id="password" className="block w-full h-11 px-5 py-2.5 bg-white leading-7 text-base font-normal shadow-xs text-gray-900 bg-transparent border border-gray-300 rounded-full placeholder-gray-400 focus:outline-none " placeholder="" required="" />
                    {error && <p className="text-red-500 text-sm pl-6">{error}</p>}

                </div>
                <div className="flex justify-between items-center">
                    <button onClick={handelSubmit} className="w-30 md:w-52 h-12 bg-indigo-600 hover:bg-indigo-800 transition-all duration-700 rounded-full shadow-xs text-white text-base font-semibold leading-6">{loading ? "Loading ..." : "Sign in"}</button>
                    <a href="/register" className="leading-6 text-base font-semibold hover:text-indigo-800">Register ?</a>
                </div>
            </form>
        </div>
    )
}