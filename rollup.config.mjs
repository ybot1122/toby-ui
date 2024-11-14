import typescript from "@rollup/plugin-typescript";

/**
 * @type {import('rollup').RollupOptions}
 */
const config = {
  input: ["src/components/FAQItem/FAQItem.tsx", "src/components/HelloWorld/HelloWorld.tsx"],
  output: {
    format: "esm",
    sourcemap: true,
    dir: "dist",
  },
  plugins: [
    typescript({
      exclude: ["**/*.test.*", "**/*.stories.*"],
    })
  ],
  external: ["react"],
};

export default config;
