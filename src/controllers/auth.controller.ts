import { Request, Response } from "express";
import * as Yup from "yup";
import Usermodel from "../models/user.model";
type TResgister = {
  fullName: string;
  userName: string;
  email: string;
  password: string;
  confirmPassword: string;
};
type TLogin = {
  identifier: string;
  password: string;
};
const registerValidateSchema = Yup.object({
  fullName: Yup.string().required(),
  userName: Yup.string().required(),
  email: Yup.string().required(),
  password: Yup.string().required(),
  confirmPassword: Yup.string()
    .required()
    .oneOf([Yup.ref("password"), ""], "Password must be matched"),
});
export default {
  async register(req: Request, res: Response) {
    const { fullName, userName, email, password, confirmPassword } =
      req.body as unknown as TResgister;

    try {
      await registerValidateSchema.validate({
        fullName,
        userName,
        email,
        password,
        confirmPassword,
      });
      const result = await Usermodel.create({
        fullName,
        email,
        userName,
        password,
      });
      res.status(200).json({
        message: "Succes Registration!",
        data: result,
      });
    } catch (error) {
      const err = error as unknown as Error;
      res.status(400).json({
        message: err.message,
        data: null,
      });
    }
  },
  async login(req: Request, res: Response) {
    try {
    } catch (error) {
      const err = error as unknown as Error;
      res.status(400).json({
        message: err.message,
        data: null,
      });
    }
  },
};
