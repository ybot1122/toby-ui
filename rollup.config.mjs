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
    "src/sdk/cloudinary/getImages.ts",
    "src/sdk/cloudinary/uploadImage.ts",
    "src/sdk/github/getUser.ts",
    "src/sdk/github/getRepositoryContent.ts",
    "src/sdk/github/putRepositoryContent.ts",
    "src/sdk/github/getAccessToken.ts",
    "src/sdk/vercel/listDeployments.ts",
    "src/sdk/vercel/getDeploymentEvents.ts",
    "src/sdk/vercel/getDeployment.ts",
    "src/sdk/instagram/me.ts",
    "src/sdk/instagram/accessToken.ts",
    "src/sdk/instagram/longAccessToken.ts",
    "src/sdk/instagram/media.ts",
    "src/sdk/instagram/mediaPublish.ts",
    "src/sdk/brevo/sendTransactionalEmail.ts",
    "src/sdk/brevo/createContact.ts",
    "src/lib/encryptSymmetric.ts",
    "src/lib/decryptSymmetric.ts",
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
