import packageJson from "../../package.json";
import env from "./env-config";

const currentYear = new Date().getFullYear();
export const APP_CONFIG = {
  name: `${env.appName} Dashboard`,
  version: packageJson.version,
  copyright: `© ${currentYear}, ${env.appName} Dashboard.`,
  meta: {
    title: `${env.appName} Dashboard`,
    description: "This is a dashboard.",
  },
};
