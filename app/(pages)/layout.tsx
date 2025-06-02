"use client"
import Footer from "./pages_components/Footer";
import Image from "next/image";
import { CircleArrowLeft } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const Layout = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const params = useParams();
  const router = useRouter();
  const userId = localStorage.getItem('userId');
  console.log(userId);

  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const loadUser = async () => {
      try {
        if (params?.id) {
          // const data = await getUserProfile(String(params.id)); // userID
          // setUser(data);
        }
      } catch (err) {
        console.log('Xatolik:', err);
      }
    };

    loadUser();
  }, [params?.id]);

  return (
    <>
      <button
        onClick={() => router.back()}
        aria-label="Back"
        type="button"
      >
        <CircleArrowLeft size={50} strokeWidth={1} className="mx-4 mt-4 text-white" />
      </button>

      <section className="container text-white pt-10">
        {/* USER INFO */}
        <div className="flex items-center gap-3 mb-4">
          {user?.userProfilePic ? (
            <Image
              src={user.userProfilePic}
              width={90}
              height={90}
              alt="user image"
              className="rounded-full border-2 border-white/5"
            />
          ) : (
            <div className="w-20 h-20 bg-gray-500 rounded-full border-2 border-white flex items-center justify-center">
              <span className="text-4xl">{user?.username ? user.username[0] : ""}</span>
            </div>
          )}
          <div className="flex flex-col">
            <h2 className="text-2xl font-semibold">{user?.username}</h2>
            <span className="text-sm text-gray-300">{params?.id}</span>
          </div>
        </div>
      </section>
      {children}
      <span className="pb-5 pt-6 inline-block"></span>
      <Footer />
    </>
  );
};

export default Layout;