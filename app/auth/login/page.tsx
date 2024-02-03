import Link from "next/link";
import { headers, cookies } from "next/headers";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

export default function Login({
  searchParams,
}: {
  searchParams: { message: string };
}) {
  const signIn = async (formData: FormData) => {
    "use server";

    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const cookieStore = cookies();
    const supabase = createClient(cookieStore);

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      console.log(error)
      return redirect("/auth/login?message=Sorry! we couldn't log you in right now");
    }

    return redirect("/");
  };
  

  return (
    <div className="flex-1 flex flex-col w-full px-8 justify-center sm:max-w-md gap-2">
      
      <div className="flex justify-center">
        <h1 className="text-3xl">Sign In</h1>
      </div>     

      <div className="flex justify-center">
        <h1 className="text-m mb-6">Welcome back traveler!</h1>
      </div> 

      <form
        className="animate-in flex flex-col shrink w-full gap-2 text-foreground"
        action={signIn}
      >
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
        <button className="border border-foreground/80 bg-emerald-700 hover:bg-emerald-800 rounded-md px-4 py-2 text-foreground mb-2">
          Log In
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
