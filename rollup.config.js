import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import typescript from "@rollup/plugin-typescript";
import dts from "rollup-plugin-dts";

const tsPlugin = typescript({
  tsconfig: "./tsconfig.json",
  declaration: false,
  emitDeclarationOnly: false
});

export default [
  // Main package (JS)
  {
    input: "src/index.ts",
    output: [
      { file: "dist/index.cjs.js", format: "cjs" },
      { file: "dist/index.esm.js", format: "es" }
    ],
    external: ["react", "react-dom", "svelte"],
    plugins: [resolve(), commonjs(), tsPlugin],
  },

  // React entry (JS)
  {
    input: "src/reactIndex.ts",
    output: [
      { file: "dist/react/index.cjs.js", format: "cjs" },
      { file: "dist/react/index.esm.js", format: "es" }
    ],
    external: ["react", "react-dom"],
    plugins: [resolve(), commonjs(), tsPlugin],
  },

  

  // Types: Main
  {
    input: "src/index.ts",
    output: { file: "dist/index.d.ts", format: "es" },
    plugins: [dts()],
  },

  // Types: React
  {
    input: "src/reactIndex.ts",
    output: { file: "dist/react/index.d.ts", format: "es" },
    plugins: [dts()],
  },

 
];
