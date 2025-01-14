import { readFileSync } from "fs";
import { join } from "path";
import { cwd } from "process";
import typescript from "@rollup/plugin-typescript";
import dts from "rollup-plugin-dts";

const pkg = JSON.parse(readFileSync(join(cwd(), "package.json"), "utf8"));
export default [
  // JavaScript builds
  {
    input: "guest-js/index.ts",
    output: [
      {
        file: pkg.exports.import, // ESM build
        format: "esm",
        sourcemap: true,
      },
      {
        file: pkg.exports.require, // CJS build
        format: "cjs",
        sourcemap: true,
      },
    ],
    plugins: [
      typescript({
        tsconfig: "./tsconfig.json",
        declaration: true,
        declarationDir: `./${pkg.exports.import.split("/")[0]}`,
      }),
    ],
    external: [
      /^@tauri-apps\/api/, // Exclude Tauri API imports from bundling
      ...Object.keys(pkg.dependencies || {}),
      ...Object.keys(pkg.peerDependencies || {}),
    ],
  },

  // Type declaration build
  {
    input: "guest-js/index.ts",
    output: {
      file: pkg.exports.types, // Ensure this field exists in package.json
      format: "es",
    },
    plugins: [dts()],
  },
];
