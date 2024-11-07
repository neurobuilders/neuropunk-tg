import env from "@/env";
import { AuthDataValidator } from "@telegram-auth/server";

export const validateUser = async (initDataRaw: string) => {
  const initData = new Map(new URLSearchParams(initDataRaw));

  let user = JSON.parse(initData.get("user")!);
  if (!env.telegram.userValidationDisabled) {
    const validator = new AuthDataValidator({
      botToken: env.telegram.botToken,
    });
    user = await validator.validate(initData);
  }

  if (!user.id) {
    throw new Error("User object does not have 'id' property");
  }

  return user;
};
