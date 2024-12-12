import LoginForm from "@/components/auth/LoginForm";
import React from "react";
import { Suspense } from 'react'

const LoginPage = () => {
  return (
    <div className="container mx-auto px-4 py-8 min-h-screen flex items-center justify-center">
      <div className="w-full max-w-6xl rounded-2xl">
        <div className="h-full w-full flex items-center justify-center">
          <div className="flex flex-col w-full max-w-md">
            <div className="w-full">
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
