import LoginForm from "@/components/auth/LoginForm";
import LoginImage from "@/components/auth/LoginImage";
import React from "react";
import { Suspense } from 'react'

const LoginPage = () => {
  return (
    <div className="container mx-auto p-4 h-screen flex items-center justify-center">
      <div className="w-full max-w-6xl bg-black/30 backdrop-blur-xl rounded-xl shadow-[0_8px_32px_rgba(0,0,0,0.4)] overflow-hidden border border-white/10">
        <div className="flex flex-col lg:flex-row w-full min-h-[600px] bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-sky-400 to-blue-800">
          {/* Left column - Image */}
          <div className="w-full lg:w-1/2">
            <LoginImage />
          </div>
          
          {/* Right column - Login Form */}
          <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
            <Suspense>
              <LoginForm />
            </Suspense>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
