import {
  setComplete,
  setError,
  setPending,
  setUser,
} from "../features/global.slice";
import ErrorModel from "../models/error.model";
import axios from "axios";
import { TDispatch } from "../models/dispatch.type";

export default async function GetUserByPostApi(
  id: number,
  dispatch: TDispatch
) {
  try {
    dispatch(setPending());
    const res = await axios.get(`/api/posts/${id}/users`);
    dispatch(setUser(res.data));
    dispatch(setComplete());
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
