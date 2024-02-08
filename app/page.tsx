import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";
import ReviewModalContainer from "./review/page";


export default async function Index() {
  const cookieStore = cookies();

  const canInitSupabaseClient = () => {
    try {
      createClient(cookieStore);
      return true;
    } catch (e) {
      return false;
    }
  };

  const isSupabaseConnected = canInitSupabaseClient();

  return (
    <>
    <div className="flex-1 max-w-6xl flex flex-col gap-20 items-center">    
    
    </div>    
    </>
  );
}
