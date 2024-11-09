import { createClient } from "@/helpers/supabase/server";
import { validateUser } from "@/helpers/user";
import { headers } from "next/headers";
import { captureException } from "@/helpers/utils";

export async function POST() {
  try {
    const head = await headers();
    const auth = head.get("authorization");
    if (!auth) {
      throw new Error("No authorization header");
    }
    const [type, initDataRaw] = auth.split(" ");
    if (type !== "twa") {
      throw new Error("Unsupported authorization header type");
    }

    const user = await validateUser(initDataRaw);
    const supabase = await createClient();

    const { error } = await supabase.from("users").insert({
      first_name: user.first_name,
      last_name: user.last_name,
      email: null,
      tg_id: user.id,
      tg_avatar_url: "",
      tg_language_code: user.language_code,
      is_tg_premium: user.is_premium,
    });
    // console.log("error", error);
    if (error) {
      throw error;
    }
    return Response.json({ ok: true });
  } catch (err) {
    captureException(err);
    // throw new Error((err as Error).message, { cause: err });
    return Response.json({ ok: false, error: (err as Error).message });
  }
}
