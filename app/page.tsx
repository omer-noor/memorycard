import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";
import ReviewModalContainer from "./review/page";
import ReviewContainer from "./_components/Review/ReviewContainer";
import GameComponent from "./_components/Game/GameComponent";
import { Divider } from "@nextui-org/react";


export default function Index() {
  return (
    <>
    <div className="flex-1 max-w-6xl flex flex-col items-center">    
      <GameComponent/>      
      <ReviewContainer containerTitle="Recent Reviews"/>
    </div>    
    </>
  );
}
