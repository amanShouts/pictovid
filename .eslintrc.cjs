/** @type {import('@types/eslint').Linter.BaseConfig} */
module.exports = {
  root: true,
  extends: [
    "@remix-run/eslint-config",
    "@remix-run/eslint-config/node",
    "@remix-run/eslint-config/jest-testing-library",
    "prettier",
  ],
  globals: {
    shopify: "readonly"
  },
  plugins: ["@remotion"], // Add the @remotion plugin
  overrides: [
    {
      files: ["remotion/*.{ts,tsx}"],
      extends: ["plugin:@remotion/recommended"]
    }
  ]
};
