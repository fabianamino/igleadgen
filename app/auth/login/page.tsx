import LoginForm from "@/components/auth/LoginForm";
import LoginImage from "@/components/auth/LoginImage";
import React from "react";
import { Suspense } from 'react'

const LoginPage = () => {
  return (
    <div className="container mx-auto px-4 py-8 min-h-screen flex items-center justify-center">
      <div className="w-full max-w-6xl bg-black/30 backdrop-blur-xl rounded-2xl shadow-[0_8px_32px_rgba(0,0,0,0.4)] overflow-hidden border border-white/10">
        <div className="flex flex-col lg:flex-row w-full">
          {/* Left column - Image */}
          <div className="w-full lg:w-[55%] lg:border-r border-white/10">
            <LoginImage />
          </div>
          
          {/* Right column - Login Form */}
          <div className="w-full lg:w-[45%] flex items-center justify-center p-6 lg:py-12 lg:px-8">
            <div className="w-full max-w-md">
              <Suspense>
                <LoginForm />
              </Suspense>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
