import { cache } from "react";
import { RequestCookies } from "@edge-runtime/cookies";
import { headers } from "next/headers";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";

export const createServerClient = cache(() => {
  const cookies = new RequestCookies(headers()) as any; 
  return createServerComponentClient({ cookies: () => cookies });
});