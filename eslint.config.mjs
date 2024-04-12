import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";
import pluginReactConfig from "eslint-plugin-react/configs/recommended.js";


// eslint-disable-next-line import/no-anonymous-default-export
export default [
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  pluginReactConfig,
  {
    settings: {
      react: {
        version: "detect"
      }
    }
  }
];
