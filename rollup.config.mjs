import typescript from "@rollup/plugin-typescript";

/**
 * @type {import('rollup').RollupOptions}
 */
const config = {
  input: [
    "src/components/AccordionItem/AccordionItem.tsx",
    "src/components/HelloWorld/HelloWorld.tsx",
    "src/components/NavBar/NavBar.tsx",
    "src/components/Carousel/Carousel.tsx",
    "src/index.ts",
  ],
  output: {
    format: "esm",
    sourcemap: true,
    dir: "dist",
    preserveModules: true,
  },
  plugins: [
    typescript({
      exclude: ["**/*.test.*", "**/*.stories.*"],
    }),
  ],
  external: ["react"],
};

export default config;
