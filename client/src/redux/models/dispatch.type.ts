import { AnyAction, Dispatch, ThunkDispatch } from "@reduxjs/toolkit";
import { GlobalState } from "../features/global.slice";

export type TDispatch = ThunkDispatch<
  {
    globalReducer: GlobalState;
  },
  undefined,
  AnyAction
> &
  Dispatch<AnyAction>;
