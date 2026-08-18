import nodeResolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";

export default {
  input: "LarpcordPlugins/index.js",
  output: {
    file: "dist/index.js",
    format: "cjs",
    strict: false
  },
  plugins: [
    nodeResolve(),
    commonjs()
  ]
};
