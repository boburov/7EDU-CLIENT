'use client';

import { ArrowLeft, BookOpen, EyeClosed, EyeIcon } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import edu7 from '@/app/images/7edu white logo.png'
import api, { register } from '@/app/api/service/api';
import TwoFactorForm from '@/app/components/TwoFactor';

const SignupPage = () => {
    const router = useRouter();
    const [showPassword, setShowPassword] = useState(false);

    const [userData, setUserData] = useState({
        name: "",
        surname: "",
        phonenumber: "",
        email: '',
        password: ''
    })
    const [modal, SetModal] = useState(false)
    const [isError, setError] = useState(false)

    const togglePasswordVisibility = () => {
        setShowPassword((prev) => !prev);
    };


    const handleSignup = async () => {
        try {

            if (
                userData.name.trim() === "" ||
                userData.surname.trim() === "" ||
                userData.email.trim() === "" ||
                userData.password.trim() === ""
            ) {
                console.log(`Error`);
            } else {
                localStorage.setItem("userEmail", userData.email);
                router.push("verify");
                const response = await register(userData);
                if (response?.data?.token && response?.data?.user?._id) {
                    localStorage.setItem("userId", response.data.user._id);
                    localStorage.setItem("token", response.data.token);

                } else {
                    setError(true);
                }
            }
        } catch (error) {
            setError(true);
        }
    };



    return (
        <div className="">
            {modal && <div className="w-full h-screen  absolute flex items-center justify-center bg-gradient-to-b dark:from-[#0e0f0e] dark:via-[#1e2916] dark:to-[#161616]">
                <TwoFactorForm />
            </div>}

            <section className="container pt-5">

                <Link href="/">
                    <ArrowLeft size={44} strokeWidth={1.5} className="text-white" />
                </Link>


                <div className="flex flex-col items-center">
                    <Image src={edu7} height={100} width={120} alt='kotun' />
                    <h3 className="text-2xl font-bold text-white mb-5">Mehmon Sifatida Kirish</h3>

                    {isError && <h1>Email Allaqachon Ro'yaxtdan O'tib Bo'lgan</h1>}
                    <form className="space-y-5">
                        <input
                            required
                            name="name"
                            type="text"
                            autoComplete='off'
                            placeholder="Ism"
                            value={userData.name}
                            onChange={(e) => setUserData({ ...userData, name: e.target.value })}
                            className="not-focus-visible:bg-white/10 w-full h-14 border rounded-md border-white/20 text-white px-3 bg-white/10"
                        />
                        <input
                            required
                            type="text"
                            name="surname"
                            autoComplete='off'
                            placeholder="Familya"
                            value={userData.surname}
                            onChange={(e) => setUserData({ ...userData, surname: e.target.value })}
                            className="autofill:bg-white/10 w-full h-14 border rounded-md border-white/20 text-white px-3 bg-white/10"
                        />

                        <input
                            required
                            type="email"
                            name="email"
                            autoComplete='off'
                            placeholder="Email"
                            value={userData.email}
                            onChange={(e) => setUserData({ ...userData, email: e.target.value })}
                            className="autofill:bg-white/10 w-full h-14 border rounded-md border-white/20 text-white px-3 bg-white/10"
                        />

                        <input
                            required
                            type="tel"
                            name="phone number"
                            autoComplete='off'
                            placeholder="telefon raqam"
                            value={userData.phonenumber}
                            pattern="^\+?998(9[0-9]|3[3]|7[1]|8[8]|5[5]|6[1]|7[0]|9[1])\d{7}$"
                            onChange={(e) => setUserData({ ...userData, phonenumber: String(e.target.value) })}
                            className="autofill:bg-white/10 w-full h-14 border rounded-md border-white/20 text-white px-3 bg-white/10"
                        />

                        <div className="relative w-full">
                            <input
                                required
                                name="password"
                                autoComplete='off'
                                placeholder="Parol"
                                value={userData.password}
                                onChange={(e) => setUserData({ ...userData, password: e.target.value })}
                                type={showPassword ? "text" : "password"}
                                className="autofill:bg-white/10 w-full h-14 border rounded-md border-white/20 text-white px-3 bg-white/10"
                            />
                            <button
                                type="button"
                                onClick={togglePasswordVisibility}
                                className="absolute right-2 top-1/2 -translate-y-1/2 text-sm text-white"
                            >
                                {showPassword ? <EyeIcon/> : <EyeClosed/>}
                            </button>
                        </div>

                        <button
                            onClick={(e) => {
                                e.preventDefault();
                                handleSignup();
                            }}
                            type="submit"
                            className="bg-[#00C835] w-full py-3 rounded-md text-xl font-bold text-white mb-2"
                        >
                            Kirish
                        </button>
                    </form>

                    <Link href="/login" className="text-white/80 font-[robolight] tracking-wide underline">
                        <>O'quvchi sifatida kirish</>
                    </Link>
                </div>
            </section>
        </div>
    );
};

export default SignupPage;
