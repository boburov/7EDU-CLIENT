import heroimg from "@/app/images/heroimg.png";

const Hero = () => {
  return (
    <section className="relative w-full py-24 bg-gradient-to-br from-[#0a0f0d] via-[#0d1c14] to-[#091812] overflow-hidden">
      {/* Light gradient effect */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-green-800/5 via-transparent to-transparent pointer-events-none z-0" />

      <div className="container relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 px-6 items-center">
        {/* LEFT TEXT SECTION */}
        <div className="flex flex-col justify-center gap-6 text-white animate-fadeIn">
          <h1 className="text-4xl lg:text-6xl font-extrabold tracking-tight leading-tight bg-gradient-to-r from-green-400 to-lime-300 bg-clip-text text-transparent drop-shadow-xl">
            Xush kelibsiz, SEVEN EDU platformaga!
          </h1>

          <p className="text-lg lg:text-xl text-white/80 leading-relaxed max-w-xl backdrop-blur-sm">
            🇺🇿 O'zbekistondagi eng yaxshi onlayn ta'lim platformasi. <br />
            🎯 Biz sizga sifatli, qulay va zamonaviy bilim beramiz. <br />
            🚀 O‘rganing. Rivojlaning. Yutuqqa yeting!
          </p>

          <div>
            <button className="mt-4 px-6 py-3 bg-green-500 hover:bg-green-600 transition text-white text-base rounded-xl shadow-xl hover:scale-105 active:scale-95">
              🚀 Kurslarni Ko‘rish
            </button>
          </div>
        </div>

        {/* RIGHT IMAGE SECTION */}
        <div className="relative animate-fadeInUp delay-150">
          <div className="relative w-full max-w-lg mx-auto rounded-2xl overflow-hidden shadow-[0_30px_80px_rgba(0,255,150,0.1)] border border-white/10">
            <img
              src={heroimg.src}
              alt="SevenEdu platforma rasmi"
              className="w-full h-auto object-cover"
            />
            <div className="absolute bottom-4 right-4 bg-green-600 text-white text-xs px-3 py-1 rounded-lg shadow-md">
              📚 O‘rganishni boshlang!
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;