"use client";

import { ArrowLeft, EyeClosed, EyeIcon } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import edu7 from "@/app/images/7edu white logo.png";
import { register } from "@/app/api/service/api";

const SignupPage = () => {
    const router = useRouter();
    const [showPassword, setShowPassword] = useState(false);
    const [userData, setUserData] = useState({
        name: "",
        surname: "",
        phonenumber: "",
        email: "",
        password: "",
    });
    const [isError, setError] = useState(false);

    const togglePasswordVisibility = () => setShowPassword(!showPassword);

    const handleSignup = async () => {
        setError(false);
        if (!userData.name || !userData.surname || !userData.email || !userData.password) {
            setError(true);
            return;
        }

        try {

            const res = await register(userData);
            if (res.token) {
                router.push('verify')
                localStorage.setItem("email", userData.email)
                console.log(res.token);

            }

        } catch (error) {
            console.log(error)
        }

    };

    return (
        <div>
            <section className="container pt-5">
                <Link href="/">
                    <ArrowLeft size={44} strokeWidth={1.5} className="text-white" />
                </Link>

                <div className="flex flex-col items-center">
                    <Image src={edu7} height={100} width={120} alt="kotun" />
                    <h3 className="text-2xl font-bold text-white mb-5">Mehmon Sifatida Kirish</h3>

                    {isError && (
                        <h1 className="text-red-500 mb-4">
                            Ma'lumotlar noto'g'ri yoki Email allaqachon ishlatilmoqda.
                        </h1>
                    )}

                    <form
                        className="space-y-5"
                        onSubmit={(e) => {
                            e.preventDefault();
                            handleSignup();
                        }}
                    >
                        <input
                            required
                            name="name"
                            type="text"
                            autoComplete="off"
                            placeholder="Ism"
                            value={userData.name}
                            onChange={(e) => setUserData({ ...userData, name: e.target.value })}
                            className="not-focus-visible:bg-white/10 w-full h-14 border rounded-md border-white/20 text-white px-3 bg-white/10"
                        />
                        <input
                            required
                            type="text"
                            name="surname"
                            autoComplete="off"
                            placeholder="Familya"
                            value={userData.surname}
                            onChange={(e) => setUserData({ ...userData, surname: e.target.value })}
                            className="autofill:bg-white/10 w-full h-14 border rounded-md border-white/20 text-white px-3 bg-white/10"
                        />
                        <input
                            required
                            type="email"
                            name="email"
                            autoComplete="off"
                            placeholder="Email"
                            value={userData.email}
                            onChange={(e) => setUserData({ ...userData, email: e.target.value })}
                            className="autofill:bg-white/10 w-full h-14 border rounded-md border-white/20 text-white px-3 bg-white/10"
                        />
                        <input
                            type="tel"
                            name="phonenumber"
                            autoComplete="off"
                            placeholder="Telefon raqam"
                            value={userData.phonenumber}
                            // pattern="^\+?998(9[0-9]|3[3]|7[1]|8[8]|5[5]|6[1]|7[0]|9[1])\d{7}$"
                            onChange={(e) => setUserData({ ...userData, phonenumber: e.target.value })}
                            className="autofill:bg-white/10 w-full h-14 border rounded-md border-white/20 text-white px-3 bg-white/10"
                        />
                        <div className="relative w-full">
                            <input
                                required
                                name="password"
                                autoComplete="off"
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
                                {showPassword ? <EyeIcon /> : <EyeClosed />}
                            </button>
                        </div>

                        <button
                            type="submit"
                            className="bg-[#00C835] w-full py-3 rounded-md text-xl font-bold text-white mb-2"
                        >
                            Kirish
                        </button>
                    </form>

                    <Link href="/login" className="text-white/80 font-[robolight] tracking-wide underline">
                        O'quvchi sifatida kirish
                    </Link>
                </div>
            </section>
        </div>
    );
};

export default SignupPage;
