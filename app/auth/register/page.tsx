import RegisterForm from "@/components/auth/RegisterForm";
import RegisterImage from "@/components/auth/RegisterImage";
import React from "react";
import { Suspense } from 'react'

const RegisterPage = () => {
  return (
    <div className="container mx-auto p-4 h-screen flex items-center justify-center">
      <div className="w-full max-w-6xl bg-black/30 backdrop-blur-xl rounded-xl shadow-[0_8px_32px_rgba(0,0,0,0.4)] overflow-hidden border border-white/10">
        <div className="flex flex-col lg:flex-row w-full min-h-[600px]">
          {/* Left column - Register Form */}
          <div className="w-full lg:w-1/2 flex items-center justify-center p-8 order-2 lg:order-1">
            <Suspense>
              <RegisterForm />
            </Suspense>
          </div>
          
          {/* Right column - Image */}
          <div className="w-full lg:w-1/2 order-1 lg:order-2">
            <RegisterImage />
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
