import { setAccessToken, setError, setPending } from "../features/global.slice";
import ErrorModel from "../models/error.model";
import axios from "axios";
import { TDispatch } from "../models/dispatch.type";

export async function LoginApi(dispatch: TDispatch) {
  try {
    dispatch(setPending());
    const res = await axios.post(`/api/auth/login`);

    dispatch(setAccessToken(res.data.accessToken));
    localStorage.setItem("refreshToken", res.data.refreshToken);
  } catch (error: any) {
    dispatch(
      setError(
        new ErrorModel({
          status: true,
          message: error.response.data.message,
          to: "",
        })
      )
    );
  }
}
