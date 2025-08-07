import { Request, Response } from "express";
import * as Yup from "yup";
import UserModel from "../models/user.model";
import { encrypt } from "../utils/encryption";
import { generateToken } from "../utils/jwt";
import { IReqUser } from "../middlewares/auth.middleware";
type TRegister = {
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
      req.body as unknown as TRegister;

    try {
      await registerValidateSchema.validate({
        fullName,
        userName,
        email,
        password,
        confirmPassword,
      });
      const result = await UserModel.create({
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
  // Method async login yang menerima request dan response dari Express
  async login(req: Request, res: Response) {
    // Mengambil data 'identifier' dan 'password' dari body request,dan memaksa tipenya menjadi TLogin (type-safe cast)
    try {
      const { identifier, password } = req.body as unknown as TLogin;
      //ambil data user berdasarkan identifier -> email & username
      const userByIdentifier = await UserModel.findOne({
        $or: [
          {
            email: identifier,
          },
          {
            userName: identifier,
          },
        ],
      });
      if (!userByIdentifier) {
        return res.status(403).json({
          massage: "user not found",
          data: null,
        });
      }
      //validasi password
      const validatePassword: boolean =
        encrypt(password) === userByIdentifier.password;
      if (!validatePassword) {
        return res.status(403).json({
          massage: "user not found",
          data: null,
        });
      }
      const token = generateToken({
        id: userByIdentifier._id,
        role: userByIdentifier.role,
      });
      res.status(200).json({
        massage: "Login Succesfull",
        data: token,
      });
    } catch (error) {
      const err = error as unknown as Error;
      res.status(400).json({
        message: err.message,
        data: null,
      });
    }
  },

  async me(req: IReqUser, res: Response) {
    try {
      const user = req.user;
      const result = await UserModel.findById(user?.id);

      res.status(200).json({
        message: "Get User Data Success",
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
};
