import Link from "next/link";
import { headers, cookies } from "next/headers";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { z } from 'zod';
import prisma from "@/db"
import { Prisma } from "@prisma/client";

export default function Signup({
  searchParams,
}: {
  searchParams: { message: string };
}) {  

  const signUp = async (formData: FormData) => {
    "use server";
    const SignupSchema = z.object({
      email: z.string(),
      name: z.string(),
      username: z.string(),
      password: z.string(),
      authUID: z.string().optional()
    });
    
    // Parse and validate form data using Zod schema
    const result = SignupSchema.safeParse({
      email: formData.get("email"),
      username: formData.get("username"),
      name: formData.get("name"),
      password: formData.get("password"),
    });

    if (result.success) {
      try {
        // Destructure user data from result
        const { email, name, username, password } = result.data;

        const origin = headers().get("origin");
        const cookieStore = cookies();
        const supabase = await createClient();

        const {data, error} = await supabase.auth.signUp({
          email,
          password,
          options: {
            emailRedirectTo: `${origin}/auth/callback`,
            data: {
              firstname: name,
              username: username
            },
          },
        });        
        
        // Define user object for Prisma
        const userObject:Prisma.UserCreateInput = {
            authUID: data.user?.id ?? "",
            name: name,
            username: username,
            email: email,
        };

        // Create user in DB
        const res = await prisma.user.create({ data: userObject });      
              
      }
      catch (error) {
        console.log(error)
        return redirect("/auth/signup?message=Could not authenticate user");
      }
      return redirect("/");
    }
    else {
      return redirect("/auth/signup?message=Invalid Form Data");
    }
  };

  return (
    <div className="flex-1 flex flex-col w-full px-8 m-auto mt-10 justify-center sm:max-w-md gap-2 bg-blue-950/70">

      <div className="flex justify-center">
        <h1 className="text-3xl">Sign up for an account</h1>
      </div>

      <div className="flex justify-center">
        <h1 className="text-m mb-6">You're one step closer to saving your game!</h1>
      </div>

      <form
        className="animate-in flex flex-col shrink w-full gap-2 text-foreground"
        action={signUp}
      >
        <label className="text-md" htmlFor="email">
          Username
        </label>
        <input
          className="rounded-md px-4 py-2 bg-inherit border mb-6"
          name="username"
          placeholder=""
          required
        />
        <label className="text-md" htmlFor="username">
          Name
        </label>
        <input
          className="rounded-md px-4 py-2 bg-inherit border mb-6"
          name="name"
          placeholder=""
          required
        />
        <label className="text-md" htmlFor="email">
          Email
        </label>
        <input
          className="rounded-md px-4 py-2 bg-inherit border mb-6"
          name="email"
          placeholder="you@example.com"
          required
        />
        <label className="text-md" htmlFor="password">
          Password
        </label>
        <input
          className="rounded-md px-4 py-2 bg-inherit border mb-6"
          type="password"
          name="password"
          placeholder="••••••••"
          required
        />
        <button
          formAction={signUp}
          className="border border-foreground/80 bg-emerald-700 hover:bg-emerald-800 rounded-md px-4 py-2 text-foreground mb-2"
        >
          Sign Up
        </button>
        {searchParams?.message && (
          <p className="mt-4 p-4 bg-foreground/10 text-foreground text-center">
            {searchParams.message}
          </p>
        )}
      </form>
    </div>
  );
}
