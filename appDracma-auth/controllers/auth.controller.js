import User from "../models/user.model.js";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import { errorHandler } from "../utils/error.js";

export const signup = async (req, res, next) => {
  const { username, email, password } = req.body;
  const hashedPassword = bcryptjs.hashSync(password, 10);
  const newUser = new User({ username, email, password: hashedPassword });

  try {
    await newUser.save();
    res.status(201).json({ message: "Usuário criado com sucesso" });
  } catch (error) {
    next(error);
  }
};

export const signin = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    const validUser = await User.findOne({ email });

    if (!validUser) {
      return next(errorHandler(401, "Usuário não encontrado"));
    }

    const validPassword = bcryptjs.compareSync(password, validUser.password);

    if (!validPassword) {
      return next(errorHandler(401, "Credenciais erradas"));
    }

    const token = jwt.sign({ id: validUser._id }, "12313safsaf", {
      expiresIn: "1h", // Token expires in 1 hour
    });

    const { password: hashedPassword, ...rest } = validUser._doc;
    const expirDate = new Date(Date.now() + 3600000); // 1 hour

    res
      .cookie("access_token", token, { httpOnly: true, expires: expirDate })
      .status(200)
      .json(rest);
  } catch (error) {
    console.error("Erro durante o login:", error);
    next(error);
  }
};
