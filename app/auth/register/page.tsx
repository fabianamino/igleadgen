import RegisterForm from "@/components/auth/RegisterForm";
import React from "react";
import { Suspense } from 'react'

const RegisterPage = () => {
  return (
    <div className="container mx-auto px-4 py-8 min-h-screen flex items-center justify-center">
      <div className="w-full max-w-6xl">
        <div className="h-full w-full flex items-center justify-center">
          <div className="flex flex-col w-full max-w-md">
            <div className="w-full">
              <Suspense>
                <RegisterForm />
              </Suspense>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
