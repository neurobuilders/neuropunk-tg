import { User } from "@/helpers/database/models/user";

export const getDefaultUser = (userId: number) => {
  return new User({
    id: userId,
    energyAmount: 0,
  });
};
