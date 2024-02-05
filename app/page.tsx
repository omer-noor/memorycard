import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";
import Search from "@/app/components/Search/SeachContainer";
import SearchBox from "./components/Search/SearchBox";
import GamePage from "./game/page";

export default async function Index({
  searchParams,
}: {
  searchParams?: {
    query?: string;
    page?: string;
  };
}) {  
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
    <div className="flex-1 max-w-6xl flex flex-col gap-20 items-center">     
       <Search searchParams={searchParams}/>    
    </div>
  );
}
