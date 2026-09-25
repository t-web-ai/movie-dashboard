import packageJson from "../../package.json";

const currentYear = new Date().getFullYear();

export const APP_CONFIG = {
  name: "T Movie",
  version: packageJson.version,
  copyright: `© ${currentYear}, T Movie.`,
  meta: {
    title: "T Movie",
    description: "This is a dashboard.",
  },
};
