import {
  setSuccess,
  setError,
  setPending,
} from "../features/global.slice";
import ErrorModel from "../models/error.model";
import axios from "axios";
import { TDispatch } from "../models/dispatch.type";
import CreatePostModel from "../models/create-post.model";
import SuccessModel from "../models/success.model";

export default async function CreatePostApi(
  data: CreatePostModel,
  dispatch: TDispatch
) {
  try {
    dispatch(setPending());
    const accessToken = localStorage.getItem("accessToken");
    const res = await axios.post(`/api/posts/`, data, {
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
