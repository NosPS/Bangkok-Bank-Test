import {
  setError,
  setPending,
  setSuccess,
} from "../features/global.slice";
import ErrorModel from "../models/error.model";
import axios from "axios";
import { TDispatch } from "../models/dispatch.type";
import SuccessModel from "../models/success.model";

export default async function DeletePostApi(id: number, dispatch: TDispatch) {
  try {
    dispatch(setPending());
    const accessToken = localStorage.getItem("accessToken");
    const res = await axios.delete(`/api/posts/${id}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    dispatch(
      setSuccess(
        new SuccessModel({
          status: true,
          message: res.data.message,
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
