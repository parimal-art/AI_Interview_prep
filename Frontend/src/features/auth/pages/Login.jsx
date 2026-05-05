import React,{useState} from 'react'
import { useNavigate, Link } from 'react-router'
import { useAuth } from '../hooks/useAuth'
import Loader from '../../../components/Loader'

const authMainClass = "flex min-h-screen w-full items-center justify-center bg-gradient-to-br from-[#0d1117] to-[#18202a] px-4 py-8"
const formCardClass = "flex w-full max-w-[420px] animate-slide-up flex-col gap-8 rounded-2xl border border-[#2a3348] bg-[#161b22] px-8 py-10 shadow-[0_8px_32px_rgba(0,0,0,0.3)]"
const inputGroupClass = "flex flex-col gap-2"
const labelClass = "text-sm font-semibold capitalize text-[#e6edf3]"
const inputClass = "rounded-xl border border-[#2a3348] bg-[#1e2535] px-4 py-3.5 text-[0.95rem] text-[#e6edf3] outline-none transition placeholder:text-[#7d8590] hover:border-[#3a4560] focus:border-[#ff2d78] focus:bg-[#252d40] focus:shadow-[0_0_0_3px_rgba(255,45,120,0.1)]"
const buttonClass = "rounded-xl bg-gradient-to-br from-[#ff2d78] to-[#ff6b9d] px-6 py-3.5 text-[0.95rem] font-semibold uppercase tracking-wider text-white shadow-[0_4px_15px_rgba(255,45,120,0.3)] transition hover:-translate-y-0.5 hover:shadow-[0_6px_20px_rgba(255,45,120,0.4)] active:translate-y-0"

const Login = () => {

    const { loading, handleLogin } = useAuth()
    const navigate = useNavigate()

    const [ email, setEmail ] = useState("")
    const [ password, setPassword ] = useState("")

    const handleSubmit = async (e) => {
        e.preventDefault()
        await handleLogin({email,password})
        navigate('/')
    }

    if(loading){
        return (<main className={authMainClass}><Loader text="Signing in..." /></main>)
    }


    return (
        <main className={authMainClass}>
            <div className={formCardClass}>
                <div className="mb-2 text-center">
                    <h1 className="mb-2 text-[1.75rem] font-bold text-[#e6edf3]">Welcome Back</h1>
                    <p className="m-0 text-sm text-[#7d8590]">Sign in to your AI Interview Prep account</p>
                </div>
                <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
                    <div className={inputGroupClass}>
                        <label className={labelClass} htmlFor="email">Email</label>
                        <input
                            onChange={(e) => { setEmail(e.target.value) }}
                            className={inputClass}
                            type="email" id="email" name='email' placeholder='Enter email address' required />
                    </div>
                    <div className={inputGroupClass}>
                        <label className={labelClass} htmlFor="password">Password</label>
                        <input
                            onChange={(e) => { setPassword(e.target.value) }}
                            className={inputClass}
                            type="password" id="password" name='password' placeholder='Enter password' required />
                    </div>
                    <button className={buttonClass}>Login</button>
                </form>
                <p className="m-0 text-center text-sm text-[#7d8590]">Don't have an account? <Link className="font-semibold text-[#ff2d78] transition hover:text-[#ff6b9d] hover:underline" to={"/register"} >Register</Link> </p>
            </div>
        </main>
    )
}

export default Login
