import { User } from "next-auth";

export interface ExtendedUser extends User {
  tgId: string;
  firstName: string;
  lastName: string;
}
