import React from "react";

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="relative min-h-screen overflow-hidden">
    {/* Base gradient background */}
    <div className="fixed inset-0" 
    style={{
      background: 'linear-gradient(135deg, #000000 0%, #a03494 50%, #f059da 100%)'
    }}
    />
    
    {/* Pattern overlays */}
    <div className="fixed inset-0">
    {/* Circular gradient like the Instagram gradient */}
    <div className="absolute inset-0 opacity-40"
    style={{
      background: `
              radial-gradient(circle at 30% 40%, 
                #f059da 0%,
                transparent 60%
              ),
              radial-gradient(circle at 70% 60%, 
                #a03494 0%,
                transparent 50%
              )
            `
    }}
    />
    
    {/* Subtle wave pattern */}
    <div className="absolute inset-0 opacity-10"
    style={{
      backgroundImage: `
              repeating-linear-gradient(
                45deg,
                transparent,
                transparent 100px,
                rgba(240, 89, 218, 0.1) 100px,
                rgba(240, 89, 218, 0.1) 200px
              )
            `
    }}
    />
    
    {/* Dynamic shadow effect */}
    <div className="absolute inset-0"
    style={{
      background: `
              linear-gradient(
                45deg,
                rgba(0, 0, 0, 0.4) 0%,
                transparent 50%,
                rgba(240, 89, 218, 0.4) 100%
              )
            `
    }}
    />
    
    {/* Shine effect similar to logo */}
    <div className="absolute inset-0"
    style={{
      background: 'linear-gradient(135deg, transparent 0%, rgba(255, 255, 255, 0.05) 45%, transparent 100%)'
    }}
    />
    </div>
    
    {/* Content container */}
    <div className="relative container grid grid-cols-1 gap-4 lg:grid-cols-1 lg:gap-8 my-10 justify-center text-center">
    <div className="h-screen rounded-lg text-center order-first lg:order-last p-5 mx-auto">
    {children}
    </div>
    </div>
    </div>
  );
};

export default AuthLayout;