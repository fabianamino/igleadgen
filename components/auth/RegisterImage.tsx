import Image from "next/image";

const RegisterImage = () => {
  return (
    <div className="hidden lg:flex flex-col items-center justify-center w-full h-full bg-gradient-to-bl from-black/40 via-[#a03494]/20 to-black/40 backdrop-blur-md rounded-r-xl p-8 relative overflow-hidden">
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-bl from-[#f059da]/20 via-transparent to-[#a03494]/20 pointer-events-none" />
      
      <div className="relative w-full h-[500px]">
        <Image
          src="/register-image.jpg"
          alt="Register"
          fill
          className="object-contain rounded-lg shadow-lg"
          priority
        />
      </div>
      <div className="mt-8 text-center relative z-10">
        <h2 className="text-2xl font-semibold text-[#f059da] mb-4 text-shadow">
          Join Our Community
        </h2>
        <p className="text-white/90 text-sm max-w-md leading-relaxed">
          Get started with powerful Instagram analytics, audience insights, and growth tools designed to elevate your Instagram presence.
        </p>
      </div>
    </div>
  );
};

export default RegisterImage;
