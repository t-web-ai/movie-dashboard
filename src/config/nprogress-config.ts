import nProgress from "nprogress";
import "nprogress/nprogress.css";

export const progressBar = nProgress.configure({
  showSpinner: false,
  speed: 400,
  minimum: 0.1,
});
