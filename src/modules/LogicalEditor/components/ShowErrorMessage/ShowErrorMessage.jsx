import { enqueueSnackbar } from "notistack";

export default (error) => enqueueSnackbar(error, { variant: "error" });
