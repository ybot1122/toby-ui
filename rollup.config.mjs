import typescript from "@rollup/plugin-typescript";

/**
 * @type {import('rollup').RollupOptions}
 */
const config = {
  input: ["src/components/FAQItems/FAQItems.tsx", "src/components/HelloWorld/HelloWorld.tsx"],
  output: {
    format: "esm",
    sourcemap: true,
    dir: "dist",
  },
  plugins: [
    typescript({
      exclude: ["**/*.test.*"],
    })
  ],
  external: ["react"],
};

export default config;
