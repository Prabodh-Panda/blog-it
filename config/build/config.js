import { createRequire } from "module";
import path from "path";

import { absolutePath } from "./constants.js";

const require = createRequire(import.meta.url);

const alias = {
  images: path.resolve(process.cwd(), "app/assets/images"),
  crypto: require.resolve("crypto-browserify"),
  path: require.resolve("path-browserify"),
  buffer: require.resolve("buffer"),
  stream: require.resolve("stream-browserify"),
  assets: absolutePath("../assets"),
  apis: absolutePath("src/apis"),
  common: absolutePath("src/common"),
  components: absolutePath("src/components"),
  constants: absolutePath("src/constants"),
  hooks: absolutePath("src/hooks"),
  reducers: absolutePath("src/reducers"),
  routes: absolutePath("src/routes"),
  stores: absolutePath("src/stores"),
  translations: absolutePath("src/translations"),
  utils: absolutePath("src/utils"),
  src: absolutePath("src"),
  neetoui: "@bigbinary/neetoui",
  neetocist: "@bigbinary/neeto-cist",
  neetoicons: "@bigbinary/neeto-icons",
};

export { alias };
