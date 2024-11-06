import { User } from "next-auth";

export interface ExtendedUser extends User {
  firstName: string;
  lastName: string;
}
