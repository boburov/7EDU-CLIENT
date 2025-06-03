'use client';

import { ArrowLeft, BookOpen } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import edu7 from '@/app/images/7edu white logo.png'
import api, { register } from '@/app/api/service/api';
import TwoFactorForm from '@/app/components/TwoFactor';

const SignupPage = () => {
    const [userData, setUserData] = useState({
        name: "",
        surname: "",
        phonenumber: "",
        email: '',
        password: ''
    })
    const [modal, SetModal] = useState(false)
    const [isError, setError] = useState(false)

    const router = useRouter();

    const handleSignup = async () => {
        try {
            await register(userData).then(e => {
                console.log(e.token);
                localStorage.setItem('userEmail', userData.email)
                router.push('verify')
            }).catch((e) => {
                console.log(e);
            })
            setError(false)

        } catch (error) {
            setError(true)
            console.log(error)
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
                            type="text"
                            name="name"
                            value={userData.name}
                            onChange={(e) => setUserData({ ...userData, name: e.target.value })}
                            placeholder="Ism"
                            className="not-focus-visible:bg-white/10 w-full h-14 border rounded-md border-white/20 text-white px-3 bg-white/10"
                            required
                        />
                        <input
                            type="text"
                            name="surname"
                            value={userData.surname}
                            onChange={(e) => setUserData({ ...userData, surname: e.target.value })}
                            placeholder="Familya"
                            className="autofill:bg-white/10 w-full h-14 border rounded-md border-white/20 text-white px-3 bg-white/10"
                            required
                        />

                        <input
                            type="email"
                            name="email"
                            value={userData.email}
                            onChange={(e) => setUserData({ ...userData, email: e.target.value })}
                            placeholder="Email"
                            className="autofill:bg-white/10 w-full h-14 border rounded-md border-white/20 text-white px-3 bg-white/10"
                            required
                        />

                        <input
                            type="tel"
                            name="phone number"
                            value={userData.phonenumber}
                            onChange={(e) => setUserData({ ...userData, phonenumber: String(e.target.value) })}
                            placeholder="telefon raqam"
                            className="autofill:bg-white/10 w-full h-14 border rounded-md border-white/20 text-white px-3 bg-white/10"
                            required
                        />

                        <input
                            type="password"
                            name="password"
                            value={userData.password}
                            onChange={(e) => setUserData({ ...userData, password: e.target.value })}
                            placeholder="Parol"
                            className="autofill:bg-white/10 w-full h-14 border rounded-md border-white/20 text-white px-3 bg-white/10"
                            required
                        />

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
