import { useDispatch } from "react-redux";
import { useAppSelector } from "../redux/hooks";
import { VariantType, useSnackbar } from "notistack";
import { useEffect } from "react";
import { setError, setSuccess } from "../redux/features/global.slice";

function SnackbarManager() {
  const reducer = useAppSelector((state) => state.globalReducer);
  const dispatch = useDispatch();

  const { enqueueSnackbar } = useSnackbar();

  const handleToggleSnackbar = (message: string, variant: VariantType) => {
    enqueueSnackbar(message, { variant });
  };

  useEffect(() => {
    if (reducer.error.status) {
      handleToggleSnackbar(reducer.error.message + "!", "error");
    }
    dispatch(
      setError({
        status: false,
        message: "",
      })
    );
  }, [reducer.error.status]);

  useEffect(() => {
    if (reducer.success.status) {
      console.log(reducer.success);

      handleToggleSnackbar(reducer.success.message + "!", "success");
    }
    dispatch(
      setSuccess({
        status: false,
        message: "",
      })
    );
  }, [reducer.success.status]);

  return <div id="snackbar-manager"></div>;
}

export default SnackbarManager;
