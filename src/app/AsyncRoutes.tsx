import loadable from "@loadable/component";

export const LoadableRegistration = loadable(() => import("../pages/Registration"));
export const LoadableLogin = loadable(() => import("../pages/Login"));
export const LoadableRestorePassword = loadable(() => import("../pages/RestorePassword"));
export const LoadableForgotPassword = loadable(() => import("../pages/ForgotPassword"));
export const LoadableConfirmation = loadable(() => import("../pages/Confirmation"));
