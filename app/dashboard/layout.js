import { redirect } from "next/navigation";
import { createClient } from "@/libs/supabase/server";
import config from "@/config";

export default async function LayoutPrivate({ children }) {
  // TEMPORARY CHANGE FOR DEVELOPMENT - RESTORE BEFORE PRODUCTION
  // Original auth check commented out:
  /*
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect(config.auth.loginUrl);
  }
  */

  return <>{children}</>;
}
