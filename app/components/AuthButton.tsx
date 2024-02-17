import { createClient } from "@/utils/supabase/server";
import Link from "next/link";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import prisma from "@/db";
import { Avatar, User } from "@nextui-org/react";

export default async function AuthButton() {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  const {
    data: { user },
  } = await supabase.auth.getUser();
  
  var dbUser=null;
  if(user){  
    dbUser = await prisma.user.findUnique({
      where: {
        authUID: user?.id,
      },
    })
  }  

  const signOut = async () => {
    "use server";

    const cookieStore = cookies();
    const supabase = createClient(cookieStore);
    await supabase.auth.signOut();
    return redirect("/login");
  };

  return user ? (
    <div className="flex items-center gap-2 -mr-20 ml-2">
      <User
        name={dbUser?.username}
        className="mr-2"
        as={Link}
        href={'/user/landing'}
        description="Free User"
        avatarProps={{
          src: dbUser?.avatarPath
        }}
      />
      <form action={signOut}>
        <button className="py-2 px-4 rounded-md no-underline bg-btn-background hover:bg-btn-background-hover">
          Logout
        </button>
      </form>
    </div>
  ) : (
    <>
      <Link
        href="/auth/login"
        className="py-2 px-3 flex rounded-md no-underline bg-btn-background hover:bg-btn-background-hover"
      >
        Login
      </Link>

      <Link
        href="/auth/signup"
        className="py-2 px-3 flex rounded-md no-underline bg-emerald-700 hover:bg-emerald-800"
      >
        Sign Up
      </Link>
    </>
  );
}
