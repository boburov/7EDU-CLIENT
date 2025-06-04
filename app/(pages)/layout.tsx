"use client"
import Footer from "./pages_components/Footer";
import Image from "next/image";
import { CircleArrowLeft } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { getMe, getUserByEmail } from "../api/service/api";

interface User {
  id: string;
  name: string;
  profilePic?: string;
}

const Layout = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [user, setUser] = useState<User | null>(null)
  const router = useRouter();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const email = localStorage.getItem('userEmail');
        console.log(email);

        const user = await getUserByEmail(String(email));
        setUser(user)

        await getMe();
        console.log("Ishatovir bratishka");

      } catch (err) {
        console.log("Unauthorized", err);
        router.push("/auth/login");
      }
    };

    fetchUser();
  }, []);

  console.log(user);


  return (
    <>
      <button
        onClick={() => router.back()}
        aria-label="Back"
        type="button"
      >
        <CircleArrowLeft size={50} strokeWidth={1} className="mx-4 mt-4 text-white" />
      </button>

      {user && (
        <section className="container text-white pt-10">
          <div className="flex items-center gap-3 mb-4">
            {user.profilePic ? (
              <Image
                src={user.profilePic}
                width={90}
                height={90}
                alt="user image"
                className="rounded-full border-2 border-white/5"
              />
            ) : (
              <div className="w-20 h-20 bg-gray-500 rounded-full border-2 border-white flex items-center justify-center">
                <span className="text-4xl">{user.name[0]}</span>
              </div>
            )}
            <div className="flex flex-col">
              <h2 className="text-2xl font-semibold">{user.name}</h2>
              <span className="text-xs text-gray-300">{user.id}</span>
            </div>
          </div>
        </section>
      )}

      {children}
      <span className="pb-5 pt-6 inline-block"></span>
      <Footer />
    </>
  );
};

export default Layout;