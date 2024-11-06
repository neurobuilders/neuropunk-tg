import env from "@/env";
import { createClient } from "@/helpers/supabase/server";
import { AuthDataValidator } from "@telegram-auth/server";
import { headers } from "next/headers";

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

    const initData = new Map(new URLSearchParams(initDataRaw));

    let user = JSON.parse(initData.get("user")!);
    if (!env.telegram.userValidationDisabled) {
      const validator = new AuthDataValidator({
        botToken: env.telegram.botToken,
      });
      user = await validator.validate(initData);
      //   console.log("user", user);
    }

    if (!user.id) {
      throw new Error("User object does not have 'id' property");
    }
    const supabase = await createClient();

    // const { data } = await supabase
    //   .from("users")
    //   .select()
    //   .eq("tg_id", user.id)
    //   .maybeSingle();

    // if (!data) {

    // }

    // console.log("insert user data", user);
    const { error } = await supabase.from("users").insert({
      first_name: user.first_name,
      last_name: user.last_name,
      email: "",
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
    console.error(err);
    throw new Error((err as Error).message, { cause: err });
  }
}
