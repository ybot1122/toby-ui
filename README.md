# toby-ui

Collection of Reusable React Components. Please refer to package.json `peerDependencies` to see which libraries this component library relies on. This package is zero-dependency.

### Install

1. Install toby-ui as a Node package:

`npm i @ybot1122/toby-ui`

2. Add toby-ui to tailwind.config.js:

```
module.exports = {
  //...
  content: [
    // ...
    "node_modules/@ybot1122/toby-ui/dist/**/*.js",
  ],
}
```

### Adding a new Component
1. Create its directory under `src/components`.
2. Add its implementation file, and storybook file into that directory.
3. In `package.json` add the entry for it in `exports` array.
4. In `rollup.config.mjs` add the path as a file for `input`.
5. In `src/index.ts` put any type definitions you will use for the new component.

### Publish and Release

1. Make a PR and merge to bump the version in package.json
2. In GitHub, create release.
3. `npm login`
4. `npm publish`
