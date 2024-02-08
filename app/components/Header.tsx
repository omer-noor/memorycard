import React, { useEffect, useState } from 'react';
import { useRouter } from "next/navigation";
import { Navbar, NavbarBrand, NavbarContent, NavbarItem, Button } from "@nextui-org/react";
import Link from 'next/link';
import { createClient } from '@/utils/supabase/server';
import { User } from '@supabase/supabase-js';
import { cookies } from 'next/headers';
import AuthButton from './AuthButton';

export default async function Header() {
  const cookieStore = cookies();

  const canInitSupabaseClient = () => {
    // This function is just for the interactive tutorial.
    // Feel free to remove it once you have Supabase connected.
    try {
      createClient(cookieStore);
      return true;
    } catch (e) {
      return false;
    }
  };

  const isSupabaseConnected = canInitSupabaseClient();

  return (
    <div className="w-full flex justify-between items-center p-3 text-sm">
      <nav className="w-full flex justify-center border-b border-b-foreground/10 h-16">
        <Navbar>
          <NavbarBrand>
            <Link href="/" className="text-white text-2xl">
              <p className="font-bold text-inherit">memorycard</p>
            </Link>
          </NavbarBrand>
          <NavbarContent className="hidden sm:flex gap-4" justify="center">
            <NavbarItem>
              <Link color="foreground" href="#">
                Games
              </Link>
            </NavbarItem>
            <NavbarItem isActive>
              <Link href="#" aria-current="page">
                News
              </Link>
            </NavbarItem>
            <NavbarItem>
              <Link color="foreground" href="#">
                Reviews
              </Link>
            </NavbarItem>
          </NavbarContent>
          <NavbarContent justify="end">     
            <Link href="/modalsearch" className="py-1 px-4 mr-5 text-white rounded-md border border-white/40 border-1 no-underline bg-gradient-to-b from-emerald-700 to-lime-500 hover:bg-btn-background-hover">
              Review
            </Link>       
            {isSupabaseConnected && <AuthButton />}            
          </NavbarContent>          
        </Navbar>
      </nav>
    </div>
  );
};




// import NextLogo from "./NextLogo";
// import SupabaseLogo from "./SupabaseLogo";

// export default function Header() {
//   return (
//     <div className="flex flex-col gap-16 items-center">
//       <div className="flex gap-8 justify-center items-center">
//         <a
//           href="https://supabase.com/?utm_source=create-next-app&utm_medium=template&utm_term=nextjs"
//           target="_blank"
//           rel="noreferrer"
//         >
//           <SupabaseLogo />
//         </a>
//         <span className="border-l rotate-45 h-6" />
//         <a href="https://nextjs.org/" target="_blank" rel="noreferrer">
//           <NextLogo />
//         </a>
//       </div>
//       <h1 className="sr-only">Supabase and Next.js Starter Template</h1>
//       <p className="text-3xl lg:text-4xl !leading-tight mx-auto max-w-xl text-center">
//         The fastest way to build apps with{" "}
//         <a
//           href="https://supabase.com/?utm_source=create-next-app&utm_medium=template&utm_term=nextjs"
//           target="_blank"
//           className="font-bold hover:underline"
//           rel="noreferrer"
//         >
//           Supabase
//         </a>{" "}
//         and{" "}
//         <a
//           href="https://nextjs.org/"
//           target="_blank"
//           className="font-bold hover:underline"
//           rel="noreferrer"
//         >
//           Next.js
//         </a>
//       </p>
//       <div className="w-full p-[1px] bg-gradient-to-r from-transparent via-foreground/10 to-transparent my-8" />
//     </div>
//   );
// }
