import React, { useEffect, useState } from 'react';
import { useRouter } from "next/navigation";
import { Navbar, NavbarBrand, NavbarContent, NavbarItem, Button } from "@nextui-org/react";
import Link from 'next/link';
import { createClient } from '@/utils/supabase/server';
import { User } from '@supabase/supabase-js';
import { cookies } from 'next/headers';
import AuthButton from './AuthButton';
import { Archivo, DM_Sans, Happy_Monkey, Jura, Open_Sans } from 'next/font/google';

const headerFont = Jura({subsets:['latin'],display:"swap",weight:"700"})

export default async function Header() {

  const canGetUser = async () => {
    try {
      const supabase = await createClient();
      const {
        data: { user },
      } = await supabase.auth.getUser();
      return user != null ? true : false
    } catch (e) {
      return false;
    }
  }; 

  const isUser = await canGetUser();

  return (
    <div className={`w-full flex justify-between items-center p-3 text-sm`}>
      <nav className="w-full flex justify-center border-b border-b-foreground/10 h-16">
        <Navbar>
          <NavbarBrand>
            <Link href="/" className="text-white text-2xl">
              <p className={`font-bold text-inherit ${headerFont.className}`}>memorycard</p>
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
            {isUser && <Link href="/modalsearch" className="py-1 px-4 mr-5 text-white rounded-md border border-white/40 border-1 no-underline bg-gradient-to-b from-emerald-700 to-lime-500 hover:bg-btn-background-hover">
              Review
            </Link>}
            <AuthButton />
          </NavbarContent>
        </Navbar>
      </nav>
    </div>
  );
};