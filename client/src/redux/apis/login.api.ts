import {
  setError,
  setPending,
  setSuccess,
} from "../features/global.slice";
import ErrorModel from "../models/error.model";
import axios from "axios";
import { TDispatch } from "../models/dispatch.type";
import SuccessModel from "../models/success.model";

export default async function LoginApi(dispatch: TDispatch) {
  try {
    dispatch(setPending());
    const res = await axios.post(`/api/auth/login`);

    localStorage.setItem("accessToken", res.data.accessToken);
    localStorage.setItem("refreshToken", res.data.refreshToken);

    dispatch(
      setSuccess(
        new SuccessModel({
          status: true,
          message: "Login success",
        })
      )
    );
  } catch (error: any) {
    dispatch(
      setError(
        new ErrorModel({
          status: true,
          message: error.response.data.message,
        })
      )
    );
  }
}
