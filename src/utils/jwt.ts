import mongoose from "mongoose";
import { User } from "../models/user.model";
export interface IUserToken
  extends Omit<
    User,
    | "password"
    | "activationCode"
    | "isActive"
    | "email"
    | "fullName"
    | "profilePicture"
    | "userName"
  > {
  id?: Types.ObjectId;
}

export const generateToken = (user) => {};
export const getUserData = () => {};
