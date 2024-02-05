import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";
import prisma from "@/db";

export default async function UserLanding() {

    const cookieStore = cookies();
    const supabase = createClient(cookieStore);
  
    const {
      data: { user },
    } = await supabase.auth.getUser();

    const dbUser = await prisma.user.findUnique({
        where:{
            authUID : user?.id,
        },
    })

    return (
        <div className="flex flex-col pl-10 pt-10">
            <h1 className="text-4xl font-bold">User Information</h1>
            <div className="flex flex-col border rounded-lg gap-2 mt-5 p-6">
                <div className="flex flex-col gap-0">
                    <p className="text-2xl font-medium">{dbUser?.username}</p>
                    <p className="text-xs">Regular User</p>
                </div>
                <div className="flex flex-row gap-5 mt-10">
                    <p className="font-medium">email: </p>
                    <p>{dbUser?.email}</p>
                </div>   
                <div className="flex flex-row gap-5">
                    <p className="font-medium">name: </p>
                    <p>{dbUser?.name}</p>
                </div>                             
            </div>
        </div>
    )
}